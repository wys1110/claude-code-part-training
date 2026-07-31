#!/usr/bin/env python3
"""Refocus the workshop skill section on brainstorming, Caveman, and Ponytail."""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path


SECTION_START = 13
SECTION_END = 26

CSS = r"""
    .three-skill-slide{grid-template-columns:1fr;align-content:start;gap:10px;padding:28px 34px 48px;overflow-y:auto}.three-skill-slide h2{font-size:clamp(27px,2.8vw,41px);line-height:1.08;margin-bottom:0}.three-skill-lead{max-width:1180px;color:var(--terminal-muted);font-size:13px;line-height:1.45}.three-skill-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.three-skill-grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}.three-skill-card{display:grid;align-content:start;gap:7px;padding:12px 14px;min-width:0}.three-skill-card h3{margin:0;color:var(--neon-cyan);font-size:15px}.three-skill-card p,.three-skill-card li{font-size:11.5px;line-height:1.42}.three-skill-label{display:inline-block;color:var(--neon-green);font:700 9px var(--mono);letter-spacing:.08em}.three-skill-command{border-top:1px solid rgba(68,217,255,.18);padding-top:7px;color:var(--terminal-ink);font:600 10px/1.55 var(--mono);white-space:pre-wrap;overflow-wrap:anywhere}.three-skill-list{display:grid;gap:5px;margin:0;padding-left:18px}.three-skill-flow{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:stretch}.three-skill-arrow{align-self:center;color:var(--neon-green);font:700 20px var(--mono)}.three-skill-rule{border-left:3px solid var(--neon-green);background:rgba(7,26,20,.92);padding:10px 13px}.three-skill-rule p{font-size:12px;line-height:1.42}.three-skill-sources{font-size:9.5px;line-height:1.4;color:var(--terminal-muted)}.three-skill-sources a{color:var(--neon-cyan);text-decoration:none}.three-skill-sources a:hover{text-decoration:underline}
    @media(max-width:1000px){.three-skill-grid,.three-skill-grid.two{grid-template-columns:1fr}.three-skill-slide{padding:38px 24px 58px}.three-skill-flow{grid-template-columns:1fr}.three-skill-arrow{justify-self:center;transform:rotate(90deg)}}
    @media(max-width:760px){.three-skill-slide{gap:8px;padding:52px 16px 82px}.three-skill-lead{font-size:12px}.three-skill-card{padding:10px 11px}.three-skill-card p,.three-skill-card li,.three-skill-rule p{font-size:11.2px}.three-skill-command{font-size:9.5px}.three-skill-sources{font-size:9px}}
"""


def card(label: str, title: str, body: str, extra: str = "") -> str:
    return (
        '<div class="panel three-skill-card">'
        f'<span class="three-skill-label">{label}</span>'
        f'<h3>{title}</h3><p>{body}</p>{extra}</div>'
    )


def page(title: str, eyebrow: str, lead: str, body: str, minutes: int, note: str) -> dict[str, object]:
    return {"title": title, "eyebrow": eyebrow, "lead": lead, "body": body, "minutes": minutes, "note": note}


