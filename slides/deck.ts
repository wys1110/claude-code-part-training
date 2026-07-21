export interface SlideColumn {
  title: string
  body?: string
  items?: string[]
}

export interface SlideSource {
  label: string
  url: string
}

export interface SlideTable {
  headers: string[]
  rows: string[][]
}

export interface Slide {
  id: number
  section: string
  title: string
  subtitle?: string
  kicker?: string
  kind?: 'title' | 'section' | 'content' | 'demo' | 'lab' | 'security' | 'break'
  minutes: number
  bullets?: string[]
  flow?: string[]
  columns?: SlideColumn[]
  code?: string
  prompt?: string
  quote?: string
  callout?: string
  badges?: string[]
  table?: SlideTable
  visual?: 'local-remote' | 'agent-loop'
  notes: string[]
  action?: string
  transition: string
  guide?: string
  sources?: SlideSource[]
}

const claudeOverview = { label: 'Claude Code Overview', url: 'https://code.claude.com/docs/en/overview' }
const howItWorks = { label: 'How Claude Code works', url: 'https://code.claude.com/docs/en/how-claude-code-works' }
const vscodeDocs = { label: 'Claude Code in VS Code', url: 'https://code.claude.com/docs/en/vs-code' }
const permissionDocs = { label: 'Permission modes', url: 'https://code.claude.com/docs/en/permission-modes' }
const featureDocs = { label: 'Feature overview', url: 'https://code.claude.com/docs/en/features-overview' }
const availabilityDocs = { label: 'Feature availability', url: 'https://code.claude.com/docs/en/feature-availability' }
const memoryDocs = { label: 'Memory', url: 'https://code.claude.com/docs/en/memory' }
const skillsDocs = { label: 'Skills', url: 'https://code.claude.com/docs/en/skills' }
const subagentDocs = { label: 'Subagents', url: 'https://code.claude.com/docs/en/sub-agents' }
const agentTeamsDocs = { label: 'Agent teams', url: 'https://code.claude.com/docs/en/agent-teams' }
const securityDocs = { label: 'Security', url: 'https://code.claude.com/docs/en/security' }
const vscodeScm = { label: 'VS Code Source Control', url: 'https://code.visualstudio.com/docs/sourcecontrol/overview' }
const gitDocs = { label: 'GitHub Docs: Git', url: 'https://docs.github.com/en/get-started/using-git/about-git' }
const cloneDocs = { label: 'GitHub Docs: Clone', url: 'https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository' }
const prDocs = { label: 'GitHub Docs: Pull requests', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/getting-started/about-pull-requests' }

export const slides: Slide[] = [
  {
    id: 1, section: 'Opening', kind: 'title', minutes: 1,
    kicker: 'Solution PE팀 Staff · 120분',
    title: 'Claude Code 실무 활용',
    subtitle: 'VS Code → GitHub → 분석 → 수정 → 테스트 → diff → Pull Request',
    badges: ['공식 문서 확인 2026-07-21', '최신 릴리스 확인 v2.1.216', '공개 예제 기반'],
    notes: ['오늘은 기능 나열이 아니라 하나의 작업 흐름을 완주한다.', '실제 회사 자료가 아니라 공개 실습 프로젝트만 사용한다.'],
    action: 'VS Code, GitHub, Claude Code 사용 경험을 손들기로 확인한다.',
    transition: '먼저 교육이 끝났을 때 무엇을 할 수 있어야 하는지 정한다.',
    sources: [claudeOverview, availabilityDocs]
  },
  {
    id: 2, section: 'Opening', minutes: 2,
    kicker: 'Outcome', title: '오늘의 완료 기준',
    flow: ['저장소 받기', 'VS Code에서 확인', 'Claude Code로 분석', '수정·테스트', 'diff·commit·PR'],
    callout: '도구 사용법보다 “현재 상태를 확인하고 다음 단계로 넘어가는 습관”이 목표다.',
    notes: ['참가자가 마지막에 혼자 재현할 수 있어야 한다.', 'PR까지 어려운 환경은 commit까지를 최소 완료 기준으로 둔다.'],
    action: '각자 오늘 가장 필요한 한 단계를 고르게 한다.',
    transition: '이 결과를 만들기 위해 120분을 세 구간으로 나눈다.',
    guide: '/guide/00-course-overview'
  },
  {
    id: 3, section: 'Opening', minutes: 2,
    kicker: 'Roadmap', title: '120분 로드맵',
    columns: [
      { title: '기초 30분', items: ['VS Code 15분', 'Git·GitHub 15분'] },
      { title: 'Claude Code 30분', items: ['개념 15분', '핵심 기능 15분'] },
      { title: '실전 60분', items: ['휴식 10분', '데모 15분', '실습 20분', '적용·정리 15분'] }
    ],
    notes: ['설명은 10분 이상 연속하지 않는다.', '매 구간마다 화면 시연 또는 참가자 행동을 연결한다.'],
    action: '실습 환경 문제가 있는 사람을 미리 표시하게 한다.',
    transition: '첫 번째 도구는 코드 에디터가 아니라 검증 화면으로서의 VS Code다.',
    guide: '/guide/00-course-overview'
  },
  {
    id: 4, section: 'VS Code', minutes: 2,
    kicker: 'Core', title: 'VS Code는 검증 작업 공간',
    columns: [
      { title: 'Explorer', body: '무엇을 보고 있는가' },
      { title: 'Terminal', body: '어디에서 실행하는가' },
      { title: 'Source Control', body: '무엇이 바뀌었는가' }
    ],
    quote: 'Claude의 답보다 근거 파일·테스트·diff를 더 자주 본다.',
    notes: ['VS Code 기능 전체를 가르치지 않는다.', 'Claude Code 작업을 이해하고 검증하는 다섯 화면만 익힌다.'],
    transition: '가장 먼저 저장소 루트를 정확히 확인한다.',
    guide: '/guide/02-vscode-basics', sources: [vscodeScm]
  },
  {
    id: 5, section: 'VS Code', minutes: 2,
    title: 'Explorer: 저장소 루트를 찾는다',
    bullets: ['최상단 폴더 이름 확인', 'package.json·CLAUDE.md 위치 확인', '실습 코드와 테스트 파일을 직접 찾기'],
    code: 'labs/task-board/src/task-board.js\nlabs/task-board/test/task-board.test.js\nCLAUDE.md',
    callout: '열린 파일 하나가 아니라 저장소 전체가 작업 범위다.',
    notes: ['세 파일을 화면에서 직접 가리킨다.', '참가자도 동일한 경로를 찾아 클릭하게 한다.'],
    action: '세 파일을 Explorer에서 순서대로 연다.',
    transition: 'Explorer의 위치와 터미널의 현재 경로는 같다고 가정하면 안 된다.',
    guide: '/guide/02-vscode-basics'
  },
  {
    id: 6, section: 'VS Code', minutes: 3,
    title: 'Terminal: 현재 경로부터 확인',
    code: 'pwd                 # Windows PowerShell: Get-Location\ngit status\ncd labs/task-board\nnpm test',
    bullets: ['명령 실행 전 경로 확인', '저장소인지 git status로 확인', '실패 메시지를 숨기지 않고 그대로 읽기'],
    notes: ['잘못된 폴더에서 npm test를 실행하는 흔한 실수를 보여준다.', '명령 성공 여부보다 현재 작업 위치를 먼저 확인시킨다.'],
    action: '통합 터미널을 열고 pwd와 git status를 실행한다.',
    transition: '터미널이 작업 위치를 알려준다면 Source Control은 변경 상태를 알려준다.',
    guide: '/guide/02-vscode-basics'
  },
  {
    id: 7, section: 'VS Code', minutes: 3,
    title: 'Source Control: 변경 상태를 읽는다',
    table: {
      headers: ['표시', '의미', '확인할 것'],
      rows: [['M', 'Modified', '의도한 수정인가'], ['U', 'Untracked', '새 파일이 필요한가'], ['A', 'Added', 'stage된 파일인가'], ['D', 'Deleted', '삭제가 의도됐는가']]
    },
    callout: 'Commit 버튼보다 먼저 변경 파일 목록을 읽는다.',
    notes: ['M/U/A/D를 실제 화면에서 보여준다.', '모든 변경을 한 번에 stage하는 습관을 경계한다.'],
    action: 'Source Control 아이콘을 열고 현재 변경 수를 말하게 한다.',
    transition: '파일 수를 확인했으면 각 파일 안에서 무엇이 바뀌었는지 읽는다.',
    guide: '/guide/02-vscode-basics', sources: [vscodeScm]
  },
  {
    id: 8, section: 'VS Code', minutes: 3,
    title: 'Diff: 테스트와 다른 검증',
    columns: [
      { title: '테스트', items: ['기대한 동작 확인', '실행된 범위만 검증'] },
      { title: 'Diff', items: ['실제 변경 범위 확인', '관련 없는 수정 탐지'] }
    ],
    bullets: ['삭제된 코드', '의도하지 않은 포맷 변경', '설정·의존성 파일 변경', '누락된 테스트'],
    quote: '초록색 테스트 결과는 diff 검토를 대체하지 않는다.',
    notes: ['테스트가 통과해도 불필요한 파일이 바뀔 수 있음을 강조한다.', 'Claude의 완료 메시지가 아니라 실제 diff를 기준으로 판단한다.'],
    action: '변경 파일을 클릭해 좌우 diff를 읽는다.',
    transition: '화면 이동은 Command Palette와 Claude 패널로 빠르게 연결한다.',
    guide: '/guide/02-vscode-basics'
  },
  {
    id: 9, section: 'VS Code', minutes: 2,
    title: 'Command Palette + Claude Code 패널',
    code: 'Ctrl/Cmd + Shift + P\nGit: Clone\nGit: Create Branch\nTerminal: Create New Terminal',
    bullets: ['기능 이름으로 명령 찾기', 'Claude Code 패널에서 현재 파일·라인 첨부', '필요하면 통합 터미널에서 CLI 실행'],
    notes: ['메뉴 위치 암기보다 명령 이름 검색을 가르친다.', 'VS Code 확장과 CLI는 상호 보완 관계다.'],
    action: 'Command Palette를 열고 Git: Clone을 검색한다.',
    transition: '이제 VS Code 안에서 다루는 변경 이력이 Git과 GitHub에서 어떻게 이동하는지 본다.',
    guide: '/guide/02-vscode-basics', sources: [vscodeDocs]
  },
  {
    id: 10, section: 'Git & GitHub', minutes: 2,
    title: 'Git과 GitHub는 다르다',
    columns: [
      { title: 'Git', items: ['내 PC의 변경 이력', 'branch·commit 관리', '오프라인 가능'] },
      { title: 'GitHub', items: ['원격 저장소', '공유·리뷰·PR', '권한과 협업'] }
    ],
    callout: 'Save ≠ Commit, Commit ≠ Push, Push ≠ Merge',
    notes: ['세 동작을 한 문장으로 묶어 반복한다.', 'GitHub가 없어도 Git commit은 가능하다는 점을 설명한다.'],
    action: 'Save, Commit, Push의 차이를 한 명에게 설명하게 한다.',
    transition: '둘의 관계를 Local과 Remote로 시각화한다.',
    guide: '/guide/03-git-github-basics', sources: [gitDocs]
  },
  {
    id: 11, section: 'Git & GitHub', minutes: 2,
    title: 'Local ↔ Remote', visual: 'local-remote',
    bullets: ['pull: 원격 변경을 로컬로 가져오기', 'push: 로컬 commit을 원격에 보내기'],
    notes: ['파일 자체가 아니라 commit 이력이 이동한다고 설명한다.', '처음 받는 동작은 clone, 이후 동기화는 pull/push다.'],
    transition: '원본을 내 계정에 복사하는 Fork와 PC에 복사하는 Clone을 구분한다.',
    guide: '/guide/03-git-github-basics', sources: [gitDocs]
  },
  {
    id: 12, section: 'Git & GitHub', minutes: 2,
    title: 'Fork와 Clone',
    columns: [
      { title: 'Fork', body: 'GitHub 서버에서 내 계정으로 저장소 복사', items: ['권한이 없을 때 유용', '독립된 원격 저장소'] },
      { title: 'Clone', body: '원격 저장소를 내 PC로 복사', items: ['작업 디렉터리 생성', 'Git 이력 포함'] }
    ],
    callout: '교육 권장: Fork → 내 Fork를 Clone → 실습 branch',
    notes: ['참가자끼리 충돌하지 않도록 Fork 방식을 권장한다.', 'GitHub 접근이 어렵다면 Local-only 대안을 사용한다.'],
    action: '자신의 GitHub 계정에서 Fork 버튼 위치를 확인한다.',
    transition: '저장소를 받았으면 main이 아닌 별도 branch에서 시작한다.',
    guide: '/guide/03-git-github-basics', sources: [cloneDocs]
  },
  {
    id: 13, section: 'Git & GitHub', minutes: 3,
    title: 'Branch first',
    code: 'git switch -c practice/<github-id>\ngit branch --show-current',
    bullets: ['작업 전 branch 생성', '현재 branch를 명령과 VS Code 좌측 하단에서 확인', 'main에서 직접 실습하지 않기'],
    quote: '변경 전에 안전한 작업 공간부터 만든다.',
    notes: ['branch는 폴더 복사가 아니라 이력의 독립 경로라고 설명한다.', '브랜치명 규칙을 화면에 고정한다.'],
    action: 'practice/<github-id> branch를 만들고 현재 branch를 말한다.',
    transition: '수정이 끝나면 모든 파일이 아니라 검토한 변경만 저장점으로 만든다.',
    guide: '/guide/03-git-github-basics'
  },
  {
    id: 14, section: 'Git & GitHub', minutes: 2,
    title: 'Stage와 Commit',
    flow: ['Diff 검토', '필요한 파일 Stage', 'Commit 메시지', '로컬 저장점'],
    code: 'git diff\ngit add <검토한 파일>\ngit commit -m "Fix task validation"',
    callout: 'git add .보다 검토한 파일을 선택적으로 stage한다.',
    notes: ['Stage는 다음 commit에 포함할 변경을 고르는 과정이다.', 'Commit은 원격 전송이 아니라 로컬 이력 생성이다.'],
    transition: '로컬 저장점을 공유하려면 Push와 Pull Request가 필요하다.',
    guide: '/guide/03-git-github-basics'
  },
  {
    id: 15, section: 'Git & GitHub', minutes: 2,
    title: 'Push와 Pull Request',
    columns: [
      { title: 'Push', body: '내 branch의 commit을 원격에 전송' },
      { title: 'Pull Request', body: '변경 이유·검증 결과와 함께 리뷰 요청' }
    ],
    code: 'git push -u origin practice/<github-id>',
    bullets: ['무엇을 바꿨는가', '왜 바꿨는가', '어떻게 검증했는가', '남은 위험은 무엇인가'],
    notes: ['Push가 main 반영을 의미하지 않는다고 설명한다.', 'PR은 코드와 설명, 검증 근거를 함께 전달하는 단위다.'],
    transition: '지금까지의 Git 흐름을 Claude Code 작업과 연결한다.',
    guide: '/guide/03-git-github-basics', sources: [prDocs]
  },
  {
    id: 16, section: 'Git & GitHub', minutes: 2,
    title: '표준 협업 흐름',
    flow: ['Fork / Clone', 'Branch', 'Edit', 'Test', 'Diff', 'Commit', 'Push', 'PR'],
    callout: 'Claude Code는 Edit·Test·Diff를 빠르게 만들지만, 흐름의 책임은 사람에게 있다.',
    notes: ['이 흐름을 이후 데모와 실습에서 그대로 반복한다.', '현재 branch와 diff 확인을 체크포인트로 둔다.'],
    action: '다음 단계가 무엇인지 참가자에게 순서대로 묻는다.',
    transition: '이제 이 흐름 안에서 Claude Code가 어떤 역할을 하는지 정의한다.',
    guide: '/guide/03-git-github-basics'
  },
  {
    id: 17, section: 'Claude Code Concept', minutes: 2,
    title: 'Claude Code 한 문장',
    quote: '코드베이스를 읽고, 파일을 수정하고, 명령을 실행하며, 결과를 검증하는 에이전트형 개발 도구',
    columns: [
      { title: '채팅형 AI', body: '답변과 코드 제안 중심' },
      { title: 'Claude Code', body: '개발 환경에서 도구를 사용해 작업 수행' }
    ],
    notes: ['정답 자동 생성기가 아니라 작업 수행 도구라고 정의한다.', '실행 권한과 검증 책임을 함께 언급한다.'],
    transition: '구체적으로 어떤 도구를 사용하고 어떤 범위까지 접근하는지 본다.',
    guide: '/guide/01-concept', sources: [claudeOverview]
  },
  {
    id: 18, section: 'Claude Code Concept', minutes: 2,
    title: 'Claude가 할 수 있는 일',
    columns: [
      { title: '탐색', items: ['파일·검색·구조 파악', '관련 테스트 확인'] },
      { title: '작업', items: ['파일 수정', '셸 명령 실행'] },
      { title: '검증', items: ['테스트·린트·빌드', 'diff·요약'] }
    ],
    callout: '접근 가능한 범위는 실행 위치, 권한 모드, 설정, 조직 정책에 따라 달라진다.',
    notes: ['도구 사용마다 권한이 개입할 수 있음을 설명한다.', '현재 저장소 밖의 정보는 자동으로 아는 것이 아니라고 정리한다.'],
    transition: '이 도구 사용은 한 번의 답변이 아니라 반복 루프로 진행된다.',
    guide: '/guide/01-concept', sources: [howItWorks]
  },
  {
    id: 19, section: 'Claude Code Concept', minutes: 3,
    title: 'Agent loop', visual: 'agent-loop',
    flow: ['이해', '계획', '실행', '검증', '리뷰'],
    callout: '실패하거나 위험이 보이면 다시 이해·계획 단계로 돌아간다.',
    notes: ['각 단계에서 실제 화면을 한 가지씩 연결한다.', '이후 모든 프롬프트와 실습을 이 루프에 맞춘다.'],
    action: '“바로 수정해줘” 요청에서 빠진 단계를 찾게 한다.',
    transition: '루프를 수행하는 Claude와 최종 책임을 지는 사람의 역할을 분리한다.',
    guide: '/guide/01-concept', sources: [howItWorks]
  },
  {
    id: 20, section: 'Claude Code Concept', minutes: 3,
    title: '책임 분리',
    columns: [
      { title: '사람', items: ['요구사항·완료 기준', '민감정보·권한 판단', '최종 승인·리뷰'] },
      { title: 'Claude Code', items: ['탐색·분석', '수정·명령 실행', '테스트·요약'] }
    ],
    quote: 'Claude가 작업을 수행하는 것과 작업이 올바른 것은 별개의 문제다.',
    notes: ['의사결정과 책임을 AI에 위임하지 않는다는 메시지를 남긴다.', '특히 보안과 운영 영향은 사람이 판단한다.'],
    transition: '역할 분리는 권한 모드로 실제 실행 흐름에 반영된다.',
    guide: '/guide/01-concept'
  },
  {
    id: 21, section: 'Claude Code Concept', minutes: 3,
    title: '권한 모드는 작업 속도와 통제의 균형',
    table: {
      headers: ['모드', '자동 허용', '교육 권장'],
      rows: [['Manual / default', '읽기', '처음·민감 작업'], ['acceptEdits', '읽기·파일 수정', '검토하며 반복'], ['plan', '읽기', '수정 전 분석'], ['auto', '안전 분류 아래 장기 작업', '조건 확인 후 소개'], ['dontAsk', '사전 승인 도구만', 'CI·고정 자동화'], ['bypassPermissions', '모든 것', '격리 환경 외 금지']]
    },
    notes: ['Manual은 UI 명칭이고 설정 값은 default임을 설명한다.', '교육은 Manual 또는 Plan부터 시작한다.'],
    action: '현재 VS Code의 모드 선택기에서 활성 모드를 확인한다.',
    transition: '권한 모드와 별개로 작업 범위를 좁히는 기본 원칙이 필요하다.',
    guide: '/guide/07-security', sources: [permissionDocs]
  },
  {
    id: 22, section: 'Claude Code Concept', minutes: 2,
    title: '기본 안전 원칙',
    bullets: ['처음에는 읽기·Plan 중심', '별도 branch에서 작업', '수정 파일과 완료 기준 제한', '명령·테스트·diff 직접 확인', '민감정보는 정책 확인 전 입력 금지'],
    callout: '속도를 높이기 전에 되돌릴 수 있는 구조를 만든다.',
    notes: ['권한 완화보다 작업 격리와 검증이 먼저다.', 'bypassPermissions를 일반 업무 편의 기능처럼 소개하지 않는다.'],
    transition: '이 원칙을 VS Code 통합 환경에서 어떻게 적용하는지 본다.',
    guide: '/guide/07-security', sources: [securityDocs]
  },
  {
    id: 23, section: 'Claude Code Features', minutes: 2,
    title: 'VS Code 통합',
    bullets: ['파일·라인 @-mention', '인라인 diff 검토', 'Plan 검토', '권한 모드 선택', '세션과 컨텍스트 상태 확인'],
    columns: [
      { title: '확장', body: '시각적 검토와 파일 컨텍스트에 강함' },
      { title: 'CLI', body: '명령·고급 설정·터미널 흐름에 강함' }
    ],
    notes: ['교육 기본 인터페이스는 VS Code 확장으로 둔다.', '필요한 명령은 통합 터미널 CLI로 보완한다.'],
    transition: '가장 먼저 확인할 설정은 권한 모드다.',
    guide: '/guide/02-first-session', sources: [vscodeDocs]
  },
  {
    id: 24, section: 'Claude Code Features', minutes: 3,
    title: 'Permission modes 최신 지도',
    badges: ['Core: Manual·Plan', 'Working: acceptEdits', 'Awareness: auto·dontAsk', '격리 전용: bypassPermissions'],
    bullets: ['Shift+Tab 또는 VS Code 모드 선택기로 변경', '모드는 채팅 요청이 아니라 UI·설정에서 전환', '보호 경로와 deny/ask 규칙은 별도로 적용'],
    callout: 'Auto mode는 지원 조건과 조직 정책을 확인한 뒤 소개한다.',
    notes: ['v2.1.200 이후 Manual 명칭과 alias가 추가된 점을 반영한다.', '지원 환경에 따라 Auto mode 조건이 다를 수 있음을 말한다.'],
    transition: '복잡한 변경에서는 Plan Mode로 실행보다 방향을 먼저 검토한다.',
    guide: '/guide/07-security', sources: [permissionDocs, availabilityDocs]
  },
  {
    id: 25, section: 'Claude Code Features', minutes: 2,
    title: 'Plan Mode: 수정 전에 방향 검토',
    prompt: '관련 구현과 테스트를 먼저 분석해줘.\n아직 파일을 수정하지 말고, 수정 대상·영향 범위·회귀 위험·검증 방법을 계획으로 제시해줘.',
    bullets: ['여러 파일에 영향', '동작 보존 리팩터링', '요구사항이 모호함', '운영·데이터 영향 가능성'],
    notes: ['Plan은 긴 문서를 만드는 기능이 아니라 위험한 가정을 조기에 찾는 단계다.', '계획에 불필요한 파일이 포함됐는지 참가자에게 묻는다.'],
    transition: '매 세션 반복되는 규칙은 프롬프트 대신 프로젝트 메모리로 옮긴다.',
    guide: '/guide/03-useful-features', sources: [permissionDocs]
  },
  {
    id: 26, section: 'Claude Code Features', minutes: 2,
    title: 'CLAUDE.md + Auto memory',
    columns: [
      { title: 'CLAUDE.md', items: ['사람이 작성', '명령·규칙·아키텍처', '프로젝트·사용자·조직 범위'] },
      { title: 'Auto memory', items: ['Claude가 학습 내용 기록', '저장소별 로컬 메모리', '/memory로 감사·수정'] }
    ],
    callout: '둘 다 지침 컨텍스트이며 강제 정책이 아니다. 반드시 강제할 것은 Hook·권한 규칙을 사용한다.',
    notes: ['짧고 구체적인 실제 명령만 CLAUDE.md에 넣는다.', 'Auto memory는 읽고 수정·삭제할 수 있는 Markdown임을 설명한다.'],
    transition: '도구가 기억해도 요청 자체의 범위와 완료 기준은 여전히 중요하다.',
    guide: '/guide/03-useful-features', sources: [memoryDocs]
  },
  {
    id: 27, section: 'Claude Code Features', minutes: 2,
    title: '좋은 요청의 네 요소',
    columns: [
      { title: '범위', body: '어떤 파일·기능인가' },
      { title: '제약', body: '하지 말아야 할 것은 무엇인가' },
      { title: '완료 기준', body: '어떤 결과가 성공인가' },
      { title: '검증', body: '어떤 테스트·diff를 볼 것인가' }
    ],
    prompt: '관련 코드를 먼저 분석하고 → 계획을 제시한 뒤 → 최소 범위로 수정하고 → 테스트와 git diff로 검증해줘.',
    notes: ['프롬프트 문장 기술보다 작업 계약을 명확히 하는 관점으로 설명한다.', '모호하면 Claude가 질문하게 만드는 것도 좋은 요청이다.'],
    transition: '반복되는 요청과 절차는 Skill로 재사용한다.',
    guide: '/guide/04-prompt-patterns'
  },
  {
    id: 28, section: 'Claude Code Features', minutes: 1.5,
    title: 'Skills: 반복 절차를 재사용',
    bullets: ['PR 리뷰 체크리스트', '실패 로그 분석 절차', '테스트 계획 작성', '릴리스 노트 규칙'],
    code: '.claude/skills/review-pr/SKILL.md',
    callout: '같은 요청과 검증 절차가 세 번 이상 반복되면 Skill 후보',
    notes: ['설정 실습은 하지 않고 사용 시점만 보여준다.', 'Bundled skills와 사용자 정의 Skills가 공식 지원됨을 언급한다.'],
    transition: '큰 조사나 별도 전문 관점은 Subagent로 분리한다.',
    guide: '/guide/03-useful-features', sources: [skillsDocs]
  },
  {
    id: 29, section: 'Claude Code Features', minutes: 1,
    title: 'Subagents: 컨텍스트와 관점 분리',
    prompt: '테스트 관점과 보안 관점으로 각각 별도 조사한 뒤, 근거 파일과 핵심 결과만 통합해줘.',
    bullets: ['대형 코드베이스 탐색', '보안·성능·테스트 관점 분리', '메인 세션 컨텍스트 절약'],
    notes: ['병렬 실행 자체보다 조사 범위와 결과 계약이 중요하다.', '팀 단위 협업인 Agent teams와 혼동하지 않게 한다.'],
    transition: '마지막으로 확장 기능을 해결하는 문제 기준으로 지도화한다.',
    guide: '/guide/03-useful-features', sources: [subagentDocs]
  },
  {
    id: 30, section: 'Claude Code Features', minutes: 1.5,
    title: '확장 기능 지도',
    columns: [
      { title: 'Instructions', items: ['CLAUDE.md', 'Rules', 'Auto memory'] },
      { title: 'Reusable work', items: ['Skills', 'Subagents', 'Plugins'] },
      { title: 'Integration', items: ['MCP', 'Hooks', 'GitHub Actions'] }
    ],
    badges: ['Agent teams: Experimental', 'Remote Control·Chrome: 플랜 조건', 'MCP·Hooks·Plugins: 공식 지원'],
    notes: ['기능 이름보다 해결 문제를 기준으로 선택한다.', 'Agent teams는 공식 문서상 Experimental로 표시한다.'],
    transition: '핵심 개념을 정리했으므로 10분 동안 실습 환경을 점검한다.',
    guide: '/guide/04-latest-feature-map', sources: [featureDocs, agentTeamsDocs, availabilityDocs]
  },
  {
    id: 31, section: 'Break', kind: 'break', minutes: 10,
    kicker: '10 MINUTES', title: '휴식 + 실습 환경 점검',
    columns: [
      { title: '필수', items: ['VS Code 실행', 'Git 확인', '저장소 Fork/Clone', 'Node.js·npm test'] },
      { title: 'Claude Code', items: ['로그인', 'VS Code 확장 또는 CLI', 'Manual/Plan 모드 확인'] }
    ],
    callout: '설치 문제는 강의 중 장기 해결하지 않고 Local-only 또는 관찰 모드로 전환한다.',
    notes: ['문제 참가자는 강사 또는 보조 진행자에게 모이게 한다.', '10분 종료 2분 전에 전체 복귀를 알린다.'],
    action: 'npm test와 git branch --show-current 결과를 확인한다.',
    transition: '복귀 후 강사가 전체 흐름을 한 번 완주한다.',
    guide: '/guide/01-environment'
  },
  {
    id: 32, section: 'Live Demo', kind: 'demo', minutes: 2,
    kicker: '15-minute demo', title: '데모 목표와 완료 기준',
    flow: ['실패 재현', '원인 분석', '계획 검토', '최소 수정', '테스트·diff', 'Commit'],
    callout: '정답을 빨리 얻는 데모가 아니라 안전한 작업 순서를 보여주는 데모',
    notes: ['데모 branch가 준비됐는지 다시 확인한다.', '네 번 멈추어 참가자에게 다음 행동을 묻는다.'],
    transition: '먼저 baseline을 확보한다.',
    guide: '/guide/09-integrated-demo'
  },
  {
    id: 33, section: 'Live Demo', kind: 'demo', minutes: 4,
    title: '1. Branch와 baseline',
    code: 'git switch -c demo/fix-task-validation\ncd labs/task-board\nnpm test\ngit status',
    prompt: '이 프로젝트의 목적, 주요 파일 역할, 데이터 흐름을 설명해줘.\n아직 파일을 수정하거나 명령을 실행하지 마.\n근거가 되는 파일과 함수명을 함께 알려줘.',
    notes: ['첫 번째 정지 질문: 현재 branch는 무엇인가?', '실패 테스트 메시지를 화면에서 읽고 시작 상태를 기록한다.'],
    action: '참가자에게 실패 개수와 현재 branch를 말하게 한다.',
    transition: '증상을 봤으니 수정 전에 원인과 계획을 분리한다.',
    guide: '/guide/09-integrated-demo'
  },
  {
    id: 34, section: 'Live Demo', kind: 'demo', minutes: 5,
    title: '2. 분석 → 계획 → 최소 수정',
    prompt: '테스트를 실행해 실패를 재현해줘.\n아직 수정하지 말고 실패 조건, 근본 원인, 최소 수정안, 검증 방법을 정리해줘.\n그다음 수정 대상 파일과 회귀 위험을 포함한 계획을 보여줘.',
    bullets: ['불필요한 파일이 계획에 포함됐는가', '증상과 근본 원인이 구분됐는가', '검증할 테스트가 명시됐는가'],
    callout: '계획을 읽고 범위를 합의한 뒤에만 수정한다.',
    notes: ['두 번째 정지 질문: 계획에 불필요한 변경이 있는가?', '합의 후 “관련 없는 리팩터링 금지” 조건으로 수정시킨다.'],
    action: '계획에서 삭제하거나 추가할 항목을 한 가지 찾게 한다.',
    transition: '수정 완료 메시지가 아니라 실행 결과와 diff로 검증한다.',
    guide: '/guide/09-integrated-demo'
  },
  {
    id: 35, section: 'Live Demo', kind: 'demo', minutes: 4,
    title: '3. 테스트 → Diff → Commit',
    code: 'npm test\ngit diff\ngit status\ngit add labs/task-board/src/task-board.js labs/task-board/test/task-board.test.js\ngit commit -m "Fix task validation and id generation"',
    prompt: '관련 테스트와 전체 테스트를 실행해줘.\n마지막으로 git diff를 정확성, 회귀 가능성, 테스트 누락 순서로 리뷰해줘.',
    notes: ['세 번째 정지 질문: 테스트 통과 뒤에도 무엇을 봐야 하는가?', '네 번째 정지 질문: Commit 전에 어떤 파일이 stage됐는가?'],
    action: 'Source Control에서 stage된 파일만 다시 읽는다.',
    transition: '이제 같은 루프를 참가자가 직접 수행한다.',
    guide: '/guide/09-integrated-demo'
  },
  {
    id: 36, section: 'Hands-on Lab', kind: 'lab', minutes: 2,
    title: '실습 시작 상태',
    code: 'git switch -c practice/<github-id>\ncd labs/task-board\nnpm test',
    bullets: ['20분 제한', '2인 1조 또는 개별', '막히면 힌트 1 → 2 → 3 순서', 'GitHub가 어려우면 Local-only로 commit까지'],
    callout: '바로 수정하지 말고 반드시 분석과 계획을 먼저 받는다.',
    notes: ['빠른 참가자와 느린 참가자의 경로를 분리한다.', '강사는 답을 주기보다 현재 단계와 상태를 묻는다.'],
    transition: '첫 8분은 버그 원인 분석과 최소 수정이다.',
    guide: '/guide/05-lab'
  },
  {
    id: 37, section: 'Hands-on Lab', kind: 'lab', minutes: 8,
    title: '실습 1 · 버그 분석과 수정',
    prompt: 'npm test를 실행해 실패를 재현해줘.\n아직 수정하지 말고 각 실패의 재현 조건, 근본 원인, 최소 수정안을 정리해줘.\n계획을 확인한 뒤 원인으로 확인된 부분만 수정하고 공백 제목 테스트를 추가해줘.',
    bullets: ['빈 문자열·공백 제목 거부', '삭제 이후에도 ID 중복 방지', '관련 없는 리팩터링 금지', '전체 테스트 통과'],
    callout: '힌트 1: 입력 검증 · 힌트 2: trim() · 힌트 3: tasks.length + 1',
    notes: ['정답은 addTask의 trim 검증과 별도 증가 ID 카운터다.', '참가자가 수정 전 계획을 실제로 읽었는지 확인한다.'],
    action: '실패 원인 두 개를 근거 파일·함수와 함께 기록한다.',
    transition: '기존 버그를 고쳤다면 같은 패턴으로 작은 기능을 추가한다.',
    guide: '/guide/05-lab'
  },
  {
    id: 38, section: 'Hands-on Lab', kind: 'lab', minutes: 7,
    title: '실습 2 · 작은 기능과 테스트',
    prompt: '완료되지 않은 할 일만 반환하는 getPendingTasks()를 추가해줘.\n기존 코드 스타일을 따르고 정상 결과, 빈 목록, 완료 항목 제외 테스트를 추가해줘.\n수정 전 계획을 먼저 보여주고 관련 없는 리팩터링은 하지 마.',
    bullets: ['기존 패턴 확인', '정상·빈 목록·필터링 테스트', '외부 수정으로 내부 상태가 변하지 않는지 토론'],
    callout: '빠른 참가자: CLAUDE.md 초안 또는 PR 본문 작성',
    notes: ['핵심 구현은 completed === false 필터링이다.', '반환 배열 복사 여부를 확장 토론으로 사용한다.'],
    action: '테스트가 요구사항을 실제로 증명하는지 짝과 교차 검토한다.',
    transition: '마지막 3분은 결과를 저장하고 완료 기준을 확인한다.',
    guide: '/guide/05-lab'
  },
  {
    id: 39, section: 'Hands-on Lab', kind: 'lab', minutes: 3,
    title: '완료 체크',
    bullets: ['Branch 확인', '전체 테스트 실행', 'VS Code diff 검토', '필요한 파일만 stage', 'Commit 생성', '가능하면 Push·PR'],
    code: 'git status\ngit diff --staged\ngit commit -m "Complete task board lab"',
    callout: '10개 항목 중 8개 이상 완료하면 교육 성공',
    notes: ['실패한 참가자도 현재 단계와 막힌 이유를 기록하면 학습 결과로 인정한다.', 'PR을 만들 수 없는 환경에서는 commit hash를 확인한다.'],
    action: '자신의 완료 항목 수를 손가락으로 표시한다.',
    transition: '실제 업무에 옮길 때는 기능보다 데이터와 권한 경계가 먼저다.',
    guide: '/guide/00-course-overview'
  },
  {
    id: 40, section: 'Security', kind: 'security', minutes: 3,
    title: '위험에는 행동으로 대응한다',
    table: {
      headers: ['위험', '잘못된 행동', '권장 행동'],
      rows: [
        ['민감정보', '회사 코드·로그 무조건 입력', '정책 확인·공개 예제부터'],
        ['과도한 권한', '모든 실행 자동 승인', 'Manual 또는 Plan부터'],
        ['넓은 수정', '저장소 전체 리팩터링', '파일·완료 기준 제한'],
        ['검증 누락', '완료 메시지 신뢰', '테스트와 diff 직접 확인'],
        ['외부 연결', '광범위한 쓰기 권한', '읽기 우선·최소 권한'],
        ['Git 실수', 'main 직접 작업', '별도 branch']
      ]
    },
    notes: ['조직 정책이 불명확하면 입력하지 않는 것이 기본값이다.', 'MCP·Plugin·Hook은 도구 권한을 확장하므로 공급자와 설정을 검토한다.'],
    transition: '안전 경계를 지키면서 Solution PE 업무에 적용할 후보를 찾는다.',
    guide: '/guide/07-security', sources: [securityDocs, permissionDocs]
  },
  {
    id: 41, section: 'Solution PE Use Cases', minutes: 2,
    title: 'Solution PE팀 적용 후보',
    columns: [
      { title: '분석', items: ['테스트 코드 구조 파악', '실패 로그 분류', '재현 조건 정리'] },
      { title: '자동화', items: ['반복 테스트 절차', '결과 요약', '리뷰 체크리스트'] },
      { title: '문서', items: ['테스트 계획 초안', '변경 영향도', '결과 보고 구조화'] }
    ],
    callout: '문제 → Claude가 맡을 부분 → 사람이 확인할 부분 → 완료 기준 → 보안 주의점',
    notes: ['실제 내부 시스템명과 코드는 공개 자료에 넣지 않는다.', '작은 공개·비민감 작업부터 효과와 위험을 측정한다.'],
    action: '자신의 반복 업무 중 공개 예제로 시험할 후보 하나를 적는다.',
    transition: '마지막으로 오늘의 흐름을 다섯 원칙으로 압축한다.',
    guide: '/guide/06-team-adoption'
  },
  {
    id: 42, section: 'Wrap-up', minutes: 2,
    title: '기억해야 할 다섯 원칙',
    bullets: ['먼저 읽게 하고 바로 수정시키지 않는다.', '복잡한 작업은 Plan을 먼저 검토한다.', '범위·제약·완료 기준·검증을 준다.', '테스트와 diff를 모두 확인한다.', '권한과 민감정보의 책임은 사람에게 있다.'],
    notes: ['각 원칙을 오늘 시연한 한 장면과 연결한다.', '참가자가 한 문장씩 이어 말하게 해도 좋다.'],
    transition: '이 다섯 원칙을 바로 복사할 수 있는 치트시트로 정리한다.',
    guide: '/guide/08-cheatsheet'
  },
  {
    id: 43, section: 'Wrap-up', minutes: 2,
    title: '30초 치트시트',
    prompt: '관련 파일과 테스트를 먼저 확인해줘.\n아직 수정하지 말고 근거와 최소 수정 계획을 제시해줘.\n합의한 범위 안에서만 수정하고 관련 테스트와 전체 테스트를 실행해줘.\n마지막으로 git diff를 리뷰하고 남은 위험을 알려줘.',
    code: 'git branch --show-current\ngit status\nnpm test\ngit diff\ngit diff --staged',
    notes: ['프롬프트와 Git 명령을 한 화면에서 복사할 수 있게 한다.', '교재 치트시트 URL을 안내한다.'],
    transition: '마지막 질문을 받고 교육을 종료한다.',
    guide: '/guide/08-cheatsheet'
  },
  {
    id: 44, section: 'Q&A', kind: 'title', minutes: 1,
    kicker: 'Questions', title: '어디부터 적용할 것인가?',
    subtitle: '작고 공개 가능하며 테스트로 검증할 수 있는 작업부터',
    badges: ['발표 자료 /slides/', '상세 교재 /guide/', '강사용 자료 /instructor/'],
    notes: ['질문이 없으면 참가자 적용 후보를 1~2개 공유하게 한다.', '교육 후 최신 공식 문서 확인 날짜를 주기적으로 갱신한다.'],
    action: '다음 주에 시험할 작업 한 가지를 정한다.',
    transition: '종료',
    sources: [claudeOverview, availabilityDocs]
  }
]
