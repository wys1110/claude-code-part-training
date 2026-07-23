#!/usr/bin/env python3
"""Enrich the ten public skill slides with detailed, content-driven guidance."""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path


CSS = r"""
    .skill-rich-slide{gap:10px;padding:26px 34px 42px;overflow-y:auto}.skill-rich-slide h2{font-size:clamp(27px,2.8vw,41px);line-height:1.08;margin-bottom:0}.skill-summary{max-width:1180px;color:var(--terminal-muted);font-size:12.8px;line-height:1.42}.skill-overview-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.skill-case-grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,.65fr);gap:8px}.skill-detail-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.skill-overview-grid .panel,.skill-case-grid .panel,.skill-detail-grid .panel{padding:9px 11px;min-width:0}.skill-overview-grid h3,.skill-case-grid h3,.skill-detail-grid h3{font-size:12px;color:var(--neon-cyan);margin-bottom:5px}.skill-overview-grid p,.skill-case-grid p,.skill-detail-grid p,.skill-detail-grid li,.skill-case-grid li{font-size:10.8px;line-height:1.34}.skill-label{display:inline-block;margin-bottom:4px;color:var(--neon-green);font:700 9px var(--mono);letter-spacing:.08em}.skill-list,.skill-steps,.skill-check-list,.skill-fail-list,.skill-anatomy-list{display:grid;gap:3px;list-style:none;margin:0;padding:0}.skill-list li::before{content:'•';color:var(--neon-cyan);margin-right:5px}.skill-steps{counter-reset:skillstep}.skill-steps li{position:relative;padding-left:21px}.skill-steps li::before{counter-increment:skillstep;content:counter(skillstep);position:absolute;left:0;top:0;display:grid;place-items:center;width:15px;height:15px;border:1px solid rgba(68,217,255,.45);border-radius:50%;color:var(--neon-cyan);font:700 8px var(--mono)}.skill-check-list li::before{content:'✓';color:var(--neon-green);margin-right:5px}.skill-fail-list li::before{content:'×';color:var(--neon-red);margin-right:5px}.skill-anatomy-list li::before{content:'→';color:var(--neon-cyan);margin-right:5px}.skill-prompt,.skill-result{white-space:pre-wrap;word-break:keep-all;font-size:10.5px!important;line-height:1.34!important}.skill-span-2{grid-column:span 2}.skill-case-flow{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:start}.skill-case-box{border-left:2px solid rgba(68,217,255,.4);padding-left:8px}.skill-case-box.after{border-left-color:var(--neon-green)}.skill-case-box strong{display:block;margin-bottom:3px;color:var(--terminal-ink);font:700 9px var(--mono)}.skill-arrow{color:var(--neon-green);font:700 16px var(--mono);padding-top:15px}.skill-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:5px}.skill-tags span{border:1px solid rgba(92,255,149,.3);border-radius:999px;padding:2px 6px;color:var(--terminal-muted);font:600 9px var(--mono)}
    @media(max-width:1000px){.skill-rich-slide{padding:34px 24px 54px}.skill-overview-grid,.skill-detail-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.skill-case-grid{grid-template-columns:1fr}.skill-span-2{grid-column:span 2}.skill-rich-slide h2{font-size:clamp(25px,4vw,36px)}}
    @media(max-width:760px){.skill-rich-slide{gap:9px;padding:52px 16px 82px;overflow-y:auto;-webkit-overflow-scrolling:touch}.skill-summary{font-size:12px}.skill-overview-grid,.skill-detail-grid,.skill-case-grid{grid-template-columns:1fr}.skill-span-2{grid-column:auto}.skill-case-flow{grid-template-columns:1fr}.skill-arrow{transform:rotate(90deg);justify-self:center;padding:0}.skill-overview-grid p,.skill-case-grid p,.skill-detail-grid p,.skill-detail-grid li,.skill-case-grid li{font-size:11.2px;line-height:1.4}}
"""

SKILLS = [
    json.loads(path.read_text(encoding="utf-8"))
    for path in sorted((Path(__file__).parent / "skill_content").glob("*.json"))
]


def safe(value: object) -> str:
    return html.escape(str(value), quote=True)


def pre(value: object) -> str:
    return safe(value).replace("\n", "<br>")


