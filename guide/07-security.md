# 보안과 권한

<div class="badge-row"><span>난이도: 필수</span><span>권장 시간: 5분</span><span>공식 문서 확인: 2026-07-21</span></div>

## 교육에서 반드시 전달할 원칙

::: danger 조직 정책 우선
회사 코드·설계·로그·고객 데이터·접근 토큰을 사용하기 전에 조직이 승인한 계정, 모델 제공 경로, 데이터 처리 정책을 확인해야 합니다. 승인 여부를 모르면 입력하지 않습니다.
:::

## 현재 권한 모드

Claude Code는 파일 읽기, 수정, 셸 명령, 네트워크 요청 등에 대한 승인 흐름을 권한 모드로 조절합니다.

| 모드 | 자동 허용 범위 | 권장 상황 |
|---|---|---|
| `Manual` / `default` | 읽기 | 처음 시작, 민감한 저장소 |
| `acceptEdits` | 읽기·파일 편집·일반 파일 명령 | 변경을 계속 검토하는 반복 작업 |
| `plan` | 읽기 | 수정 전 탐색과 계획 |
| `auto` | 안전 분류 아래 장기 작업 | 계정·제공자·조직 정책 확인 후 |
| `dontAsk` | 사전 승인한 도구만 | 고정된 CI·자동화 |
| `bypassPermissions` | 모든 작업 | 격리된 컨테이너·VM 전용 |

- CLI에서는 `Shift+Tab`, VS Code에서는 모드 선택기로 전환합니다.
- UI의 **Manual** 모드 설정 값은 `default`입니다.
- 교육은 **Manual 또는 Plan부터 시작**합니다.
- `bypassPermissions`는 일반 업무의 편의 기능으로 사용하지 않습니다.
- 모드와 별도로 deny·ask 규칙, 보호 경로, 조직 정책이 적용될 수 있습니다.

## 위험과 권장 행동

| 위험 | 잘못된 행동 | 권장 행동 |
|---|---|---|
| 민감정보 | 회사 코드·로그를 무조건 입력 | 조직 정책 확인 후 공개 예제부터 사용 |
| 과도한 권한 | 모든 실행을 자동 승인 | Manual 또는 Plan부터 시작 |
| 넓은 수정 | 저장소 전체 리팩터링 요청 | 파일·완료 기준·금지 범위 제한 |
| 검증 누락 | Claude의 완료 메시지를 신뢰 | 테스트와 diff 직접 확인 |
| 외부 연결 | MCP에 광범위한 쓰기 권한 | 읽기 우선, 최소 scope 적용 |
| Git 실수 | main에서 바로 작업 | 별도 branch와 작은 commit 사용 |
| 의존성 위험 | 임의 패키지 설치 승인 | 목적·출처·영향을 먼저 확인 |

## 절대 입력하거나 커밋하지 않을 것

- 비밀번호, API 키, 인증 토큰
- 고객·임직원 개인정보
- 미공개 제품·설계·사업 정보
- 접근 권한이 없는 코드나 문서
- `.env`, 인증서, 개인키 원문

## 실행 명령 검토

Claude가 제안한 명령은 실행 전에 아래를 확인합니다.

1. 삭제·덮어쓰기·권한 변경이 있는가?
2. 네트워크 전송 또는 외부 게시가 있는가?
3. 대상 경로와 현재 branch가 맞는가?
4. 운영 환경이나 실데이터에 영향을 주는가?
5. 되돌릴 방법과 checkpoint·Git 이력이 있는가?
6. 새 패키지나 실행 파일의 출처가 신뢰 가능한가?

## 안전한 작업 환경

- 실습용 branch 또는 별도 clone 사용
- 개발 컨테이너·Sandbox·VM 등 격리 고려
- 최소 권한 계정과 테스트 데이터 사용
- baseline 테스트를 먼저 실행
- Git diff와 테스트 결과 확인 후 commit
- 중요한 변경은 동료 리뷰 수행

## CLAUDE.md와 Auto memory는 강제 정책이 아니다

`CLAUDE.md`와 Auto memory는 세션 컨텍스트로 제공되는 지침입니다. Claude가 따르도록 돕지만 보안 통제를 보장하지는 않습니다.

- 행동을 차단하려면 deny·ask 권한 규칙 사용
- 특정 이벤트에서 반드시 검사하려면 `PreToolUse` Hook 사용
- 조직 전체 정책은 managed settings와 관리자 통제 사용

## MCP·Hooks·Plugins

이 기능들은 Claude Code가 사용할 도구와 자동 실행 범위를 확장합니다.

- 제공자와 소스 코드를 신뢰할 수 있는지 확인
- 읽기와 쓰기 권한 분리
- 토큰 scope와 허용 도메인 최소화
- Hook이 실행하는 스크립트와 외부 요청 검토
- 플러그인 업데이트와 marketplace 출처 확인
- 팀 공유 전 조직 보안 기준 확인

## 사고 시 대응

민감정보가 입력되거나 저장소에 커밋되었다면 단순 삭제만으로 끝내지 않습니다.

1. 사용 중지 및 접근 차단
2. 토큰·키 즉시 폐기·교체
3. 저장소 이력·세션·외부 시스템 로그 확인
4. 공개 링크·PR·Artifact 등 추가 노출 확인
5. 조직의 보안 사고 절차에 따라 보고

---

**공식 참고:** [Permission modes](https://code.claude.com/docs/en/permission-modes) · [Permissions](https://code.claude.com/docs/en/permissions) · [Security](https://code.claude.com/docs/en/security) · [Sandboxing](https://code.claude.com/docs/en/sandboxing)