PAGES = {
    13: page(
        "오늘 사용할 스킬은 세 개뿐이다", "CLAUDE CODE SKILLS · FOCUS",
        "목적을 맞추고, 답을 짧게 만들고, 구현을 작게 유지하는 세 가지 절차만 사용합니다.",
        '<div class="three-skill-grid">'
        + card("01 · BRAINSTORMING", "무엇을 만들지 먼저 맞춘다", "대상, 핵심 결과, 공개 금지 정보, 완료 기준을 질문으로 고정합니다.")
        + card("02 · CAVEMAN", "필요한 말만 남긴다", "기술 정확성을 유지하면서 긴 서론, 반복, 군더더기를 줄입니다.")
        + card("03 · PONYTAIL", "필요한 것만 만든다", "YAGNI 순서로 기존 코드와 표준 기능을 먼저 쓰고 최소 구현을 선택합니다.")
        + '</div><div class="three-skill-rule"><p><strong>핵심:</strong> 생각 정리 → 응답 압축 → 구현 최소화. 세 스킬은 서로 대체하지 않고 순서대로 보완합니다.</p></div>',
        2,
        "[약 2분]\n\n오늘 다룰 스킬을 brainstorming, Caveman, Ponytail 세 개로 한정한다고 안내합니다. brainstorming은 무엇을 만들지 합의하고, Caveman은 답변의 군더더기를 줄이며, Ponytail은 코드와 구조의 과잉을 줄입니다.\n\n세 스킬의 공통 목표는 더 많이 시키는 것이 아니라 판단과 결과를 선명하게 만드는 것입니다.",
    ),
    14: page(
        "세 스킬은 줄이는 대상이 서로 다르다", "ROLE SEPARATION",
        "brainstorming은 불확실성을, Caveman은 말의 양을, Ponytail은 구현의 양을 줄입니다.",
        '<div class="three-skill-grid">'
        + card("BRAINSTORMING", "불확실성 감소", "파일을 바꾸기 전에 질문합니다. 대상과 범위가 모호하면 제작을 시작하지 않습니다.")
        + card("CAVEMAN", "응답량 감소", "결론, 근거, 다음 행동은 남기고 반복 설명과 장황한 연결어를 제거합니다.")
        + card("PONYTAIL", "구현량 감소", "새 추상화보다 기존 코드, 표준 기능, 설치된 의존성을 먼저 확인합니다.")
        + '</div>', 2,
        "[약 2분]\n\n세 스킬이 무엇을 줄이는지 구분합니다. brainstorming은 요구사항의 불확실성을 줄이고, Caveman은 응답의 길이를 줄이며, Ponytail은 구현의 크기를 줄입니다.\n\n짧은 답과 작은 구현이 목적이지만 필요한 근거, 안전장치, 검증은 제거하지 않는다고 강조합니다.",
    ),
    15: page(
        "처음에는 이름을 직접 부르고 행동을 확인한다", "HOW TO USE",
        "스킬 이름보다 중요한 것은 실제로 질문하고, 압축하고, 최소 구현을 선택하는 행동입니다.",
        '<div class="three-skill-grid">'
        + card("STEP 1", "brainstorming을 먼저 호출", "파일 수정 전 질문과 합의가 나오는지 확인합니다.", '<div class="three-skill-command">brainstorming 스킬로 대상·범위·완료 기준부터 질문해줘.</div>')
        + card("STEP 2", "Caveman으로 결과 압축", "결론과 조치가 앞에 오고 반복이 사라지는지 확인합니다.", '<div class="three-skill-command">Caveman 방식으로 핵심 판단과 다음 행동만 남겨줘.</div>')
        + card("STEP 3", "Ponytail로 구현 최소화", "기존 기능 재사용과 최소 변경이 제안되는지 확인합니다.", '<div class="three-skill-command">Ponytail 방식으로 가장 작은 구현부터 검토해줘.</div>')
        + '</div>', 2,
        "[약 2분]\n\n처음에는 세 스킬의 이름을 직접 말하고 응답 행동을 관찰합니다. brainstorming에서는 질문과 합의, Caveman에서는 결론 우선과 반복 제거, Ponytail에서는 재사용과 최소 변경이 보여야 합니다.\n\n이름만 출력되고 행동이 달라지지 않으면 스킬이 제대로 적용된 것이 아닙니다.",
    ),
    16: page(
        "brainstorming은 만들기 전에 목적과 범위를 맞춘다", "01 · BRAINSTORMING · OVERVIEW",
        "구현 전에 질문을 통해 요구사항과 승인 경계를 합의하는 스킬입니다.",
        '<div class="three-skill-grid two">'
        + card("WHEN", "요청이 모호하거나 선택지가 많을 때", "새 페이지, 기능, 워크플로처럼 결과의 모습과 범위가 아직 정해지지 않았을 때 사용합니다.")
        + card("NOT FOR", "이미 범위가 확정된 단순 수정", "오탈자 한 글자 수정처럼 판단이 필요 없는 작업에는 긴 탐색을 강제하지 않습니다.")
        + card("INPUT", "목적과 제약", "누가 볼지, 무엇을 이해해야 할지, 공개하면 안 되는 정보, 시간과 파일 범위를 제공합니다.")
        + card("OUTPUT", "합의된 작업 정의", "대상, 핵심 내용, 제외 범위, 완료 기준이 짧은 문장으로 정리되어야 합니다.")
        + '</div>', 3,
        "[약 3분]\n\nbrainstorming은 아이디어를 무한히 늘리는 과정이 아니라 구현 전에 판단 기준을 고정하는 과정이라고 설명합니다. 요청이 모호하거나 선택지가 많을 때 사용하고, 범위가 이미 확정된 단순 수정에는 과도하게 사용하지 않습니다.\n\n출력은 화려한 아이디어 목록이 아니라 대상, 핵심 내용, 제외 범위, 완료 기준의 합의입니다.",
    ),
    17: page(
        "brainstorming은 네 질문으로 요구사항을 고정한다", "01 · BRAINSTORMING · PRACTICE",
        "아래 네 질문에 한 문장씩 답할 수 있으면 제작을 시작할 수 있습니다.",
        '<div class="three-skill-grid two">'
        + card("01 · 대상", "누가 이 결과를 보는가?", "비개발자 동료가 30초 안에 내 역할을 이해해야 합니다.")
        + card("02 · 핵심 결과", "무엇이 반드시 보여야 하는가?", "역할, 핵심 역량, 대표 업무 세 가지가 한 화면에 보여야 합니다.")
        + card("03 · 금지", "무엇을 넣지 않는가?", "고객명, 내부 수치, 사내 URL, 토큰, 비공개 화면은 제외합니다.")
        + card("04 · 완료 기준", "무엇을 확인하면 끝인가?", "데스크톱·모바일 화면, 링크, 변경 파일, 공개 URL을 직접 확인합니다.")
        + '</div><div class="three-skill-command">brainstorming 스킬을 사용해줘. 파일은 수정하지 말고 대상, 핵심 결과, 공개 금지 정보, 완료 기준을 한 번에 하나씩 질문해줘.</div>',
        3,
        "[약 3분]\n\n대상, 핵심 결과, 금지, 완료 기준의 네 질문을 차례로 읽습니다. 참가자가 자신의 포트폴리오를 기준으로 각 질문에 한 문장씩 답하게 합니다.\n\n답이 모호하면 파일을 만들기 전에 질문을 한 번 더 좁혀야 합니다. 네 답이 합의되면 다음 단계로 넘어갑니다.",
    ),
    18: page(
        "Caveman은 정확성을 유지하면서 답을 압축한다", "02 · CAVEMAN · OVERVIEW",
        "핵심 판단과 조치는 남기고 긴 서론, 반복, 과도한 연결어를 줄이는 응답 스타일 스킬입니다.",
        '<div class="three-skill-grid">'
        + card("KEEP", "반드시 남길 것", "결론, 중요한 근거, 위험, 다음 행동, 사용자가 결정해야 할 항목은 유지합니다.")
        + card("REMOVE", "우선 줄일 것", "인사말, 같은 뜻의 반복, 불필요한 배경, 결론 뒤의 재요약을 제거합니다.")
        + card("STOP", "줄이면 안 되는 것", "보안 경고, 검증 결과, 오류 원인, 법적·의학적 주의처럼 판단에 필요한 내용은 생략하지 않습니다.")
        + '</div>', 3,
        "[약 3분]\n\nCaveman은 무조건 짧게 답하는 스킬이 아니라 기술 정확성을 유지하며 정보 밀도를 높이는 스킬이라고 설명합니다. 결론과 중요한 근거, 위험, 다음 행동은 남기고 반복과 긴 서론을 줄입니다.\n\n안전이나 검증에 필요한 설명은 압축 대상이 아니라고 분명히 합니다.",
    ),
    19: page(
        "Caveman은 결론을 먼저 보여 준다", "02 · CAVEMAN · RESPONSE SHAPE",
        "읽는 사람이 첫 화면에서 판단과 다음 행동을 찾을 수 있게 순서를 바꿉니다.",
        '<div class="three-skill-flow">'
        + card("BEFORE", "장황한 응답", "배경 설명이 길고 같은 결론이 여러 번 반복되어 실제 조치가 마지막에 나타납니다.")
        + '<div class="three-skill-arrow">→</div>'
        + card("AFTER", "압축된 응답", "결론 한 줄 → 필요한 근거 → 다음 행동 순으로 보여 주고, 추가 세부사항은 필요한 경우에만 붙입니다.")
        + '</div><div class="three-skill-rule"><p><strong>권장 구조:</strong> 결론 → 근거 → 조치. 사용자의 질문이 단순할수록 더 짧게, 위험과 복잡도가 높을수록 필요한 설명을 남깁니다.</p></div>',
        3,
        "[약 3분]\n\n장황한 응답과 압축된 응답을 비교합니다. Caveman 방식에서는 결론이 먼저 나오고, 필요한 근거와 다음 행동이 뒤따릅니다.\n\n단순한 질문은 짧게 답하지만 위험하거나 복잡한 문제에서는 사용자의 판단에 필요한 설명을 충분히 남겨야 합니다.",
    ),
    20: page(
        "Caveman 요청은 짧지만 기준은 분명하다", "02 · CAVEMAN · PROMPT",
        "단순히 ‘짧게’가 아니라 무엇을 남기고 무엇을 줄일지 지정합니다.",
        '<div class="three-skill-grid two">'
        + card("COPYABLE PROMPT", "바로 쓸 요청", "Caveman 방식으로 답해줘. 결론과 다음 행동을 먼저 쓰고, 중요한 근거와 위험은 남기되 반복 설명과 긴 서론은 제거해줘.", '<div class="three-skill-command">Caveman 방식으로 답해줘.<br>결론과 다음 행동을 먼저 써줘.<br>중요한 근거와 위험은 남겨줘.<br>반복 설명과 긴 서론은 제거해줘.</div>')
        + card("QUALITY GATE", "좋은 결과의 기준", "첫 문단에서 결론이 보이고, 근거가 결론과 직접 연결되며, 다음 행동이 모호하지 않아야 합니다.", '<ul class="three-skill-list"><li>결론이 첫 화면에 보임</li><li>중요 근거와 위험이 유지됨</li><li>같은 말이 반복되지 않음</li><li>다음 행동이 명확함</li></ul>')
        + '</div>', 3,
        "[약 3분]\n\nCaveman을 요청할 때 단순히 짧게 답하라고만 하지 말고 결론과 다음 행동을 먼저 쓰고, 중요한 근거와 위험은 남기며, 반복과 긴 서론을 제거하라고 기준을 줍니다.\n\n결과를 평가할 때는 첫 화면의 결론, 근거의 직접성, 반복 여부, 다음 행동의 명확성을 확인합니다.",
    ),
    21: page(
        "Caveman은 정보가 아니라 군더더기를 버린다", "02 · CAVEMAN · SAFETY",
        "짧아진 답이 판단에 필요한 내용을 잃었다면 압축에 실패한 것입니다.",
        '<div class="three-skill-grid two">'
        + card("GOOD", "좋은 압축", "정확한 결론, 핵심 근거, 위험, 다음 행동이 유지되고 문장 수만 줄어듭니다.")
        + card("BAD", "나쁜 압축", "조건과 예외를 지워 결론이 과도하게 단정적이거나 사용자가 무엇을 해야 할지 알 수 없습니다.")
        + card("CHECK", "마지막 확인", "이 답만 보고 사용자가 안전하고 정확하게 다음 결정을 내릴 수 있는지 확인합니다.")
        + card("RULE", "복잡하면 길어져도 된다", "짧음보다 정확성과 명확성이 우선입니다. 필요한 설명은 남깁니다.")
        + '</div>', 2,
        "[약 2분]\n\nCaveman이 버리는 것은 정보가 아니라 군더더기라고 정리합니다. 조건과 예외를 지워 결론이 틀리거나 과도하게 단정적이 되면 압축에 실패한 것입니다.\n\n마지막 기준은 사용자가 이 답만 보고 안전하고 정확하게 다음 결정을 내릴 수 있는가입니다.",
    ),
    22: page(
        "Ponytail은 가장 작은 구현부터 검토한다", "03 · PONYTAIL · OVERVIEW",
        "기능을 추가하기 전에 정말 필요한지와 이미 있는 것으로 해결할 수 있는지를 먼저 확인합니다.",
        '<div class="three-skill-grid">'
        + card("YAGNI", "안 만들어도 되는가?", "현재 요구사항에 없는 미래 가능성을 위해 코드와 구조를 미리 만들지 않습니다.")
        + card("REUSE", "기존 코드로 되는가?", "프로젝트 안의 컴포넌트, 함수, 스타일, 유틸리티를 먼저 찾아 재사용합니다.")
        + card("STANDARD", "표준 기능으로 되는가?", "새 라이브러리나 자체 구현보다 브라우저와 언어의 표준 기능을 우선합니다.")
        + '</div>', 3,
        "[약 3분]\n\nPonytail은 구현을 시작하기 전에 정말 필요한 기능인지, 기존 코드로 해결할 수 있는지, 표준 기능으로 충분한지를 순서대로 확인하는 스킬입니다.\n\n미래의 가능성을 위해 추상화와 의존성을 미리 추가하지 않고 현재 요구사항을 만족하는 가장 작은 변경을 선택합니다.",
    ),
    23: page(
        "Ponytail은 최소 구현 사다리를 따른다", "03 · PONYTAIL · DECISION LADDER",
        "아래 단계에서 해결되면 더 복잡한 단계로 올라가지 않습니다.",
        '<div class="three-skill-grid two">'
        + card("01", "아무것도 하지 않아도 되는가?", "이미 요구사항을 충족하거나 사용하지 않는 기능이면 변경하지 않습니다.")
        + card("02", "기존 코드로 가능한가?", "프로젝트에 같은 역할의 함수나 컴포넌트가 있는지 찾습니다.")
        + card("03", "표준 기능으로 가능한가?", "HTML, CSS, JavaScript, 프레임워크의 기본 기능을 우선합니다.")
        + card("04", "설치된 의존성으로 가능한가?", "새 패키지를 추가하기 전에 이미 설치된 도구를 사용합니다.")
        + card("05", "최소 코드는 무엇인가?", "위 단계로 해결되지 않을 때만 요구사항을 만족하는 가장 작은 코드를 작성합니다.")
        + card("06", "지금 필요한 검증은 무엇인가?", "변경 범위에 맞는 테스트와 화면 확인만 추가하되 안전 기준은 생략하지 않습니다.")
        + '</div>', 3,
        "[약 3분]\n\nPonytail의 최소 구현 사다리를 위에서 아래로 읽습니다. 아무것도 하지 않아도 되는지, 기존 코드와 표준 기능, 설치된 의존성으로 가능한지 확인하고, 그래도 필요할 때만 최소 코드를 작성합니다.\n\n앞 단계에서 해결되면 더 복잡한 단계로 올라가지 않는 것이 핵심입니다.",
    ),
    24: page(
        "Ponytail 요청은 변경 범위와 금지사항을 고정한다", "03 · PONYTAIL · PROMPT",
        "‘간단하게’라는 표현보다 재사용 우선순위와 허용하지 않는 변경을 명시합니다.",
        '<div class="three-skill-grid two">'
        + card("COPYABLE PROMPT", "바로 쓸 요청", "Ponytail 방식으로 해결해줘. 변경하지 않아도 되는지 먼저 확인하고, 기존 코드와 표준 기능을 우선해. 새 의존성이나 추상화는 추가하지 말고 필요한 최소 변경만 제안해줘.", '<div class="three-skill-command">Ponytail 방식으로 해결해줘.<br>변경이 정말 필요한지 먼저 확인해줘.<br>기존 코드와 표준 기능을 우선해줘.<br>새 의존성·추상화 없이 최소 변경만 제안해줘.</div>')
        + card("HUMAN GATE", "사람이 확인할 것", "요청하지 않은 기능, 새 패키지, 공통화, 파일 이동이 포함되지 않았는지 확인합니다.", '<ul class="three-skill-list"><li>새 의존성 없음</li><li>불필요한 파일 생성 없음</li><li>기존 동작 유지</li><li>변경 이유와 검증 방법 명확</li></ul>')
        + '</div>', 3,
        "[약 3분]\n\nPonytail 요청에는 변경이 정말 필요한지 확인하고, 기존 코드와 표준 기능을 우선하며, 새 의존성과 추상화를 추가하지 말고 최소 변경만 제안하라는 기준을 넣습니다.\n\n사람은 요청하지 않은 기능, 패키지, 공통화, 파일 이동이 숨어 있지 않은지 승인 전에 확인합니다.",
    ),
    25: page(
        "Ponytail도 안전과 품질은 줄이지 않는다", "03 · PONYTAIL · SAFETY",
        "최소 구현은 대충 만드는 것이 아니라 요구사항을 만족하는 가장 작은 완전한 구현입니다.",
        '<div class="three-skill-grid two">'
        + card("KEEP", "반드시 유지", "보안, 접근성, 입력 검증, 오류 처리, 데이터 무결성, 핵심 테스트는 구현 크기와 무관하게 유지합니다.")
        + card("REMOVE", "우선 제거", "미사용 옵션, 미래용 확장점, 중복 추상화, 새 패키지, 요청하지 않은 설정을 제거합니다.")
        + card("GOOD", "좋은 최소 구현", "현재 요구사항을 충족하고 기존 동작을 보존하며 검증 방법이 분명합니다.")
        + card("BAD", "나쁜 최소 구현", "예외 처리를 생략하거나 접근성을 깨고 테스트 없이 동작한다고 가정합니다.")
        + '</div><div class="three-skill-rule"><p><strong>구분:</strong> Ponytail은 코드 양을 줄이지만 완성도 기준을 낮추지 않습니다.</p></div>',
        3,
        "[약 3분]\n\n최소 구현과 대충 만든 구현을 구분합니다. Ponytail은 보안, 접근성, 입력 검증, 오류 처리, 데이터 무결성, 핵심 테스트를 제거하지 않습니다.\n\n줄이는 대상은 미래용 확장점, 중복 추상화, 새 패키지, 요청하지 않은 설정입니다. 현재 요구사항을 완전하게 만족하는 가장 작은 구현이 목표입니다.",
    ),
    26: page(
        "brainstorming · Caveman · Ponytail만 설치한다", "THREE-SKILL SETUP",
        "요구사항을 정리하고, 응답을 압축하고, 구현을 최소화하는 세 스킬만 준비합니다.",
        '<div class="three-skill-grid">'
        + card("BRAINSTORMING", "Superpowers에서 사용", "구현 전 질문과 합의를 위한 스킬입니다.", '<div class="three-skill-command">/plugin install superpowers@claude-plugins-official</div>')
        + card("CAVEMAN", "응답 압축", "기술 정확성을 유지하면서 핵심만 남깁니다.", '<div class="three-skill-command">claude plugin marketplace add JuliusBrussee/caveman<br>claude plugin install caveman@caveman</div>')
        + card("PONYTAIL", "구현 최소화", "YAGNI와 재사용 우선순위로 가장 작은 구현을 고릅니다.", '<div class="three-skill-command">/plugin marketplace add DietrichGebert/ponytail<br>/plugin install ponytail@ponytail<br>/reload-plugins</div>')
        + '</div><div class="three-skill-rule"><p><strong>한 문장 정리:</strong> brainstorming은 무엇을 만들지 맞추고, Caveman은 짧게 말하며, Ponytail은 덜 만듭니다.</p></div><p class="three-skill-sources">공식 저장소: <a href="https://github.com/obra/superpowers" target="_blank" rel="noopener">obra/superpowers</a> · <a href="https://github.com/JuliusBrussee/caveman" target="_blank" rel="noopener">JuliusBrussee/caveman</a> · <a href="https://github.com/DietrichGebert/ponytail" target="_blank" rel="noopener">DietrichGebert/ponytail</a> · 2026-07-31 확인</p>',
        3,
        "[약 3분]\n\n마지막으로 세 스킬의 설치 명령과 역할을 정리합니다. brainstorming은 무엇을 만들지 합의하고, Caveman은 응답을 압축하며, Ponytail은 구현을 최소화합니다.\n\n세 스킬을 모두 사용하더라도 공개 금지 정보, 승인 경계, 보안, 접근성, 검증 책임은 사람이 유지해야 합니다.",
    ),
}

