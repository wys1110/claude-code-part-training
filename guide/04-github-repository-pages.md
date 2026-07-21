# 저장소 주소만으로 발표자료 Pages 만들기

<div class="badge-row"><span>대상: Solution PE팀 Staff</span><span>사람이 할 일: 저장소 생성·URL 복사·승인</span><span>공식 문서 확인: 2026-07-21</span></div>

## 실습 목표

GitHub에서 빈 Public 저장소를 만들고 주소를 복사한 뒤, Claude Code에 완료 기준을 전달해 **발표자료 생성 → Commit → Push → GitHub Pages 활성화 → 공개 URL 확인**까지 수행합니다.

<div class="flow"><div>Repository 생성</div><div>URL 복사</div><div>Claude Code 요청</div><div>검토·승인</div><div>발표 URL 확인</div></div>

::: danger 공개 저장소 주의
Public 저장소와 GitHub Pages 사이트는 인터넷에서 누구나 볼 수 있습니다. 회사 코드·문서·업무 로그·고객 및 임직원 정보·개인정보·인증 정보·비공개 URL을 사용하지 않습니다.
:::

## 핵심 역할 분리

<div class="training-grid">
  <div class="training-card"><strong>참가자</strong><p>저장소를 만들고 URL을 전달합니다. 변경 파일, Push 대상, Pages 공개 설정과 최종 결과를 확인합니다.</p></div>
  <div class="training-card"><strong>Claude Code</strong><p>환경을 확인하고 저장소를 Clone한 뒤 발표자료를 만들고, diff·Commit·Push·Pages API 호출을 수행합니다.</p></div>
  <div class="training-card"><strong>완료 기준</strong><p>Pages 루트 주소를 열었을 때 별도 문서 홈 없이 발표자료가 바로 실행되어야 합니다.</p></div>
</div>

## 1. Public Repository 만들기

### 입력값

| 항목 | 값 |
|---|---|
| Owner | 본인의 GitHub 개인 계정 |
| Repository name | `claude-code-presentation-<github-id>` |
| Description | `Claude Code training presentation` |
| Visibility | `Public` |
| Initialize | `Add a README file` 활성화 |

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

README를 추가하면 첫 Commit과 `main` 브랜치가 만들어져 Claude Code의 Clone·Push 과정이 단순해집니다.

### 생성 직후 확인

- Owner가 조직 계정이 아니라 본인 계정인가?
- 저장소가 Public인가?
- 기본 브랜치가 `main`인가?
- README 외에 실제 업무 자료가 들어 있지 않은가?

## 2. Repository URL 복사

저장소 화면에서 다음 순서로 복사합니다.

```text
Code
→ HTTPS
→ Copy URL
```

예시:

```text
https://github.com/jayden/claude-code-presentation-jayden.git
```

복사한 주소에서 다음 두 값을 확인합니다.

```text
Owner: jayden
Repository: claude-code-presentation-jayden
```

::: warning 복사하지 않을 것
Repository URL만 복사합니다. GitHub 토큰, 쿠키, 비밀번호, 브라우저 개발자 도구의 인증 값은 공유하지 않습니다.
:::

## 3. Claude Code에 붙여 넣을 프롬프트

아래 프롬프트의 `[REPOSITORY_URL]`만 바꿔서 사용합니다.

```text
아래 GitHub 저장소를 발표자료 전용 GitHub Pages 사이트로 만들어줘.

저장소 주소:
[REPOSITORY_URL]

최종 목표:
- 저장소를 내 PC에 clone한다.
- Pages 루트 주소를 열면 발표자료가 바로 실행되게 한다.
- 참가자 교재, 블로그, 별도 소개 홈페이지는 만들지 않는다.
- 정적 파일 index.html, styles.css, presentation.js 중심으로 구성한다.
- 발표자료는 44장, 총 120분으로 만든다.
- 키보드·클릭·모바일 스와이프, 진행률, 전체 화면, 개요, 발표자 노트, PDF 출력을 지원한다.
- 변경사항을 검토한 뒤 main에 commit·push한다.
- main 브랜치의 / 폴더를 대상으로 GitHub Pages를 활성화한다.
- 최종 공개 URL과 배포 상태를 알려준다.

작업 전 확인:
- git 설치 여부
- GitHub CLI 설치 여부
- gh 로그인 상태
- 저장소 접근·관리 권한
- 현재 작업 폴더

반드시 지킬 것:
- 기존 파일을 임의로 삭제하지 않는다.
- force push를 사용하지 않는다.
- 회사 코드·문서·로그·개인정보·인증 정보를 넣지 않는다.
- Commit 전에 git status, git diff --stat, git diff를 보여준다.
- Push 전에 branch와 remote URL을 확인한다.
- Pages가 이미 활성화돼 있으면 기존 설정을 먼저 확인한다.
- 실행하지 않은 검증을 성공했다고 보고하지 않는다.
```

## 4. Claude Code가 수행할 작업

```text
환경·권한 확인
→ Repository Clone
→ 발표자료 정적 파일 생성
→ 44장·120분 검증
→ git status·diff 검토
→ Commit
→ main Push
→ Pages 설정 확인·생성
→ 공개 URL 검증
```

### 권장 파일 구조

```text
index.html
styles.css
presentation.js
assets/        # 필요한 경우에만
README.md      # 기존 파일 유지 가능
```

발표 사이트에 별도 빌드가 필요하지 않도록 기본적으로 다음 항목은 추가하지 않습니다.

- VitePress
- React·Vue
- `package.json`
- 문서 사이트
- 블로그
- 참가자 교재 페이지

## 5. 실행 중 사람이 확인할 지점

