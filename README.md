# Claude Code 2시간 파트 전파 교육

Solution PE팀 Staff를 대상으로 **VS Code → Git·GitHub → Claude Code → 테스트·diff → commit·Pull Request**의 완결형 작업 흐름을 익히는 GitHub Pages 교육 사이트입니다.

## 교육 대상

- Solution PE팀 Staff
- 개발 경험 초급~중급 혼합
- Git·GitHub 경험이 없어도 참여 가능

## 120분 구성

| 구간 | 시간 |
|---|---:|
| 오프닝 | 5분 |
| VS Code 기본 | 15분 |
| Git·GitHub 기본 | 15분 |
| Claude Code 개념 | 15분 |
| 핵심 기능 | 15분 |
| 휴식 | 10분 |
| 통합 라이브 시연 | 15분 |
| 참가자 실습 | 20분 |
| 보안·팀 적용·정리 | 10분 |

## 주요 자료

### 참가자용

- `guide/00-course-overview.md`: 2시간 과정과 완료 기준
- `guide/01-environment.md`: 교육 전 설치·계정·실습 점검
- `guide/02-vscode-basics.md`: Explorer·Terminal·Source Control·diff
- `guide/03-git-github-basics.md`: Fork·Clone·Branch·Commit·Push·PR
- `guide/01-concept.md`: Claude Code 에이전트 개념
- `guide/03-useful-features.md`: Plan Mode·CLAUDE.md·Skills·Subagents·MCP·Hooks
- `guide/09-integrated-demo.md`: 저장소에서 Pull Request까지 라이브 시연
- `guide/05-lab.md`: 의도된 오류를 수정하는 실습

### 강사용

- `instructor/120min-runbook.md`: 5~15분 단위 진행안과 멘트
- `instructor/content-touch-strategy.md`: 주제별 깊이·시연·질문·생략 기준
- `instructor/preflight-checklist.md`: 교육 전 점검과 실패 대응

## 교육 설계 원칙

- Core 주제는 설명·시연·직접 실습까지 진행
- 고급 기능은 사용 시점과 도입 기준 중심으로 소개
- 수정 전 baseline 테스트와 계획 확인
- 테스트 통과 후에도 VS Code diff를 직접 검토
- 공개 예제만 사용하고 실제 업무 자료는 조직 정책 확인 후 적용

## 로컬 실행

```bash
npm install
npm run docs:dev
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

> 실습 테스트는 교육을 위해 처음에는 일부 실패하도록 설계되어 있습니다.

## GitHub Pages

```text
https://wys1110.github.io/claude-code-part-training/
```

이 저장소는 `main` 반영 시 GitHub Actions로 VitePress 사이트를 배포합니다.

## 콘텐츠 업데이트 원칙

Claude Code와 VS Code는 계속 업데이트됩니다. 기능·설치·권한 설명은 공식 문서를 기준으로 정기 확인합니다.

- https://code.claude.com/docs/en/overview
- https://code.claude.com/docs/en/ide-integrations
- https://code.claude.com/docs/en/permission-modes
- https://code.claude.com/docs/en/features-overview
- https://code.visualstudio.com/docs/sourcecontrol/overview
- https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository

## 보안

교육 예제에는 내부 코드, 실제 로그, 비공개 URL, 인증 정보, 고객·개인 정보를 넣지 않습니다. 실제 업무 적용 전 조직의 AI·보안 정책과 허용 계정을 확인하세요.