FORBIDDEN_SKILL_NAMES = ("writing-plans", "frontend-design", "systematic-debugging", "verification-before-completion")


def slide_ids(document: str) -> list[int]:
    return [int(value) for value in re.findall(r'<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"', document)]


def render_page(item: dict[str, object]) -> str:
    return f'<div><p class="eyebrow">{item["eyebrow"]}</p><h2>{item["title"]}</h2></div>\n      <p class="three-skill-lead">{item["lead"]}</p>\n      {item["body"]}'


def replace_slide(document: str, number: int, item: dict[str, object]) -> str:
    pattern = re.compile(rf'(<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="{number}"[^>]*>).*?</section>', re.DOTALL)

    def replacement(match: re.Match[str]) -> str:
        opening = match.group(1)
        classes = re.search(r'class="([^"]*)"', opening)
        if not classes:
            raise ValueError(f"missing class on slide {number}")
        class_list = [value for value in classes.group(1).split() if value not in {"skill-rich-slide", "companion-skills-slide", "skill-slide", "wide", "full"}]
        if "three-skill-slide" not in class_list:
            class_list.insert(0, "three-skill-slide")
        opening = opening[:classes.start(1)] + " ".join(class_list) + opening[classes.end(1):]
        opening, timing_count = re.subn(r'data-minutes="[^"]+"', f'data-minutes="{item["minutes"]}"', opening, count=1)
        if timing_count != 1:
            raise ValueError(f"could not update timing for slide {number}")
        summary = html.escape(str(item["note"]).split("\n", 1)[0], quote=True)
        opening, notes_count = re.subn(r'data-notes="[^"]*"', f'data-notes="{summary}"', opening, count=1)
        if notes_count != 1:
            raise ValueError(f"could not update data notes for slide {number}")
        return opening + render_page(item) + "\n    </section>"

    document, count = pattern.subn(replacement, document, count=1)
    if count != 1:
        raise ValueError(f"could not replace slide {number}")
    return document


