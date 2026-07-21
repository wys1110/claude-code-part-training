# Claude Code 2시간 파트 전파 교육

Solution PE팀 Staff를 대상으로 **VS Code → GitHub 저장소·Pages → Claude Code → 테스트·diff → commit·Pull Request**의 완결형 작업 흐름을 익히는 GitHub Pages 교육 사이트입니다.

- 발표 모드: `https://wys1110.github.io/claude-code-part-training/slides/`
- 참가자용 교재: `https://wys1110.github.io/claude-code-part-training/`
- Repository URL → Pages 교재: `https://wys1110.github.io/claude-code-part-training/guide/04-github-repository-pages`
- 공식 문서 확인일: **2026-07-21**
- 확인한 최신 Claude Code 릴리스: **v2.1.216**

## 교육 대상

- Solution PE팀 Staff
- 개발 경험 초급~중급 혼합
- Git·GitHub 경험이 없어도 참여 가능

## 발표 모드

`/slides/` 경로에서 44장·120분 발표자료를 실행합니다.

지원 기능:

- 좌우 방향키, Space, Page Up/Down
- 화면 좌우 클릭과 모바일 스와이프
- 슬라이드 번호와 진행률
- `O`: 전체 개요
- `N`: 발표자 노트
- `F`: 전체 화면
- `P`: 인쇄·PDF 저장
- 해시 URL로 현재 슬라이드 유지
- 참가자용 상세 교재 연결

## 120분 구성

| 구간 | 시간 |
|---|---:|
| 오프닝 | 5분 |
| VS Code 기본 | 15분 |
| GitHub 저장소·Pages | 15분 |
| Claude Code 개념 | 15분 |
| 핵심 기능 | 15분 |
| 휴식 | 10분 |
| 통합 라이브 시연 | 15분 |
| 참가자 실습 | 20분 |
| 보안·팀 적용·정리 | 10분 |

## GitHub 저장소·Pages 실습

참가자가 직접 수행하는 단계는 두 가지입니다.

```text
1. Public Repository 생성
2. HTTPS Repository URL 복사
```

그다음 Claude Code에 URL과 완료 기준을 전달합니다.

```text
Repository 생성
→ URL 복사
→ Claude Code에 프롬프트 전달
→ Clone·발표자료 생성
→ Diff 검토
→ Commit·Push
→ Pages API 활성화
→ 공개 발표 URL 확인
```

실습 저장소 규칙:

```text
Repository: claude-code-presentation-<github-id>
Visibility: Public
Initialize: Add a README file
```

Claude Code가 만드는 기본 파일:

```text
index.html
styles.css
presentation.js
```

완료 기준은 GitHub Pages 루트 주소에서 별도 문서 홈 없이 발표자료가 바로 실행되는 것입니다.

Public 저장소와 Pages 사이트에는 회사 코드, 업무 문서, 실제 로그, 개인정보, 인증 정보, 비공개 URL을 넣지 않습니다. 자동화하더라도 Commit 전 diff, Push 대상 branch·remote, Pages source와 최종 URL은 사람이 확인합니다.

## 주요 자료

### 참가자용

- `slides/index.md`: 44장 발표 모드
- `slides/pages-deck.ts`: Repository URL 자동화가 반영된 발표 데이터
- `guide/00-course-overview.md`: 2시간 과정과 완료 기준
- `guide/01-environment.md`: 교육 전 설치·계정·실습 점검
- `guide/02-vscode-basics.md`: Explorer·Terminal·Source Control·diff
- `guide/03-git-github-basics.md`: Git·GitHub·Branch·Commit·Push·PR
- `guide/04-github-repository-pages.md`: 저장소 생성·URL 복사·Claude Code 자동화·Pages 검증
- `guide/01-concept.md`: Claude Code 에이전트 개념
- `guide/03-useful-features.md`: Plan Mode·CLAUDE.md·Skills·Subagents·MCP·Hooks
- `guide/04-latest-feature-map.md`: 최신 공식 기능 검증표
- `guide/09-integrated-demo.md`: 저장소에서 Commit까지 라이브 시연
- `guide/05-lab.md`: 의도된 오류를 수정하는 실습

### 강사용

- `instructor/120min-runbook.md`: 분 단위 진행안과 멘트
- `instructor/github-pages-demo-script.md`: 15분 Repository URL → Pages 시연 대본
- `instructor/slide-speaker-notes.md`: 44장 발표자 노트
- `instructor/live-demo-script.md`: 15분 Claude Code 통합 시연 대본
- `instructor/lab-answer-key.md`: 실습 정답·힌트·평가표
- `instructor/content-touch-strategy.md`: 주제별 깊이·시연·질문·생략 기준
- `instructor/preflight-checklist.md`: 교육 전 점검과 실패 대응

## 교육 설계 원칙

- Core 주제는 설명·시연·직접 실습까지 진행
- GitHub UI 메뉴 전체보다 저장소 URL·완료 기준·검토 지점을 강조
- Claude Code가 Clone·생성·Commit·Push·Pages API를 수행
- 자동화해도 공개 설정과 변경 상태는 사람이 승인
- 수정 전 baseline 테스트와 계획 확인
- 테스트 통과 후에도 VS Code diff를 직접 검토
- 공개 예제만 사용하고 실제 업무 자료는 조직 정책 확인 후 적용

## 로컬 실행

```bash
npm install
npm run docs:dev
```

발표 모드:

```text
http://localhost:5173/claude-code-part-training/slides/
```

빌드 확인:

```bash
npm run docs:build
```

실습 테스트:

```bash
cd labs/task-board
npm test
```

> task-board 실습 테스트는 교육을 위해 처음에는 일부 실패하도록 설계되어 있습니다.

## GitHub Pages

```text
https://wys1110.github.io/claude-code-part-training/
```

이 교육 저장소는 VitePress 빌드 결과물을 GitHub Actions로 배포합니다. 참가자가 새로 만드는 발표자료 저장소는 빌드 없는 정적 파일을 `main`의 `/` 폴더에서 배포하도록 Claude Code가 Pages API를 설정합니다.

## 최신성 관리

교육 전 다음 공식 자료를 다시 확인합니다.

- https://code.claude.com/docs/llms.txt
- https://code.claude.com/docs/en/feature-availability
- https://code.claude.com/docs/en/permission-modes
- https://code.claude.com/docs/en/memory
- https://code.claude.com/docs/en/features-overview
- https://code.claude.com/docs/en/changelog
- https://github.com/anthropics/claude-code/releases
- https://code.visualstudio.com/docs/sourcecontrol/overview
- https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/rest/pages/pages
- https://cli.github.com/manual/gh_api

## 보안

교육 예제에는 내부 코드, 실제 로그, 비공개 URL, 인증 정보, 고객·개인 정보를 넣지 않습니다. Public 저장소에 민감자료를 Commit한 뒤 삭제하거나 Private으로 전환하는 방식은 안전한 대응이 아닙니다. 실제 업무 적용 전 조직의 AI·보안 정책과 허용 계정을 확인하세요.
