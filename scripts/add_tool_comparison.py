#!/usr/bin/env python3
"""Insert a two-slide Claude Code vs Codex comparison into the public workshop."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


INSERT_AFTER = 27

COMPARISON_CSS = r"""
    .tool-comparison-slide{gap:14px;padding-block:38px;overflow-y:auto}.tool-comparison-slide h2{font-size:clamp(30px,3vw,46px);margin-bottom:0}.comparison-lead{max-width:1120px;color:var(--terminal-muted);font-size:16px;line-height:1.5}.comparison-table{width:100%;border-collapse:separate;border-spacing:0;border:1px solid rgba(68,217,255,.28);border-radius:6px;overflow:hidden;background:rgba(5,18,14,.88)}.comparison-table th,.comparison-table td{padding:11px 13px;border-right:1px solid rgba(68,217,255,.18);border-bottom:1px solid rgba(68,217,255,.16);vertical-align:top;text-align:left;font-size:12.5px;line-height:1.43}.comparison-table th:last-child,.comparison-table td:last-child{border-right:0}.comparison-table tr:last-child td{border-bottom:0}.comparison-table thead th{color:var(--neon-cyan);font:700 13px var(--mono);background:rgba(7,31,24,.96)}.comparison-table tbody th{width:16%;color:var(--neon-green);font:700 11px var(--mono);letter-spacing:.03em}.comparison-table td{width:42%}.comparison-badge{display:inline-block;margin-bottom:5px;border:1px solid rgba(92,255,149,.35);border-radius:999px;padding:3px 7px;color:var(--terminal-muted);font:700 9px var(--mono);letter-spacing:.06em}.choice-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.choice-card{display:grid;gap:7px;padding:14px 16px}.choice-card h3{font-size:16px;color:var(--neon-cyan);margin:0}.choice-card p{font-size:13px;line-height:1.45}.choice-card strong{color:var(--neon-green)}.comparison-rule{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:start;border-left:3px solid var(--neon-green);padding:13px 16px;background:rgba(7,26,20,.92)}.comparison-rule .rule-number{color:var(--neon-cyan);font:800 22px var(--mono)}.comparison-rule p{font-size:14px;line-height:1.5}.comparison-sources{font-size:10.5px;color:var(--terminal-muted);line-height:1.45}.comparison-sources a{color:var(--neon-cyan);text-decoration:none}.comparison-sources a:hover{text-decoration:underline}
    @media(max-width:900px){.comparison-table th,.comparison-table td{font-size:11.5px;padding:9px 10px}.choice-grid{grid-template-columns:1fr}.tool-comparison-slide{padding-block:48px}}
    @media(max-width:760px){.tool-comparison-slide{gap:9px;padding:52px 14px 82px}.comparison-lead{font-size:13px}.comparison-table{display:block;overflow-x:auto}.comparison-table th,.comparison-table td{min-width:150px;font-size:10.5px;padding:8px}.choice-card{padding:10px 11px}.choice-card h3{font-size:14px}.choice-card p,.comparison-rule p{font-size:11.5px}.comparison-rule{padding:10px 11px}.comparison-sources{font-size:9px}}