def list_html(items: list[str], css_class: str) -> str:
    return f'<ul class="{css_class}">' + ''.join(f'<li>{safe(value)}</li>' for value in items) + '</ul>'


def overview_html(item: dict[str, object]) -> str:
    principles = list_html(item["key_points"], "skill-list")
    return f'''<div><p class="eyebrow">{safe(item["label"])}</p><h2>{safe(item["overview_title"])}</h2></div>
      <p class="skill-summary">{safe(item["summary"])}</p>
      <div class="skill-overview-grid">
        <div class="panel"><span class="skill-label">DEFINITION</span><h3>무엇인가?</h3><p>{safe(item["definition"])}</p></div>
        <div class="panel"><span class="skill-label">WHEN</span><h3>언제 사용?</h3><p>{safe(item["when"])}</p></div>
        <div class="panel"><span class="skill-label">INPUT</span><h3>필요한 입력</h3><p>{safe(item["inputs"])}</p></div>
        <div class="panel"><span class="skill-label">OUTPUT</span><h3>기대 출력</h3><p>{safe(item["outputs"])}</p></div>
        <div class="panel"><span class="skill-label">HUMAN GATE</span><h3>사람이 결정할 것</h3><p>{safe(item["human"])}</p></div>
        <div class="panel"><span class="skill-label">WHEN NOT TO USE</span><h3>사용하지 말아야 할 때</h3><p>{safe(item["not_for"])}</p></div>
      </div>
      <div class="skill-case-grid">
        <div class="panel"><span class="skill-label">BEFORE → AFTER</span><h3>실제 적용 사례</h3><div class="skill-case-flow"><div class="skill-case-box"><strong>BEFORE</strong><p>{safe(item["scenario_before"])}</p></div><div class="skill-arrow">→</div><div class="skill-case-box after"><strong>AFTER</strong><p>{safe(item["scenario_after"])}</p></div></div></div>
        <div class="panel"><span class="skill-label">CORE PRINCIPLES</span><h3>기억할 핵심 원칙</h3>{principles}<div class="skill-tags"><span>구체성</span><span>경계</span><span>검증</span></div></div>
      </div>'''


def detail_html(item: dict[str, object]) -> str:
    steps = list_html(item["steps"], "skill-steps")
    anatomy = list_html(item["prompt_anatomy"], "skill-anatomy-list")
    checks = list_html(item["checks"], "skill-check-list")
    failures = list_html(item["failures"], "skill-fail-list")
    return f'''<div><p class="eyebrow">{safe(item["label"])} · 실전</p><h2>{safe(item["detail_title"])}</h2></div>
      <div class="skill-detail-grid">
        <div class="panel"><span class="skill-label">WORKFLOW</span><h3>실행 순서</h3>{steps}</div>
        <div class="panel skill-span-2"><span class="skill-label">COPYABLE PROMPT</span><h3>바로 쓸 프롬프트</h3><p class="code skill-prompt">{pre(item["prompt"])}</p></div>
        <div class="panel"><span class="skill-label">PROMPT ANATOMY</span><h3>프롬프트 문장별 역할</h3>{anatomy}</div>
        <div class="panel"><span class="skill-label">EXAMPLE OUTPUT</span><h3>좋은 결과 예시</h3><p class="code skill-result">{pre(item["result_example"])}</p></div>
        <div class="panel"><span class="skill-label">QUALITY GATE</span><h3>좋은 결과의 기준</h3>{checks}</div>
        <div class="panel skill-span-2"><span class="skill-label">FAILURE PATTERNS</span><h3>흔한 실패와 교정</h3>{failures}</div>
        <div class="panel"><span class="skill-label">REQUEST EXAMPLE</span><h3>짧은 요청 예시</h3><p>{safe(item["example"])}</p></div>
      </div>'''


def replace_slide(document: str, page: int, inner: str) -> str:
    pattern = re.compile(
        rf'(<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="{page}"[^>]*>).*?</section>',
        re.DOTALL,
    )

    def replacement(match: re.Match[str]) -> str:
        opening = match.group(1)
        if "skill-rich-slide" not in opening:
            opening = opening.replace('class="', 'class="skill-rich-slide ', 1)
        opening, timing_count = re.subn(
            r'data-minutes="[^"]+"', 'data-minutes="3"', opening, count=1
        )
        if timing_count != 1:
            raise ValueError(f"could not update timing for slide {page}")
        return opening + inner + "\n    </section>"

    document, count = pattern.subn(replacement, document, count=1)
    if count != 1:
        raise ValueError(f"could not replace slide {page}")
    return document


