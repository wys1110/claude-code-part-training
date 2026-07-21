# 15분 라이브 데모 대본

<div class="badge-row"><span>슬라이드 32~35</span><span>프로젝트: labs/task-board</span><span>목표: 안전한 작업 순서</span></div>

## 데모 전 상태

```bash
git status
git switch main
git pull --ff-only
npm install
cd labs/task-board
npm test
cd ../..
```

- 기존 테스트가 의도대로 실패하는지 확인합니다.
- 데모용 branch가 이미 존재하면 삭제하거나 새 이름을 사용합니다.
- VS Code Source Control에 강사 개인 변경이 없어야 합니다.
- Claude Code는 Manual/default 또는 Plan으로 시작합니다.

## 0:00~2:00 — 목표 제시

말할 문장:

> 지금부터 실패 테스트를 빠르게 고치는 것이 아니라, branch와 baseline을 확인하고, 수정 전에 원인과 계획을 검토한 뒤, 테스트와 diff로 결과를 증명하는 전체 흐름을 보여드리겠습니다.

완료 기준:

1. 실패 테스트 재현
2. 근본 원인과 계획 확인
3. 최소 범위 수정
4. 전체 테스트 통과
5. diff 검토
6. 필요한 파일만 commit

## 2:00~4:00 — Branch와 baseline

```bash
git switch -c demo/fix-task-validation
git branch --show-current
cd labs/task-board
npm test
git status
```

### 정지 질문 1

> 현재 branch는 무엇입니까? main이라면 다음 단계를 진행해도 됩니까?

화면에서 확인:

- branch: `demo/fix-task-validation`
- 테스트 실패 결과
- 변경 파일 없음

## 4:00~6:00 — 구조 분석

Claude Code 입력:

```text
이 프로젝트의 목적, 주요 파일 역할, 데이터 흐름을 설명해줘.
아직 파일을 수정하거나 명령을 실행하지 마.
설명의 근거가 되는 파일과 함수명을 함께 알려줘.
```

확인할 답변:

- `TaskBoard` 클래스 역할
- `addTask`, `deleteTask`, `completeTask`의 흐름
- 테스트 파일이 기대하는 동작
- 사실과 추정의 구분

강사 멘트:

> 수정 전에 현재 구현과 테스트가 무엇을 약속하는지 맞추고 있습니다. 이 단계가 빠지면 실패 메시지만 임시로 가리는 수정이 나오기 쉽습니다.

## 6:00~9:00 — 실패 재현과 계획

Claude Code 입력:

```text
npm test를 실행해 실패를 재현해줘.
아직 수정하지 말고 각 실패의 재현 조건, 근본 원인,
최소 수정안, 검증 방법을 정리해줘.

그다음 수정 대상 파일, 변경 범위, 회귀 위험,
추가할 테스트를 포함한 계획을 보여줘.
```

### 정지 질문 2

> 계획에 불필요한 파일이나 관련 없는 리팩터링이 포함되어 있습니까?

계획에서 확인:

- 제목 검증은 `trim()` 결과 기준
- ID는 `tasks.length + 1`이 아닌 독립 증가 값
- 수정 대상은 구현 파일과 테스트 파일 중심
- 공백 제목, 삭제 후 ID 중복 테스트 추가

계획이 넓으면 다음과 같이 제한합니다.

```text
구현 파일과 테스트 파일 안에서만 최소 수정해줘.
API 이름과 기존 코드 스타일은 유지하고,
관련 없는 리팩터링과 새 패키지 설치는 하지 마.
```

## 9:00~11:00 — 최소 수정

Claude Code 입력:

```text
합의한 계획 범위 안에서만 수정해줘.
공백 제목이 거부되는 테스트와 삭제 이후 ID가 중복되지 않는 테스트를 추가해줘.
관련 없는 리팩터링은 하지 마.
```

수정 중 확인:

- 의존성 추가 요청이 없는가
- 파일 범위가 계획과 같은가
- 기존 public API를 바꾸지 않았는가

## 11:00~13:00 — 테스트와 diff

```bash
npm test
git diff
git status
```

Claude Code 입력:

```text
관련 테스트와 전체 테스트를 실행해줘.
마지막으로 현재 git diff를 정확성, 회귀 가능성,
테스트 누락, 관련 없는 변경 순서로 리뷰해줘.
```

### 정지 질문 3

> 테스트가 통과한 뒤에도 무엇을 봐야 합니까?

정답:

- 실제 변경 파일
- 의도하지 않은 삭제·포맷 변경
- 설정·의존성 변경
- 테스트가 요구사항을 증명하는지

## 13:00~15:00 — Stage와 Commit

VS Code Source Control 또는 터미널에서 필요한 파일만 선택합니다.

```bash
git add src/task-board.js test/task-board.test.js
git diff --staged
git status
git commit -m "Fix task validation and id generation"
```

### 정지 질문 4

> Commit 전에 어떤 파일이 stage됐습니까? 의도한 두 파일만 들어 있습니까?

마무리 멘트:

> Claude Code가 수정과 테스트를 빠르게 수행했지만, branch 선택, 계획 범위, 승인, diff, commit 대상은 사람이 결정했습니다. 참가자 실습도 같은 순서로 진행합니다.

## 시간 초과 대응

- 구조 분석 답변이 길면 “핵심 파일 2개와 근거 함수만”으로 줄입니다.
- 테스트 설치 문제가 생기면 사전 캡처 결과를 보여주고 Plan·diff 시연을 계속합니다.
- Claude 응답이 지연되면 미리 준비한 `demo/fix-task-validation-ready` branch로 전환합니다.
- Commit까지 못 가면 `git diff --staged`까지만 반드시 보여줍니다.

## 절대 생략하지 않을 것

- 현재 branch 확인
- baseline 테스트
- 수정 전 계획
- 테스트 재실행
- diff 검토
- stage 파일 확인
