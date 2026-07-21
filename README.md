# Claude Code 2시간 파트 전파 교육

Solution PE팀 Staff를 대상으로 **VS Code → GitHub 저장소·Pages → Claude Code → 테스트·diff → commit·Pull Request**의 완결형 작업 흐름을 익히는 GitHub Pages 교육 사이트입니다.

- 발표 모드: `https://wys1110.github.io/claude-code-part-training/slides/`
- 참가자용 교재: `https://wys1110.github.io/claude-code-part-training/`
- GitHub Pages 실습 교재: `https://wys1110.github.io/claude-code-part-training/guide/04-github-repository-pages`
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

참가자는 GitHub 웹 UI만으로 다음 흐름을 직접 수행합니다.

```text
Public Repository 생성
→ README 첫 Commit
→ index.html 생성·Commit
→ Settings → Pages
→ Deploy from a branch
→ main / (root)
→ Actions 성공 확인
→ 공개 URL 접속
→ 수정 후 재배포
```

실습 저장소 규칙:

```text
Repository: my-first-pages-<github-id>
Description: My first GitHub Pages practice site
Visibility: Public
Initialize: Add a README file
```

배포 방식 구분:

- 단순 HTML·CSS·JavaScript: `Deploy from a branch`
- VitePress·Vue·React 등 빌드 프로젝트: `GitHub Actions`

Public 저장소와 Pages 사이트에는 회사 코드, 업무 문서, 실제 로그, 개인정보, 인증 정보, 비공개 URL을 넣지 않습니다.

## 주요 자료

### 참가자용

- `slides/index.md`: 44장 발표 모드
- `slides/pages-deck.ts`: GitHub 저장소·Pages 실습이 반영된 발표 데이터
- `guide/00-course-overview.md`: 2시간 과정과 완료 기준
- `guide/01-environment.md`: 교육 전 설치·계정·실습 점검
- `guide/02-vscode-basics.md`: Explorer·Terminal·Source Control·diff
- `guide/03-git-github-basics.md`: Git·GitHub·Branch·Commit·Push·PR
- `guide/04-github-repository-pages.md`: 웹 UI에서 저장소 생성·Pages 배포·재배포
- `guide/01-concept.md`: Claude Code 에이전트 개념
- `guide/03-useful-features.md`: Plan Mode·CLAUDE.md·Skills·Subagents·MCP·Hooks
- `guide/04-latest-feature-map.md`: 최신 공식 기능 검증표
- `guide/09-integrated-demo.md`: 저장소에서 Commit까지 라이브 시연
- `guide/05-lab.md`: 의도된 오류를 수정하는 실습
- `labs/github-pages-starter/`: Pages 실습용 공개 HTML

### 강사용

- `instructor/120min-runbook.md`: 분 단위 진행안과 멘트
- `instructor/github-pages-demo-script.md`: 15분 Repository·Pages 시연 대본
- `instructor/slide-speaker-notes.md`: 44장 발표자 노트
- `instructor/live-demo-script.md`: 15분 Claude Code 통합 시연 대본
- `instructor/lab-answer-key.md`: 실습 정답·힌트·평가표
- `instructor/content-touch-strategy.md`: 주제별 깊이·시연·질문·생략 기준
- `instructor/preflight-checklist.md`: 교육 전 점검과 실패 대응

## 교육 설계 원칙

- Core 주제는 설명·시연·직접 실습까지 진행
- 단순 HTML은 Branch 배포, 빌드 프로젝트는 Actions 배포로 구분
- GitHub UI 버튼 위치뿐 아니라 Repository·Commit·배포 상태 변화를 설명
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

GitHub Pages starter 확인:

```text
labs/github-pages-starter/index.html
```

> task-board 실습 테스트는 교육을 위해 처음에는 일부 실패하도록 설계되어 있습니다.

## GitHub Pages

```text
https://wys1110.github.io/claude-code-part-training/
```

이 저장소는 `main` 반영 시 GitHub Actions로 VitePress 사이트를 빌드·배포합니다. 참가자 실습 저장소는 별도 빌드가 없는 단순 HTML이므로 `Deploy from a branch`를 사용합니다.

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
- https://docs.github.com/en/get-started/start-your-journey/uploading-a-project-to-github
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## 보안

교육 예제에는 내부 코드, 실제 로그, 비공개 URL, 인증 정보, 고객·개인 정보를 넣지 않습니다. Public 저장소에 민감자료를 Commit한 뒤 삭제하거나 Private으로 전환하는 방식은 안전한 대응이 아닙니다. 실제 업무 적용 전 조직의 AI·보안 정책과 허용 계정을 확인하세요.
