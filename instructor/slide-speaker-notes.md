# 슬라이드별 발표자 노트

<div class="badge-row"><span>슬라이드: 44장</span><span>총 시간: 120분</span><span>발표 모드: N 키</span></div>

발표 모드에서 `N` 키를 누르면 현재 슬라이드의 상세 노트, 참가자 행동, 다음 전환 문장이 표시됩니다. 이 문서는 리허설과 출력용 요약본입니다.

## 운영 규칙

- 한 번에 10분 이상 설명하지 않습니다.
- 슬라이드의 문구를 그대로 읽지 말고 **왜 필요한지 → 화면에서 무엇을 볼지 → 참가자가 무엇을 할지** 순서로 말합니다.
- 라이브 데모에서는 결과보다 branch, baseline, Plan, test, diff를 반복해서 확인합니다.
- GitHub Pages 구간은 메뉴 암기보다 **저장소 URL + 완료 기준 + 검토 지점**을 강조합니다.
- 시간이 밀리면 Awareness 항목을 줄이고 VS Code diff·Plan·test·공개 설정 검토는 유지합니다.

## 1~3. 오프닝 — 5분

### 1. Claude Code 실무 활용 — 1분

- 기능 소개가 아니라 GitHub 저장소를 안전하게 수정하고 PR로 전달하는 전체 흐름임을 선언합니다.
- 공식 문서 확인일과 릴리스 버전을 화면에서 짚습니다.
- 질문: VS Code, GitHub, Claude Code 사용 경험을 손들기로 확인합니다.

**전환:** “교육이 끝났을 때 무엇을 혼자 할 수 있어야 하는지부터 보겠습니다.”

### 2. 오늘의 완료 기준 — 2분

- 저장소 받기부터 PR까지를 하나의 작업으로 묶습니다.
- GitHub 접근이 제한된 참가자는 commit까지 완료해도 됩니다.
- 참가자가 가장 어려워 보이는 단계를 하나 고르게 합니다.

### 3. 120분 로드맵 — 2분

- 기초 30분, Claude Code 30분, 실전 60분으로 설명합니다.
- 설치 문제는 휴식 시간 또는 Local-only 경로로 전환한다고 미리 알립니다.

## 4~9. VS Code — 15분

### 4. VS Code는 검증 작업 공간 — 2분

- VS Code를 기능 많은 에디터로 설명하지 않습니다.
- Explorer, Terminal, Source Control, Diff, Claude Code 패널만 사용합니다.
- 핵심 문장: “Claude의 답보다 근거 파일·테스트·diff를 더 자주 봅니다.”

### 5. Explorer — 2분

화면에서 다음 파일을 직접 엽니다.

```text
labs/task-board/src/task-board.js
labs/task-board/test/task-board.test.js
CLAUDE.md
```

- 열린 파일 하나와 저장소 전체의 차이를 설명합니다.
- 참가자도 같은 파일을 찾게 합니다.

### 6. Terminal — 3분

```bash
pwd
git status
cd labs/task-board
npm test
```

- Explorer가 같은 폴더를 보여도 터미널 경로가 다를 수 있습니다.
- 일부러 잘못된 위치에서 `npm test`를 실행한 뒤 경로를 고치는 시연이 효과적입니다.

### 7. Source Control — 3분

- `M`, `U`, `A`, `D` 표시를 실제 화면에서 설명합니다.
- Commit 버튼보다 변경 파일 목록을 먼저 읽습니다.
- 모든 변경을 `git add .`로 stage하지 않는 이유를 묻습니다.

### 8. Diff — 3분

- 테스트는 실행된 기대만 확인하고 diff는 실제 변경 범위를 보여줍니다.
- 포맷 변경, 설정 파일, 의존성 변경, 예상치 못한 삭제를 짚습니다.
- 질문: “테스트가 통과해도 diff를 봐야 하는 이유는?”

### 9. Command Palette + Claude 패널 — 2분

- 메뉴 위치 암기 대신 명령 이름 검색을 보여줍니다.
- 확장은 시각적 검토, CLI는 터미널·고급 설정에 강하다고 정리합니다.

## 10~16. GitHub 저장소·Pages 자동화 — 15분

### 10. 역할 분리 — 2분

- 사람: Public Repository 생성, URL 복사, 변경·Push·공개 설정 승인
- Claude Code: Clone, 발표자료 생성, Commit·Push, Pages 활성화
- 핵심 문장: “자동화하더라도 공개 범위와 변경 파일은 사람이 확인합니다.”

