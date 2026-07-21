# 3. 유용한 기능

<div class="badge-row"><span>난이도: 입문~중급</span><span>권장 시간: 15~25분</span><span>핵심: 반복 설명과 반복 작업 줄이기</span></div>

## 기능 지도

| 기능 | 무엇을 해결하나 | 처음 쓸 시점 |
|---|---|---|
| Plan Mode | 성급한 수정 방지 | 복잡하거나 위험한 변경 전 |
| `CLAUDE.md` | 프로젝트 규칙 반복 설명 제거 | 팀 사용을 시작할 때 |
| Skills | 반복 업무를 명령처럼 재사용 | 같은 절차가 3회 이상 반복될 때 |
| Subagents | 조사·리뷰를 별도 컨텍스트로 분리 | 큰 코드베이스·병렬 조사 |
| MCP | 외부 시스템과 연결 | Jira, Drive, DB 등 연동 필요 시 |
| Hooks | 특정 이벤트마다 자동 실행 | 포맷·린트·정책 검사 자동화 |
| Git 기능 | diff·commit·PR 업무 단축 | 변경 검증 후 |

## 1) Plan Mode

Claude가 분석과 계획은 하되 파일 수정이나 명령 실행을 제한하는 모드입니다.

```bash
claude --permission-mode plan
```

추천 상황:

- 여러 모듈에 영향을 주는 변경
- 데이터 마이그레이션
- 기존 동작 보존이 중요한 리팩터링
- 작업 범위가 아직 불명확한 요청

## 2) `CLAUDE.md`

프로젝트 루트에 두는 팀 공용 작업 지침입니다. 세션마다 자동으로 읽습니다.

```markdown
# Project guide

## Commands
- Install: npm ci
- Test: npm test
- Lint: npm run lint

## Rules
- 변경 전에 관련 테스트를 먼저 확인한다.
- public API를 변경하면 문서와 테스트를 함께 수정한다.
- 완료 전에 test와 lint를 실행한다.
```

좋은 `CLAUDE.md`는 짧고 구체적이며, 실제 명령과 금지사항이 명확합니다.

```text
/init
/memory
```

- `/init`: 프로젝트를 분석해 초기 `CLAUDE.md` 작성 지원
- `/memory`: 현재 로드된 지침과 메모 확인

## 3) Skills

반복 가능한 지식·절차를 Markdown으로 패키징합니다. 예를 들어 `/review-pr`, `/write-test-plan` 같은 팀 명령을 만들 수 있습니다.

추천 예:

- PR 리뷰 체크리스트
- 장애 분석 절차
- API 추가 표준 절차
- 릴리스 노트 작성 규칙

```text
.claude/skills/review-pr/SKILL.md
```

Skills는 팀원이 같은 품질 기준과 작업 순서를 재사용하게 만드는 데 유용합니다.

## 4) Subagents

별도 컨텍스트에서 특정 역할을 수행하고 요약 결과만 반환합니다.

```text
보안 관점과 테스트 관점으로 각각 별도 조사한 뒤 핵심 결과를 합쳐줘.
```

추천 상황:

- 많은 파일을 읽는 조사
- 보안·성능·테스트 등 전문 관점 분리
- 메인 대화의 컨텍스트를 아끼고 싶을 때

## 5) MCP

외부 데이터와 도구를 Claude Code에 연결하는 표준입니다.

예:

- Jira 이슈 읽기·업데이트
- Google Drive 설계 문서 조회
- 사내 도구 또는 데이터베이스 질의
- 브라우저 자동화

::: warning 연결 전 확인
MCP 서버는 신뢰할 수 있는 제공자 또는 직접 관리하는 서버만 사용하고, 쓰기 권한은 최소화하세요.
:::

## 6) Hooks

Claude Code의 특정 이벤트 전후에 스크립트·HTTP 요청·프롬프트 등을 실행합니다.

예:

- 파일 수정 후 formatter 실행
- commit 전 lint 실행
- 금지된 경로 또는 명령 차단
- 작업 완료 후 로그 남기기

Hooks는 **Claude가 기억해서 해주길 바라는 규칙**보다 **항상 강제되어야 하는 자동화**에 적합합니다.

## 7) Git 워크플로

```text
현재 변경사항을 설명해줘.
잠재적 회귀와 누락된 테스트를 리뷰해줘.
변경 범위에 맞는 커밋 메시지 후보를 만들어줘.
PR 본문 초안을 작성해줘.
```

실제 commit·push·PR 생성 전에 diff와 대상 브랜치를 사람이 확인해야 합니다.

## 우선순위 추천

<div class="flow"><div>1. CLAUDE.md</div><div>2. Skills</div><div>3. Hooks·MCP</div></div>

처음부터 모든 기능을 도입하지 말고, 반복되는 문제가 확인될 때 하나씩 추가합니다.

---

**공식 참고:** [Claude Code 확장 기능](https://code.claude.com/docs/en/features-overview) · [.claude 디렉터리](https://code.claude.com/docs/en/claude-directory)
