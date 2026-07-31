#!/usr/bin/env python3
"""Rebuild the workshop as a focused 42-slide, hands-on deck."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

SLIDES = [
    ("Introduction", "Claude Code Workshop", "빈 저장소에서 공개 URL까지"),
    ("Introduction", "오늘 만들 결과", "업무 포트폴리오와 공개 URL 하나"),
    ("Introduction", "오늘 배우는 것", "Claude Code · GitHub · GitHub Pages"),
    ("Introduction", "Claude Code란?", "파일을 읽고 수정하고 검증하는 AI 작업 에이전트"),
    ("Introduction", "오늘 흐름", "Idea → Prompt → Claude → GitHub → Website"),
    ("Claude Code", "좋은 Prompt", "목표 · 범위 · 제약 · 완료 기준을 함께 준다"),
    ("Claude Code", "나쁜 Prompt", "모호한 지시보다 검증 가능한 결과를 요청한다"),
    ("Claude Code", "Brainstorming", "질문으로 요구사항과 공개 경계를 먼저 고정한다"),
    ("Claude Code", "Brainstorming Demo", "대상 · 목적 · 공개 가능 정보 · 완료 기준 확인"),
    ("Claude Code", "Caveman", "정확성은 유지하고 설명과 구조를 압축한다"),
    ("Claude Code", "Ponytail", "최소 구현부터 시작해 한 단계씩 확장한다"),
    ("Claude Code", "Claude Code vs Codex", "로컬 작업 흐름과 병렬 작업 흐름의 차이"),
    ("Claude Code", "오늘 사용할 Prompt", "조사 → 계획 → 구현 → 검증을 한 요청에 담는다"),
    ("Demo", "빈 Repository", "아무것도 없는 상태에서 시작한다"),
    ("Demo", "Clone", "작업 폴더를 로컬로 가져온다"),
    ("Demo", "Claude 실행", "저장소 루트에서 Claude Code를 시작한다"),
    ("Demo", "Brainstorm", "공개 정보와 페이지 구성을 먼저 확정한다"),
    ("Demo", "구현", "index.html부터 최소 결과를 만든다"),
    ("Demo", "수정", "화면과 문구를 작은 단위로 다듬는다"),
    ("Demo", "Git", "변경 파일과 diff를 확인한 뒤 기록한다"),
    ("Demo", "완성", "브라우저와 모바일에서 결과를 확인한다"),
    ("Hands-on", "실습 시작", "지금부터 참가자가 직접 따라 한다"),
    ("Hands-on", "Repository 생성", "새 저장소를 만들고 이름을 확정한다"),
    ("Hands-on", "Clone", "저장소 주소를 복사해 로컬로 가져온다"),
    ("Hands-on", "Claude 실행", "작업 폴더에서 Claude Code를 시작한다"),
    ("Hands-on", "Prompt 입력", "목표와 완료 기준이 포함된 요청을 입력한다"),
    ("Hands-on", "생성", "최소 페이지를 만들고 브라우저로 연다"),
    ("Hands-on", "수정", "문구 · 구조 · 여백을 한 번에 하나씩 수정한다"),
    ("Hands-on", "확인", "화면 · 링크 · 공개 정보 · 모바일을 확인한다"),
    ("Hands-on", "Commit", "의미 있는 변경 단위로 기록한다"),
    ("Hands-on", "Push", "원격 저장소에 변경을 올린다"),
    ("Hands-on", "Pages", "GitHub Pages 배포를 활성화한다"),
    ("Hands-on", "공개 URL", "루트 공개 주소 하나를 확인한다"),
    ("Hands-on", "완성", "URL과 저장소를 동료에게 공유한다"),
    ("Tips", "자주 하는 실수", "목표 없이 시작 · 한 번에 과도한 수정 · 검증 생략"),
    ("Tips", "Claude가 틀릴 때", "오류 증거를 주고 수정 범위를 좁힌다"),
    ("Tips", "Git이 꼬일 때", "status와 diff로 현재 상태부터 복구한다"),
    ("Tips", "Pages가 안 될 때", "Actions · 배포 설정 · index.html만 확인한다"),
    ("Tips", "업무 적용 사례", "문서 · 대시보드 · 행사 페이지 · 반복 보고"),
    ("Closing", "오늘 배운 것", "세 스킬과 배포 흐름을 한 번에 복습한다"),
    ("Closing", "다음 단계", "MCP · Agent · Automation으로 확장한다"),
    ("Closing", "Q&A", "실제 업무에 어떻게 적용할지 질문한다"),
]

STYLE = """
<style>
*{box-sizing:border-box}html,body{width:100%;height:100%;margin:0;overflow:hidden;background:#050807;color:#eafff1;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}.progress{position:fixed;top:0;left:0;height:4px;background:#5cff95;z-index:10}.counter{position:fixed;right:28px;bottom:20px;color:#44d9ff;font:600 13px monospace;z-index:10}.hint{position:fixed;left:28px;bottom:20px;color:#8aa89a;font:13px monospace;z-index:10}.slide{position:absolute;inset:0;padding:72px;display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:center;opacity:0;pointer-events:none;background:radial-gradient(circle at top right,rgba(68,217,255,.08),transparent 35%),#050807}.slide.active{opacity:1;pointer-events:auto}.slide.full{grid-template-columns:1fr;text-align:center}.tag{display:inline-block;margin-bottom:18px;padding:6px 11px;border:1px solid rgba(92,255,149,.45);color:#5cff95;font:700 12px monospace;letter-spacing:.08em}.slide h1,.slide h2{margin:0 0 20px;font-family:monospace;letter-spacing:-.04em}.slide h1{font-size:clamp(46px,6vw,80px)}.slide h2{font-size:clamp(38px,4vw,62px)}.slide p{font-size:clamp(20px,2vw,30px);line-height:1.55;color:#9bb5aa}.accent{color:#5cff95}.panel{padding:26px;border:1px solid rgba(68,217,255,.28);background:rgba(6,19,15,.9)}.steps{display:grid;gap:14px;padding:0;list-style:none}.steps li{padding:15px 18px;border-left:4px solid #5cff95;background:rgba(6,19,15,.9);font-size:20px}.flow{font:700 clamp(24px,3vw,44px)/1.7 monospace;color:#44d9ff}.small{font-size:16px;color:#8aa89a}@media(max-width:760px){.slide{grid-template-columns:1fr;padding:70px 28px 92px}.hint{display:none}.slide h1{font-size:42px}.slide h2{font-size:34px}.slide p{font-size:19px}}
</style>
"""

SCRIPT = """
<script>
const slides=[...document.querySelectorAll('.slide')];let current=0;
function show(i){current=Math.max(0,Math.min(i,slides.length-1));slides.forEach((s,n)=>s.classList.toggle('active',n===current));document.getElementById('counter').textContent=`${current+1} / ${slides.length}`;document.getElementById('progress').style.width=`${((current+1)/slides.length)*100}%`;location.hash=`slide-${current+1}`}
function next(){show(current+1)}function prev(){show(current-1)}
document.addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' '].includes(e.key))next();if(['ArrowLeft','PageUp'].includes(e.key))prev();if(e.key.toLowerCase()==='f'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}})
let sx=0;document.addEventListener('touchstart',e=>sx=e.changedTouches[0].screenX,{passive:true});document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-sx;if(Math.abs(dx)>50)(dx<0?next():prev)()},{passive:true});
const target=Number(location.hash.replace('#slide-',''));show(Number.isFinite(target)&&target>0?target-1:0);
</script>
"""


def slide_html(index: int, section: str, title: str, subtitle: str) -> str:
    full = " full" if index in {1, 2, 5, 13, 14, 21, 22, 34, 39, 40, 41, 42} else ""
    body = f'<div><span class="tag">{section}</span><h2>{title}</h2><p>{subtitle}</p></div>'
    if index == 5:
        body = '<div><span class="tag">Introduction</span><h2>오늘 흐름</h2><div class="flow">Idea → Prompt → Claude → GitHub → Website</div></div>'
    elif index in {6, 8, 10, 11, 13, 17, 20, 29, 35, 36, 37, 38, 40}:
        items = {
            6:["목표를 한 문장으로 쓴다","수정할 범위를 정한다","제약과 공개 경계를 준다","완료 기준을 명시한다"],
            8:["대상은 누구인가","왜 필요한가","무엇을 공개해도 되는가","완료는 무엇으로 증명하는가"],
            10:["핵심 의미 유지","중복 문장 제거","한 화면에 한 메시지","검증 정보는 남긴다"],
            11:["index.html 먼저","브라우저 확인","필수 섹션 추가","스타일은 마지막"],
            13:["먼저 질문으로 요구사항을 확정해줘","계획을 제시하고 승인 전에는 구현하지 마","최소 페이지부터 구현해줘","화면과 diff를 확인하고 결과를 보고해줘"],
            17:["대상과 목적 확인","공개 가능 정보 분류","페이지 섹션 확정","완료 기준 합의"],
            20:["git status","git diff","의도한 파일만 포함","명확한 commit message"],
            29:["브라우저 화면","모든 링크","개인정보 노출","모바일 레이아웃"],
            35:["모호한 목표","한 번에 너무 많은 수정","실제 비밀정보 사용","검증 없이 완료 선언"],
            36:["오류 화면을 보여준다","재현 조건을 알려준다","수정 범위를 좁힌다","수정 후 다시 검증한다"],
            37:["status로 현재 상태 확인","diff로 변경 범위 확인","필요한 파일만 복구","모르면 새 commit 전 멈춤"],
            38:["Actions 실행 여부","Pages source 설정","루트 index.html 존재","배포 URL 재확인"],
            40:["Brainstorming으로 요구사항 확정","Caveman으로 메시지 압축","Ponytail로 최소 구현","GitHub Pages로 공개"],
        }[index]
        body = f'<div><span class="tag">{section}</span><h2>{title}</h2></div><div class="panel"><ul class="steps">' + ''.join(f'<li>{item}</li>' for item in items) + '</ul></div>'
    return f'<section class="slide{full}" data-slide="{index}" data-minutes="2" data-notes="[{index}] {title}: {subtitle}">{body}</section>'


def build() -> str:
    sections = '\n'.join(slide_html(i, *slide) for i, slide in enumerate(SLIDES, 1))
    notes = json.dumps([
        {"slide": i, "title": title, "notes": f"[{i}] {subtitle}"}
        for i, (_, title, subtitle) in enumerate(SLIDES, 1)
    ], ensure_ascii=False, separators=(",", ":"))
    return f'''<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Claude Code Workshop</title>{STYLE}</head><body><div class="progress" id="progress"></div><div class="counter" id="counter"></div><div class="hint">← → 이동 · F 전체화면</div><main id="deck">{sections}</main><script type="application/json" id="speaker-notes-data">{notes}</script>{SCRIPT}</body></html>'''


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("usage: refactor_42_slide_workshop.py OUTPUT_HTML")
    out = Path(sys.argv[1])
    out.parent.mkdir(parents=True, exist_ok=True)
    html = build()
    ids = [int(v) for v in re.findall(r'data-slide="(\d+)"', html)]
    if ids != list(range(1, 43)):
        raise ValueError(ids)
    out.write_text(html, encoding="utf-8")


if __name__ == "__main__":
    main()