### 11. Public Repository 생성 — 2분

```text
+ → New repository → 이름 → Public → README → Create repository
```

- Owner가 개인 계정인지 확인합니다.
- README를 추가해 `main` 브랜치를 바로 만듭니다.
- 회사 코드·문서·로그·개인정보·인증 정보는 넣지 않습니다.

### 12. Repository URL 복사 — 2분

```text
Code → HTTPS → Copy URL
```

- URL의 owner/repository가 방금 만든 저장소와 일치하는지 확인합니다.
- Repository URL만 복사하며 토큰이나 비밀번호는 공유하지 않습니다.

### 13. Claude Code에 요청 — 2분

화면의 프롬프트에 실제 URL을 넣습니다.

- 대상: 어떤 저장소인가?
- 최종 결과: Pages 루트에서 발표자료가 바로 실행되는가?
- 금지사항: 기존 파일 삭제와 force push 금지
- 검증: Commit 전 diff, Push 전 branch와 remote 확인

질문: “이 프롬프트에서 가장 중요한 완료 기준은 무엇입니까?”

### 14. Claude Code 작업 흐름 — 2분

```text
환경·권한 확인 → Clone → 발표자료 생성 → Diff → Commit → Push
```

- 기본 파일은 `index.html`, `styles.css`, `presentation.js`입니다.
- 문서 사이트나 불필요한 프레임워크를 만들지 않게 합니다.
- Push 승인 전에 `main`과 `origin`을 확인합니다.

### 15. Pages API 활성화 — 3분

```bash
gh api repos/<owner>/<repo>/pages
```

Pages가 없으면:

```bash
gh api --method POST repos/<owner>/<repo>/pages \
  -f build_type=legacy \
  -f 'source[branch]=main' \
  -f 'source[path]=/'
```

- `gh` 로그인과 Pages 관리 권한이 필요합니다.
- 404를 무조건 Pages 미생성으로 단정하지 않고 주소와 권한을 함께 확인합니다.
- 응답의 `status`, `html_url`, `source.branch`, `source.path`를 읽습니다.

### 16. 공개 URL 검증 — 2분

- Pages 루트 주소에서 발표 첫 장이 바로 보여야 합니다.
- 방향키·Space, `#slide=번호`, 전체 화면, 개요, 노트, PDF, 모바일 화면을 확인합니다.
- 핵심 문장: “Pages를 켠 것이 아니라 공개 URL에서 발표가 동작해야 완료입니다.”

## 17~22. Claude Code 개념 — 15분

### 17. 한 문장 정의 — 2분

- “개발 환경에서 도구를 사용해 작업하는 에이전트”로 정의합니다.
- 자동 정답 생성기라는 기대를 교정합니다.

### 18. 할 수 있는 일 — 2분

- 탐색, 작업, 검증 세 묶음으로 설명합니다.
- 실제 접근 범위는 실행 위치·권한·설정·조직 정책에 따라 달라집니다.

### 19. Agent loop — 3분

```text
이해 → 계획 → 실행 → 검증 → 리뷰
```

- 실패나 위험이 보이면 다시 이해·계획으로 돌아갑니다.
- 질문: “‘바로 수정해줘’에서 빠진 단계는?”

### 20. 책임 분리 — 3분

- 사람: 요구사항, 권한, 민감정보, 최종 승인
- Claude: 탐색, 수정, 명령, 테스트, 요약
- 핵심 문장: “작업 수행과 정답 여부는 별개입니다.”

### 21. 권한 모드 — 3분

- Manual/default, acceptEdits, plan, auto, dontAsk, bypassPermissions를 구분합니다.
- 교육은 Manual 또는 Plan부터 시작합니다.
- `bypassPermissions`는 격리된 환경 외에는 사용하지 않습니다.

### 22. 기본 안전 원칙 — 2분

- branch, Plan, 제한된 범위, 테스트, diff, 민감정보 판단을 한 세트로 묶습니다.

## 23~30. 핵심 기능 — 15분

### 23. VS Code 통합 — 2분

- @-mention, 인라인 diff, Plan 검토, 모드 선택을 보여줍니다.
- VS Code 확장과 CLI 중 하나만 고집하지 않습니다.

### 24. Permission modes 최신 지도 — 3분

- Manual은 UI 명칭, 설정 값은 `default`라는 점을 말합니다.
- Auto mode는 계정·모델 제공자 조건을 확인해야 합니다.
- 모드는 채팅으로 요청하는 것이 아니라 UI 또는 설정에서 바꿉니다.

