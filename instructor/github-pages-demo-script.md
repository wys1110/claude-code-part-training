# GitHub 저장소·Pages 15분 시연 대본

<div class="badge-row"><span>대상: Solution PE팀 Staff</span><span>시간: 15분</span><span>방식: GitHub 웹 UI 따라 하기</span><span>공식 문서 확인: 2026-07-21</span></div>

## 시연 목표

참가자가 다음 흐름을 직접 수행하도록 안내합니다.

<div class="flow"><div>Repository 생성</div><div>index.html Commit</div><div>Pages 활성화</div><div>배포 확인</div><div>수정·재배포</div></div>

## 강사 사전 준비

- GitHub 로그인 완료
- 테스트용 개인 계정 또는 공개 교육 계정 준비
- `my-first-pages-demo`와 충돌하지 않는 저장소 이름 준비
- `labs/github-pages-starter/index.html`을 별도 탭에 열어둠
- 교육 사이트의 `.github/workflows/deploy.yml`을 비교 시연용으로 열어둠
- 모바일 대안 화면을 설명할 수 있도록 브라우저 데스크톱 보기 위치 확인
- 회사 자료가 화면 공유에 나타나지 않도록 탭과 알림 정리

## 0:00~2:00 — Git과 GitHub의 역할

### 화면

발표 슬라이드 10.

### 강사 멘트

> Git은 파일 변경을 Commit이라는 이력으로 남기는 도구입니다. GitHub는 그 Repository를 원격에서 보관하고 공유하며, Pages로 정적 웹사이트를 공개할 수 있습니다. 이번 실습은 로컬 명령 없이 GitHub 웹에서 Repository, Commit, Pages의 관계를 확인합니다.

### 확인 질문

- README와 웹사이트 첫 페이지는 같은 파일인가?
- Commit은 단순 저장과 무엇이 다른가?

### 핵심 답

- README는 저장소 설명이고, 이번 사이트의 시작 파일은 `index.html`입니다.
- Commit은 변경 내용과 시점을 이력으로 남깁니다.

## 2:00~4:00 — 새 Repository 생성

### 클릭 순서

1. GitHub 오른쪽 위 `+`
2. `New repository`
3. Owner 확인
4. `my-first-pages-<github-id>` 입력
5. Description 입력
6. `Public`
7. `Add a README file`
8. `Create repository`

### 입력값

```text
Repository: my-first-pages-<github-id>
Description: My first GitHub Pages practice site
Visibility: Public
Initialize: Add a README file
```

### 강사 멘트

> Owner와 Repository 이름은 Pages URL에 영향을 줍니다. Public은 인터넷에서 누구나 파일을 볼 수 있다는 뜻입니다. 실습용 HTML 외에는 올리지 않습니다.

### 멈춤 질문 1

> 지금 이 저장소에서 인터넷에 공개될 수 있는 것은 무엇입니까?

정답 방향: Repository의 파일과 이후 생성되는 Pages 사이트.

### 흔한 실수

- Owner를 조직 계정으로 선택
- 기존 저장소와 이름 중복
- README 선택 누락
- 실제 자기소개에 전화번호나 회사 정보를 입력

## 4:00~6:00 — `index.html` 작성과 Commit

### 클릭 순서

1. `Add file`
2. `Create new file`
3. 파일명 `index.html`
4. starter HTML 붙여 넣기
5. `Commit changes`
6. Commit message 확인
7. main에 Commit

### 강사 멘트

> README는 GitHub 저장소 화면에서 설명으로 렌더링됩니다. 브라우저가 Pages 사이트에 들어왔을 때 찾는 시작 페이지는 `index.html`입니다. 파일을 만들고 Commit해야 main 브랜치의 상태가 바뀝니다.

### 참가자 수정 범위

- `<title>`
- `<h1>`
- 설명 문장
- 학습 목표 세 가지

### 중단 기준

참가자가 회사 코드, 업무 로그, 고객·임직원 정보, 인증 정보, 비공개 URL을 붙여 넣으려 하면 즉시 중단합니다.

## 6:00~8:00 — 배포 방식 비교

### 화면

두 카드만 보여줍니다.

```text
단순 HTML
→ Deploy from a branch

VitePress·Vue·React
→ GitHub Actions
```

### 강사 멘트

> 이번 저장소는 별도 build가 없는 HTML이므로 main 브랜치의 root를 그대로 배포합니다. 현재 Claude Code 교육 사이트는 VitePress이기 때문에 npm install과 build를 수행한 결과물을 GitHub Actions로 배포합니다. 두 방식을 한 저장소에서 동시에 설정하지 않습니다.

### 보여줄 파일

현재 교육 저장소의 `.github/workflows/deploy.yml`을 20초 이내로 보여주며 `Install dependencies`, `Build site`, `Upload artifact`, `Deploy` 단계만 짚습니다.

