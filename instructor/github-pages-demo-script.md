# GitHub 저장소 URL → 발표자료 Pages 15분 시연 대본

<div class="badge-row"><span>대상: Solution PE팀 Staff</span><span>시간: 15분</span><span>방식: 저장소 생성 + Claude Code 자동화</span><span>공식 문서 확인: 2026-07-21</span></div>

## 시연 목표

참가자가 다음 흐름을 이해하고 직접 시작할 수 있게 합니다.

<div class="flow"><div>Repository 생성</div><div>URL 복사</div><div>Claude Code 요청</div><div>검토·승인</div><div>발표 URL 확인</div></div>

핵심 메시지:

> 사람은 대상 저장소와 완료 기준을 정하고, Claude Code는 Clone부터 Pages 활성화까지 수행한다. 단, 변경·Push·공개 설정은 사람이 검토한다.

## 강사 사전 준비

- GitHub 로그인 완료
- GitHub CLI 설치와 `gh auth status` 확인
- Claude Code 실행 가능 상태
- 충돌하지 않는 Public 저장소 이름 준비
- 화면 공유에서 회사 자료·알림·비공개 탭 제거
- API 자동화가 막힐 때 사용할 Settings → Pages 수동 대안 확인

## 0:00~2:00 — 역할 분리

### 화면

슬라이드 10.

### 강사 멘트

> 이번 실습은 GitHub 메뉴와 명령어를 모두 외우는 과정이 아닙니다. 참가자는 Public 저장소를 만들고 URL을 복사합니다. Claude Code는 그 URL을 기준으로 Clone, 발표자료 생성, Commit, Push, Pages 활성화를 수행합니다. 공개 범위와 변경 파일은 사람이 확인합니다.

### 확인 질문

- Claude Code에 맡겨도 사람이 다시 확인해야 하는 것은 무엇인가?

정답 방향:

- Public 공개 범위
- 변경 파일과 diff
- Push 대상 branch와 remote
- Pages 배포 source와 최종 URL

## 2:00~4:00 — Public Repository 생성

### 클릭 순서

```text
GitHub 오른쪽 위 +
→ New repository
→ Owner 확인
→ Repository name 입력
→ Public
→ Add a README file
→ Create repository
```

### 입력 예시

```text
Repository: claude-code-presentation-<github-id>
Description: Claude Code training presentation
Visibility: Public
Initialize: Add a README file
```

### 강사 멘트

> README를 추가하면 첫 Commit과 main 브랜치가 만들어집니다. Public 저장소와 Pages 사이트는 인터넷에서 누구나 볼 수 있으므로 공개 예제 외의 자료는 넣지 않습니다.

### 멈춤 질문 1

> Public 저장소에 넣으면 안 되는 자료를 두 가지 말해보세요.

## 4:00~5:00 — Repository URL 복사

### 클릭 순서

```text
Code
→ HTTPS
→ Copy URL
```

### 화면 예시

```text
https://github.com/<github-id>/claude-code-presentation-<github-id>.git
```

### 강사 멘트

> Claude Code에 전달할 것은 저장소 URL입니다. 토큰이나 비밀번호는 전달하지 않습니다. URL의 owner와 repository 이름이 방금 만든 저장소와 일치하는지 확인합니다.

## 5:00~8:00 — 프롬프트 전달

슬라이드 13의 프롬프트를 복사하고 실제 URL을 넣습니다.

```text
아래 GitHub 저장소를 발표자료 전용 GitHub Pages 사이트로 만들어줘.

저장소 주소:
[REPOSITORY_URL]

저장소를 clone하고 발표자료 파일만 만들어줘.
변경사항을 검토한 뒤 main에 commit·push하고,
main 브랜치의 / 폴더로 GitHub Pages를 활성화해줘.
마지막으로 공개 URL과 배포 상태를 알려줘.
기존 파일 삭제와 force push는 하지 마.
```

### 강사 멘트

> 좋은 요청은 긴 설명보다 대상 URL, 최종 결과, 금지사항을 명확히 합니다. 오늘의 최종 결과는 Pages 루트에서 발표자료가 바로 열리는 것입니다.

### 멈춤 질문 2

> 이 프롬프트에서 가장 중요한 완료 기준은 무엇입니까?

정답 방향:

- Pages 루트 주소에서 발표자료가 바로 실행됨
- 문서 홈이나 별도 블로그를 만들지 않음

## 8:00~11:00 — 계획과 변경 검토

Claude Code가 먼저 확인해야 할 항목:

```text
git --version
gh --version
gh auth status
pwd
```

예상 작업 흐름:

```text
환경·권한 확인
→ Clone
→ index.html·styles.css·presentation.js 생성
→ 44장·120분 검증
→ git status·diff 확인
→ Commit
→ Push
```

