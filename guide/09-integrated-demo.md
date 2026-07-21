# 통합 시연 — 저장소에서 Pull Request까지

<div class="badge-row"><span>교육 시간: 15분</span><span>주체: 강사</span><span>목표: 전체 흐름 연결</span></div>

## 시연 목표

앞에서 배운 VS Code, Git, GitHub, Claude Code가 별개의 도구가 아니라 하나의 작업 흐름으로 연결된다는 것을 보여줍니다.

<div class="flow"><div>1. Clone</div><div>2. Branch</div><div>3. Baseline Test</div><div>4. Analyze</div><div>5. Plan</div><div>6. Edit</div><div>7. Verify</div><div>8. Diff</div><div>9. Commit·PR</div></div>

## 데모 시나리오

`labs/task-board` 프로젝트의 실패 테스트를 재현하고, 공백 제목 검증과 ID 중복 문제를 최소 범위로 수정합니다.

## 데모 전 준비

라이브 시연 전에 별도 demo branch를 준비합니다.

```bash
git switch main
git pull
git switch -c demo/task-board-fix
```

시연용 터미널은 글자가 잘 보이도록 확대하고 불필요한 탭을 닫습니다.

## 1. 저장소와 현재 branch 확인 — 1분

```bash
git status
git branch --show-current
```

### 말할 내용

> 작업을 시작하기 전에 현재 저장소와 branch부터 확인합니다. AI 도구를 써도 이 확인 단계는 없어지지 않습니다.

## 2. Baseline 테스트 실행 — 2분

```bash
cd labs/task-board
npm test
```

### 화면에서 보여줄 것

- 실패 테스트 이름
- expected와 actual
- 실패 개수
- 테스트 명령이 정상적으로 실행됐다는 사실

### 말할 내용

> 실패하는 테스트가 있다는 것과 설치가 실패했다는 것은 다릅니다. 지금은 테스트가 실행됐고 코드 동작이 기대와 다르다는 상태입니다.

## 3. Claude Code에 탐색 요청 — 2분

```text
이 프로젝트의 목적, 주요 파일 역할, 테스트가 검증하는 동작을 설명해줘.
아직 파일을 수정하지 말고, 설명의 근거가 되는 파일과 함수명을 함께 제시해줘.
```

### 확인할 것

- `src/task-board.js`
- 테스트 파일
- `addTask`, `deleteTask` 또는 ID 생성 흐름
- Claude가 추정과 코드 근거를 구분하는지

## 4. Plan Mode에서 원인과 계획 확인 — 3분

Plan Mode로 전환한 뒤 요청합니다.

```text
테스트 실패를 재현하고 각 실패의 증상과 근본 원인을 구분해줘.
아직 수정하지 말고 최소 수정 계획, 영향 범위, 검증 방법을 제시해줘.
```

### 계획 검토 질문

- 수정 파일이 필요한 범위로 제한됐는가?
- 기존 공개 API를 바꾸는가?
- 새로운 테스트가 필요한가?
- 관련 없는 리팩터링이 포함됐는가?

### 말할 내용

> 계획을 승인하는 것은 단순히 계속 버튼을 누르는 것이 아닙니다. 파일, 범위, 검증 방법이 맞는지 확인하는 리뷰 단계입니다.

## 5. 최소 수정 실행 — 2분

```text
앞서 합의한 계획 범위 안에서만 수정해줘.
공백 제목을 거부하는 테스트를 추가하고, 관련 없는 리팩터링은 하지 마.
수정 후 관련 테스트와 전체 테스트를 실행해줘.
```

## 6. 테스트 결과 확인 — 1분

Claude Code의 설명만 보지 않고 터미널 출력에서 직접 확인합니다.

```bash
npm test
```

### 확인할 것

- 전체 테스트 통과
- 새 테스트가 실제로 실행됨
- 경고나 숨겨진 오류가 없음

## 7. VS Code diff 리뷰 — 2분

Source Control에서 변경 파일을 하나씩 클릭합니다.

리뷰 순서:

1. 수정 파일 수
2. 코드 변경
3. 테스트 변경
4. 관련 없는 변경
5. 삭제 또는 설정 변경

Claude Code에 보조 리뷰를 요청할 수 있습니다.

```text
현재 git diff를 리뷰해줘.
정확성, 회귀 위험, 테스트 누락, 관련 없는 변경 순서로 정리해줘.
```

### 말할 내용

> Claude가 만든 코드를 Claude에게 다시 리뷰시키는 것은 보조 수단입니다. 최종 diff 확인은 사람이 직접 합니다.

## 8. Stage와 Commit — 1분

```bash
git status
git add src/task-board.js test/task-board.test.js
git commit -m "Fix task validation and ID generation"
```

실제 경로는 현재 `labs/task-board` 위치를 기준으로 확인합니다.

## 9. Push와 Pull Request — 1분

```bash
git push -u origin demo/task-board-fix
```

GitHub에서 Pull Request를 만들고 다음을 보여줍니다.

- base와 compare branch
- 변경 파일
- commit
- 테스트 결과가 포함된 PR 본문

```markdown
## 변경 내용
- 공백 제목 입력 검증 추가
- 삭제 이후 ID 중복 방지

## 검증
- `npm test` 통과

## 남은 위험
- 메모리 기반 예제이므로 영속성·동시성은 범위 밖
```

## 시연 중 일부러 멈춰야 할 지점

다음 단계에서는 바로 클릭하지 말고 참가자에게 질문합니다.

- 계획 승인 전: “이 계획에서 불필요한 변경은 무엇인가?”
- 코드 수정 후: “테스트만 통과하면 충분한가?”
- commit 전: “지금 stage된 파일은 무엇인가?”
- PR 전: “base branch가 맞는가?”

## 시연 실패 대비

### Claude Code 로그인이 풀린 경우

- 준비한 캡처 또는 사전 녹화로 Plan·diff 화면 설명
- 터미널 Git 흐름은 계속 진행

### 네트워크가 느린 경우

- 로컬 저장소와 미리 준비한 branch 사용
- push·PR은 기존 예시 PR 화면으로 설명

### 테스트가 예상과 다르게 나오는 경우

```bash
git status
git diff
git log --oneline -3
```

현재 상태를 먼저 확인하고 데모를 억지로 이어가지 않습니다.

## 시연 종료 메시지

> Claude Code의 핵심은 코드를 빠르게 생성하는 것이 아니라, 저장소를 이해하고 계획을 검토하고 테스트와 diff로 결과를 닫는 전체 루프입니다.
