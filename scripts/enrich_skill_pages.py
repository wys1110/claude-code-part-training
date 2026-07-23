#!/usr/bin/env python3
"""Enrich the ten public skill slides with content-driven timing."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


CSS = r"""
    .skill-rich-slide{gap:16px;padding-block:44px}.skill-rich-slide h2{font-size:clamp(29px,3vw,45px);margin-bottom:0}.skill-summary{max-width:1120px;color:var(--terminal-muted);font-size:16px;line-height:1.48}.skill-overview-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:11px}.skill-overview-grid .panel,.skill-example .panel,.skill-detail-grid .panel{padding:13px 15px}.skill-overview-grid h3,.skill-example h3,.skill-detail-grid h3{font-size:14px;color:var(--neon-cyan);margin-bottom:7px}.skill-overview-grid p,.skill-example p,.skill-detail-grid p,.skill-detail-grid li{font-size:12.5px;line-height:1.43}.skill-example{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,.65fr);gap:11px}.skill-example .code{font-size:12.5px;line-height:1.5}.skill-detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.skill-label{display:inline-block;margin-bottom:6px;color:var(--neon-green);font:700 10px var(--mono);letter-spacing:.08em}.skill-steps,.skill-check-list,.skill-fail-list{display:grid;gap:5px;list-style:none}.skill-steps{counter-reset:skillstep}.skill-steps li{position:relative;padding-left:25px}.skill-steps li::before{counter-increment:skillstep;content:counter(skillstep);position:absolute;left:0;top:1px;display:grid;place-items:center;width:18px;height:18px;border:1px solid rgba(68,217,255,.45);border-radius:50%;color:var(--neon-cyan);font:700 9px var(--mono)}.skill-check-list li::before{content:'✓';color:var(--neon-green);margin-right:6px}.skill-fail-list li::before{content:'×';color:var(--neon-red);margin-right:6px}.skill-prompt{white-space:pre-wrap;word-break:keep-all}.skill-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.skill-tags span{border:1px solid rgba(92,255,149,.3);border-radius:999px;padding:3px 7px;color:var(--terminal-muted);font:600 10px var(--mono)}
    @media(max-width:900px){.skill-overview-grid{grid-template-columns:1fr}.skill-example,.skill-detail-grid{grid-template-columns:1fr}.skill-rich-slide{padding-block:56px}.skill-rich-slide h2{font-size:clamp(26px,6vw,37px)}}
    @media(max-width:760px){.skill-rich-slide{gap:11px;padding:54px 17px 82px}.skill-summary{font-size:13px}.skill-overview-grid,.skill-example,.skill-detail-grid{gap:7px}.skill-overview-grid .panel,.skill-example .panel,.skill-detail-grid .panel{padding:10px 11px}.skill-overview-grid p,.skill-example p,.skill-detail-grid p,.skill-detail-grid li,.skill-example .code{font-size:11.5px;line-height:1.38}.skill-tags{display:none}}
"""

SKILLS = [
    json.loads(path.read_text(encoding="utf-8"))
    for path in sorted((Path(__file__).parent / "skill_content").glob("*.json"))
]


def overview_html(item: dict[str, object]) -> str:
    return f'''<div><p class="eyebrow">{item["label"]}</p><h2>{item["overview_title"]}</h2></div>
      <p class="skill-summary">{item["summary"]}</p>
      <div class="skill-overview-grid"><div class="panel"><h3>언제 사용?</h3><p>{item["when"]}</p><div class="skill-tags"><span>사용 시점</span><span>입력 확인</span><span>사람 승인</span></div></div><div class="panel"><h3>필요한 입력</h3><p>{item["inputs"]}</p></div><div class="panel"><h3>기대 출력</h3><p>{item["outputs"]}</p></div></div>
      <div class="skill-example"><div class="panel"><h3>좋은 요청 예시</h3><p class="code">{item["example"]}</p></div><div class="panel"><h3>사람이 결정할 것</h3><p>{item["human"]}</p></div></div>'''


def list_html(items: list[str], css_class: str) -> str:
    return f'<ul class="{css_class}">' + ''.join(f'<li>{value}</li>' for value in items) + '</ul>'


def detail_html(item: dict[str, object]) -> str:
    steps = list_html(item["steps"], "skill-steps")
    checks = list_html(item["checks"], "skill-check-list")
    failures = list_html(item["failures"], "skill-fail-list")
    return f'''<div><p class="eyebrow">{item["label"]} · 실전</p><h2>{item["detail_title"]}</h2></div>
      <div class="skill-detail-grid"><div class="panel"><span class="skill-label">WORKFLOW</span><h3>실행 순서</h3>{steps}</div><div class="panel"><span class="skill-label">COPYABLE PROMPT</span><h3>바로 쓸 프롬프트</h3><p class="code skill-prompt">{item["prompt"]}</p></div><div class="panel"><span class="skill-label">QUALITY GATE</span><h3>좋은 결과의 기준</h3>{checks}</div><div class="panel"><span class="skill-label">FAILURE PATTERNS</span><h3>흔한 실패와 교정</h3>{failures}</div></div>'''


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
            r'data-minutes="[^"]+"', 'data-minutes="2"', opening, count=1
        )
        if timing_count != 1:
            raise ValueError(f"could not update timing for slide {page}")
        return opening + inner + "\n    </section>"

    document, count = pattern.subn(replacement, document, count=1)
    if count != 1:
        raise ValueError(f"could not replace slide {page}")
    return document


def two_minute_note(body: object) -> str:
    return re.sub(r'^\[(?:약\s*)?1분\]', '[약 2분]', str(body))


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
        notes[overview_index]["body"] = two_minute_note(item["overview_note"])
        notes[detail_index]["title"] = item["detail_title"]
        notes[detail_index]["body"] = two_minute_note(item["detail_note"])
    serialized = json.dumps(notes, ensure_ascii=False, separators=(",", ":"))
    document = notes_pattern.sub(
        lambda found: found.group(1) + serialized + found.group(3), document, count=1
    )

    for item in SKILLS:
        for marker in (item["overview_title"], item["detail_title"], item["prompt"]):
            if str(marker) not in document:
                raise ValueError(f"missing enriched marker: {marker}")
    if document.count("skill-rich-slide") < 10:
        raise ValueError("expected ten enriched skill slides")

    skill_minutes = {
        int(page): float(minutes)
        for page, minutes in re.findall(
            r'<section\s+class="[^"]*\bskill-rich-slide\b[^"]*"\s+data-slide="(\d+)"\s+data-minutes="([0-9.]+)"',
            document,
        )
    }
    if len(skill_minutes) != 10 or any(value < 2 for value in skill_minutes.values()):
        raise ValueError(f"expected ten skill slides with at least two minutes each, got {skill_minutes}")
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
