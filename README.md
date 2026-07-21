# Claude Code 파트 전파 교육

Claude Code의 **개념 → 유용한 기능 → 실습 → 팀 적용·보안**을 한 번에 진행할 수 있는 GitHub Pages 교육 사이트입니다.

## 구성

- 60분 / 90분 교육안
- Claude Code 에이전트 개념
- Plan Mode, CLAUDE.md, Skills, Subagents, MCP, Hooks, Git 워크플로
- 좋은 요청 작성 패턴
- 의도적으로 오류가 포함된 Node.js 실습 프로젝트
- 팀 적용 순서와 보안 체크리스트
- 빠른 치트시트

## 로컬 실행

```bash
npm ci
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

## GitHub Pages 배포

이 저장소는 GitHub Actions 기반 Pages 배포 워크플로를 포함합니다.

1. 프로젝트를 `main` 브랜치에 반영합니다.
2. **Settings → Pages → Build and deployment → Source**를 `GitHub Actions`로 설정합니다.
3. Actions의 `Deploy VitePress site to Pages` 완료 후 Pages URL을 확인합니다.

기본 URL:

```text
https://wys1110.github.io/claude-code-part-training/
```

저장소 이름을 바꾸면 `.vitepress/config.mts`의 `base` 경로도 수정해야 합니다.

## 콘텐츠 업데이트 원칙

Claude Code는 빠르게 바뀌는 제품입니다. 기능·설치 명령은 아래 공식 문서를 기준으로 정기 확인하세요.

- https://code.claude.com/docs/ko/overview
- https://code.claude.com/docs/en/how-claude-code-works
- https://code.claude.com/docs/en/features-overview
- https://github.com/anthropics/claude-code

## 보안

교육 예제에는 회사명, 내부 코드, 비공개 URL, 자격 증명을 넣지 않습니다. 실제 업무 적용 전 조직의 AI·보안 정책을 확인하세요.
