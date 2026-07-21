# 2. 첫 세션과 기본 흐름

<div class="badge-row"><span>난이도: 입문</span><span>권장 시간: 10분</span><span>핵심: 탐색 → 계획 → 실행 → 검증</span></div>

## 설치

2026년 기준 공식 권장 방식은 네이티브 설치입니다.

::: code-group
```bash [macOS / Linux / WSL]
curl -fsSL https://claude.ai/install.sh | bash
```

```powershell [Windows PowerShell]
irm https://claude.ai/install.ps1 | iex
```

```bash [Homebrew]
brew install --cask claude-code
```
:::

설치 후 프로젝트 폴더에서 실행합니다.

```bash
cd your-project
claude
```

## 첫 세션에서 바로 해야 할 4가지

### 1. 프로젝트를 설명하게 하기

```text
이 프로젝트의 목적, 주요 기술, 실행 방법, 핵심 폴더를 설명해줘.
추측하지 말고 근거가 되는 파일 경로를 함께 알려줘.
```

### 2. 작업 전에 계획 받기

```text
지금은 코드를 수정하지 말고, 이 버그의 원인 후보와 확인 순서를 정리해줘.
```

또는 CLI에서 Plan Mode로 시작할 수 있습니다.

```bash
claude --permission-mode plan
```

### 3. 작은 범위로 변경하기

```text
원인이 확인된 파일만 최소 범위로 수정해줘.
기존 공개 API와 동작은 유지해줘.
```

### 4. 검증 결과 받기

```text
관련 테스트와 린트를 실행하고, 실행한 명령·결과·남은 위험을 요약해줘.
```

## 세션 이어가기

```bash
claude --continue
claude --resume
```

- `--continue`: 현재 프로젝트의 최근 세션 이어가기
- `--resume`: 목록이나 세션 ID로 특정 세션 이어가기

## 기본 시연 시나리오

발표자는 실습 프로젝트에서 아래 순서로 보여줍니다.

```text
1. 이 프로젝트가 하는 일을 설명해줘.
2. 테스트를 실행하되 아직 수정하지 마.
3. 실패 원인과 수정 계획을 알려줘.
4. 최소 범위로 수정하고 테스트를 다시 실행해줘.
5. 변경 diff를 리뷰해줘.
```

::: warning 피해야 할 시작 방식
처음부터 `전체를 알아서 개선해줘`라고 요청하면 범위가 과도하게 커지고 검토가 어려워집니다. 첫 작업은 읽기·분석 중심으로 시작하세요.
:::

---

**공식 참고:** [Quickstart](https://code.claude.com/docs/en/quickstart) · [CLI reference](https://code.claude.com/docs/en/cli-reference)
