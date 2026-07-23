#!/usr/bin/env python3
"""Build the public workshop with CONTENTS and expanded skill slides."""

from __future__ import annotations

import html
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
        <button class="contents-item" type="button" onclick="goTo(12)" aria-label="13페이지 Claude Code Skills로 이동"><span class="contents-range">13–27</span><strong>Claude Code Skills</strong><small>요구사항 · 계획 · 디자인 · 디버깅 · 검증</small></button>
        <button class="contents-item" type="button" onclick="goTo(27)" aria-label="28페이지 좋은 요청과 Git 기본으로 이동"><span class="contents-range">28–37</span><strong>좋은 요청과 Git 기본</strong><small>프롬프트 구조 · 공개 분류 · Commit · Push</small></button>
        <button class="contents-item" type="button" onclick="goTo(37)" aria-label="38페이지 포트폴리오 제작 실습으로 이동"><span class="contents-range">38–69</span><strong>포트폴리오 제작 실습</strong><small>조사 · Plan · 제작 · 화면과 Diff 검토</small></button>
        <button class="contents-item" type="button" onclick="goTo(69)" aria-label="70페이지 GitHub Pages 배포로 이동"><span class="contents-range">70–77</span><strong>GitHub Pages 배포</strong><small>설정 · 공개 URL · 404와 사고 대응</small></button>
        <button class="contents-item" type="button" onclick="goTo(77)" aria-label="78페이지 다음 업무와 마무리로 이동"><span class="contents-range">78–79</span><strong>다음 업무와 마무리</strong><small>반복 적용 · 최종 원칙</small></button>
      </div>
      <p class="contents-tip">항목을 클릭하면 해당 슬라이드로 이동합니다.</p>
    </section>
