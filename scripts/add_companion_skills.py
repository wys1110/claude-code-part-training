#!/usr/bin/env python3
"""Add Caveman and Ponytail as optional companion skills without changing slide count."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


TARGET_SLIDE = 26

COMPANION_CSS = r"""
    .companion-skills-slide{grid-template-columns:1fr;align-content:start;gap:10px;padding:28px 34px 48px;overflow-y:auto}.companion-skills-slide h2{font-size:clamp(27px,2.8vw,41px);line-height:1.08;margin-bottom:0}.companion-lead{max-width:1180px;color:var(--terminal-muted);font-size:13px;line-height:1.45}.companion-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.companion-card{display:grid;align-content:start;gap:7px;padding:12px 14px;min-width:0}.companion-card h3{margin:0;color:var(--neon-cyan);font-size:15px}.companion-card p{font-size:11.5px;line-height:1.4}.companion-label{display:inline-block;color:var(--neon-green);font:700 9px var(--mono);letter-spacing:.08em}.companion-command{border-top:1px solid rgba(68,217,255,.18);padding-top:7px;color:var(--terminal-ink);font:600 10px/1.5 var(--mono);white-space:pre-wrap;overflow-wrap:anywhere}.companion-rule{border-left:3px solid var(--neon-green);background:rgba(7,26,20,.92);padding:10px 13px}.companion-rule p{font-size:12px;line-height:1.42}.companion-sources{font-size:9.5px;line-height:1.4;color:var(--terminal-muted)}.companion-sources a{color:var(--neon-cyan);text-decoration:none}.companion-sources a:hover{text-decoration:underline}
    @media(max-width:1000px){.companion-grid{grid-template-columns:1fr}.companion-skills-slide{padding:38px 24px 58px}}
    @media(max-width:760px){.companion-skills-slide{gap:8px;padding:52px 16px 82px}.companion-lead{font-size:12px}.companion-card{padding:10px 11px}.companion-card p,.companion-rule p{font-size:11.2px}.companion-command{font-size:9.5px}.companion-sources{font-size:9px}}
