# 강사용 120분 운영안

<div class="badge-row"><span>대상: Solution PE팀 Staff</span><span>총 시간: 120분</span><span>Repository URL + Claude Code 자동화</span></div>

## 운영 원칙

1. 설명을 10분 이상 연속하지 않습니다.
2. 개념 뒤에는 화면 또는 참가자 행동을 연결합니다.
3. GitHub Pages 구간은 메뉴 암기가 아니라 **저장소 URL·완료 기준·검토 지점**을 가르칩니다.
4. 설치·로그인·조직 정책 문제는 장기 해결하지 않고 관찰 또는 수동 대안으로 전환합니다.
5. Claude Code의 답보다 **근거 파일·테스트·diff·실제 배포 상태**를 더 자주 보여줍니다.
6. 고급 기능은 설정 방법보다 도입 판단 기준을 설명합니다.

## 교육 전 강사 준비

- GitHub, VS Code, Claude Code 로그인 상태 확인
- GitHub CLI 설치 및 `gh auth status` 확인
- Pages 데모용 Public Repository 이름 준비
- Pages API 자동화 실패 시 사용할 Settings → Pages 수동 대안 확인
- `labs/task-board` baseline 테스트 결과 확인
- 코드 실습 branch 초기화
- 회사 자료가 브라우저·터미널·알림에 노출되지 않도록 정리
- [GitHub Pages 15분 시연 대본](./github-pages-demo-script.md)과 [Claude Code 라이브 데모 대본](./live-demo-script.md) 열기

---

## 0~5분 — 오프닝

### 화면

- 교육 제목
- 대상: Solution PE팀 Staff
- 오늘 완성할 두 가지 흐름

```text
A. Repository 생성 → URL 복사 → Claude Code → 발표자료 Pages
B. VS Code → Claude Code → Test → Diff → Commit
```

### 말할 핵심

> 오늘 목표는 기능을 많이 아는 것이 아닙니다. 저장소 주소와 완료 기준을 주고 Claude Code가 발표자료 사이트를 만드는 흐름, 그리고 코드 변경을 검증하는 흐름을 완주하는 것입니다.

### 질문

- GitHub에서 저장소를 만들어 본 사람?
- GitHub Pages를 활성화해 본 사람?
- Claude Code를 사용해 본 사람?

참가자 경험 공유는 2명, 각 20초 이내로 제한합니다.

---

## 5~20분 — VS Code 기본

### 5~8분: 화면 5영역

- Explorer
- Editor
- Terminal
- Source Control
- Claude Code

### 8~11분: 저장소 루트와 파일 찾기

```text
labs/task-board/src/task-board.js
labs/task-board/test/task-board.test.js
CLAUDE.md
```

참가자가 직접 세 파일을 찾게 합니다.

### 11~14분: 통합 터미널

```bash
pwd
git status
cd labs/task-board
npm test
```

Explorer 폴더와 터미널 경로가 자동으로 같다고 가정하지 않게 합니다.

### 14~18분: Source Control과 diff

- `M`, `U`, `A`, `D`
- 변경 파일 클릭
- 좌우 diff
- Stage와 Commit 위치

### 18~20분: 확인 질문

- 테스트가 통과해도 diff를 봐야 하는 이유는?
- 모든 변경을 한 번에 Stage하면 어떤 위험이 있는가?

참가자의 절반 이상이 Source Control 화면을 열었는지 확인합니다.

---

## 20~35분 — Repository URL로 발표자료 Pages 만들기

이 구간은 [GitHub 저장소 URL → 발표자료 Pages 15분 시연 대본](./github-pages-demo-script.md)을 기준으로 진행합니다.

### 20~22분: 사람과 Claude Code의 역할

```text
사람 = Repository 생성·URL 복사·변경/공개 승인
Claude Code = Clone·발표자료 생성·Commit·Push·Pages 활성화
```

핵심 문장:

> 자동화하더라도 공개 범위, 변경 파일, Push 대상과 최종 URL은 사람이 확인합니다.

### 22~24분: Public Repository 생성

```text
Repository: claude-code-presentation-<github-id>
Visibility: Public
Initialize: Add a README file
```

```text
+ → New repository → 이름 → Public → README → Create repository
```

