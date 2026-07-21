# 참가자 실습 정답과 힌트

<div class="badge-row"><span>프로젝트: labs/task-board</span><span>실습: 20분</span><span>공개 예제 전용</span></div>

이 문서는 강사용입니다. 참가자에게는 정답을 바로 보여주지 않고 **현재 단계 → 근거 파일 → 실패 조건 → 최소 수정** 순서로 질문합니다.

## 실습 1 — 버그 분석과 수정

### 시작 상태

```bash
git switch -c practice/<github-id>
cd labs/task-board
npm test
```

### 기대되는 분석

#### 문제 1: 공백 제목이 허용됨

- 위치: `src/task-board.js`의 `addTask(title)`
- 증상: 빈 문자열은 거부하지만 공백 문자열은 통과할 수 있음
- 근본 원인: 원본 `title`의 truthy/falsy만 확인하고 정규화된 값을 검증하지 않음
- 최소 수정: `title.trim()` 결과가 비어 있는지 확인
- 테스트: `"   "` 입력 시 오류 발생

#### 문제 2: 삭제 후 ID가 중복될 수 있음

- 위치: 새 ID 생성 로직
- 증상: 마지막 항목을 삭제한 뒤 새 항목을 추가하면 기존 ID와 겹칠 수 있음
- 근본 원인: `tasks.length + 1`이 지금 남아 있는 항목 수만 반영함
- 최소 수정: 인스턴스별 증가 카운터 또는 현재 최대 ID보다 큰 값 사용
- 권장 정답: 생성자에서 `nextId = 1`을 초기화하고 추가할 때 증가

### 권장 구현 방향

```js
export class TaskBoard {
  constructor() {
    this.tasks = []
    this.nextId = 1
  }

  addTask(title) {
    const normalizedTitle = title?.trim()
    if (!normalizedTitle) {
      throw new Error('Title is required')
    }

    const task = {
      id: this.nextId++,
      title: normalizedTitle,
      completed: false
    }

    this.tasks.push(task)
    return task
  }
}
```

> 실제 저장소의 기존 메서드명·오류 메시지·코드 스타일을 우선합니다. 위 코드는 방향 예시이며 전체 파일을 그대로 교체하지 않습니다.

### 추가할 테스트

```js
it('rejects a whitespace-only title', () => {
  const board = new TaskBoard()
  assert.throws(() => board.addTask('   '), /title/i)
})

it('does not reuse an id after deletion', () => {
  const board = new TaskBoard()
  const first = board.addTask('first')
  const second = board.addTask('second')

  board.deleteTask(second.id)
  const third = board.addTask('third')

  assert.notEqual(third.id, first.id)
  assert.notEqual(third.id, second.id)
})
```

테스트 프레임워크와 기존 assertion 스타일에 맞게 조정합니다.

## 실습 1 힌트 단계

### 힌트 1 — 증상 위치

> 제목 검증과 새 ID 생성이 어느 메서드에 있는지 찾아보세요.

### 힌트 2 — 입력 정규화

> 빈 문자열과 공백 문자열은 JavaScript 조건문에서 같은 방식으로 평가되지 않습니다. 검증 전에 어떤 문자열 메서드를 적용할 수 있을까요?

### 힌트 3 — ID 기준

> 배열 길이는 삭제 이후 감소합니다. 한 번 발급한 번호를 다시 쓰지 않으려면 배열 길이와 분리된 어떤 상태가 필요할까요?

## 실습 1 완료 기준

- 빈 문자열과 공백 제목 거부
- 정상 제목은 정리된 문자열로 저장
- 삭제 이후 ID 중복 없음
- 기존 정상 동작 유지
- 전체 테스트 통과
- 구현과 테스트 외 관련 없는 변경 없음

---

## 실습 2 — `getPendingTasks()` 추가

### 요구사항

- 완료되지 않은 항목만 반환
- 기존 코드 스타일 준수
- 정상 목록, 빈 목록, 완료 항목 제외 테스트
- 관련 없는 리팩터링 금지

### 권장 구현 방향

```js
getPendingTasks() {
  return this.tasks.filter((task) => task.completed === false)
}
```

### 확장 검토

반환된 배열을 호출자가 수정해도 내부 `tasks` 배열 자체의 길이는 바뀌지 않습니다. 다만 반환된 task 객체는 동일한 객체 참조일 수 있습니다.

교육 수준에 따라 다음을 토론할 수 있습니다.

```js
return this.tasks
  .filter((task) => task.completed === false)
  .map((task) => ({ ...task }))
```

2시간 입문 과정의 기본 정답은 기존 코드의 반환 패턴을 따릅니다. 방어적 복사를 새 요구사항으로 확대하지 않습니다.

### 추가할 테스트

```js
it('returns pending tasks only', () => {
  const board = new TaskBoard()
  const first = board.addTask('first')
  const second = board.addTask('second')
  board.completeTask(first.id)

  assert.deepEqual(board.getPendingTasks(), [second])
})

it('returns an empty list when no pending task exists', () => {
  const board = new TaskBoard()
  assert.deepEqual(board.getPendingTasks(), [])
})
```

### 실습 2 힌트 단계

1. 완료 상태를 나타내는 필드명을 기존 코드에서 찾습니다.
2. 배열에서 조건에 맞는 항목만 반환하는 메서드를 사용합니다.
3. `completed === false` 조건으로 필터링합니다.

## 빠른 참가자 확장 과제

### A. CLAUDE.md 초안

```text
이 프로젝트를 분석해 간결한 CLAUDE.md 초안을 작성해줘.
실제 존재하는 명령만 기록하고,
최소 변경·테스트 우선·diff 검토 규칙을 포함해줘.
```

확인 사항:

- 존재하지 않는 lint/build 명령을 만들지 않음
- 프로젝트 설명이 과도하게 길지 않음
- 강제 정책처럼 오해될 표현을 피함

### B. Pull Request 본문

```text
현재 git diff를 기준으로 PR 본문을 작성해줘.
변경 이유, 핵심 변경, 테스트 결과, 남은 위험을 포함하고
확인하지 않은 내용은 추정하지 마.
```

### C. Diff 리뷰

```text
현재 git diff를 리뷰해줘.
정확성, 회귀 가능성, 테스트 누락, 관련 없는 변경 순서로 정리해줘.
문제가 없으면 확인한 근거와 남은 위험을 알려줘.
```

## Local-only 대안

GitHub 로그인이 어렵거나 push 권한이 없으면 다음까지만 진행합니다.

```bash
git switch -c practice/local
git status
npm test
git diff
git add <검토한 파일>
git diff --staged
git commit -m "Complete task board lab"
git log -1 --oneline
```

완료 증거는 마지막 commit hash와 테스트 결과입니다.

## 강사 평가 체크리스트

- [ ] main이 아닌 별도 branch에서 작업했는가
- [ ] baseline 테스트를 먼저 실행했는가
- [ ] 수정 전 원인과 계획을 확인했는가
- [ ] 파일 범위를 제한했는가
- [ ] 새 의존성을 불필요하게 추가하지 않았는가
- [ ] 요구사항을 증명하는 테스트를 추가했는가
- [ ] 전체 테스트를 실행했는가
- [ ] diff를 직접 읽었는가
- [ ] 필요한 파일만 stage했는가
- [ ] 가능한 경우 commit·push·PR을 완료했는가