"""

CONTENTS_NOTE = {
    "slide": 2,
    "title": "CONTENTS",
    "body": "[약 1분]\n\n전체 교육을 여섯 구간으로 안내합니다. 각 항목의 페이지 범위를 읽고, 필요하면 항목을 눌러 해당 구간으로 바로 이동할 수 있다고 설명합니다.\n\n이제 오늘 만들 결과부터 보겠습니다.",
}

SKILL_EXPANSIONS = [
    {
        "source_slide": 15,
        "eyebrow": "01 · 요구사항 정리 · 실전",
        "title": "brainstorming은 네 질문으로 요구사항을 고정한다",
        "body_html": '<div class="four-grid"><div class="panel"><h3>01 대상</h3><p>누가 이 결과를 보고 무엇을 이해해야 하는가?</p></div><div class="panel"><h3>02 핵심 결과</h3><p>한 페이지에서 반드시 보여 줄 내용은 무엇인가?</p></div><div class="panel"><h3>03 금지</h3><p>개인정보·비공개 자료·추측을 어디까지 제외할 것인가?</p></div><div class="panel"><h3>04 완료 기준</h3><p>화면·링크·모바일·Git에서 무엇을 직접 확인할 것인가?</p></div></div>',
        "overview_fallback": "[약 1분] brainstorming이 제작 전에 목적과 범위를 합의하는 절차임을 설명합니다.",
        "detail_fallback": "[약 1분] 대상·핵심 결과·금지·완료 기준의 네 질문을 실습합니다.",
        "overview_note": "[약 1분]\n\nbrainstorming의 역할은 바로 제작하는 것이 아니라 대상, 핵심 결과, 공개 금지 정보, 완료 기준을 질문으로 합의하는 것이라고 설명합니다. 기존 비교 화면에서 짧은 요청이 어떻게 구체적인 질문 절차로 바뀌는지 짚습니다.\n\n다음 장에서 실제로 사용할 네 질문을 확인합니다.",
        "detail_note": "[약 1분]\n\n대상, 핵심 결과, 금지, 완료 기준의 네 질문을 차례로 읽습니다. 참가자가 자신의 포트폴리오를 기준으로 각 질문에 한 문장씩 답하게 합니다. 답이 모호하면 파일을 만들기 전에 질문을 한 번 더 좁히는 것이 핵심입니다.\n\n이 합의를 실행 순서로 바꾸는 writing-plans로 넘어갑니다.",
    },
    {
        "source_slide": 16,
        "eyebrow": "02 · 실행 계획 · 실전",
        "title": "writing-plans는 네 칸으로 실행 가능성을 확인한다",
        "body_html": '<div class="four-grid"><div class="panel"><h3>01 파일</h3><p>어떤 파일을 만들거나 바꾸며 각 파일의 역할은 무엇인가?</p></div><div class="panel"><h3>02 작업</h3><p>각 단계에서 정확히 무엇을 하고 어디서 멈추는가?</p></div><div class="panel"><h3>03 정상 결과</h3><p>성공했을 때 화면과 터미널에 무엇이 보여야 하는가?</p></div><div class="panel"><h3>04 검증</h3><p>사람이 승인 전에 어떤 명령과 화면을 직접 확인하는가?</p></div></div>',
        "overview_fallback": "[약 1분] writing-plans가 합의한 방향을 실행 순서로 바꾸는 절차임을 설명합니다.",
        "detail_fallback": "[약 1분] 파일·작업·정상 결과·검증의 네 칸을 점검합니다.",
        "overview_note": "[약 1분]\n\nwriting-plans는 합의한 방향을 파일, 작업 순서, 정상 결과, 검증 방법으로 바꾼다고 설명합니다. 계획이 길어지는 것이 목적이 아니라 실행 중 추측과 요청하지 않은 변경을 줄이는 것이 목적입니다.\n\n다음 장에서 승인 전에 읽을 네 칸을 확인합니다.",
        "detail_note": "[약 1분]\n\n파일, 작업, 정상 결과, 검증의 네 칸을 짚습니다. 특히 정상 결과와 검증을 구분합니다. 정상 결과는 기대 상태이고, 검증은 그 상태를 사람이 확인하는 방법입니다. 삭제나 구조 변경이 계획에 숨어 있지 않은지도 함께 봅니다.\n\n이제 계획대로 만든 화면의 전달력을 다루는 frontend-design으로 넘어갑니다.",
    },
    {
        "source_slide": 17,
        "eyebrow": "03 · 화면 개선 · 실전",
        "title": "frontend-design은 30초 읽기 순서를 설계한다",
        "body_html": '<div class="four-grid"><div class="panel"><h3>01 첫 시선</h3><p>이름·역할·핵심 메시지가 가장 먼저 보이는가?</p></div><div class="panel"><h3>02 정보 위계</h3><p>제목, 설명, 카드의 크기와 간격이 중요도 순서와 맞는가?</p></div><div class="panel"><h3>03 모바일</h3><p>390×844에서도 가로 넘침 없이 같은 순서로 읽히는가?</p></div><div class="panel"><h3>04 사용 권한</h3><p>이미지·로고·폰트가 공개 페이지에서 사용 가능한가?</p></div></div>',
        "overview_fallback": "[약 1분] frontend-design이 예쁨보다 전달 목적을 설계하는 절차임을 설명합니다.",
        "detail_fallback": "[약 1분] 첫 시선·정보 위계·모바일·사용 권한을 점검합니다.",
        "overview_note": "[약 1분]\n\nfrontend-design은 장식을 추가하는 스킬이 아니라 대상이 핵심 메시지를 빠르게 이해하도록 정보 순서, 타이포그래피, 간격, 모바일 흐름을 설계하는 절차라고 설명합니다.\n\n다음 장에서 30초 안에 읽히는지 확인할 네 지점을 봅니다.",
        "detail_note": "[약 1분]\n\n첫 시선, 정보 위계, 모바일, 사용 권한을 확인합니다. 참가자에게 화면을 30초만 본 사람이 이름과 역할과 대표 업무를 말할 수 있는지 질문합니다. 내용 변경 없이 전달 순서만 개선하는 것이 핵심입니다.\n\n다음은 문제를 추측으로 고치지 않는 systematic-debugging입니다.",
    },
    {
        "source_slide": 18,
        "eyebrow": "04 · 오류 해결 · 실전",
        "title": "systematic-debugging은 네 단계로 원인을 좁힌다",
        "body_html": '<div class="four-grid"><div class="panel"><h3>01 재현</h3><p>같은 URL과 같은 조건에서 문제가 반복되는가?</p></div><div class="panel"><h3>02 증거 수집</h3><p>Git 상태·Push·Pages 설정·파일 경로 중 어디가 기대와 다른가?</p></div><div class="panel"><h3>03 가설 검증</h3><p>한 번에 원인 하나만 확인해 다른 가능성을 제거하는가?</p></div><div class="panel"><h3>04 최소 수정</h3><p>증명된 원인에 필요한 가장 작은 변경만 적용하는가?</p></div></div>',
        "overview_fallback": "[약 1분] systematic-debugging이 수정 전에 원인을 증명하는 절차임을 설명합니다.",
        "detail_fallback": "[약 1분] 재현·증거 수집·가설 검증·최소 수정의 순서를 점검합니다.",
        "overview_note": "[약 1분]\n\nsystematic-debugging은 오류 메시지를 보자마자 설정을 바꾸지 않고 재현과 증거로 원인을 좁히는 절차라고 설명합니다. Pages 404 사례에서 Git, Push, 설정, 파일 경로, URL을 순서대로 확인합니다.\n\n다음 장에서 네 단계 조사 루프를 확인합니다.",
        "detail_note": "[약 1분]\n\n재현, 증거 수집, 가설 검증, 최소 수정의 순서를 읽습니다. 한 번에 여러 설정을 바꾸면 무엇이 원인이었는지 알 수 없다는 점을 강조합니다. 증명된 원인 하나에만 최소 변경을 적용한 뒤 같은 조건으로 다시 재현합니다.\n\n마지막으로 완료 주장을 증거로 바꾸는 verification-before-completion을 봅니다.",
    },
    {
        "source_slide": 19,
        "eyebrow": "05 · 완료 검증 · 실전",
        "title": "verification-before-completion은 네 증거를 한 번에 묶는다",
        "body_html": '<div class="four-grid"><div class="panel"><h3>01 자동 확인</h3><p>테스트·문법 검사·빌드가 방금 실행되어 통과했는가?</p></div><div class="panel"><h3>02 화면</h3><p>데스크톱과 모바일에서 제목·링크·넘침을 직접 봤는가?</p></div><div class="panel"><h3>03 변경 내용</h3><p><code>git status</code>와 Diff가 승인한 범위와 일치하는가?</p></div><div class="panel"><h3>04 공개 결과</h3><p>실제 공개 URL을 새 탭에서 열어 최신 결과를 확인했는가?</p></div></div>',
        "overview_fallback": "[약 1분] verification-before-completion이 완료를 최신 증거로 바꾸는 절차임을 설명합니다.",
        "detail_fallback": "[약 1분] 자동 확인·화면·변경 내용·공개 결과의 네 증거를 점검합니다.",
        "overview_note": "[약 1분]\n\nverification-before-completion은 ‘완료했습니다’라는 문장을 최신 테스트, 화면, 변경 내용, 공개 URL의 증거로 바꾸는 절차라고 설명합니다. 과거 테스트나 로컬 화면만으로 공개 완료를 주장하지 않습니다.\n\n다음 장에서 완료를 승인하는 네 증거를 확인합니다.",
        "detail_note": "[약 1분]\n\n자동 확인, 화면, 변경 내용, 공개 결과의 네 증거를 구분합니다. 각각은 다른 실패를 잡기 때문에 하나로 대신할 수 없습니다. 참가자가 실제 공개 URL을 직접 열고 Git 상태와 대조한 뒤에만 완료를 승인하도록 안내합니다.\n\n이제 다섯 스킬을 설치하고 사용하는 흐름으로 넘어갑니다.",
    },
]

SKILL_SOURCE_IDS = {item["source_slide"] for item in SKILL_EXPANSIONS}
SKILL_BY_SOURCE_ID = {item["source_slide"]: item for item in SKILL_EXPANSIONS}


def section_slide_ids(document: str) -> list[int]:
    return [
        int(value)
        for value in re.findall(
            r'<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"',
            document,
        )
    ]


def section_slide_minutes(document: str) -> list[float]:
    return [
        float(value)
        for value in re.findall(
            r'<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="\d+"\s+data-minutes="([0-9.]+)"',
            document,
        )
    ]


def public_id_for_source(source_id: int) -> int:
    if source_id == 1:
        return 1
    inserted_skill_pages_before = sum(1 for skill_id in SKILL_SOURCE_IDS if skill_id < source_id)
    return source_id + 1 + inserted_skill_pages_before


def update_skill_overview(document: str, item: dict[str, object]) -> str:
    source_id = int(item["source_slide"])
    pattern = re.compile(
        rf'(<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="{source_id}"\s+data-minutes=")[^"]+("[^>]*\sdata-notes=")[^"]*(">)',
    )
    replacement = (
        lambda match: match.group(1)
        + "0.9"
        + match.group(2)
        + html.escape(str(item["overview_fallback"]), quote=True)
        + match.group(3)
    )
    document, count = pattern.subn(replacement, document, count=1)
    if count != 1:
        raise ValueError(f"could not update source skill slide {source_id}")
    return document


def skill_detail_slide(item: dict[str, object]) -> str:
    source_id = int(item["source_slide"])
    public_id = public_id_for_source(source_id) + 1
    fallback = html.escape(str(item["detail_fallback"]), quote=True)
    return f'''    <section class="slide wide skill-slide skill-detail-slide" data-slide="{public_id}" data-minutes="0.9" data-notes="{fallback}">
      <div><p class="eyebrow">{item["eyebrow"]}</p><h2>{item["title"]}</h2></div>
      {item["body_html"]}
    </section>'''


def build_notes(source_notes: list[dict[str, object]]) -> list[dict[str, object]]:
    if [note.get("slide") for note in source_notes] != list(range(1, 74)):
        raise ValueError("source speaker notes are not aligned to slides 1..73")

    built_notes: list[dict[str, object]] = []

    def append_note(title: str, body: str) -> None:
        built_notes.append({"slide": len(built_notes) + 1, "title": title, "body": body})

    for note in source_notes:
        source_id = int(note["slide"])
        if source_id == 1:
            append_note(str(note["title"]), str(note["body"]))
            append_note(str(CONTENTS_NOTE["title"]), str(CONTENTS_NOTE["body"]))
            continue

        expansion = SKILL_BY_SOURCE_ID.get(source_id)
        if expansion:
            append_note(str(note["title"]), str(expansion["overview_note"]))
            append_note(str(expansion["title"]), str(expansion["detail_note"]))
        else:
            append_note(str(note["title"]), str(note["body"]))

    return built_notes


def build(source: str) -> str:
    source_ids = section_slide_ids(source)
    expected_source_ids = list(range(1, 74))
    if source_ids != expected_source_ids:
        raise ValueError(f"expected source slides 1..73, got {source_ids}")
    if "CONTENTS" in source:
        raise ValueError("source already contains CONTENTS")

    document = source
    for item in SKILL_EXPANSIONS:
        document = update_skill_overview(document, item)

    document = re.sub(
        r'data-slide="(\d+)"',
        lambda match: f'data-slide="{public_id_for_source(int(match.group(1)))}"',
        document,
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
    document, contents_count = first_slide_pattern.subn(
        lambda match: match.group(1) + "\n" + CONTENTS_SLIDE,
        document,
        count=1,
    )
    if contents_count != 1:
        raise ValueError("could not insert CONTENTS after slide 1")

    for item in SKILL_EXPANSIONS:
        overview_public_id = public_id_for_source(int(item["source_slide"]))
        overview_pattern = re.compile(
            rf'(<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="{overview_public_id}"[^>]*>.*?</section>)',
            re.DOTALL,
        )
        document, count = overview_pattern.subn(
            lambda match, detail=skill_detail_slide(item): match.group(1) + "\n" + detail,
            document,
            count=1,
        )
        if count != 1:
            raise ValueError(f"could not insert detail slide after page {overview_public_id}")

    notes_pattern = re.compile(
        r'(<script type="application/json" id="speaker-notes-data">)(.*?)(</script>)',
        re.DOTALL,
    )
    notes_match = notes_pattern.search(document)
    if not notes_match:
        raise ValueError("speaker notes data not found")

    built_notes = build_notes(json.loads(notes_match.group(2)))
    serialized_notes = json.dumps(built_notes, ensure_ascii=False, separators=(",", ":"))
    document = notes_pattern.sub(
        lambda match: match.group(1) + serialized_notes + match.group(3),
        document,
        count=1,
    )

    built_ids = section_slide_ids(document)
    expected_built_ids = list(range(1, 80))
    if built_ids != expected_built_ids:
        raise ValueError(f"expected built slides 1..79, got {built_ids}")

    built_minutes = section_slide_minutes(document)
    if len(built_minutes) != 79 or abs(sum(built_minutes) - 120) >= 0.001:
        raise ValueError(f"expected 79 slides / 120 minutes, got {len(built_minutes)} / {sum(built_minutes)}")

    if [note["slide"] for note in built_notes] != expected_built_ids:
        raise ValueError("built speaker notes are not aligned to slides 1..79")

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
