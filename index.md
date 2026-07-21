---
layout: home

hero:
  name: "Claude Code"
  text: "2시간 실무 교육"
  tagline: Solution PE팀 Staff를 대상으로 VS Code, GitHub, Claude Code를 연결해 분석부터 Pull Request까지 직접 수행합니다.
  image:
    src: /logo.svg
    alt: Claude Code Training
  actions:
    - theme: brand
      text: 🎤 발표 모드 시작
      link: /slides/
    - theme: alt
      text: 참가자용 교재
      link: /guide/00-course-overview
    - theme: alt
      text: 강사용 운영안
      link: /instructor/120min-runbook

features:
  - icon: 🎤
    title: 44장 발표 모드
    details: 키보드·클릭·모바일 스와이프, 진행률, 개요, 발표자 노트, 전체 화면, PDF 출력을 지원합니다.
  - icon: 🖥️
    title: VS Code·GitHub
    details: 폴더, 터미널, Source Control, diff, branch, commit, push, Pull Request를 직접 익힙니다.
  - icon: 🤖
    title: 최신 Claude Code
    details: 2026-07-21 공식 문서와 v2.1.216 릴리스를 기준으로 권한 모드, Memory, Skills와 확장 기능을 검증했습니다.
---

## 교육 대상

**Solution PE팀 Staff**

개발 경험이 서로 다른 참가자가 함께 들을 수 있도록 기본 도구부터 시작하며, 고급 기능은 도입 시점과 판단 기준 중심으로 설명합니다.

## 발표 모드 사용법

<div class="training-grid">
  <div class="training-card"><strong>이동</strong><p>← →, Space, Page Up/Down 또는 화면 좌우 클릭·모바일 스와이프</p></div>
  <div class="training-card"><strong>강사 도구</strong><p>O 개요 · N 발표자 노트 · F 전체 화면 · ? 단축키</p></div>
  <div class="training-card"><strong>배포·출력</strong><p>슬라이드별 URL 유지 · P 또는 PDF 버튼으로 인쇄·PDF 저장</p></div>
</div>

## 교육 목표

<div class="training-grid">
  <div class="training-card"><strong>도구를 연결한다</strong><p>VS Code, Git, GitHub, Claude Code의 역할과 상태를 구분합니다.</p></div>
  <div class="training-card"><strong>검증하며 작업한다</strong><p>분석·계획·수정·테스트·diff 순서로 결과를 닫습니다.</p></div>
  <div class="training-card"><strong>안전하게 공유한다</strong><p>branch, commit, push, Pull Request로 검토 가능한 변경을 만듭니다.</p></div>
</div>

## 120분 과정

| 시간 | 내용 | 방식 |
|---:|---|---|
| 0~5분 | 오프닝과 완료 목표 | 발표 |
| 5~20분 | VS Code 기본 | 시연 + 따라 하기 |
| 20~35분 | Git·GitHub 기본 | 설명 + 짧은 실습 |
| 35~50분 | Claude Code 개념과 에이전트 루프 | 설명 + 질문 |
| 50~65분 | 권한 모드·Plan·Memory·확장 기능 | 기능 시연 |
| 65~75분 | 휴식과 환경 점검 | 휴식 |
| 75~90분 | 저장소부터 Commit까지 통합 시연 | 라이브 데모 |
| 90~110분 | 버그 분석·수정·검증 실습 | 참가자 실습 |
| 110~115분 | 보안과 팀 적용 | 토론 |
| 115~120분 | 핵심 정리와 Q&A | 요약 |

## 교육 종료 후 할 수 있는 것

<ul class="checklist">
<li>GitHub 저장소를 Fork 또는 Clone한다.</li>
<li>VS Code에서 폴더·터미널·Source Control을 사용한다.</li>
<li>작업 branch를 생성하고 현재 상태를 확인한다.</li>
<li>Claude Code에 구조 분석과 수정 계획을 요청한다.</li>
<li>테스트와 diff를 직접 확인한다.</li>
<li>검토한 파일만 commit하고 가능한 경우 Pull Request를 만든다.</li>
</ul>

## 자료 구성

- [🎤 발표 모드](/slides/)
- [2시간 과정 개요](/guide/00-course-overview)
- [최신 기능 검증표](/guide/04-latest-feature-map)
- [교육 전 환경 준비](/guide/01-environment)
- [VS Code 기본](/guide/02-vscode-basics)
- [Git·GitHub 기본](/guide/03-git-github-basics)
- [통합 라이브 시연](/guide/09-integrated-demo)
- [참가자 실습](/guide/05-lab)
- [슬라이드별 발표자 노트](/instructor/slide-speaker-notes)
- [15분 라이브 데모 대본](/instructor/live-demo-script)
- [실습 정답과 힌트](/instructor/lab-answer-key)

::: warning 교육 전 확인
실제 회사 코드나 문서를 사용하기 전에 조직의 AI 사용 정책, 허용 계정, 데이터 처리 기준을 반드시 확인하세요. 교육 실습은 이 저장소의 공개 예제 코드만 사용합니다.
:::