def three_minute_note(body: object) -> str:
    return re.sub(r'^\[(?:약\s*)?[0-9.]+분\]', '[약 3분]', str(body))


def validate_skill_definition(item: dict[str, object]) -> None:
    required = {
        "overview_page", "detail_page", "label", "overview_title", "detail_title",
        "summary", "definition", "when", "inputs", "outputs", "human", "not_for",
        "scenario_before", "scenario_after", "key_points", "steps", "prompt",
        "prompt_anatomy", "result_example", "checks", "failures", "example",
        "overview_note", "detail_note",
    }
    missing = sorted(required - set(item))
    if missing:
        raise ValueError(f"missing skill fields for {item.get('label', 'unknown')}: {missing}")
    for field in ("key_points", "steps", "prompt_anatomy", "checks", "failures"):
        values = item[field]
        if not isinstance(values, list) or len(values) < 3:
            raise ValueError(f"{item['label']} needs at least three entries in {field}")


def enrich(source: str) -> str:
    section_ids = [
        int(value)
        for value in re.findall(
            r'<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"', source
        )
    ]
    if section_ids != list(range(1, 80)):
        raise ValueError(f"expected public slides 1..79, got {section_ids}")
    if len(SKILLS) != 5:
        raise ValueError(f"expected five skill definitions, got {len(SKILLS)}")
    for item in SKILLS:
        validate_skill_definition(item)

    document, css_count = re.subn(r"\n  </style>", CSS + "\n  </style>", source, count=1)
    if css_count != 1:
        raise ValueError("could not insert detailed skill styles")

    for item in SKILLS:
        document = replace_slide(document, int(item["overview_page"]), overview_html(item))
        document = replace_slide(document, int(item["detail_page"]), detail_html(item))

    notes_pattern = re.compile(
        r'(<script type="application/json" id="speaker-notes-data">)(.*?)(</script>)',
        re.DOTALL,
    )
    match = notes_pattern.search(document)
    if not match:
        raise ValueError("speaker notes data not found")
    notes = json.loads(match.group(2))
    if [note.get("slide") for note in notes] != list(range(1, 80)):
        raise ValueError("speaker notes are not aligned to 79 slides")
    for item in SKILLS:
        overview_index = int(item["overview_page"]) - 1
        detail_index = int(item["detail_page"]) - 1
        notes[overview_index]["title"] = item["overview_title"]
        notes[overview_index]["body"] = three_minute_note(item["overview_note"])
        notes[detail_index]["title"] = item["detail_title"]
        notes[detail_index]["body"] = three_minute_note(item["detail_note"])
    serialized = json.dumps(notes, ensure_ascii=False, separators=(",", ":"))
    document = notes_pattern.sub(
        lambda found: found.group(1) + serialized + found.group(3), document, count=1
    )

    for item in SKILLS:
        for rendered_marker in (
            safe(item["overview_title"]),
            safe(item["detail_title"]),
            pre(item["result_example"]),
        ):
            if rendered_marker not in document:
                raise ValueError(f"missing enriched marker: {rendered_marker}")
    if document.count("skill-rich-slide") < 10:
        raise ValueError("expected ten enriched skill slides")
    for marker in ("DEFINITION", "WHEN NOT TO USE", "BEFORE → AFTER", "PROMPT ANATOMY", "EXAMPLE OUTPUT"):
        if document.count(marker) != 5:
            raise ValueError(f"expected five {marker} panels")

    skill_minutes = {
        int(page): float(minutes)
        for page, minutes in re.findall(
            r'<section\s+class="[^"]*\bskill-rich-slide\b[^"]*"\s+data-slide="(\d+)"\s+data-minutes="([0-9.]+)"',
            document,
        )
    }
    if len(skill_minutes) != 10 or any(value < 3 for value in skill_minutes.values()):
        raise ValueError(f"expected ten skill slides with at least three minutes each, got {skill_minutes}")
    return document


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: enrich_skill_pages.py SOURCE_HTML OUTPUT_HTML")
    source_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    source = source_path.read_text(encoding="utf-8")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(enrich(source), encoding="utf-8")


if __name__ == "__main__":
    main()
