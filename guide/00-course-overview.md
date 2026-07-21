# 2시간 교육 과정 개요

<div class="badge-row"><span>대상: Solution PE팀 Staff</span><span>시간: 120분</span><span>방식: 설명 + 자동화 실습 + 시연 + 코드 실습</span></div>

## 교육의 최종 목표

교육이 끝나면 참가자는 두 가지 흐름을 혼자 설명하고 재현할 수 있어야 합니다.

### 흐름 A — Repository URL로 발표자료 Pages 만들기

<div class="flow"><div>1. Public Repository 생성</div><div>2. URL 복사</div><div>3. Claude Code 요청</div><div>4. Diff·Push 승인</div><div>5. 발표 URL 검증</div></div>

### 흐름 B — VS Code와 Claude Code로 코드 변경 검증

<div class="flow"><div>1. 저장소·branch 확인</div><div>2. VS Code에서 구조 파악</div><div>3. Claude Code로 분석·수정</div><div>4. 테스트·diff 검증</div><div>5. commit·PR</div></div>

단순히 메뉴와 명령어를 외우는 것이 아니라 **대상, 완료 기준, 권한, 변경 상태와 실제 결과를 확인하는 습관**을 만드는 과정입니다.

## 교육 대상과 전제

- 대상: **Solution PE팀 Staff**
- 개발 경험: 초급부터 중급까지 혼합
- Git 경험: 없어도 참여 가능
- GitHub 계정: 웹 로그인 가능 상태
- GitHub CLI: Pages API 자동화를 위해 권장
- 실습 언어: 정적 HTML 발표자료 + 작은 Node.js 예제 프로젝트
- 실습 데이터: 공개 예제만 사용

::: danger 공개 교육 자료 원칙
GitHub Pages 실습 저장소는 Public입니다. 회사 코드, 업무 로그, 문서, 비공개 URL, 인증 정보, 고객·임직원 정보, 개인정보는 실습에 사용하지 않습니다.
:::

## 120분 시간표

| 시간 | 구간 | 참가자가 가져갈 것 | 진행 방식 |
|---:|---|---|---|
| 0~5분 | 오프닝 | 오늘 만들 두 가지 결과와 전체 흐름 | 발표 |
| 5~20분 | VS Code 기본 | 폴더·탐색기·터미널·Source Control·diff | 시연 + 따라 하기 |
| 20~35분 | GitHub 저장소·Pages | Repository URL을 Claude Code에 주고 발표 사이트 배포 | 자동화 실습 |
| 35~50분 | Claude Code 개념 | 에이전트 루프와 권한, 사람의 책임 | 설명 + 질문 |
| 50~65분 | 핵심 기능 | Plan Mode·CLAUDE.md·Memory·Skills·확장 기능 | 기능 시연 |
| 65~75분 | 휴식 | 코드 실습 환경 점검 | 휴식 |
| 75~90분 | 통합 시연 | branch부터 테스트·diff·commit까지 전체 흐름 | 강사 라이브 데모 |
| 90~110분 | 참가자 실습 | 버그 분석·수정·검증 | 개별 또는 2인 실습 |
| 110~115분 | 보안·팀 적용 | Public 범위와 Claude Code 허용 범위 | 토론 |
| 115~120분 | 정리·Q&A | 기억해야 할 핵심 원칙 | 요약 |

## GitHub Pages 실습 전략

<div class="training-grid">
  <div class="training-card"><strong>사람이 직접</strong><p>Public Repository를 만들고 HTTPS URL을 복사합니다. 변경 파일, Push 대상, 공개 설정과 결과를 승인합니다.</p></div>
  <div class="training-card"><strong>Claude Code가 수행</strong><p>Clone, 발표자료 정적 파일 생성, diff, Commit, Push, Pages REST API 호출과 상태 확인을 수행합니다.</p></div>
  <div class="training-card"><strong>완료 기준</strong><p>Pages 루트 주소에서 별도 문서 홈 없이 44장·120분 발표자료가 바로 실행됩니다.</p></div>