Public 저장소에는 회사 코드, 업무 문서, 실제 로그, 고객·임직원 정보, 개인정보, 인증 정보를 넣지 않습니다.

### 24~26분: Repository URL 복사

```text
Code → HTTPS → Copy URL
```

- URL의 owner와 repository 이름 확인
- Repository URL만 복사
- 토큰과 비밀번호는 공유하지 않음

### 26~28분: Claude Code에 프롬프트 전달

```text
아래 GitHub 저장소를 발표자료 전용 GitHub Pages 사이트로 만들어줘.
저장소 주소: [REPOSITORY_URL]
발표자료 파일만 만들고, diff를 검토한 뒤 main에 commit·push해줘.
main의 / 폴더로 Pages를 활성화하고 공개 URL을 알려줘.
기존 파일 삭제와 force push는 하지 마.
```

참가자에게 다음 네 요소를 찾게 합니다.

- 대상 URL
- 최종 결과
- 금지사항
- 검증 방법

### 28~31분: Claude Code 계획과 Push 검토

예상 흐름:

```text
환경·권한 확인
→ Clone
→ index.html·styles.css·presentation.js 생성
→ 44장·120분 확인
→ git status·diff
→ Commit
→ Push
```

반드시 확인:

- 문서 홈 없이 발표자료가 바로 열리는가?
- 기존 파일을 삭제하지 않는가?
- 불필요한 프레임워크를 추가하지 않는가?
- `main`과 `origin`이 맞는가?

### 31~33분: Pages API 활성화

```bash
gh api repos/<owner>/<repo>/pages
```

Pages가 없으면:

```bash
gh api --method POST repos/<owner>/<repo>/pages \
  -f build_type=legacy \
  -f 'source[branch]=main' \
  -f 'source[path]=/'
```

- `gh` 로그인과 Pages 관리 권한 필요
- 404를 Pages 미생성·잘못된 주소·권한 부족으로 구분
- `status`, `html_url`, `source.branch`, `source.path` 확인

### 33~35분: 공개 URL 검증

```text
https://<github-id>.github.io/<repository-name>/
```

확인 항목:

- 발표 첫 장이 바로 보이는가?
- 방향키·Space로 이동하는가?
- `#slide=번호`가 유지되는가?
- 전체 화면·개요·노트·PDF 버튼이 있는가?
- 모바일에서 잘리지 않는가?

### 수동 대안

API 자동화가 막힌 경우에만 사용합니다.

```text
Settings → Pages → Deploy from a branch → main → / (root) → Save
```

### 시간 초과 방지

배포 대기가 길면 강사 성공 화면으로 상태 변화만 설명합니다. Public 경고, URL 복사, 프롬프트, Commit 전 diff, Push 대상, Pages source 확인은 생략하지 않습니다.

---

## 35~50분 — Claude Code 개념

### 35~38분: 한 문장 정의

> 코드베이스를 읽고, 파일을 수정하고, 명령을 실행하며, 결과를 검증하는 에이전트형 개발 도구입니다.

### 38~43분: 에이전트 루프

```text
이해 → 계획 → 실행 → 검증 → 리뷰
```

- 이해: “아직 수정하지 말고 구조를 설명해줘.”
- 계획: “최소 수정 계획과 영향 범위를 제시해줘.”
- 실행: “합의한 범위 안에서만 수정해줘.”
- 검증: “관련 테스트와 전체 테스트를 실행해줘.”
- 리뷰: “git diff와 남은 위험을 알려줘.”

### 43~47분: 권한과 책임

- Claude가 할 수 있는 것
- Claude에게 허용해도 되는 것
- 결과가 옳은지 판단하는 것

### 47~50분: 요청 비교

나쁜 요청:

```text
버그 고쳐줘.
```

좋은 요청:

```text
실패 테스트를 재현하고 근본 원인을 분석해줘.
아직 수정하지 말고 최소 수정 계획과 검증 방법을 먼저 보여줘.
```

---

## 50~65분 — 핵심 기능

### 50~54분: 권한 모드와 Plan Mode

- Manual/default와 Plan부터 시작
- 계획의 파일·범위·테스트 검토
- `bypassPermissions`는 일반 업무 편의 기능으로 소개하지 않음

### 54~58분: `CLAUDE.md`와 Auto memory

