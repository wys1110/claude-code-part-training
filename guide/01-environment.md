# 교육 전 환경 준비

<div class="badge-row"><span>대상: 전체 참가자</span><span>사전 소요: 20~40분</span><span>교육 당일 완료 금지</span></div>

## 목적

교육 시간은 설치가 아니라 **VS Code → GitHub → Claude Code → 테스트 → diff** 흐름을 익히는 데 사용합니다. 아래 항목은 교육 전날까지 완료합니다.

## 필수 항목

| 항목 | 필요한 이유 | 확인 방법 |
|---|---|---|
| VS Code | 코드 탐색·터미널·diff 확인 | 앱 실행 |
| Git | clone·branch·commit | `git --version` |
| GitHub 계정 | fork·push·PR | 웹 로그인 |
| Node.js·npm | 실습 테스트 실행 | `node --version`, `npm --version` |
| Claude Code | 분석·수정·검증 실습 | `claude --version` |
| Claude Code VS Code 확장 | 에디터 안에서 대화와 diff 사용 | Extensions 확인 |

VS Code의 Git 화면은 PC에 설치된 Git을 사용합니다. VS Code에서 Source Control이 보이더라도 `git --version`이 실패하면 Git 설치를 먼저 확인합니다.

## 1. VS Code 확인

1. VS Code를 실행합니다.
2. 왼쪽 Activity Bar에서 Explorer와 Source Control 아이콘을 찾습니다.
3. **Terminal → New Terminal**을 실행합니다.
4. Command Palette를 엽니다.

```text
Windows / Linux: Ctrl + Shift + P
macOS: Cmd + Shift + P
```

## 2. Git 사용자 정보 확인

```bash
git --version
git config --global user.name
git config --global user.email
```

이름이나 이메일이 비어 있을 때만 설정합니다.

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

::: warning 공개 저장소 commit 정보
Git commit 이메일은 저장소 기록에 남을 수 있습니다. 공개 노출이 우려되면 GitHub에서 제공하는 `noreply` 이메일 사용을 검토합니다.
:::

## 3. GitHub 로그인 확인

웹 브라우저에서 GitHub에 로그인하고 아래 저장소를 열 수 있는지 확인합니다.

```text
https://github.com/wys1110/claude-code-part-training
```

교육에서는 두 가지 경로를 지원합니다.

### A안 — GitHub 전체 실습

- 저장소 Fork
- Fork 저장소 Clone
- branch 생성
- push
- Pull Request 생성

### B안 — 로컬 전용 실습

GitHub 사용 또는 네트워크가 제한되면 다음까지만 수행합니다.

- 저장소 ZIP 다운로드 또는 강사 제공 폴더 사용
- 로컬 Git 저장소에서 branch와 commit
- push와 PR은 강사 시연으로 대체

## 4. Node.js 확인

```bash
node --version
npm --version
```

실습 프로젝트는 외부 라이브러리가 거의 없는 작은 Node.js 프로젝트입니다. 버전 확인 명령이 실패하면 교육 전에 설치 담당자 또는 강사에게 문의합니다.

## 5. Claude Code 확인

```bash
claude --version
```

프로젝트 폴더에서 처음 실행하면 로그인 또는 프로젝트 신뢰 확인이 나타날 수 있습니다.

```bash
claude
```

처음 사용하는 참가자는 기본 권한 모드에서 시작합니다. 교육 중 복잡한 변경은 Plan Mode로 전환해 수정 전 계획을 검토합니다.

## 6. VS Code 확장 확인

Extensions에서 다음을 검색합니다.

```text
Claude Code
GitHub Pull Requests and Issues  (선택)
```

Claude Code 확장을 설치한 뒤 VS Code를 다시 시작합니다. 확장 화면이 열리지 않으면 Command Palette에서 Claude 관련 명령을 검색합니다.

## 7. 교육 저장소 사전 점검

Fork를 사용할 경우 자신의 계정으로 Fork한 뒤 clone합니다.

```bash
git clone https://github.com/<YOUR_ID>/claude-code-part-training.git
cd claude-code-part-training
code .
```

원본 저장소를 읽기 전용으로 받을 경우:

```bash
git clone https://github.com/wys1110/claude-code-part-training.git
cd claude-code-part-training
code .
```

## 8. 실습 프로젝트 점검

VS Code 통합 터미널에서 실행합니다.

```bash
cd labs/task-board
npm test
```

일부 테스트 실패는 의도된 실습 시작 상태입니다. 설치 오류와 테스트 실패를 구분합니다.

- `command not found`: 도구 설치 또는 PATH 문제
- 모듈을 찾을 수 없음: 현재 경로 또는 설치 문제
- assertion 실패: 교육을 위해 의도된 코드 오류일 수 있음

## 사전 점검 결과 제출 예시

```text
[ ] VS Code 실행
[ ] Git 버전 확인
[ ] GitHub 로그인
[ ] Node/npm 버전 확인
[ ] Claude Code 버전 확인
[ ] 교육 저장소 clone 또는 ZIP 준비
[ ] labs/task-board npm test 실행
```

## 공식 참고

- [Claude Code 개요](https://code.claude.com/docs/en/overview)
- [Claude Code VS Code 사용](https://code.claude.com/docs/en/ide-integrations)
- [VS Code Source Control](https://code.visualstudio.com/docs/sourcecontrol/overview)
