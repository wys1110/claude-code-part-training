import { slides as baseSlides, type Slide } from './deck'

const createRepoDocs = {
  label: 'GitHub Docs: Create repository',
  url: 'https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository'
}
const createPagesDocs = {
  label: 'GitHub Docs: Create Pages site',
  url: 'https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site'
}
const pagesApiDocs = {
  label: 'GitHub REST: Pages',
  url: 'https://docs.github.com/en/rest/pages/pages'
}
const ghApiDocs = {
  label: 'GitHub CLI: gh api',
  url: 'https://cli.github.com/manual/gh_api'
}

const participantPrompt = `아래 GitHub 저장소를 발표자료 전용 GitHub Pages 사이트로 만들어줘.

저장소 주소:
[REPOSITORY_URL]

저장소를 clone하고 발표자료 파일만 만들어줘.
변경사항을 검토한 뒤 main에 commit·push하고,
main 브랜치의 / 폴더로 GitHub Pages를 활성화해줘.
마지막으로 공개 URL과 배포 상태를 알려줘.
기존 파일 삭제와 force push는 하지 마.`

const replacements: Record<number, Slide> = {
  10: {
    id: 10, section: 'Git & GitHub', minutes: 2,
    kicker: 'Simple workflow', title: '사람은 목적을 정하고 Claude Code는 실행한다',
    columns: [
      { title: '사람', items: ['Public Repository 생성', '저장소 URL 복사', '변경·권한·공개 범위 승인'] },
      { title: 'Claude Code', items: ['Clone', '발표자료 생성', 'Commit·Push', 'Pages 활성화·상태 확인'] }
    ],
    callout: 'Repository 생성 → URL 복사 → Claude Code에 완료 기준 전달',
    notes: ['Git 명령과 Pages 메뉴를 모두 암기하는 실습이 아니다.', '자동화하더라도 공개 설정, Push 대상, 변경 파일은 사람이 확인한다.'],
    action: '사람이 반드시 확인해야 할 항목을 한 가지 말한다.',
    transition: '먼저 발표자료를 담을 빈 Repository를 만든다.',
    guide: '/guide/04-github-repository-pages',
    sources: [createRepoDocs]
  },
  11: {
    id: 11, section: 'Git & GitHub', minutes: 2,
    title: '1. Public Repository 만들기',
    flow: ['+ 메뉴', 'New repository', '이름 입력', 'Public', 'README 추가', 'Create repository'],
    code: 'Repository: claude-code-presentation-<github-id>\nVisibility: Public\nInitialize: Add a README file',
    callout: 'Public 저장소와 Pages 사이트는 인터넷에서 누구나 볼 수 있다.',
    notes: ['Owner가 개인 계정인지 확인한다.', 'README를 추가하면 main 브랜치가 즉시 생성되어 Clone과 Push가 단순해진다.', '회사 자료와 개인정보를 넣지 않는다고 다시 확인한다.'],
    action: '자신의 GitHub ID가 포함된 새 Public 저장소를 만든다.',
    transition: '만든 저장소의 HTTPS 주소 하나만 복사한다.',
    guide: '/guide/04-github-repository-pages',
    sources: [createRepoDocs, createPagesDocs]
  },
  12: {
    id: 12, section: 'Git & GitHub', minutes: 2,
    title: '2. Repository 주소 복사',
    flow: ['Repository 열기', 'Code', 'HTTPS', 'URL 복사'],
    code: 'https://github.com/<github-id>/claude-code-presentation-<github-id>.git',
    quote: '복사할 것은 토큰이 아니라 Repository URL이다.',
    notes: ['Code 버튼의 HTTPS 탭에서 URL을 복사한다.', '주소의 owner와 repository 이름을 함께 읽어준다.', '인증 토큰·쿠키·브라우저 개발자 정보는 복사하지 않는다.'],
    action: 'Repository URL을 메모장에 붙여 넣고 owner/name이 맞는지 확인한다.',
    transition: '이 URL과 완료 기준을 Claude Code에 한 번에 전달한다.',
    guide: '/guide/04-github-repository-pages',
    sources: [createRepoDocs]
  },
  13: {
    id: 13, section: 'Git & GitHub', minutes: 2,
    title: '3. Claude Code에 한 번에 요청',
    prompt: participantPrompt,
    callout: '중요한 것은 긴 명령어가 아니라 대상 URL·최종 결과·금지사항이다.',
    notes: ['프롬프트에 실제 Repository URL을 넣는다.', 'Pages 루트에는 소개 문서가 아니라 발표자료가 바로 열려야 한다고 강조한다.', '실행 전 Claude가 제시한 계획과 필요한 권한을 읽는다.'],
    action: 'URL을 넣은 프롬프트를 Claude Code에 붙여 넣는다.',
    transition: 'Claude Code가 어떤 순서로 작업하는지 확인한다.',
    guide: '/guide/04-github-repository-pages'
  },
  14: {
    id: 14, section: 'Git & GitHub', minutes: 2,
    title: '4. Claude Code가 수행하는 작업',
    flow: ['환경·권한 확인', 'Clone', '발표자료 생성', 'Diff 검토', 'Commit', 'Push'],
    code: 'index.html\nstyles.css\npresentation.js',
    callout: 'Pages 루트 주소에서 발표자료가 바로 열리도록 정적 파일만 만든다.',
    notes: ['VitePress나 React를 새로 설치하지 않고 단순 정적 사이트를 기본으로 한다.', 'Commit 전에 git status와 diff를 보여달라고 한다.', 'main과 origin URL이 맞는지 확인한 뒤 Push를 승인한다.'],
    action: 'Claude가 제시한 변경 파일과 Push 대상을 확인한다.',
    transition: 'Push가 끝나면 API로 Pages 설정을 확인하고 필요한 경우 생성한다.',
    guide: '/guide/04-github-repository-pages'
  },
  15: {
    id: 15, section: 'Git & GitHub', minutes: 3,
    title: '5. GitHub Pages 자동 활성화',
    code: `gh api repos/<owner>/<repo>/pages

# 404이면 생성
gh api --method POST repos/<owner>/<repo>/pages \\
  -f build_type=legacy \\
  -f 'source[branch]=main' \\
  -f 'source[path]=/'`,
    bullets: ['gh 로그인과 저장소 관리 권한 필요', '이미 활성화돼 있으면 현재 설정 재사용', 'source = main /', '기존 설정을 불필요하게 변경하지 않기'],
    callout: '404는 Pages 미생성을 의미할 수 있다. 인증·권한 오류와 구분한다.',
    notes: ['gh api는 인증된 GitHub REST 요청을 실행한다.', 'source의 branch와 path는 발표자료 파일 위치와 일치해야 한다.', '설정 변경 전 기존 Pages 응답의 build_type과 source를 확인한다.'],
    action: 'Pages 설정 응답에서 branch, path, html_url을 확인한다.',
    transition: '마지막으로 공개 URL에서 발표 기능이 실제로 동작하는지 검증한다.',
    guide: '/guide/04-github-repository-pages',
    sources: [pagesApiDocs, ghApiDocs]
  },
  16: {
    id: 16, section: 'Git & GitHub', minutes: 2,
    title: '6. 발표 주소와 기능 확인',
    flow: ['Push 성공', 'Pages built', 'html_url', '발표자료 바로 실행', '기능 점검'],
    code: 'https://<github-id>.github.io/<repository-name>/',
    bullets: ['첫 화면이 발표자료인가', '← →·Space 이동', '#slide=번호 유지', '전체 화면·노트·PDF 버튼', '모바일 화면'],
    callout: '“Pages 활성화”가 아니라 “공개 URL에서 발표가 동작함”이 완료 기준이다.',
    notes: ['배포 직후에는 잠시 지연될 수 있다.', '404이면 Pages status, source, root index.html, 정확한 URL을 순서대로 확인한다.', '실행하지 못한 검증은 성공으로 보고하지 않는다.'],
    action: '공개 URL을 열고 다음 슬라이드 이동과 새로고침을 확인한다.',
    transition: '이제 같은 방식으로 Claude Code가 코드 작업을 수행하는 원리를 본다.',
    guide: '/guide/04-github-repository-pages',
    sources: [createPagesDocs, pagesApiDocs]
  }
}

export const slides: Slide[] = baseSlides.map((slide) => replacements[slide.id] ?? slide)
