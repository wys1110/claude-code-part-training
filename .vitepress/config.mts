import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ko-KR',
  title: 'Claude Code 파트 전파 교육',
  description: 'Solution PE팀 Staff 대상 VS Code, GitHub Pages, Claude Code 2시간 실습 과정',
  base: '/claude-code-part-training/',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#6d5dfc' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Claude Code Training',
    outline: { level: [2, 3], label: '목차' },
    lastUpdated: { text: '최근 수정' },
    docFooter: { prev: '이전', next: '다음' },
    returnToTopLabel: '맨 위로',
    sidebarMenuLabel: '메뉴',
    darkModeSwitchLabel: '테마',
    nav: [
      { text: '🎤 발표 모드', link: '/slides/' },
      { text: 'GitHub Pages 실습', link: '/guide/04-github-repository-pages' },
      { text: '2시간 과정', link: '/guide/00-course-overview' },
      { text: '최신 기능표', link: '/guide/04-latest-feature-map' },
      { text: '실습', link: '/guide/05-lab' },
      { text: '강사용', link: '/instructor/120min-runbook' },
      { text: 'GitHub', link: 'https://github.com/wys1110/claude-code-part-training' }
    ],
    sidebar: [
      {
        text: '발표',
        items: [
          { text: '🎤 44장 발표 모드', link: '/slides/' },
          { text: '슬라이드별 발표자 노트', link: '/instructor/slide-speaker-notes' }
        ]
      },
      {
        text: '2시간 교육 과정',
        items: [
          { text: '0. 전체 과정과 목표', link: '/guide/00-course-overview' },
          { text: '1. 교육 전 환경 준비', link: '/guide/01-environment' },
          { text: '2. VS Code 기본', link: '/guide/02-vscode-basics' },
          { text: '3. Git·GitHub 기본', link: '/guide/03-git-github-basics' },
          { text: '4. 저장소 만들기·Pages', link: '/guide/04-github-repository-pages' },
          { text: '5. Claude Code 개념', link: '/guide/01-concept' },
          { text: '6. 첫 세션과 기본 흐름', link: '/guide/02-first-session' },
          { text: '7. 유용한 기능', link: '/guide/03-useful-features' },
          { text: '8. 최신 기능 검증표', link: '/guide/04-latest-feature-map' },
          { text: '9. 잘 시키는 방법', link: '/guide/04-prompt-patterns' },
          { text: '10. 통합 라이브 시연', link: '/guide/09-integrated-demo' },
          { text: '11. 참가자 실습', link: '/guide/05-lab' }
        ]
      },
      {
        text: '적용과 안전',
        items: [
          { text: '팀 적용 방법', link: '/guide/06-team-adoption' },
          { text: '보안과 권한', link: '/guide/07-security' },
          { text: '빠른 치트시트', link: '/guide/08-cheatsheet' }
        ]
      },
      {
        text: '강사용 자료',
        collapsed: true,
        items: [
          { text: '120분 분 단위 운영안', link: '/instructor/120min-runbook' },
          { text: 'GitHub Pages 15분 대본', link: '/instructor/github-pages-demo-script' },
          { text: '슬라이드별 발표자 노트', link: '/instructor/slide-speaker-notes' },
          { text: '15분 Claude 라이브 데모', link: '/instructor/live-demo-script' },
          { text: '실습 정답과 힌트', link: '/instructor/lab-answer-key' },
          { text: '세부 내용 터치 전략', link: '/instructor/content-touch-strategy' },
          { text: '사전 점검·실패 대응', link: '/instructor/preflight-checklist' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wys1110/claude-code-part-training' }
    ],
    search: { provider: 'local' },
    footer: {
      message: '공식 문서를 기반으로 구성한 Solution PE팀 Staff 대상 교육 자료',
      copyright: '교육용 공개 예제 — 실제 업무 적용 전 조직 보안 정책 확인'
    }
  }
})