- `CLAUDE.md`: 사람이 작성하는 프로젝트 지침
- Auto memory: Claude가 기록하며 `/memory`로 감사·수정
- 강제 정책은 권한 규칙 또는 Hook 사용

### 58~61분: 좋은 요청의 네 요소

```text
범위 + 제약 + 완료 기준 + 검증
```

### 61~63분: Skills와 Subagents

- 같은 절차가 세 번 이상 반복되면 Skill 후보
- 큰 조사와 전문 관점 분리는 Subagent 후보

### 63~65분: MCP·Hooks·Plugins·Agent teams

- MCP: 외부 시스템 연결
- Hooks: 특정 이벤트에서 강제 자동화
- Plugins: Skills·Agents·Hooks·MCP 패키징
- Agent teams: 공식 문서상 Experimental

설정 실습은 하지 않습니다.

---

## 65~75분 — 휴식과 환경 점검

참가자 화면:

```text
1. 교육 저장소가 VS Code에 열렸는가?
2. practice/<github-id> branch인가?
3. labs/task-board에서 npm test가 실행되는가?
4. Claude Code 패널 또는 CLI가 열리는가?
5. Manual 또는 Plan 모드인가?
```

강사의 행동:

- 설치·로그인 문제 참가자를 관찰·짝 실습·Local-only 그룹으로 분리
- 데모 branch 초기화
- 반복 질문 기록
- 2분 전에 복귀 안내

---

## 75~90분 — Claude Code 통합 라이브 시연

[15분 라이브 데모 대본](./live-demo-script.md)을 그대로 따릅니다.

반드시 멈출 지점:

1. Branch 생성 후: “현재 branch는 무엇입니까?”
2. Plan 승인 전: “불필요한 변경이 포함됐습니까?”
3. 테스트 통과 후: “아직 무엇을 확인해야 합니까?”
4. Commit 전: “어떤 파일이 Stage됐습니까?”

Claude의 긴 설명은 읽지 않고 다음만 추출합니다.

- 근본 원인
- 수정 파일
- 테스트
- 위험

---

## 90~110분 — 참가자 코드 실습

### 90~93분: 목표와 완료 기준

```text
분석 → 계획 → 수정 → 테스트 → diff → commit
```

### 93~98분: 프로젝트 탐색·실패 재현

```text
프로젝트 목적과 주요 파일 역할을 설명해줘.
아직 수정하지 말고 테스트 실패를 재현한 뒤 원인을 정리해줘.
```

### 98~103분: 계획과 수정

```text
최소 수정 계획을 먼저 제시해줘.
확인된 원인만 수정하고 관련 없는 리팩터링은 하지 마.
```

### 103~107분: 검증과 diff

```bash
npm test
git diff
git status
```

### 107~110분: Commit

```bash
git add <확인한 파일>
git commit -m "Fix task validation and ID generation"
```

Push와 PR은 환경이 준비된 참가자만 진행하고, 나머지는 Commit에서 완료 처리합니다.

강사의 순회 질문:

- 지금 어느 branch인가요?
- 수정 전에 계획을 받았나요?
- 테스트 결과를 직접 확인했나요?
- diff에 관련 없는 파일이 있나요?

---

## 110~115분 — 보안과 Solution PE팀 적용

반드시 말할 것:

- Public Repository와 Pages는 공개될 수 있음
- 회사 코드·로그·문서·개인정보·인증 정보 업로드 금지
- 실제 업무 데이터는 정책 확인 전 Claude Code 입력 금지
- 쓰기·삭제·push·Pages 설정은 실행 전 대상 확인
- AI 결과는 테스트와 사람의 리뷰로 닫음

팀 도입 순서:

```text
개인 작은 작업
→ 공통 CLAUDE.md
→ 반복 Skill
→ 제한된 Hook·MCP
```

---

## 115~120분 — 정리와 Q&A

### 마지막 6문장

1. Public 저장소에는 공개 가능한 자료만 넣는다.
2. 대상 URL·완료 기준·금지사항·검증을 함께 준다.
3. 자동화해도 Commit 전 diff와 Push 대상을 확인한다.
4. Pages 설정이 아니라 공개 URL의 동작까지 검증한다.
5. 복잡한 코드 작업은 Plan과 테스트로 닫는다.
6. 권한·민감정보·최종 판단은 사람의 책임이다.