</div>

## 내용의 깊이 구분

### 반드시 직접 해본다 — Core

- VS Code에서 폴더와 터미널 열기
- Source Control에서 수정 파일과 diff 확인
- GitHub에서 Public 실습 Repository 생성
- Repository HTTPS URL 복사
- URL과 완료 기준을 Claude Code에 전달
- Claude Code의 계획·변경 파일·권한 요청 검토
- Commit 전 status와 diff 확인
- Push 전 branch와 remote 확인
- Pages의 branch·path·공개 URL 확인
- 발표 이동·노트·전체 화면·PDF 기능 검증
- 코드 실습용 branch 생성과 commit
- Claude Code로 구조 분석, 계획, 수정, 테스트

### 개념과 짧은 시연까지 — Working knowledge

- Git과 GitHub의 차이
- `gh api`와 Pages REST API
- Branch·Push·Pull Request
- GitHub Actions 기반 Pages 배포
- Plan Mode와 권한 모드
- `CLAUDE.md`와 Auto memory
- 좋은 요청의 구조
- Skills와 Subagents의 쓰임

### 존재와 도입 시점만 소개 — Awareness

- MCP
- Hooks
- 플러그인과 고급 자동화
- Agent teams
- CI/CD 확장

2시간 안에 모든 Git 기능과 고급 Claude Code 설정까지 실습하면 핵심 흐름을 놓치기 쉽습니다. 고급 기능은 **무엇을 해결하며 언제 도입하는지**까지만 다룹니다.

## 참가자 완료 기준

교육 종료 시 다음 항목 중 13개 이상을 완료하면 성공입니다.

<ul class="checklist">
<li>Public 실습 Repository를 만들었다.</li>
<li>README를 포함해 main 브랜치를 생성했다.</li>
<li>Repository HTTPS URL을 복사했다.</li>
<li>URL을 포함한 프롬프트를 Claude Code에 전달했다.</li>
<li>발표자료 전용 정적 파일이 생성됐다.</li>
<li>Commit 전에 status와 diff를 검토했다.</li>
<li>main 브랜치와 origin URL을 확인했다.</li>
<li>Commit과 Push가 성공했다.</li>
<li>Pages가 main의 / 폴더를 배포한다.</li>
<li>공개 URL에서 발표자료가 바로 실행됐다.</li>
<li>발표 이동·노트·전체 화면·PDF 기능을 확인했다.</li>
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
gh --version
gh auth status
```

추가 확인:

- GitHub 웹 로그인
- 개인 계정에서 Public Repository 생성 가능 여부
- 저장소 Push 및 Pages 관리 권한
- 조직 계정 대신 개인 실습 Owner 사용 여부

## 강의 중 반복할 표준 문장

GitHub Pages 구간:

> Repository URL과 최종 완료 기준이 정확한가?

> Commit 전에 실제 diff를 확인했는가?

> Push 대상 branch와 remote가 맞는가?

> Pages source와 발표 파일 위치가 일치하는가?

> 공개 URL에서 발표 기능이 실제로 동작하는가?

Claude Code 구간:

> 먼저 관련 파일과 테스트를 확인해줘. 아직 수정하지 마.

> 근본 원인과 최소 수정 계획을 먼저 제시해줘.

> 관련 없는 리팩터링은 하지 말고 테스트로 검증해줘.

> 마지막으로 git diff를 리뷰하고 남은 위험을 알려줘.

## 다음 순서

1. [환경 준비](./01-environment.md)
2. [VS Code 기본](./02-vscode-basics.md)
3. [Git·GitHub 기본](./03-git-github-basics.md)
4. [Repository URL로 발표자료 Pages 만들기](./04-github-repository-pages.md)
5. [Claude Code 개념](./01-concept.md)
6. [통합 시연](./09-integrated-demo.md)
7. [실습](./05-lab.md)