### 25. Plan Mode — 2분

- 계획은 긴 문서를 만들기 위한 것이 아니라 위험한 가정을 조기에 찾는 단계입니다.
- 참가자에게 불필요한 파일과 누락된 테스트를 찾게 합니다.

### 26. CLAUDE.md + Auto memory — 2분

- CLAUDE.md는 사람이 작성하는 지침입니다.
- Auto memory는 Claude가 기록하며 `/memory`로 감사·수정합니다.
- 둘 다 강제 정책이 아니므로 차단은 권한 규칙·Hook으로 처리합니다.

### 27. 좋은 요청 — 2분

```text
범위 + 제약 + 완료 기준 + 검증
```

- 문장 꾸미기보다 작업 계약을 명확히 하는 문제입니다.

### 28. Skills — 1.5분

- 세 번 이상 반복되는 절차를 Skill 후보로 봅니다.
- 설정 실습은 하지 않습니다.

### 29. Subagents — 1분

- 큰 조사와 전문 관점을 별도 컨텍스트로 분리합니다.
- Agent teams와 혼동하지 않게 합니다.

### 30. 확장 기능 지도 — 1.5분

- CLAUDE.md·Rules·Memory: 지침
- Skills·Subagents·Plugins: 재사용 작업
- MCP·Hooks·Actions: 통합과 자동화
- Agent teams는 Experimental이라고 명시합니다.

## 31. 휴식 — 10분

- `npm test`, branch, Claude 로그인 상태를 확인합니다.
- 설치 문제를 장기 해결하지 않고 관찰·짝 실습·Local-only 중 하나로 전환합니다.

## 32~35. 라이브 데모 — 15분

### 32. 데모 목표 — 2분

- 정답을 빨리 만드는 데모가 아니라 안전한 순서를 보여준다고 선언합니다.

### 33. Branch와 baseline — 4분

- 정지 질문 1: “현재 branch는 무엇입니까?”
- 기존 테스트 실패 개수와 Git 상태를 기록합니다.

### 34. 분석·계획·수정 — 5분

- 정지 질문 2: “계획에 불필요한 변경이 있습니까?”
- 증상과 근본 원인을 구분합니다.
- 합의한 파일과 범위 안에서만 수정합니다.

### 35. 테스트·Diff·Commit — 4분

- 정지 질문 3: “테스트가 통과한 뒤 무엇을 봐야 합니까?”
- 정지 질문 4: “Commit 전에 어떤 파일이 stage됐습니까?”

## 36~39. 참가자 실습 — 20분

### 36. 시작 상태 — 2분

- branch, 제한 시간, 힌트 사용 방식, Local-only 대안을 설명합니다.

### 37. 실습 1 — 8분

- 정답을 주지 말고 현재 단계와 근거 파일을 묻습니다.
- 힌트: 입력 검증 → `trim()` → `tasks.length + 1`

### 38. 실습 2 — 7분

- 기존 코드 스타일과 테스트 품질을 확인합니다.
- 빠른 참가자는 CLAUDE.md 또는 PR 본문을 작성합니다.

### 39. 완료 체크 — 3분

- 10개 중 8개 이상이면 성공입니다.
- PR이 불가능한 경우 commit hash를 확인합니다.

## 40~41. 보안과 업무 적용 — 5분

### 40. 위험 대응 — 3분

- 추상적 경고보다 위험과 행동을 연결합니다.
- 조직 정책이 불명확하면 입력하지 않는 것이 기본값입니다.

### 41. Solution PE팀 적용 — 2분

- 분석, 자동화, 문서 세 영역으로 일반화된 후보를 제시합니다.
- 참가자가 공개 예제로 시험할 작은 업무 하나를 적습니다.

## 42~44. 마무리 — 5분

### 42. 다섯 원칙 — 2분

1. 먼저 읽게 한다.
2. Plan을 검토한다.
3. 범위·제약·완료 기준·검증을 준다.
4. 테스트와 diff를 본다.
5. 권한과 민감정보는 사람이 책임진다.

### 43. 치트시트 — 2분

- 표준 프롬프트와 Git 명령을 복사하게 합니다.

### 44. Q&A — 1분

- 질문이 없으면 다음 주 적용 후보를 1~2개 공유합니다.
- 교육 후 기능 검증표의 확인 날짜를 갱신합니다.
