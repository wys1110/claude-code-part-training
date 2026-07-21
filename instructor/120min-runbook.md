# 강사용 120분 운영안

<div class="badge-row"><span>대상: Solution PE팀 Staff</span><span>총 시간: 120분</span><span>핵심: 완결형 작업 흐름</span></div>

## 운영 원칙

1. 설명을 10분 이상 연속으로 하지 않습니다.
2. 개념 뒤에는 화면 또는 참가자 행동을 연결합니다.
3. 설치 문제는 교육 중 해결하지 않고 사전 점검 또는 B안으로 전환합니다.
4. Claude Code가 답한 내용보다 **근거 파일·테스트·diff**를 더 자주 보여줍니다.
5. 고급 기능은 설정 방법보다 도입 판단 기준을 설명합니다.

## 0~5분 — 오프닝

### 화면

- 교육 제목
- 대상: Solution PE팀 Staff
- 오늘 완성할 전체 흐름

### 말할 핵심

> 오늘 목표는 Claude Code 기능을 많이 아는 것이 아닙니다. GitHub 저장소를 VS Code로 받아 분석하고, 작은 수정을 검증하고, commit과 PR까지 연결하는 것입니다.

### 질문

- VS Code를 업무에서 사용해 본 사람?
- GitHub에서 clone 또는 PR을 해 본 사람?
- Claude Code를 사용해 본 사람?

손을 들게 하거나 간단한 응답을 받아 난이도를 즉시 조절합니다.

### 시간 초과 방지

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

참가자가 직접 찾게 합니다.

```text
labs/task-board/src/task-board.js
labs/task-board/test/task-board.test.js
CLAUDE.md
```

### 11~14분: 통합 터미널

```bash
pwd
git status
cd labs/task-board
npm test
```

### 14~18분: Source Control과 diff

- `M`, `U`, `A`, `D`
- 변경 파일 클릭
- Stage와 Commit 위치

### 18~20분: 확인 질문

- Explorer 폴더와 터미널 경로가 다르면 어떤 문제가 생기는가?
- 테스트가 통과해도 diff를 봐야 하는 이유는?

### 강사 체크

참가자의 절반 이상이 Source Control 화면을 열었는지 확인합니다.

---

## 20~35분 — Git·GitHub 기본

### 20~23분: Git과 GitHub 구분

칠판 또는 슬라이드에 다음만 표시합니다.

```text
Local Git ↔ Remote GitHub
```

### 23~26분: Fork와 Clone

- Fork: GitHub 계정에 복사
- Clone: PC에 복사

### 26~29분: Branch

```bash
git switch -c practice/<github-id>
git branch --show-current
```

모든 참가자가 branch를 만든 뒤 다음 단계로 넘어갑니다.

### 29~32분: Diff·Stage·Commit

```bash
git status
git diff
git add <file>
git commit -m "..."
```

### 32~35분: Push와 PR

- push의 대상 branch
- PR의 base와 compare
- PR 본문의 변경·검증·위험

### 절대 길게 설명하지 않을 것

- rebase 내부 원리
- merge 전략 비교
- detached HEAD
- 복잡한 충돌 해결

질문이 나오면 부록 주제로 넘깁니다.

---

## 35~50분 — Claude Code 개념

### 35~38분: 한 문장 정의

> 코드베이스를 읽고, 파일을 수정하고, 명령을 실행하며, 결과를 검증하는 에이전트형 개발 도구입니다.

### 38~43분: 에이전트 루프

```text
이해 → 계획 → 실행 → 검증 → 리뷰
```

각 단계마다 실습에서 사용할 한 문장을 연결합니다.

- 이해: “아직 수정하지 말고 구조를 설명해줘.”
- 계획: “최소 수정 계획과 영향 범위를 제시해줘.”
- 실행: “합의한 범위 안에서만 수정해줘.”
- 검증: “관련 테스트와 전체 테스트를 실행해줘.”
- 리뷰: “git diff와 남은 위험을 알려줘.”

### 43~47분: 권한과 책임

참가자에게 다음을 구분하게 합니다.

- Claude가 할 수 있는 것
- Claude에게 허용해도 되는 것
- 결과가 옳은지 판단하는 것

