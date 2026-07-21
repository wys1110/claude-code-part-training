# VS Code 기본 사용

<div class="badge-row"><span>교육 시간: 15분</span><span>깊이: 직접 실습</span><span>목표: 변경을 눈으로 검증</span></div>

## 이 구간의 핵심 메시지

> VS Code는 코드를 작성하는 화면이 아니라, 프로젝트 구조·터미널·Git 상태·변경 diff를 한곳에서 확인하는 작업 공간입니다.

교육에서는 모든 메뉴를 설명하지 않습니다. Claude Code 실습에 필요한 다섯 영역만 다룹니다.

<div class="flow"><div>Explorer</div><div>Editor</div><div>Terminal</div><div>Source Control</div><div>Claude Code</div></div>

## 1. 프로젝트 폴더 열기

### 강사 시연

1. **File → Open Folder**를 선택합니다.
2. 저장소의 최상위 폴더를 선택합니다.
3. Explorer에 `guide`, `labs`, `.vitepress`가 보이는지 확인합니다.

### 반드시 강조할 것

파일 하나를 여는 것과 프로젝트 폴더를 여는 것은 다릅니다. Claude Code와 Git은 **현재 작업 폴더**를 기준으로 동작하므로 저장소 루트를 열어야 합니다.

### 참가자 확인 질문

- 현재 VS Code가 어느 폴더를 기준으로 열려 있는가?
- `.git`이 포함된 저장소 루트인가?
- 실습 프로젝트는 어느 하위 폴더에 있는가?

## 2. Explorer로 구조 파악

참가자는 다음 파일을 직접 찾아봅니다.

```text
labs/task-board/src/task-board.js
labs/task-board/test/task-board.test.js
CLAUDE.md
```

### 터치할 내용

- 폴더 펼치기와 접기
- 파일 클릭
- 탭 닫기
- 파일 경로 복사
- 현재 파일에서 문자열 검색

### 깊게 다루지 않을 내용

- Workspace 다중 루트
- Remote Development
- Dev Container
- 복잡한 설정 동기화

## 3. 통합 터미널

**Terminal → New Terminal**을 선택합니다.

현재 위치를 확인합니다.

```bash
pwd
```

Windows PowerShell에서는 다음도 사용할 수 있습니다.

```powershell
Get-Location
```

실습 명령:

```bash
cd labs/task-board
npm test
git status
```

### 핵심 개념

- Explorer에서 보이는 폴더와 터미널의 현재 경로가 다를 수 있습니다.
- 명령이 실패하면 먼저 현재 경로를 확인합니다.
- Claude Code CLI도 VS Code 통합 터미널에서 실행할 수 있습니다.

```bash
claude
```

## 4. Command Palette

```text
Windows / Linux: Ctrl + Shift + P
macOS: Cmd + Shift + P
```

교육에서 직접 검색할 명령:

```text
Git: Clone
Git: Create Branch
Terminal: Create New Terminal
Developer: Reload Window
```

Command Palette는 메뉴 위치를 외우지 않고 기능 이름으로 실행하는 방법입니다.

## 5. Source Control 화면

왼쪽 Source Control 아이콘을 선택합니다.

| 표시 | 의미 | 강의에서 할 행동 |
|---|---|---|
| `M` | 수정된 파일 | 클릭해서 diff 확인 |
| `U` | 아직 Git이 추적하지 않는 새 파일 | 필요한 파일인지 판단 |
| `A` | stage된 새 파일 | commit 대상 확인 |
| `D` | 삭제된 파일 | 의도된 삭제인지 확인 |

### Stage와 Commit

1. 변경 파일을 클릭해 diff를 봅니다.
2. commit에 포함할 파일만 `+`로 stage합니다.
3. 메시지를 작성합니다.
4. Commit을 실행합니다.

::: warning `Stage All` 습관 주의
처음부터 모든 파일을 stage하면 설정 파일이나 임시 파일까지 commit할 수 있습니다. 교육에서는 파일별 변경을 확인한 뒤 stage합니다.
:::

## 6. Diff Editor

변경 파일을 클릭하면 기존 내용과 새 내용을 비교할 수 있습니다.

반드시 확인할 네 가지:

1. 요청한 코드만 바뀌었는가?
2. 예상하지 않은 삭제가 있는가?
3. 포맷 변경으로 전체 파일이 바뀌지 않았는가?
4. 테스트가 함께 추가되거나 수정되었는가?

### 참가자에게 던질 질문

> Claude Code가 테스트를 통과시켰더라도 diff를 봐야 하는 이유는 무엇인가?

예상 답:

- 테스트가 모든 요구사항을 검증하지 않을 수 있음
- 관련 없는 코드가 변경될 수 있음
- 보안·가독성·유지보수 문제는 테스트로 잡히지 않을 수 있음

## 7. Claude Code VS Code 확장

교육에서 보여줄 기능:

- Claude Code 패널 열기
- 현재 파일 또는 코드 범위 전달
- 권한 모드 확인
- Plan Mode에서 계획 검토
- 변경 diff 확인
- 터미널에서 명령 결과 확인

### 기본 요청

```text
현재 프로젝트 구조와 주요 파일 역할을 설명해줘.
아직 파일을 수정하거나 명령을 실행하지 마.
근거가 되는 파일 경로를 함께 제시해줘.
```

### 파일을 명확히 지정하는 요청

```text
@labs/task-board/src/task-board.js의 공개 메서드와 상태 변경 흐름을 설명해줘.
```

## 8. VS Code UI와 터미널 Git의 관계

VS Code Source Control과 터미널의 Git 명령은 같은 저장소 상태를 봅니다.

| 터미널 | VS Code UI |
|---|---|
| `git status` | Source Control 변경 목록 |
| `git diff` | 변경 파일 클릭 |
| `git add <file>` | 파일 옆 `+` |
| `git commit` | 메시지 입력 후 Commit |
| `git switch` | 좌측 하단 branch 선택 |
| `git push` | Push 또는 Sync Changes |

한쪽에서 수행한 결과는 다른 쪽에도 반영됩니다.

## 15분 진행안

| 시간 | 내용 |
|---:|---|
| 0~3분 | 화면 5영역 설명 |
| 3~6분 | 저장소 폴더와 실습 파일 찾기 |
| 6~9분 | 통합 터미널에서 경로·테스트 확인 |
| 9~12분 | Source Control과 diff 시연 |
| 12~15분 | Claude Code 패널과 참가자 따라 하기 |

## 공식 참고

- [VS Code 핵심 기능](https://code.visualstudio.com/docs/core-editor/overview)
- [VS Code Source Control](https://code.visualstudio.com/docs/sourcecontrol/overview)
- [Claude Code VS Code 통합](https://code.claude.com/docs/en/ide-integrations)