def rebuild_notes(document: str) -> str:
    pattern = re.compile(r'(<script type="application/json" id="speaker-notes-data">)(.*?)(</script>)', re.DOTALL)
    match = pattern.search(document)
    if not match:
        raise ValueError("speaker notes data not found")
    notes = json.loads(match.group(2))
    if [note.get("slide") for note in notes] != list(range(1, 80)):
        raise ValueError("expected speaker notes aligned to slides 1..79")
    for number, item in PAGES.items():
        notes[number - 1]["title"] = item["title"]
        notes[number - 1]["body"] = item["note"]
    serialized = json.dumps(notes, ensure_ascii=False, separators=(",", ":"))
    return pattern.sub(lambda found: found.group(1) + serialized + found.group(3), document, count=1)


def refocus_skills(source: str) -> str:
    if slide_ids(source) != list(range(1, 80)):
        raise ValueError("expected input slides 1..79")
    document, css_count = re.subn(r"\n  </style>", CSS + "\n  </style>", source, count=1)
    if css_count != 1:
        raise ValueError("could not insert three-skill styles")
    document = document.replace("요구사항 · 계획 · 디자인 · 디버깅 · 검증", "요구사항 정리 · 응답 압축 · 최소 구현")
    for number, item in PAGES.items():
        document = replace_slide(document, number, item)
    document = rebuild_notes(document)
    replacements = {
        "기본 다섯 스킬": "세 스킬", "다섯 스킬": "세 스킬",
        "writing-plans": "단계별 계획", "frontend-design": "화면 설계",
        "systematic-debugging": "원인 분석", "verification-before-completion": "완료 검증",
    }
    for old, new in replacements.items():
        document = document.replace(old, new)
    if slide_ids(document) != list(range(1, 80)):
        raise ValueError("skill refocus changed slide numbering")
    for marker in (
        "오늘 사용할 스킬은 세 개뿐이다",
        "brainstorming은 네 질문으로 요구사항을 고정한다",
        "Caveman은 정확성을 유지하면서 답을 압축한다",
        "Ponytail은 최소 구현 사다리를 따른다",
        "brainstorming · Caveman · Ponytail만 설치한다",
        "JuliusBrussee/caveman", "DietrichGebert/ponytail",
        "보안, 접근성, 입력 검증, 오류 처리",
    ):
        if marker not in document:
            raise ValueError(f"missing three-skill marker: {marker}")
    for forbidden in FORBIDDEN_SKILL_NAMES:
        if forbidden in document:
            raise ValueError(f"removed skill still present: {forbidden}")
    three_skill_pages = [int(value) for value in re.findall(r'<section\s+class="[^"]*\bthree-skill-slide\b[^"]*"\s+data-slide="(\d+)"', document)]
    if three_skill_pages != list(range(SECTION_START, SECTION_END + 1)):
        raise ValueError(f"unexpected three-skill pages: {three_skill_pages}")
    return document


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: add_companion_skills.py SOURCE_HTML OUTPUT_HTML")
    source_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(refocus_skills(source_path.read_text(encoding="utf-8")), encoding="utf-8")


if __name__ == "__main__":
    main()