"""

COMPANION_HTML = r'''
      <div><p class="eyebrow">OPTIONAL COMPANION SKILLS</p><h2>Caveman과 Ponytail은 <span class="accent">말과 구현</span>을 각각 줄인다</h2></div>
      <p class="companion-lead">기본 다섯 스킬은 요구사항·계획·디자인·디버깅·검증을 담당합니다. Caveman과 Ponytail은 그 결과를 더 짧고 작게 만드는 선택형 보조 스킬입니다.</p>
      <div class="companion-grid">
        <div class="panel companion-card">
          <span class="companion-label">CORE 5 · 기본 절차</span>
          <h3>먼저 정확한 작업 흐름을 만든다</h3>
          <p>brainstorming → writing-plans → frontend-design → systematic-debugging → verification-before-completion 순서로 목적, 경계, 실행, 원인, 증거를 고정합니다.</p>
          <div class="companion-command">/plugin install superpowers@claude-plugins-official<br>/plugin marketplace add anthropics/skills<br>/plugin install example-skills@anthropic-agent-skills</div>
        </div>
        <div class="panel companion-card">
          <span class="companion-label">CAVEMAN · 응답 압축</span>
          <h3>기술 정확성은 유지하고 군더더기만 뺀다</h3>
          <p>긴 서론, 반복, 과도한 연결어를 줄여 핵심 판단과 조치가 빨리 보이게 합니다. 위험하거나 복잡한 내용은 명확성을 위해 필요한 설명을 남깁니다.</p>
          <div class="companion-command">claude plugin marketplace add JuliusBrussee/caveman<br>claude plugin install caveman@caveman</div>
        </div>
        <div class="panel companion-card">
          <span class="companion-label">PONYTAIL · 구현 최소화</span>
          <h3>YAGNI 순서로 가장 작은 구현을 고른다</h3>
          <p>안 해도 되는지 → 기존 코드로 되는지 → 표준 기능으로 되는지 → 설치된 의존성으로 되는지 확인한 뒤, 필요한 최소 코드만 작성합니다.</p>
          <div class="companion-command">/plugin marketplace add DietrichGebert/ponytail<br>/plugin install ponytail@ponytail<br>/reload-plugins</div>
        </div>
      </div>
      <div class="companion-rule"><p><strong>구분:</strong> Caveman은 <strong>짧게 말하기</strong>, Ponytail은 <strong>덜 만들기</strong>입니다. 보안·검증·접근성·오류 처리는 줄이지 않습니다.</p></div>
      <p class="companion-sources">공식 저장소: <a href="https://github.com/JuliusBrussee/caveman" target="_blank" rel="noopener">JuliusBrussee/caveman</a> · <a href="https://github.com/DietrichGebert/ponytail" target="_blank" rel="noopener">DietrichGebert/ponytail</a> · 2026-07-31 확인</p>'''

COMPANION_TITLE = "Caveman과 Ponytail은 말과 구현을 각각 줄인다"
COMPANION_DATA_NOTES = "[약 3분] Caveman은 응답을 압축하고 Ponytail은 불필요한 구현을 줄입니다. 기본 다섯 스킬과의 역할 차이와 설치 방법을 설명합니다."
COMPANION_NOTE = """[약 3분]\n\n먼저 기본 다섯 스킬과 보조 스킬의 역할을 분리합니다. brainstorming, writing-plans, frontend-design, systematic-debugging, verification-before-completion은 작업의 정확한 흐름과 승인 경계를 만듭니다. Caveman과 Ponytail은 이 흐름을 대체하지 않고 결과를 더 간결하게 만드는 선택형 확장입니다.\n\nCaveman은 응답의 군더더기, 반복, 긴 서론을 줄여 핵심 판단과 조치가 빨리 보이게 합니다. 다만 위험하거나 복잡한 내용까지 생략하는 도구가 아니므로 정확성과 명확성이 먼저입니다. Ponytail은 YAGNI, 기존 코드, 표준 기능, 설치된 의존성, 최소 구현 순서로 불필요한 코드와 추상화를 줄입니다. 보안, 검증, 접근성, 오류 처리는 최소화 대상이 아닙니다.\n\n마지막으로 설치 명령을 읽고 두 스킬의 차이를 한 문장으로 정리합니다. Caveman은 짧게 말하기, Ponytail은 덜 만들기입니다."""


def slide_ids(document: str) -> list[int]:
    return [
        int(value)
        for value in re.findall(
            r'<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"',
            document,
        )
    ]


def replace_companion_slide(document: str) -> str:
    pattern = re.compile(
        rf'(<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="{TARGET_SLIDE}"[^>]*>).*?</section>',
        re.DOTALL,
    )

    def replacement(match: re.Match[str]) -> str:
        opening = match.group(1)
        if "companion-skills-slide" not in opening:
            opening = opening.replace('class="', 'class="companion-skills-slide ', 1)
        opening, timing_count = re.subn(
            r'data-minutes="[^"]+"', 'data-minutes="3"', opening, count=1
        )
        if timing_count != 1:
            raise ValueError("could not update companion slide timing")
        opening, notes_count = re.subn(
            r'data-notes="[^"]*"',
            f'data-notes="{COMPANION_DATA_NOTES}"',
            opening,
            count=1,
        )
        if notes_count != 1:
            raise ValueError("could not update companion slide notes")
        return opening + COMPANION_HTML + "\n    </section>"

    document, count = pattern.subn(replacement, document, count=1)
    if count != 1:
        raise ValueError(f"could not replace slide {TARGET_SLIDE}")
    return document


def rebuild_notes(document: str) -> str:
    pattern = re.compile(
        r'(<script type="application/json" id="speaker-notes-data">)(.*?)(</script>)',
        re.DOTALL,
    )
    match = pattern.search(document)
    if not match:
        raise ValueError("speaker notes data not found")
    notes = json.loads(match.group(2))
    if [note.get("slide") for note in notes] != list(range(1, 80)):
        raise ValueError("expected speaker notes aligned to slides 1..79")
    notes[TARGET_SLIDE - 1]["title"] = COMPANION_TITLE
    notes[TARGET_SLIDE - 1]["body"] = COMPANION_NOTE
    serialized = json.dumps(notes, ensure_ascii=False, separators=(",", ":"))
    return pattern.sub(
        lambda found: found.group(1) + serialized + found.group(3),
        document,
        count=1,
    )


def add_companion_skills(source: str) -> str:
    if slide_ids(source) != list(range(1, 80)):
        raise ValueError("expected input slides 1..79")
    if "JuliusBrussee/caveman" in source or "DietrichGebert/ponytail" in source:
        raise ValueError("companion skills already exist")

    document, css_count = re.subn(
        r"\n  </style>", COMPANION_CSS + "\n  </style>", source, count=1
    )
    if css_count != 1:
        raise ValueError("could not insert companion skill styles")

    document = replace_companion_slide(document)
    document = rebuild_notes(document)

    if slide_ids(document) != list(range(1, 80)):
        raise ValueError("companion insertion changed slide numbering")
    for marker in (
        COMPANION_TITLE,
        "CAVEMAN · 응답 압축",
        "PONYTAIL · 구현 최소화",
        "JuliusBrussee/caveman",
        "DietrichGebert/ponytail",
        "보안·검증·접근성·오류 처리",
    ):
        if marker not in document:
            raise ValueError(f"missing companion marker: {marker}")
    return document


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: add_companion_skills.py SOURCE_HTML OUTPUT_HTML")
    source_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        add_companion_skills(source_path.read_text(encoding="utf-8")),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