### 멈춤 질문 2

> 지금 만든 HTML 저장소에는 왜 별도 build 명령이 필요하지 않습니까?

정답 방향: 브라우저가 정적 HTML을 직접 읽을 수 있기 때문.

## 8:00~11:00 — Deploy from a branch 활성화

### 정확한 클릭 순서

1. 저장소 상단 `Settings`
2. 왼쪽 `Code and automation`
3. `Pages`
4. `Build and deployment`
5. Source → `Deploy from a branch`
6. Branch → `main`
7. Folder → `/ (root)`
8. `Save`

### 강사 멘트

> 지금 선택하는 세 값은 배포 방식, 배포할 이력의 선, 그리고 그 브랜치 안의 폴더입니다. index.html이 main의 root에 있으므로 main과 root를 선택합니다.

### 멈춤 질문 3

> index.html을 docs 폴더에 만들었다면 root를 선택해도 정상 배포될까요?

정답 방향: 선택한 배포 폴더와 파일 위치가 일치해야 함.

### 모바일 대안

- 상단 탭이 숨으면 좌우 이동 또는 더보기 메뉴 확인
- 저장소 메인 화면에서 Settings로 이동
- Settings 안의 `Actions`가 아니라 `Pages` 선택
- 화면이 좁으면 브라우저의 데스크톱 사이트 보기 사용

## 11:00~13:00 — Actions와 공개 URL 확인

### 클릭 순서

1. 저장소 상단 `Actions`
2. Pages 관련 workflow 선택
3. 상태 확인
4. Settings → Pages로 돌아가 공개 URL 확인
5. 새 탭에서 URL 접속

### 상태 설명

- 노란색: 실행 중
- 초록색: 성공
- 빨간색: 실패

### 강사 멘트

> Save를 눌렀다고 사이트가 즉시 완성된 것은 아닙니다. GitHub가 배포 작업을 실행하고 성공해야 공개 URL에서 파일을 볼 수 있습니다.

### 멈춤 질문 4

> URL이 404라면 가장 먼저 무엇을 확인합니까?

정답 방향: Actions 성공 여부. 그다음 main, root, index.html, 정확한 URL.

## 13:00~15:00 — 수정과 재배포

### 클릭 순서

1. `index.html` 열기
2. 편집 버튼
3. 제목 또는 설명 한 줄 수정
4. Commit message: `Update page introduction`
5. main에 Commit
6. Actions 새 실행 확인
7. 배포 성공 후 페이지 새로고침

### 강사 멘트

> GitHub Pages는 한 번 파일을 올리는 서비스가 아닙니다. main 브랜치의 새 Commit을 감지해 웹사이트를 다시 배포합니다. 저장소의 이력과 공개 사이트의 버전이 연결됩니다.

### 완료 질문

- 현재 공개 사이트는 어느 Commit의 내용을 보여주는가?
- HTML을 다시 수정하면 무엇이 자동으로 실행되는가?

## 실패 대응

### Settings가 보이지 않음

- 저장소 메인 화면인지 확인
- 개인 저장소의 관리자 권한 확인
- 모바일 숨김 탭 확인

### Pages가 보이지 않음

- `Code and automation` 영역 확인
- 조직 정책 또는 저장소 권한 확인
- 개인 계정의 새 Public 저장소로 실습했는지 확인

### Workflow가 시작되지 않음

- Source 설정을 Save했는지 확인
- main 브랜치와 `index.html` 존재 확인
- Actions가 허용됐는지 확인

### 404

1. Workflow 성공 여부
2. 정확한 사용자 ID·저장소 이름
3. main 선택 여부
4. `/ (root)` 선택 여부
5. root의 `index.html`
6. 배포 후 1~3분 경과 여부

### Public 저장소 생성 불가

- 조직 정책을 우회하지 않음
- 강사 화면 관찰로 전환
- starter HTML을 로컬 브라우저에서 열어 구조만 확인

### 민감자료 업로드

즉시 중단합니다. 이미 Commit했다면 단순 삭제 또는 Private 전환만으로 처리하지 말고 조직 보안 절차를 따릅니다.

## 시간 초과 시 생략 순서

1. HTML 스타일 설명
2. 교육 사이트 workflow 상세 설명
3. 참가자 전체 재배포 대기

반드시 유지:

- Public 경고
- Repository 생성
- `index.html` Commit
- Pages Source 설정
- Actions 성공 확인
- 404 확인 순서

---

**공식 자료 확인일:** 2026-07-21  
**공식 참고:** [Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) · [Uploading a project](https://docs.github.com/en/get-started/start-your-journey/uploading-a-project-to-github) · [Creating a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) · [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) · [Using custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