### 47~50분: 짧은 비교 시연

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

### 50~55분: Plan Mode

- 복잡한 변경 전 사용
- 계획의 파일·범위·테스트 검토
- 계획을 승인하는 행위의 의미

### 55~59분: CLAUDE.md

- 실제 명령
- 프로젝트 규칙
- 완료 기준
- 민감정보 금지

### 59~62분: Skills와 Subagents

- 반복 절차가 3회 이상이면 Skill 후보
- 큰 조사 또는 관점 분리는 Subagent 후보

### 62~65분: MCP와 Hooks

다음 한 문장씩만 남깁니다.

- MCP: 외부 시스템을 연결하지만 권한과 데이터 범위를 먼저 설계
- Hooks: Claude가 기억해야 하는 규칙이 아니라 반드시 강제할 자동화

설정 화면을 깊게 열지 않습니다.

---

## 65~75분 — 휴식과 환경 점검

### 참가자에게 표시할 화면

```text
1. practice/<github-id> branch인가?
2. labs/task-board에서 npm test가 실행되는가?
3. Claude Code 패널 또는 CLI가 열리는가?
```

### 강사의 행동

- 설치 문제 참가자를 B안 그룹으로 분리
- 네트워크·로그인 문제 확인
- 데모 branch 초기화
- 참가자 질문 중 반복되는 문제를 메모

---

## 75~90분 — 통합 라이브 시연

[통합 시연 문서](../guide/09-integrated-demo.md)를 그대로 따릅니다.

### 질문을 던질 지점

1. Plan 승인 전: “이 변경 범위는 적절한가?”
2. 테스트 통과 후: “아직 무엇을 확인해야 하는가?”
3. Stage 전: “어떤 파일만 commit해야 하는가?”
4. PR 전: “base와 compare가 맞는가?”

### 시연 시간 통제

Claude의 긴 설명은 읽지 않고 다음만 추출합니다.

- 근본 원인
- 수정 파일
- 테스트
- 위험

---

## 90~110분 — 참가자 실습

### 90~93분: 실습 목표와 완료 기준

```text
분석 → 계획 → 수정 → 테스트 → diff → commit
```

### 93~98분: 프로젝트 탐색·실패 재현

참가자 프롬프트:

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

push와 PR은 환경이 준비된 참가자만 진행하고, 나머지는 commit에서 완료 처리합니다.

### 강사의 순회 질문

- 지금 어느 branch인가요?
- Claude에게 수정 전에 계획을 받았나요?
- 테스트 결과를 직접 확인했나요?
- diff에 관련 없는 파일이 있나요?

답을 대신 주지 말고 확인할 위치를 알려줍니다.

---

## 110~115분 — 보안과 팀 적용

### 반드시 말할 것

- 공개 자료만 실습에 사용
- 실제 업무 데이터는 정책 확인 전 입력 금지
- 권한은 최소 범위
- 쓰기·삭제·push는 실행 전 대상 확인
- AI 결과는 테스트와 사람의 리뷰로 닫음

### 팀 도입 순서

```text
개인 작은 작업 → 공통 CLAUDE.md → 반복 Skill → 제한된 Hook/MCP
```

처음부터 MCP와 자동화를 크게 연결하지 않습니다.

---

## 115~120분 — 정리와 Q&A

### 마지막 5문장

1. 먼저 읽게 하고 바로 수정시키지 않는다.
2. 복잡한 작업은 Plan Mode로 계획부터 본다.
3. 작업 범위와 완료 기준을 구체적으로 준다.
4. 테스트와 diff를 직접 확인한다.
5. 권한·민감정보·최종 판단은 사람의 책임이다.

### 종료 질문

> 다음 주 실제 업무에서 Claude Code에 맡겨볼 가장 작은 작업은 무엇인가요?

답변은 한 문장으로 받습니다.

## 시간 부족 시 삭제 순서

1. MCP·Hooks 예시 상세
2. PR 생성 실습
3. 참가자 경험 공유
4. Skills·Subagents 추가 예시

삭제하면 안 되는 항목:

- VS Code diff
- branch
- baseline 테스트
- Plan과 최소 수정
- 테스트 재실행
- 보안 원칙