### 계획 확인

- Pages 루트에서 발표자료가 바로 열리는 구조인가?
- 발표자료 외 불필요한 페이지를 만들지 않는가?
- 기존 README나 파일을 삭제하려 하지 않는가?

### Commit 전

```bash
git status
git diff --stat
git diff
```

확인 항목:

- 예상한 발표 파일만 추가·수정됐는가?
- 회사 정보나 개인정보가 포함되지 않았는가?
- 인증 토큰이나 비공개 URL이 없는가?
- 외부 빌드 의존성이 불필요하게 추가되지 않았는가?
- 슬라이드가 44장인가?
- 시간 합계가 120분인가?

### Push 전

```bash
git branch --show-current
git remote -v
git status
```

- 현재 브랜치가 `main`인가?
- `origin`이 방금 만든 저장소인가?
- Push할 Commit이 맞는가?

## 6. GitHub Pages 자동 활성화

Claude Code는 Push 성공 후 Pages 상태를 확인합니다.

```bash
gh api repos/<owner>/<repo>/pages
```

Pages가 아직 만들어지지 않아 `404`가 반환되면 다음 조건으로 생성합니다.

```text
Build type: legacy
Branch: main
Folder: /
```

```bash
gh api \
  --method POST \
  repos/<owner>/<repo>/pages \
  -f build_type=legacy \
  -f 'source[branch]=main' \
  -f 'source[path]=/'
```

`gh api`는 인증된 GitHub REST API 요청을 실행합니다. 중첩 필드는 `source[branch]`, `source[path]` 형태로 전달합니다.

### 이미 Pages가 있는 경우

먼저 현재 응답을 확인합니다.

```bash
gh api repos/<owner>/<repo>/pages \
  --jq '{status, html_url, build_type, source}'
```

다음 값이 맞으면 변경하지 않습니다.

```text
build_type: legacy
source.branch: main
source.path: /
```

설정이 다른 경우 기존 사이트에 미치는 영향을 알린 뒤 필요한 범위만 업데이트합니다.

```bash
gh api \
  --method PUT \
  repos/<owner>/<repo>/pages \
  -f build_type=legacy \
  -f 'source[branch]=main' \
  -f 'source[path]=/'
```

### 필요한 권한

- GitHub CLI 로그인
- 저장소에 대한 Push 권한
- Pages 설정을 관리할 수 있는 권한

`404`는 Pages가 없다는 의미일 수 있지만, 저장소 주소 오류나 접근 권한 부족에서도 발생할 수 있습니다. 응답을 보고 구분합니다.

## 7. 최종 발표 URL 확인

일반적인 프로젝트 Pages 주소는 다음 형식입니다.

```text
https://<github-id>.github.io/<repository-name>/
```

예시:

```text
https://jayden.github.io/claude-code-presentation-jayden/
```

### 완료 검증

- URL을 열면 문서 홈이 아니라 발표 첫 장이 바로 보이는가?
- 좌우 방향키와 Space로 이동하는가?
- 화면 좌우 클릭과 모바일 스와이프가 동작하는가?
- `#slide=10` 주소를 새로고침해도 같은 장이 유지되는가?
- 전체 화면, 개요, 발표자 노트, PDF 버튼이 있는가?
- 모바일 viewport에서 내용이 잘리지 않는가?

## 8. 문제 해결

### `gh`가 없거나 로그인되지 않음

```bash
gh --version
gh auth status
```

설치 또는 로그인 후 다시 진행합니다. 교육 시간 안에 해결되지 않으면 강사 화면을 관찰하고, Pages 설정만 웹에서 수동으로 수행합니다.

### Clone 또는 Push 실패

- Repository URL의 owner/name 확인
- GitHub 로그인 계정 확인
- 저장소 Push 권한 확인
- 현재 브랜치와 remote 확인
- 기존 폴더 이름 충돌 확인

### Pages API 404

1. Repository URL이 맞는가?
2. 로그인 계정이 해당 저장소를 관리할 수 있는가?
3. Pages가 아직 생성되지 않은 상태인가?
4. API endpoint의 owner/repo가 맞는가?

### 공개 URL 404

1. Pages 응답의 `status` 확인
2. `source.branch`가 `main`인지 확인
3. `source.path`가 `/`인지 확인
4. 저장소 루트에 `index.html`이 있는지 확인
5. 배포 직후라면 잠시 기다린 뒤 다시 확인

### 수동 대안

자동 API 설정이 불가능한 경우에만 다음 경로를 사용합니다.

```text
Settings
→ Pages
→ Deploy from a branch
→ main
→ / (root)
→ Save
```

## 9. 완료 체크리스트

<ul class="checklist">
<li>새 Public Repository를 만들었다.</li>
<li>Repository HTTPS URL을 복사했다.</li>
<li>URL을 포함한 프롬프트를 Claude Code에 전달했다.</li>
<li>Claude Code가 제시한 계획과 권한 요청을 확인했다.</li>
<li>발표자료 전용 정적 파일이 생성됐다.</li>
<li>Commit 전에 status와 diff를 검토했다.</li>
<li>main 브랜치와 origin URL을 확인했다.</li>
<li>Commit과 Push가 성공했다.</li>
<li>Pages가 main의 / 폴더를 배포한다.</li>
<li>공개 URL에서 발표자료가 바로 실행된다.</li>
<li>발표 이동·노트·전체 화면·PDF 기능을 확인했다.</li>
</ul>

---

**공식 참고:** [Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) · [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) · [REST API endpoints for GitHub Pages](https://docs.github.com/en/rest/pages/pages) · [GitHub CLI `gh api`](https://cli.github.com/manual/gh_api)
