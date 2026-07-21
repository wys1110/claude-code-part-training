# 최신 Claude Code 기능 검증표

<div class="badge-row"><span>공식 문서 확인: 2026-07-21</span><span>최신 릴리스 확인: v2.1.216</span><span>교육 대상: Solution PE팀 Staff</span></div>

이 문서는 교육자료에 포함할 기능의 현재 지원 상태와 교육 깊이를 고정하기 위한 기준표입니다. 제품은 빠르게 바뀌므로 교육 직전에 공식 문서와 [Changelog](https://code.claude.com/docs/en/changelog)를 다시 확인합니다.

## 깊이 기준

- **Core**: 설명 + 강사 시연 + 참가자 실습
- **Working**: 개념 + 짧은 시연 + 사용 시점
- **Awareness**: 존재·조건·위험만 소개
- **제외**: 공식 명칭 또는 현재 지원 근거를 확인하지 못함

## 기능 검증표

| 기능 | 현재 지원 여부 | 사용 환경·조건 | 안정성 | 교육 깊이 | 공식 출처 |
|---|---|---|---|---|---|
| CLI | 지원 | 로컬, 모든 주요 인증 제공자 | Stable | Core | [CLI](https://code.claude.com/docs/en/cli-reference) |
| VS Code 확장 | 지원 | VS Code 계열 IDE | Stable | Core | [VS Code](https://code.claude.com/docs/en/vs-code) |
| Desktop | 지원 | Claude 구독 필요, 3P 배포는 조건부 | Stable·조건부 | Awareness | [Desktop](https://code.claude.com/docs/en/desktop) |
| Web | 지원 | Claude 구독 필요 | Stable·조건부 | Awareness | [Web](https://code.claude.com/docs/en/claude-code-on-the-web) |
| JetBrains | 지원 | IntelliJ, PyCharm, WebStorm 등 | Stable | Awareness | [JetBrains](https://code.claude.com/docs/en/jetbrains) |
| Manual / default mode | 지원 | 모든 인터페이스. UI 명칭 Manual, 설정 값 default | Stable | Core | [Permission modes](https://code.claude.com/docs/en/permission-modes) |
| acceptEdits mode | 지원 | 읽기·파일 수정·일반 파일 명령 자동 허용 | Stable | Working | [Permission modes](https://code.claude.com/docs/en/permission-modes) |
| Plan Mode | 지원 | CLI, VS Code, JetBrains, Desktop, Web | Stable | Core | [Permission modes](https://code.claude.com/docs/en/permission-modes) |
| Auto mode | 지원 | 계정·모델 제공자 조건이 다름 | Stable·조건부 | Awareness | [Auto mode](https://code.claude.com/docs/en/auto-mode-config) |
| dontAsk mode | 지원 | 사전 승인 도구만 자동 실행 | Stable | Awareness | [Permission modes](https://code.claude.com/docs/en/permission-modes) |
| bypassPermissions | 지원 | 격리된 컨테이너·VM 전용 권장 | 고위험 | Awareness | [Permission modes](https://code.claude.com/docs/en/permission-modes) |
| CLAUDE.md | 지원 | 프로젝트·사용자·조직 범위 | Stable | Working | [Memory](https://code.claude.com/docs/en/memory) |
| Auto memory | 지원 | 저장소별 로컬 Markdown, `/memory`로 감사 | Stable | Working | [Memory](https://code.claude.com/docs/en/memory) |
| `.claude/rules/` | 지원 | 경로·파일 유형별 규칙 | Stable | Working | [Memory](https://code.claude.com/docs/en/memory) |
| Skills | 지원 | 사용자·프로젝트·플러그인 범위 | Stable | Working | [Skills](https://code.claude.com/docs/en/skills) |
| Bundled skills | 지원 | Claude Code에 포함된 공식 스킬·명령 | Stable | Awareness | [Commands](https://code.claude.com/docs/en/commands) |
| Subagents | 지원 | 별도 컨텍스트·모델·도구 설정 가능 | Stable | Working | [Subagents](https://code.claude.com/docs/en/sub-agents) |
| Agent teams | 지원 | 여러 Claude Code 세션 협업 | **Experimental** | Awareness | [Agent teams](https://code.claude.com/docs/en/agent-teams) |
| MCP | 지원 | 로컬·원격 서버, 제공자별 일부 차이 | Stable | Awareness | [MCP](https://code.claude.com/docs/en/mcp) |
| Hooks | 지원 | 명령·HTTP·프롬프트 기반 이벤트 자동화 | Stable | Awareness | [Hooks](https://code.claude.com/docs/en/hooks-guide) |
| Plugins | 지원 | Skills·Agents·Hooks·MCP 패키징 | Stable | Awareness | [Plugins](https://code.claude.com/docs/en/plugins) |
| Plugin marketplaces | 지원 | 팀·커뮤니티 배포 저장소 | Stable | Awareness | [Marketplaces](https://code.claude.com/docs/en/plugin-marketplaces) |
| GitHub Actions | 지원 | Microsoft Foundry 제외, 제공자별 조건 확인 | Stable·조건부 | Awareness | [GitHub Actions](https://code.claude.com/docs/en/github-actions) |
| Safe mode | **공식 기능명으로 사용하지 않음** | 권한 모드·Sandbox·보안 정책으로 설명 | 제외 | 제외 | [Security](https://code.claude.com/docs/en/security) |
| Sandboxed Bash | 지원 | 파일시스템·네트워크 격리 설정 | Stable | Awareness | [Sandboxing](https://code.claude.com/docs/en/sandboxing) |
| Session resume | 지원 | `--continue`, `--resume`, `/resume`, `--from-pr` | Stable | Awareness | [Sessions](https://code.claude.com/docs/en/sessions) |
| Context 관리 | 지원 | `/context`, compaction, status line 등 | Stable | Working | [Context window](https://code.claude.com/docs/en/context-window) |
| Checkpointing | 지원 | 최근 세션 파일 변경 되감기·요약 | Stable | Working | [Checkpointing](https://code.claude.com/docs/en/checkpointing) |
| Diff review | 지원 | VS Code 인라인 diff, Desktop visual diff 등 | Stable | Core | [VS Code](https://code.claude.com/docs/en/vs-code) |
| Remote Control | 지원 | Pro·Max, Team·Enterprise는 관리자 활성화 | Stable·조건부 | Awareness | [Remote Control](https://code.claude.com/docs/en/remote-control) |
| Chrome 연동 | 지원 | Claude 구독 기반 기능 | Stable·조건부 | Awareness | [Chrome](https://code.claude.com/docs/en/chrome) |
| Computer use | 지원 | macOS CLI, Pro·Max. 공식 문서상 preview 표기 | Preview·조건부 | 제외 | [Computer use](https://code.claude.com/docs/en/computer-use) |

## 교육에서 강조할 변경점

### 1. 권한 모드 명칭

현재 공식 문서는 다음 모드를 구분합니다.

```text
Manual / default
acceptEdits
plan
auto
dontAsk
bypassPermissions
```

교육에서는 **Manual 또는 Plan부터 시작**합니다. `bypassPermissions`는 격리된 컨테이너·VM 외에는 사용하지 않습니다.

### 2. 메모리는 두 종류

- `CLAUDE.md`: 사람이 작성하는 지속 지침
- Auto memory: Claude가 교정·선호·발견을 Markdown으로 기록

둘 다 강제 정책이 아닙니다. 반드시 차단하거나 실행할 규칙은 권한 규칙 또는 Hook을 사용합니다.

### 3. Agent teams는 Experimental

Subagent와 달리 여러 독립 Claude Code 세션이 공유 작업 목록과 메시지로 협업합니다. 현재 공식 문서상 Experimental이므로 설정 실습 없이 존재와 제한만 소개합니다.

### 4. 구독·제공자 조건

CLI, VS Code, Skills, Subagents, Hooks, CLAUDE.md, Plugins, MCP, Checkpoints 등 로컬 기능은 폭넓게 지원됩니다. Web, Desktop, Remote Control, Chrome 등은 Claude 구독이나 조직 관리자 활성화가 필요할 수 있습니다.

## 교육 직전 확인 체크리스트

1. [Claude Code Changelog](https://code.claude.com/docs/en/changelog)의 최신 버전과 주요 변경을 확인한다.
2. [Feature availability](https://code.claude.com/docs/en/feature-availability)에서 교육 계정·제공자의 조건을 확인한다.
3. [Permission modes](https://code.claude.com/docs/en/permission-modes)의 모드 명칭과 전환 방식을 확인한다.
4. VS Code 확장 화면과 메뉴가 발표 캡처와 일치하는지 확인한다.
5. Experimental·Preview·Admin-enabled 표기가 누락되지 않았는지 확인한다.

---

**핵심 공식 자료:** [Documentation index](https://code.claude.com/docs/llms.txt) · [Feature availability](https://code.claude.com/docs/en/feature-availability) · [Release notes](https://github.com/anthropics/claude-code/releases)
