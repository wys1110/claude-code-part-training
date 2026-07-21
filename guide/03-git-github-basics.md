# Git·GitHub 기본 사용

<div class="badge-row"><span>교육 시간: 15분</span><span>깊이: 직접 실습</span><span>목표: 안전한 변경 단위 만들기</span></div>

## 이 구간의 핵심 메시지

> Git은 내 컴퓨터의 변경 이력을 관리하고, GitHub는 저장소를 원격에서 공유하고 리뷰하는 공간입니다.

Claude Code가 코드를 수정해도 Git의 기본 흐름을 이해하지 못하면 변경을 검토하거나 되돌리기 어렵습니다.

## 1. 최소 개념 지도

| 개념 | 쉬운 설명 | 교육에서 확인할 것 |
|---|---|---|
| Repository | 프로젝트 파일과 변경 이력의 묶음 | 저장소 루트 |
| Local | 내 PC에 있는 저장소 | VS Code 폴더 |
| Remote | GitHub에 있는 저장소 | `origin` |
| Clone | 원격 저장소를 로컬로 복사 | 최초 1회 |
| Branch | 독립된 작업 흐름 | 실습 branch |
| Commit | 검토 가능한 변경 저장점 | 메시지와 범위 |
| Push | 로컬 commit을 GitHub로 전송 | branch 단위 |
| Pull Request | 변경을 합치기 전 리뷰 요청 | 설명·테스트 결과 |

## 2. 전체 흐름

<div class="flow"><div>Fork 또는 Clone</div><div>Branch</div><div>Edit</div><div>Diff</div><div>Stage</div><div>Commit</div><div>Push</div><div>Pull Request</div></div>

### 왜 branch를 먼저 만드는가?

- 기본 branch를 깨끗하게 유지할 수 있음
- 작업별 변경을 분리할 수 있음
- 문제가 생기면 branch를 버리고 다시 시작하기 쉬움
- Pull Request 단위가 명확해짐

## 3. Fork와 Clone 구분

### Fork

GitHub 서버에서 원본 저장소를 자신의 계정 아래에 복사합니다.

사용 시점:

- 원본 저장소에 직접 push 권한이 없음
- 참가자별 작업을 독립적으로 보관하고 싶음
- 원본 저장소로 Pull Request를 보내고 싶음

### Clone

GitHub 저장소를 내 PC로 내려받습니다.

```bash
git clone https://github.com/<YOUR_ID>/claude-code-part-training.git
cd claude-code-part-training
code .
```

::: tip 교육 권장 방식
참가자는 저장소를 자신의 GitHub 계정으로 Fork한 뒤 Fork 저장소를 Clone합니다. GitHub 이용이 어려우면 원본 저장소를 Clone하고 로컬 commit까지만 진행합니다.
:::

## 4. 현재 상태 확인

작업 전후에 가장 자주 사용할 명령입니다.

```bash
git status
```

확인할 내용:

- 현재 branch
- 수정된 파일
- 새 파일
- stage된 파일
- commit할 내용이 있는지

### 강의 습관

모든 단계의 시작과 끝에서 `git status`를 확인합니다.

## 5. Branch 만들기

참가자 branch 규칙:

```text
practice/<github-id>
```

예:

```bash
git switch -c practice/wys1110
```

확인:

```bash
git branch --show-current
```

### 흔한 실수

- `main`에서 바로 수정
- 다른 참가자의 branch 이름 사용
- 공백이나 한글이 포함된 복잡한 이름
- branch 생성 전에 이미 많은 파일을 수정

## 6. 변경 확인

```bash
git diff
```

또는 VS Code Source Control에서 파일을 클릭합니다.

검토 순서:

1. 변경 파일 목록
2. 삭제된 코드
3. 추가된 코드
4. 테스트 변경
5. 관련 없는 포맷 변경

## 7. Stage

특정 파일만 stage합니다.

```bash
git add labs/task-board/src/task-board.js
git add labs/task-board/test/task-board.test.js
```

확인:

```bash
git status
```

초보 교육에서는 `git add .`를 기본값으로 가르치지 않습니다. 무엇을 commit하는지 확인하는 습관이 더 중요합니다.

## 8. Commit

```bash
git commit -m "Fix task validation and ID generation"
```

좋은 commit의 기준:

- 하나의 목적
- 검토 가능한 크기
- 무엇을 바꿨는지 알 수 있는 메시지
- 테스트되지 않은 임시 변경 제외

### 피할 메시지

```text
update
fix
final
수정
```

## 9. Push

처음 push할 때:

```bash
git push -u origin practice/<github-id>
```

그다음부터는 보통 다음으로 충분합니다.

```bash
git push
```

### Push 전 확인

```bash
git status
git log --oneline -3
```

- 올바른 branch인가?
- commit이 존재하는가?
- 민감정보가 포함되지 않았는가?

## 10. Pull Request

GitHub에서 **Compare & pull request**를 선택합니다.

PR 본문에 포함할 내용:

```markdown
## 변경 내용
- 공백 제목 검증 추가
- 삭제 이후 ID 중복 방지

## 검증
- npm test 통과

## 확인할 점
- 기존 공개 API는 변경하지 않음
```

### PR은 단순 제출 버튼이 아니다

Pull Request는 다음을 전달하는 문서입니다.

- 왜 바꿨는가
- 무엇을 바꿨는가
- 어떻게 검증했는가
- 무엇이 아직 위험한가

## 11. Claude Code를 어디에 사용할까?

Claude Code에 맡기기 좋은 작업:

```text
현재 git diff를 정확성, 회귀 위험, 테스트 누락 관점에서 리뷰해줘.
```

```text
현재 변경 범위를 바탕으로 commit 메시지 후보 3개를 만들어줘.
```

```text
변경 내용과 테스트 결과를 바탕으로 Pull Request 본문 초안을 작성해줘.
```

사람이 직접 확인할 것:

- 대상 branch
- 실제 stage된 파일
- 민감정보
- push 대상 remote
- PR에 포함된 전체 diff

## 12. 최소 복구 방법

### 수정했지만 아직 commit하지 않은 파일 되돌리기

초보자는 명령을 바로 실행하기 전에 VS Code diff에서 대상 파일을 확인합니다.

```bash
git restore <file>
```

### stage 취소

```bash
git restore --staged <file>
```

::: danger 교육 중 금지 명령
`git reset --hard`, 강제 push, 대량 파일 삭제는 교육 실습에서 사용하지 않습니다. 복구 범위를 모르면 먼저 현재 상태를 확인합니다.
:::

## 15분 진행안

| 시간 | 내용 |
|---:|---|
| 0~3분 | Git과 GitHub 차이, 전체 흐름 |
| 3~6분 | Fork·Clone |
| 6~9분 | branch와 `git status` |
| 9~12분 | diff·stage·commit |
| 12~15분 | push·PR과 참가자 branch 생성 |

## 공식 참고

- [GitHub 저장소 Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
- [VS Code Source Control Quickstart](https://code.visualstudio.com/docs/sourcecontrol/quickstart)
- [VS Code Source Control](https://code.visualstudio.com/docs/sourcecontrol/overview)
