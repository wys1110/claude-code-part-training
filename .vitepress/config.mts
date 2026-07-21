import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ko-KR',
  title: 'Claude Code 파트 전파 교육',
  description: 'Claude Code의 개념부터 실무 기능과 실습까지',
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
      { text: '교육 시작', link: '/guide/01-concept' },
      { text: '실습', link: '/guide/05-lab' },
      { text: '치트시트', link: '/guide/08-cheatsheet' },
      { text: 'GitHub', link: 'https://github.com/wys1110/claude-code-part-training' }
    ],
    sidebar: [
      {
        text: '교육 과정',
        items: [
          { text: '1. Claude Code 개념', link: '/guide/01-concept' },
          { text: '2. 첫 세션과 기본 흐름', link: '/guide/02-first-session' },
          { text: '3. 유용한 기능', link: '/guide/03-useful-features' },
          { text: '4. 잘 시키는 방법', link: '/guide/04-prompt-patterns' },
          { text: '5. 실습', link: '/guide/05-lab' },
          { text: '6. 팀 적용 방법', link: '/guide/06-team-adoption' },
          { text: '7. 보안과 권한', link: '/guide/07-security' },
          { text: '8. 치트시트', link: '/guide/08-cheatsheet' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wys1110/claude-code-part-training' }
    ],
    search: { provider: 'local' },
    footer: {
      message: '공식 문서를 기반으로 구성한 파트 전파 교육 자료',
      copyright: '교육용 예제 — 실제 업무 적용 전 사내 보안 정책 확인'
    }
  }
})
