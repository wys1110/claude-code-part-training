#!/usr/bin/env python3
"""Build the public workshop deck with a CONTENTS slide at page 2."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


CONTENTS_CSS = r"""
    .contents-slide{gap:22px;padding-block:52px}.contents-header{display:grid;gap:8px}.contents-header h2{margin-bottom:0}.contents-header p{font-size:18px}.contents-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.contents-item{display:grid;grid-template-columns:auto 1fr;column-gap:16px;row-gap:5px;align-items:start;width:100%;border:1px solid rgba(68,217,255,.25);border-left:3px solid var(--neon-green);border-radius:4px;background:rgba(6,19,15,.9);padding:15px 17px;color:var(--terminal-ink);text-align:left;cursor:pointer;transition:transform .18s ease,border-color .18s ease,background .18s ease}.contents-item:hover,.contents-item:focus-visible{transform:translateY(-2px);border-color:rgba(92,255,149,.7);background:rgba(8,30,22,.96);outline:none}.contents-range{grid-row:1 / span 2;color:var(--neon-cyan);font:700 14px var(--mono);white-space:nowrap}.contents-item strong{font:700 17px/1.35 var(--mono)}.contents-item small{color:var(--terminal-muted);font-size:14px;line-height:1.4}.contents-tip{color:var(--neon-cyan);font:600 12px var(--mono)}
    @media(max-width:760px){.contents-slide{padding-block:64px;gap:16px}.contents-header p{font-size:16px}.contents-grid{grid-template-columns:1fr;gap:9px}.contents-item{padding:12px 14px}.contents-item strong{font-size:15px}.contents-item small{font-size:12px}.contents-range{font-size:12px}}
"""

CONTENTS_SLIDE = r"""
    <section class="slide wide contents-slide" data-slide="2" data-minutes="1" data-notes="[1분] 전체 교육 흐름을 여섯 구간으로 안내합니다. 원하는 항목을 누르면 해당 구간으로 바로 이동합니다.">
      <div class="contents-header">
        <span class="tag">COURSE MAP</span>
        <h2>CONTENTS</h2>
        <p>전체 흐름을 먼저 보고, 필요한 구간으로 바로 이동합니다.</p>
      </div>
      <div class="contents-grid" aria-label="교육 목차">
        <button class="contents-item" type="button" onclick="goTo(2)" aria-label="3페이지 결과와 안전 원칙으로 이동"><span class="contents-range">03–12</span><strong>결과와 안전 원칙</strong><small>완료 증거 · 공개 경계 · 사람의 역할</small></button>
        <button class="contents-item" type="button" onclick="goTo(12)" aria-label="13페이지 Claude Code Skills로 이동"><span class="contents-range">13–22</span><strong>Claude Code Skills</strong><small>요구사항 · 계획 · 디자인 · 디버깅 · 검증</small></button>
        <button class="contents-item" type="button" onclick="goTo(22)" aria-label="23페이지 좋은 요청과 Git 기본으로 이동"><span class="contents-range">23–32</span><strong>좋은 요청과 Git 기본</strong><small>프롬프트 구조 · 공개 분류 · Commit · Push</small></button>
        <button class="contents-item" type="button" onclick="goTo(32)" aria-label="33페이지 포트폴리오 제작 실습으로 이동"><span class="contents-range">33–64</span><strong>포트폴리오 제작 실습</strong><small>조사 · Plan · 제작 · 화면과 Diff 검토</small></button>
        <button class="contents-item" type="button" onclick="goTo(64)" aria-label="65페이지 GitHub Pages 배포로 이동"><span class="contents-range">65–72</span><strong>GitHub Pages 배포</strong><small>설정 · 공개 URL · 404와 사고 대응</small></button>
        <button class="contents-item" type="button" onclick="goTo(72)" aria-label="73페이지 다음 업무와 마무리로 이동"><span class="contents-range">73–74</span><strong>다음 업무와 마무리</strong><small>반복 적용 · 최종 원칙</small></button>
      </div>
      <p class="contents-tip">항목을 클릭하면 해당 슬라이드로 이동합니다.</p>
    </section>
"""

CONTENTS_NOTE = {
    "slide": 2,
    "title": "CONTENTS",
    "body": "[약 1분]\n\n전체 교육을 여섯 구간으로 안내합니다. 각 항목의 페이지 범위를 읽고, 필요하면 항목을 눌러 해당 구간으로 바로 이동할 수 있다고 설명합니다.\n\n이제 오늘 만들 결과부터 보겠습니다.",
}


def section_slide_ids(document: str) -> list[int]:
    return [
        int(value)
        for value in re.findall(
            r'<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"',
            document,
        )
    ]


def build(source: str) -> str:
    source_ids = section_slide_ids(source)
    expected_source_ids = list(range(1, 74))
    if source_ids != expected_source_ids:
        raise ValueError(f"expected source slides 1..73, got {source_ids}")
    if "CONTENTS" in source:
        raise ValueError("source already contains CONTENTS")

    # Shift every existing slide reference from page 2 onward. This also updates
    # responsive CSS selectors such as .slide[data-slide="66"].
    document = re.sub(
        r'data-slide="(\d+)"',
        lambda match: (
            f'data-slide="{int(match.group(1)) + 1}"'
            if int(match.group(1)) >= 2
            else match.group(0)
        ),
        source,
    )

    document, css_count = re.subn(
        r"\n  </style>",
        CONTENTS_CSS + "\n  </style>",
        document,
        count=1,
    )
    if css_count != 1:
        raise ValueError("could not insert CONTENTS styles")

    first_slide_pattern = re.compile(
        r'(<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="1"[^>]*>.*?</section>)',
        re.DOTALL,
    )
    document, slide_count = first_slide_pattern.subn(
        lambda match: match.group(1) + "\n" + CONTENTS_SLIDE,
        document,
        count=1,
    )
    if slide_count != 1:
        raise ValueError("could not insert CONTENTS after slide 1")

    notes_pattern = re.compile(
        r'(<script type="application/json" id="speaker-notes-data">)(.*?)(</script>)',
        re.DOTALL,
    )
    notes_match = notes_pattern.search(document)
    if not notes_match:
        raise ValueError("speaker notes data not found")

    notes = json.loads(notes_match.group(2))
    if [note.get("slide") for note in notes] != expected_source_ids:
        raise ValueError("source speaker notes are not aligned to slides 1..73")

    shifted_notes = []
    for note in notes:
        shifted = dict(note)
        if shifted["slide"] >= 2:
            shifted["slide"] += 1
        shifted_notes.append(shifted)
    shifted_notes.insert(1, CONTENTS_NOTE)

    serialized_notes = json.dumps(
        shifted_notes,
        ensure_ascii=False,
        separators=(",", ":"),
    )
    document = notes_pattern.sub(
        lambda match: match.group(1) + serialized_notes + match.group(3),
        document,
        count=1,
    )

    built_ids = section_slide_ids(document)
    expected_built_ids = list(range(1, 75))
    if built_ids != expected_built_ids:
        raise ValueError(f"expected built slides 1..74, got {built_ids}")

    return document


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: build_workshop.py SOURCE_HTML OUTPUT_HTML")

    source_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(build(source_path.read_text(encoding="utf-8")), encoding="utf-8")


if __name__ == "__main__":
    main()