### 강사가 멈출 지점

1. Clone 대상 URL이 맞는가?
2. 기존 README를 삭제하려 하지 않는가?
3. 발표자료 외 불필요한 프레임워크를 추가하지 않는가?
4. `git diff`에 예상한 파일만 있는가?
5. 현재 branch와 remote가 맞는가?

### 강사 멘트

> 자동화가 빨라도 Commit 전 diff와 Push 대상은 사람이 확인합니다. Claude의 완료 메시지가 아니라 실제 Git 상태를 봅니다.

### 멈춤 질문 3

> Push 승인 전에 반드시 확인할 두 가지는 무엇입니까?

정답 방향:

- 현재 branch가 main인지
- origin이 본인의 새 저장소인지

## 11:00~13:00 — Pages API 활성화

Push 성공 후 현재 Pages 설정을 확인합니다.

```bash
gh api repos/<owner>/<repo>/pages
```

Pages가 아직 없고 권한이 정상이라면 생성합니다.

```bash
gh api \
  --method POST \
  repos/<owner>/<repo>/pages \
  -f build_type=legacy \
  -f 'source[branch]=main' \
  -f 'source[path]=/'
```

### 강사 멘트

> `gh api`는 로그인된 계정으로 GitHub REST API를 호출합니다. source의 branch와 path는 발표자료 파일 위치와 일치해야 합니다. 404가 나와도 무조건 새로 만들지 말고 주소 오류와 권한 문제를 먼저 구분합니다.

### 응답에서 볼 값

```text
status
html_url
build_type
source.branch
source.path
```

### 멈춤 질문 4

> `source.path`가 `/docs`인데 발표자료는 저장소 루트에 있다면 어떻게 될까요?

정답 방향: 배포 source와 파일 위치가 달라 정상적으로 열리지 않을 수 있음.

## 13:00~15:00 — 공개 URL 검증

일반적인 URL 형식:

```text
https://<github-id>.github.io/<repository-name>/
```

### 확인 순서

1. `status`가 배포 완료 상태인지 확인
2. `html_url` 열기
3. 첫 화면이 발표자료인지 확인
4. 방향키와 Space로 이동
5. `#slide=번호` 새로고침
6. 전체 화면, 개요, 노트, PDF 버튼 확인
7. 모바일 viewport 확인

### 강사 멘트

> Pages를 켰다는 것이 완료가 아닙니다. 공개 URL에서 발표자료가 실제로 동작하는 것이 완료입니다. 실행하지 못한 기능은 성공했다고 보고하지 않습니다.

### 완료 질문

- 사람에게 남는 책임은 무엇인가?
- Claude Code 자동화로 줄어든 단계는 무엇인가?

## 실패 대응

### `gh`가 없거나 로그인되지 않음

```bash
gh --version
gh auth status
```

교육 시간 안에 해결되지 않으면 강사 화면 관찰로 전환하고 Pages 설정은 수동 경로를 사용합니다.

### Clone 실패

- URL owner/name 확인
- 동일 이름의 로컬 폴더 충돌 확인
- GitHub 로그인과 저장소 접근 확인

### Push 실패

- `git branch --show-current`
- `git remote -v`
- 인증 상태
- 저장소 Push 권한

### Pages API 404

- Pages 미생성
- 잘못된 owner/repo
- 저장소 접근 권한 부족

세 경우를 구분합니다.

### Pages 관리 권한 부족

자동화를 중단하고 저장소 관리자에게 권한을 확인합니다. 조직 정책을 우회하지 않습니다.

### 수동 대안

```text
Settings
→ Pages
→ Deploy from a branch
→ main
→ / (root)
→ Save
```

수동 대안은 API 자동화가 막혔을 때만 사용합니다.

### 공개 URL 404

1. Pages status
2. source.branch = main
3. source.path = /
4. root의 index.html
5. 정확한 html_url
6. 배포 지연 여부

### 민감자료 발견

즉시 작업을 중단합니다. Commit 이후 삭제하거나 Private으로 전환하는 것만으로 해결됐다고 판단하지 않고 조직 보안 절차를 따릅니다.

## 시간 초과 시 생략 순서

1. 발표 디자인 설명
2. API 응답 필드 전체 설명
3. 모바일 검증 시연

반드시 유지:

- Public 경고
- Repository 생성과 URL 복사
- 프롬프트 전달
- Commit 전 diff
- Push 대상 확인
- Pages source 확인
- 공개 URL 검증

---

**공식 자료 확인일:** 2026-07-21  
**공식 참고:** [Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) · [Creating a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) · [REST API endpoints for GitHub Pages](https://docs.github.com/en/rest/pages/pages) · [`gh api`](https://cli.github.com/manual/gh_api)
