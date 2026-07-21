# 2시간 교육 과정 개요

<div class="badge-row"><span>대상: Solution PE팀 Staff</span><span>시간: 120분</span><span>방식: 설명 + 시연 + 실습</span></div>

## 교육의 최종 목표

교육이 끝나면 참가자는 다음 흐름을 혼자 수행할 수 있어야 합니다.

<div class="flow"><div>1. GitHub 저장소 받기</div><div>2. VS Code에서 구조 파악</div><div>3. Claude Code로 분석·수정</div><div>4. 테스트·diff 검증</div><div>5. commit·push·PR</div></div>

단순히 명령어를 외우는 것이 아니라 **도구가 어떤 상태인지 확인하고, 변경을 검증한 뒤 다음 단계로 넘어가는 습관**을 만드는 과정입니다.

## 교육 대상과 전제

- 대상: **Solution PE팀 Staff**
- 개발 경험: 초급부터 중급까지 혼합
- Git 경험: 없어도 참여 가능
- 실습 언어: 작은 Node.js 예제 프로젝트
- 실습 데이터: 공개 예제만 사용

::: warning 공개 교육 자료 원칙
회사 코드, 로그, 문서, 비공개 URL, 계정 정보, 고객 정보는 실습에 사용하지 않습니다. 실제 업무 적용은 조직의 AI·보안 정책을 먼저 확인합니다.
:::

## 120분 시간표

| 시간 | 구간 | 참가자가 가져갈 것 | 진행 방식 |
|---:|---|---|---|
| 0~5분 | 오프닝 | 오늘 만들 결과와 전체 흐름 | 발표 |
| 5~20분 | VS Code 기본 | 폴더·탐색기·터미널·Source Control·diff | 시연 + 따라 하기 |
| 20~35분 | Git·GitHub 기본 | clone·branch·commit·push·PR의 관계 | 설명 + 짧은 실습 |
| 35~50분 | Claude Code 개념 | 에이전트 루프와 권한, 사람의 책임 | 설명 + 질문 |
| 50~65분 | 핵심 기능 | Plan Mode·CLAUDE.md·Skills·확장 기능의 쓰임 | 기능 시연 |
| 65~75분 | 휴식 | 실습 환경 점검 | 휴식 |
| 75~90분 | 통합 시연 | clone부터 테스트·diff·commit까지 전체 흐름 | 강사 라이브 데모 |
| 90~110분 | 참가자 실습 | 버그 분석·수정·검증 | 개별 또는 2인 실습 |
| 110~115분 | 보안·팀 적용 | 허용 범위와 도입 순서 | 토론 |
| 115~120분 | 정리·Q&A | 기억해야 할 5가지 원칙 | 요약 |

## 내용의 깊이 구분

### 반드시 직접 해본다 — Core

- VS Code에서 폴더와 터미널 열기
- Source Control에서 수정 파일과 diff 확인
- GitHub 저장소 clone 또는 fork
- branch 생성, commit, push
- Claude Code로 구조 분석, 계획, 수정, 테스트
- 변경 후 diff 검토

### 개념과 짧은 시연까지 — Working knowledge

- Plan Mode와 권한 모드
- `CLAUDE.md`
- 좋은 요청의 구조
- Skills와 Subagents의 쓰임

### 존재와 도입 시점만 소개 — Awareness

- MCP
- Hooks
- 플러그인과 고급 자동화
- CI/CD 연동

2시간 안에 고급 기능 설정까지 실습하면 핵심 흐름을 놓치기 쉽습니다. 고급 기능은 **무엇을 해결하며 언제 도입하는지**까지만 다룹니다.

## 참가자 완료 기준

교육 종료 시 다음 항목 중 8개 이상을 완료하면 성공입니다.

<ul class="checklist">
<li>교육 저장소를 로컬에 받았다.</li>
<li>VS Code로 저장소 폴더를 열었다.</li>
<li>통합 터미널에서 명령을 실행했다.</li>
<li>실습용 branch를 만들었다.</li>
<li>기존 테스트 실패를 재현했다.</li>
<li>Claude Code에 수정 전 분석을 요청했다.</li>
<li>최소 범위의 코드 수정을 수행했다.</li>
<li>전체 테스트를 실행했다.</li>
<li>VS Code diff에서 변경을 검토했다.</li>
<li>commit을 생성했다.</li>
<li>가능한 환경에서는 push와 Pull Request까지 완료했다.</li>
</ul>

## 교육 전 준비

교육 당일 설치 문제로 시간을 쓰지 않도록 최소 하루 전에 [환경 준비](./01-environment.md)를 완료합니다.

필수 확인:

```bash
git --version
node --version
npm --version
claude --version
```

## 강의 중 반복할 표준 문장

> 먼저 관련 파일과 테스트를 확인해줘. 아직 수정하지 마.

> 근본 원인과 최소 수정 계획을 먼저 제시해줘.

> 관련 없는 리팩터링은 하지 말고 테스트로 검증해줘.

> 마지막으로 git diff를 리뷰하고 남은 위험을 알려줘.

## 다음 순서

1. [환경 준비](./01-environment.md)
2. [VS Code 기본](./02-vscode-basics.md)
3. [Git·GitHub 기본](./03-git-github-basics.md)
4. [Claude Code 개념](./01-concept.md)
5. [통합 시연](./09-integrated-demo.md)
6. [실습](./05-lab.md)
