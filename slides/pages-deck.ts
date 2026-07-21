import { slides as baseSlides, type Slide } from './deck'

const createRepoDocs = {
  label: 'GitHub Docs: Create repository',
  url: 'https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository'
}
const uploadDocs = {
  label: 'GitHub Docs: Upload a project',
  url: 'https://docs.github.com/en/get-started/start-your-journey/uploading-a-project-to-github'
}
const createPagesDocs = {
  label: 'GitHub Docs: Create Pages site',
  url: 'https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site'
}
const publishingSourceDocs = {
  label: 'GitHub Docs: Publishing source',
  url: 'https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site'
}
const customWorkflowDocs = {
  label: 'GitHub Docs: Custom workflows',
  url: 'https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages'
}

const replacements: Record<number, Slide> = {
  10: {
    id: 10, section: 'Git & GitHub', minutes: 2,
    kicker: 'Web practice', title: 'Git과 GitHub의 역할',
    columns: [
      { title: 'Git', items: ['파일 변경 이력', 'Commit으로 저장점 생성', 'Branch로 작업 분리'] },
      { title: 'GitHub', items: ['원격 Repository', '웹에서 파일·Commit 관리', 'Pages로 사이트 공개'] }
    ],
    callout: '이번 실습은 GitHub 웹에서 Repository → Commit → Pages 배포를 직접 경험한다.',
    notes: ['Git 이론을 길게 설명하지 않는다.', 'Repository는 파일뿐 아니라 변경 이력과 설정을 함께 보관하는 공간이라고 정의한다.'],
    action: 'Git과 GitHub가 각각 담당하는 일을 한 문장씩 말한다.',
    transition: '먼저 실습용 Repository를 새로 만든다.',
    guide: '/guide/04-github-repository-pages',
    sources: [createRepoDocs]
  },
  11: {
    id: 11, section: 'Git & GitHub', minutes: 2,
    title: '새 Repository 만들기',
    flow: ['+ 메뉴', 'New repository', '이름·설명 입력', 'README 선택', 'Create repository'],
    code: 'Repository: my-first-pages-<github-id>\nDescription: My first GitHub Pages practice site',
    callout: 'Owner와 Repository 이름은 공개 URL의 일부가 된다.',
    notes: ['우측 상단 생성 메뉴에서 New repository를 선택한다.', 'Add a README file을 켜면 첫 Commit과 main 브랜치가 함께 만들어진다.', '이름 중복이나 Owner 오선택을 확인한다.'],
    action: '각자 자신의 GitHub ID를 넣은 저장소 이름을 입력한다.',
    transition: '생성 전에 공개 범위가 무엇을 의미하는지 확인한다.',
    guide: '/guide/04-github-repository-pages',
    sources: [createRepoDocs, uploadDocs]
  },
  12: {
    id: 12, section: 'Git & GitHub', minutes: 2,
    title: 'Public과 Private',
    columns: [
      { title: 'Public · 이번 실습', items: ['인터넷에서 누구나 조회 가능', 'GitHub Free에서 Pages 실습 용이', '공개 예제만 업로드'] },
      { title: 'Private', items: ['접근 권한이 있는 사용자만 Repository 조회', '플랜·조직 정책에 따라 Pages 조건 다름', '민감자료 안전을 보장하는 장치는 아님'] }
    ],
    quote: 'Public을 선택하는 순간 Repository 파일과 Pages 사이트는 공개될 수 있다.',
    notes: ['Public 저장소를 만드는 이유는 교육용 Pages 실습 때문이다.', '회사 자료·업무 로그·개인정보·토큰은 넣지 않는다.', '민감자료를 올린 뒤 Private으로 바꾸는 것은 안전한 대응이 아니라고 강조한다.'],
    action: '업로드 금지 자료를 두 가지 이상 말하게 한다.',
    transition: '공개 가능한 HTML 한 파일을 첫 Commit으로 만든다.',
    guide: '/guide/04-github-repository-pages',
    sources: [createPagesDocs]
  },
  13: {
    id: 13, section: 'Git & GitHub', minutes: 2,
    title: '첫 번째 index.html 만들기',
    flow: ['Add file', 'Create new file', 'index.html', '내용 붙여넣기', 'Commit changes'],
    code: '<h1>My First GitHub Pages</h1>\n<p>Repository 생성과 Pages 배포를 실습합니다.</p>',
    callout: 'README는 저장소 설명이고, index.html은 웹사이트의 시작 페이지다.',
    notes: ['파일 이름은 저장소 루트의 index.html로 정확히 입력한다.', 'Commit 대화상자에서 main 반영과 메시지를 확인한다.', '참가자는 제목·설명·학습 목표만 공개 가능한 문장으로 수정한다.'],
    action: '제공된 starter HTML을 붙여 넣고 Commit changes를 완료한다.',
    transition: '이제 어떤 방식으로 이 파일을 웹사이트로 배포할지 선택한다.',
    guide: '/guide/04-github-repository-pages',
    sources: [uploadDocs]
  },
  14: {
    id: 14, section: 'Git & GitHub', minutes: 2,
    title: 'GitHub Pages 배포 방식 선택',
    columns: [
      { title: 'Deploy from a branch', items: ['HTML·CSS·JS', '별도 build 없음', 'main / root 또는 docs', '이번 참가자 실습'] },
      { title: 'GitHub Actions', items: ['VitePress·Vue·React', 'install과 build 필요', '생성된 artifact 배포', '현재 교육 사이트'] }
    ],
    callout: '단순 HTML → Branch 배포 · 빌드 프로젝트 → Actions',
    notes: ['두 방식을 동시에 설정하지 않는다.', 'VitePress는 Markdown 원본이 아니라 build 결과물이 배포된다고 설명한다.', '현재 교육 저장소의 deploy workflow를 짧게 보여준다.'],
    action: '현재 실습과 교육 사이트가 각각 어느 방식을 쓰는지 답한다.',
    transition: '이번 실습에서는 main 브랜치의 root를 배포 소스로 지정한다.',
    guide: '/guide/04-github-repository-pages',
    sources: [publishingSourceDocs, customWorkflowDocs]
  },
  15: {
    id: 15, section: 'Git & GitHub', minutes: 3,
    title: 'Deploy from a branch 활성화',
    flow: ['Settings', 'Pages', 'Deploy from a branch', 'main', '/ (root)', 'Save'],
    callout: '선택값: Source = Deploy from a branch · Branch = main · Folder = / (root)',
    notes: ['Settings의 Code and automation 영역에서 Pages를 찾는다.', 'Actions 설정 화면이 아니라 Pages 설정 화면인지 확인한다.', '모바일에서 탭이 숨으면 더보기 또는 데스크톱 사이트 보기를 사용한다.', 'Save 후 배포가 시작되는지 확인한다.'],
    action: '각자 main / (root)를 선택하고 Save한다.',
    transition: '설정 저장은 끝이 아니라 배포 작업의 시작이다.',
    guide: '/guide/04-github-repository-pages',
    sources: [publishingSourceDocs]
  },
  16: {
    id: 16, section: 'Git & GitHub', minutes: 2,
    title: '배포 상태와 공개 URL 확인',
    flow: ['Commit', 'Pages workflow', '초록색 성공', '공개 URL', '수정 후 재배포'],
    code: 'https://<github-id>.github.io/my-first-pages-<github-id>/',
    bullets: ['노란색: 실행 중', '초록색: 성공', '빨간색: 실패 원인 확인', '404면 main·root·index.html·URL 확인'],
    notes: ['Actions에서 Pages build and deployment 실행을 확인한다.', 'Settings → Pages에서도 공개 URL을 확인할 수 있다.', '배포 직후 1~3분 지연될 수 있다.', 'index.html 문장을 수정하고 다시 Commit해 자동 재배포를 확인한다.'],
    action: '사이트를 열고 제목을 확인한 뒤 문장 한 줄을 수정해 재배포한다.',
    transition: '이제 Repository와 배포 흐름을 이해했으므로 Claude Code의 역할을 연결한다.',
    guide: '/guide/04-github-repository-pages',
    sources: [createPagesDocs, publishingSourceDocs]
  }
}

export const slides: Slide[] = baseSlides.map((slide) => replacements[slide.id] ?? slide)