"""

CONTENTS_GRID = r'''<div class="contents-grid" aria-label="교육 목차">
        <button class="contents-item" type="button" onclick="goTo(2)" aria-label="3페이지 결과와 안전 원칙으로 이동"><span class="contents-range">03–12</span><strong>결과와 안전 원칙</strong><small>완료 증거 · 공개 경계 · 사람의 역할</small></button>
        <button class="contents-item" type="button" onclick="goTo(12)" aria-label="13페이지 Claude Code Skills로 이동"><span class="contents-range">13–27</span><strong>Claude Code Skills</strong><small>요구사항 · 계획 · 디자인 · 디버깅 · 검증</small></button>
        <button class="contents-item" type="button" onclick="goTo(27)" aria-label="28페이지 Claude Code와 Codex 비교로 이동"><span class="contents-range">28–29</span><strong>Claude Code vs Codex</strong><small>작업 방식 · 병렬성 · 선택 기준</small></button>
        <button class="contents-item" type="button" onclick="goTo(29)" aria-label="30페이지 좋은 요청과 Git 기본으로 이동"><span class="contents-range">30–39</span><strong>좋은 요청과 Git 기본</strong><small>프롬프트 구조 · 공개 분류 · Commit · Push</small></button>
        <button class="contents-item" type="button" onclick="goTo(39)" aria-label="40페이지 포트폴리오 제작 실습으로 이동"><span class="contents-range">40–71</span><strong>포트폴리오 제작 실습</strong><small>조사 · Plan · 제작 · 화면과 Diff 검토</small></button>
        <button class="contents-item" type="button" onclick="goTo(71)" aria-label="72페이지 GitHub Pages 배포로 이동"><span class="contents-range">72–79</span><strong>GitHub Pages 배포</strong><small>설정 · 공개 URL · 404와 사고 대응</small></button>
        <button class="contents-item" type="button" onclick="goTo(79)" aria-label="80페이지 다음 업무와 마무리로 이동"><span class="contents-range">80–81</span><strong>다음 업무와 마무리</strong><small>반복 적용 · 최종 원칙</small></button>
      </div>'''

COMPARISON_SLIDES = r'''
    <section class="slide wide tool-comparison-slide" data-slide="28" data-minutes="3" data-notes="[약 3분] Claude Code와 Codex의 공통점과 운영 방식 차이를 비교합니다.">
      <div><p class="eyebrow">TOOL COMPARISON · 01</p><h2>Claude Code vs Codex: 무엇이 다른가?</h2></div>
      <p class="comparison-lead">둘 다 저장소를 탐색하고 파일을 수정하며 명령과 테스트를 실행하는 코딩 에이전트입니다. 핵심 차이는 모델 점수가 아니라 <strong>어디에서 일하고, 어떻게 위임하며, 사람이 어느 지점에서 통제하는가</strong>입니다.</p>
      <table class="comparison-table" aria-label="Claude Code와 Codex 비교표">
        <thead><tr><th>관점</th><th>Claude Code</th><th>Codex</th></tr></thead>
        <tbody>
          <tr><th>중심 경험</th><td><span class="comparison-badge">TERMINAL-FIRST</span><br>개발자 터미널에서 대화하며 현재 저장소를 직접 탐색·수정하고 명령을 실행합니다. IDE와 CI에서도 연결할 수 있습니다.</td><td><span class="comparison-badge">MULTI-SURFACE</span><br>ChatGPT/Codex 앱, IDE, CLI에서 함께 작업하거나 클라우드 작업으로 위임할 수 있습니다.</td></tr>
          <tr><th>실행 방식</th><td>로컬 대화형 세션이 중심이며 <code>claude -p</code> 같은 비대화형 실행으로 스크립트와 CI를 자동화합니다.</td><td>로컬에서 함께 작업할 수도 있고, 저장소가 준비된 격리 클라우드 환경에 작업을 맡겨 결과를 검토·병합할 수 있습니다.</td></tr>
          <tr><th>병렬 작업</th><td>현재 터미널 흐름을 세밀하게 통제하는 데 유리하며, 추가 세션이나 자동화는 사용자가 구성합니다.</td><td>앱의 여러 에이전트와 내장 worktree를 이용해 서로 독립적인 작업을 프로젝트 간 병렬로 위임하는 흐름을 강조합니다.</td></tr>
          <tr><th>팀 규칙</th><td><code>CLAUDE.md</code>, 설정, 허용 도구를 통해 프로젝트 구조·코딩 규칙·자주 쓰는 명령을 공유합니다.</td><td>Skills와 Plugins를 통해 팀 표준, 반복 절차, 연결 앱을 패키지화해 여러 작업에 재사용합니다.</td></tr>
          <tr><th>강한 사용 장면</th><td>터미널 실습, 코드베이스 탐색, 한 단계씩 승인하는 수정, Git·CI 명령을 눈앞에서 배우는 교육.</td><td>여러 독립 과제의 동시 위임, 장시간 리팩터링·마이그레이션, 백그라운드 작업, 팀 단위 반복 워크플로.</td></tr>
        </tbody>
      </table>
      <p class="comparison-sources">공식 자료: <a href="https://docs.anthropic.com/en/docs/claude-code/overview" target="_blank" rel="noopener">Anthropic Claude Code Overview</a> · <a href="https://docs.anthropic.com/en/docs/claude-code/cli-usage" target="_blank" rel="noopener">Claude Code CLI</a> · <a href="https://openai.com/codex/" target="_blank" rel="noopener">OpenAI Codex</a></p>
    </section>
    <section class="slide wide tool-comparison-slide" data-slide="29" data-minutes="3" data-notes="[약 3분] 네 가지 실제 업무 상황을 기준으로 Claude Code와 Codex 선택법을 설명합니다.">
      <div><p class="eyebrow">TOOL COMPARISON · 02</p><h2>도구가 아니라 작업 방식으로 선택한다</h2></div>
      <p class="comparison-lead">한 도구가 항상 우월한 것이 아닙니다. 아래 질문에서 가장 중요한 제약을 먼저 고르면 선택이 단순해집니다.</p>
      <div class="choice-grid">
        <div class="panel choice-card"><h3>터미널에서 바로 배우고 수정한다</h3><p>명령, Diff, 테스트 결과를 한 단계씩 보면서 직접 승인해야 한다면 <strong>Claude Code</strong>가 자연스럽습니다. 이 교육의 기본 흐름도 여기에 해당합니다.</p></div>
        <div class="panel choice-card"><h3>독립 과제를 여러 개 동시에 맡긴다</h3><p>버그 수정, 테스트 추가, 문서 갱신처럼 충돌이 적은 작업을 병렬로 분리하려면 <strong>Codex</strong>의 멀티 에이전트·worktree·클라우드 위임이 잘 맞습니다.</p></div>
        <div class="panel choice-card"><h3>CI와 반복 자동화를 만든다</h3><p>둘 다 가능합니다. 현재 파이프라인에서 명령형 헤드리스 실행이 중요하면 <strong>Claude Code</strong>, 정기적인 백그라운드 작업과 팀 Skills가 중요하면 <strong>Codex</strong>를 우선 검토합니다.</p></div>
        <div class="panel choice-card"><h3>보안과 승인 경계를 먼저 정한다</h3><p>도구 이름보다 실행 위치, 네트워크, 허용 명령, 저장소 권한, 사람이 검토할 Diff와 PR 경계를 먼저 결정합니다. 이후 그 정책을 가장 쉽게 강제하는 도구를 선택합니다.</p></div>
      </div>
      <div class="comparison-rule"><span class="rule-number">01</span><p><strong>실무 선택 규칙:</strong> 즉시 상호작용과 세밀한 로컬 통제가 핵심이면 Claude Code, 독립 작업의 위임·병렬성·백그라운드 실행이 핵심이면 Codex. 혼합 프로젝트에서는 Claude Code로 문제를 좁히고 Codex로 분리 가능한 작업을 병렬화할 수도 있습니다.</p></div>
      <p class="comparison-sources">기능은 빠르게 바뀔 수 있으므로 교육·도입 시점에는 양사의 최신 공식 문서와 조직의 보안 정책을 다시 확인합니다.</p>
    </section>'''

COMPARISON_NOTES = [
    {
        "title": "Claude Code vs Codex: 무엇이 다른가?",
        "body": "[약 3분]\n\n먼저 공통점을 설명합니다. 두 도구 모두 저장소를 탐색하고 파일을 수정하며 명령과 테스트를 실행할 수 있습니다. 차이는 모델 성능을 단순 비교하는 것이 아니라 운영 방식입니다. Claude Code는 개발자의 현재 터미널에서 직접 상호작용하고 로컬 흐름을 세밀하게 통제하는 경험이 중심입니다. 비대화형 print 모드로 스크립트와 CI에도 연결할 수 있습니다. Codex는 CLI와 IDE에서도 함께 작업하지만, ChatGPT와 Codex 앱에서 여러 에이전트를 병렬로 운영하고 격리된 클라우드 환경에 작업을 위임하는 흐름을 강하게 지원합니다.\n\n팀 규칙도 비교합니다. Claude Code는 CLAUDE.md와 설정·도구 권한으로 프로젝트 지침을 공유합니다. Codex는 Skills와 Plugins로 팀의 반복 워크플로를 패키지화합니다. 결론은 우열이 아니라 현재 필요한 작업 방식에 맞춰 고르는 것입니다. 다음 장에서 실제 선택 상황을 봅니다.",
    },
    {
        "title": "도구가 아니라 작업 방식으로 선택한다",
        "body": "[약 3분]\n\n네 가지 상황을 읽습니다. 첫째, 터미널에서 명령과 Diff를 보며 한 단계씩 배우고 승인하는 교육에는 Claude Code가 자연스럽습니다. 둘째, 서로 독립적인 버그 수정·테스트·문서 작업을 동시에 맡기려면 Codex의 병렬 에이전트와 worktree가 유리합니다. 셋째, CI와 반복 자동화는 두 도구 모두 가능하므로 명령형 헤드리스 실행인지, 백그라운드 위임과 팀 Skills인지에 따라 선택합니다. 넷째, 보안은 도구 선택 뒤에 붙이는 항목이 아니라 실행 위치, 네트워크, 권한, Diff와 PR 승인 경계를 먼저 결정하는 문제입니다.\n\n마지막 규칙을 강조합니다. 즉시 상호작용과 세밀한 로컬 통제가 핵심이면 Claude Code, 독립 작업의 위임과 병렬성이 핵심이면 Codex입니다. 실제 조직에서는 두 도구를 역할별로 함께 사용할 수도 있습니다. 이제 좋은 요청과 Git 기본으로 넘어갑니다.",
    },
]


def section_ids(document: str) -> list[int]:
    return [
        int(value)
        for value in re.findall(
            r'<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"',
            document,
        )
    ]


def replace_contents(document: str) -> str:
    pattern = re.compile(
        r'<div class="contents-grid" aria-label="교육 목차">.*?</div>\s*(?=<p class="contents-tip">)',
        re.DOTALL,
    )
    document, count = pattern.subn(CONTENTS_GRID + "\n      ", document, count=1)
    if count != 1:
        raise ValueError("could not replace CONTENTS grid")
    return document.replace("여섯 구간", "일곱 구간")


def renumber_existing_slides(document: str) -> str:
    pattern = re.compile(
        r'(<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide=")(\d+)(")'
    )

    def replacement(match: re.Match[str]) -> str:
        slide_id = int(match.group(2))
        if slide_id > INSERT_AFTER:
            slide_id += 2
        return match.group(1) + str(slide_id) + match.group(3)

    return pattern.sub(replacement, document)


def insert_comparison_slides(document: str) -> str:
    pattern = re.compile(
        rf'(<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="{INSERT_AFTER}"[^>]*>.*?</section>)',
        re.DOTALL,
    )
    document, count = pattern.subn(
        lambda match: match.group(1) + "\n" + COMPARISON_SLIDES,
        document,
        count=1,
    )
    if count != 1:
        raise ValueError(f"could not insert comparison after slide {INSERT_AFTER}")
    return document


def rebuild_notes(document: str) -> str:
    pattern = re.compile(
        r'(<script type="application/json" id="speaker-notes-data">)(.*?)(</script>)',
        re.DOTALL,
    )
    match = pattern.search(document)
    if not match:
        raise ValueError("speaker notes data not found")
    source_notes = json.loads(match.group(2))
    if [note.get("slide") for note in source_notes] != list(range(1, 80)):
        raise ValueError("expected input speaker notes aligned to slides 1..79")

    output_notes: list[dict[str, object]] = []

    def append(title: str, body: str) -> None:
        output_notes.append({"slide": len(output_notes) + 1, "title": title, "body": body})

    for note in source_notes:
        append(str(note["title"]), str(note["body"]))
        if int(note["slide"]) == INSERT_AFTER:
            for comparison_note in COMPARISON_NOTES:
                append(str(comparison_note["title"]), str(comparison_note["body"]))

    serialized = json.dumps(output_notes, ensure_ascii=False, separators=(",", ":"))
    return pattern.sub(
        lambda found: found.group(1) + serialized + found.group(3),
        document,
        count=1,
    )


def add_comparison(source: str) -> str:
    if section_ids(source) != list(range(1, 80)):
        raise ValueError("expected input slides 1..79")
    if "Claude Code vs Codex: 무엇이 다른가?" in source:
        raise ValueError("comparison slides already exist")

    document, css_count = re.subn(
        r"\n  </style>", COMPARISON_CSS + "\n  </style>", source, count=1
    )
    if css_count != 1:
        raise ValueError("could not insert comparison styles")

    document = replace_contents(document)
    document = renumber_existing_slides(document)
    document = insert_comparison_slides(document)
    document = rebuild_notes(document)

    output_ids = section_ids(document)
    if output_ids != list(range(1, 82)):
        raise ValueError(f"expected output slides 1..81, got {output_ids}")
    for marker in (
        "Claude Code vs Codex: 무엇이 다른가?",
        "도구가 아니라 작업 방식으로 선택한다",
        "TERMINAL-FIRST",
        "MULTI-SURFACE",
        "28–29",
        "80–81",
    ):
        if marker not in document:
            raise ValueError(f"missing comparison marker: {marker}")
    return document


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: add_tool_comparison.py SOURCE_HTML OUTPUT_HTML")
    source_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        add_comparison(source_path.read_text(encoding="utf-8")), encoding="utf-8"
    )


if __name__ == "__main__":
    main()
