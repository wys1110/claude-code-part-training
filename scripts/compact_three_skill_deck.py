#!/usr/bin/env python3
"""Remove four redundant three-skill slides and renumber the public deck to 77 slides."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


DROP_PAGES = {14, 15, 21, 25}
EXPECTED_INPUT = list(range(1, 82))
EXPECTED_OUTPUT = list(range(1, 78))
FORBIDDEN_SKILL_NAMES = (
    "writing-plans",
    "frontend-design",
    "systematic-debugging",
    "verification-before-completion",
)

CONTENTS_GRID = r'''<div class="contents-grid" aria-label="교육 목차">
        <button class="contents-item" type="button" onclick="goTo(2)" aria-label="3페이지 결과와 안전 원칙으로 이동"><span class="contents-range">03–12</span><strong>결과와 안전 원칙</strong><small>완료 증거 · 공개 경계 · 사람의 역할</small></button>
        <button class="contents-item" type="button" onclick="goTo(12)" aria-label="13페이지 Claude Code Skills로 이동"><span class="contents-range">13–23</span><strong>Claude Code Skills</strong><small>brainstorming · Caveman · Ponytail</small></button>
        <button class="contents-item" type="button" onclick="goTo(23)" aria-label="24페이지 Claude Code와 Codex 비교로 이동"><span class="contents-range">24–25</span><strong>Claude Code vs Codex</strong><small>작업 방식 · 병렬성 · 선택 기준</small></button>
        <button class="contents-item" type="button" onclick="goTo(25)" aria-label="26페이지 좋은 요청과 Git 기본으로 이동"><span class="contents-range">26–35</span><strong>좋은 요청과 Git 기본</strong><small>프롬프트 구조 · 공개 분류 · Commit · Push</small></button>
        <button class="contents-item" type="button" onclick="goTo(35)" aria-label="36페이지 포트폴리오 제작 실습으로 이동"><span class="contents-range">36–67</span><strong>포트폴리오 제작 실습</strong><small>조사 · Plan · 제작 · 화면과 Diff 검토</small></button>
        <button class="contents-item" type="button" onclick="goTo(67)" aria-label="68페이지 GitHub Pages 배포로 이동"><span class="contents-range">68–75</span><strong>GitHub Pages 배포</strong><small>설정 · 공개 URL · 404와 사고 대응</small></button>
        <button class="contents-item" type="button" onclick="goTo(75)" aria-label="76페이지 다음 업무와 마무리로 이동"><span class="contents-range">76–77</span><strong>다음 업무와 마무리</strong><small>반복 적용 · 최종 원칙</small></button>
      </div>'''


def slide_ids(document: str) -> list[int]:
    return [
        int(value)
        for value in re.findall(
            r'<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"',
            document,
        )
    ]


def compact_number(old: int) -> int:
    if old in DROP_PAGES:
        return 0
    return old - sum(page < old for page in DROP_PAGES)


def remove_redundant_sections(document: str) -> str:
    pattern = re.compile(
        r'\n?\s*<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"[^>]*>.*?</section>',
        re.DOTALL,
    )

    def replacement(match: re.Match[str]) -> str:
        return "" if int(match.group(1)) in DROP_PAGES else match.group(0)

    document, count = pattern.subn(replacement, document)
    if count < 81:
        raise ValueError(f"expected at least 81 slide matches, got {count}")
    return document


def renumber_data_slide_references(document: str) -> str:
    def replacement(match: re.Match[str]) -> str:
        old = int(match.group(1))
        return f'data-slide="{compact_number(old)}"'

    return re.sub(r'data-slide="(\d+)"', replacement, document)


def rebuild_notes(document: str) -> str:
    pattern = re.compile(
        r'(<script type="application/json" id="speaker-notes-data">)(.*?)(</script>)',
        re.DOTALL,
    )
    match = pattern.search(document)
    if not match:
        raise ValueError("speaker notes data not found")
    notes = json.loads(match.group(2))
    if [note.get("slide") for note in notes] != EXPECTED_INPUT:
        raise ValueError("expected speaker notes aligned to slides 1..81")

    compacted = []
    for note in notes:
        old = int(note["slide"])
        if old in DROP_PAGES:
            continue
        updated = dict(note)
        updated["slide"] = compact_number(old)
        compacted.append(updated)

    if [note["slide"] for note in compacted] != EXPECTED_OUTPUT:
        raise ValueError("speaker notes did not compact to slides 1..77")

    serialized = json.dumps(compacted, ensure_ascii=False, separators=(",", ":"))
    return pattern.sub(
        lambda found: found.group(1) + serialized + found.group(3),
        document,
        count=1,
    )


def replace_contents(document: str) -> str:
    pattern = re.compile(
        r'<div class="contents-grid" aria-label="교육 목차">.*?</div>',
        re.DOTALL,
    )
    document, count = pattern.subn(CONTENTS_GRID, document, count=1)
    if count != 1:
        raise ValueError("could not replace compacted contents grid")
    return document


def compact(source: str) -> str:
    if slide_ids(source) != EXPECTED_INPUT:
        raise ValueError("expected input slides 1..81")

    document = remove_redundant_sections(source)
    document = renumber_data_slide_references(document)
    document = rebuild_notes(document)
    document = replace_contents(document)

    if slide_ids(document) != EXPECTED_OUTPUT:
        raise ValueError(f"expected output slides 1..77, got {slide_ids(document)}")

    for forbidden in FORBIDDEN_SKILL_NAMES:
        if forbidden in document:
            raise ValueError(f"removed skill still present: {forbidden}")

    for marker in (
        "오늘 사용할 스킬은 세 개뿐이다",
        "brainstorming은 네 질문으로 요구사항을 고정한다",
        "Caveman은 정확성을 유지하면서 답을 압축한다",
        "Ponytail은 최소 구현 사다리를 따른다",
        "brainstorming · Caveman · Ponytail만 설치한다",
        "24–25",
        "76–77",
    ):
        if marker not in document:
            raise ValueError(f"missing compacted marker: {marker}")

    for removed_title in (
        "세 스킬은 줄이는 대상이 서로 다르다",
        "처음에는 이름을 직접 부르고 행동을 확인한다",
        "Caveman은 정보가 아니라 군더더기를 버린다",
        "Ponytail도 안전과 품질은 줄이지 않는다",
    ):
        if removed_title in document:
            raise ValueError(f"redundant slide still present: {removed_title}")

    return document


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: compact_three_skill_deck.py SOURCE_HTML OUTPUT_HTML")
    source_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        compact(source_path.read_text(encoding="utf-8")),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
