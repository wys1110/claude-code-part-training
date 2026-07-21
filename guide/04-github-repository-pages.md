# GitHub 저장소 만들기와 Pages 활성화

<div class="badge-row"><span>대상: Solution PE팀 Staff</span><span>실습: GitHub 웹 UI</span><span>공식 문서 확인: 2026-07-21</span></div>

## 실습 목표

GitHub 웹사이트에서 공개 실습용 저장소를 만들고, `index.html`을 Commit한 뒤 GitHub Pages로 배포합니다.

<div class="flow"><div>Repository 생성</div><div>index.html Commit</div><div>Pages 설정</div><div>배포 확인</div><div>수정·재배포</div></div>

이번 실습은 **단순 HTML + Deploy from a branch** 방식입니다. 회사 코드, 업무 문서, 실제 로그, 고객·임직원 정보, 인증 정보는 사용하지 않습니다.

::: danger Public 저장소 주의
Public 저장소와 Pages 사이트는 인터넷에서 누구나 볼 수 있습니다. 실습에서는 이 문서의 예제 HTML과 공개 가능한 교육 문장만 사용합니다.
:::

## 1. Repository란?

Repository는 프로젝트의 파일, 폴더, 변경 이력, 협업 설정을 보관하는 공간입니다.

- `README.md`: 저장소의 목적과 사용법을 설명하는 문서
- `index.html`: 이번 웹사이트의 시작 페이지
- Commit: 파일 변경을 이력으로 남긴 저장점
- Settings: 저장소 기능과 권한을 설정하는 곳
- Pages: 저장소의 정적 파일을 웹사이트로 배포하는 기능

`README.md`가 있다고 해서 웹사이트가 자동으로 완성되는 것은 아닙니다. 이번 실습에서는 저장소 루트의 `index.html`을 시작 페이지로 사용합니다.

## 2. 새 Repository 만들기

### 입력값

| 항목 | 입력값 |
|---|---|
| Owner | 본인의 GitHub 계정 |
| Repository name | `my-first-pages-<github-id>` |
| Description | `My first GitHub Pages practice site` |
| Visibility | `Public` |
| Initialize | `Add a README file` 활성화 |

예시:

```text
GitHub ID: jayden
Repository: my-first-pages-jayden
예상 URL: https://jayden.github.io/my-first-pages-jayden/
```

### 클릭 순서

1. GitHub에 로그인합니다.
2. 화면 오른쪽 위의 `+` 생성 메뉴를 선택합니다.
3. `New repository`를 선택합니다.
4. `Owner`가 자신의 계정인지 확인합니다.
5. Repository name에 `my-first-pages-<github-id>`를 입력합니다.
6. Description을 입력합니다.
7. `Public`을 선택합니다.
8. `Add a README file`을 활성화합니다.
9. `Create repository`를 선택합니다.
10. 저장소 화면에서 `README.md`와 `main` 브랜치를 확인합니다.

### 자주 발생하는 실수

- Owner를 조직 계정으로 잘못 선택함
- 저장소 이름에 공백이나 대문자를 섞어 URL을 헷갈림
- 기존 저장소와 이름이 중복됨
- Public의 의미를 확인하지 않고 실제 자료를 업로드함
- README를 웹사이트 첫 페이지로 오해함

### 상태 변화

```text
저장소 없음
→ Public Repository 생성
→ main 브랜치 생성
→ README 첫 Commit 생성
```

## 3. 첫 번째 `index.html` 만들기

### 클릭 순서

1. 저장소 메인 화면에서 `Add file`을 선택합니다.
2. `Create new file`을 선택합니다.
3. 파일 이름에 `index.html`을 입력합니다.
4. 아래 HTML을 붙여 넣습니다.
5. 제목, 설명 문장, 학습 목표 세 가지를 공개 가능한 내용으로 수정합니다.
6. `Commit changes`를 선택합니다.
7. Commit message를 확인합니다.
8. `Commit directly to the main branch`가 선택된 상태에서 Commit합니다.
9. 저장소 루트에 `index.html`이 생성됐는지 확인합니다.

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My First GitHub Pages</title>
  <style>
    body {
      max-width: 720px;
      margin: 80px auto;
      padding: 0 24px;
      font-family: system-ui, sans-serif;
      line-height: 1.7;
    }

    h1 {
      color: #24292f;
    }

    .card {
      margin-top: 24px;
      padding: 24px;
      border: 1px solid #d0d7de;
      border-radius: 12px;
      background: #f6f8fa;
    }
  </style>
</head>
<body>
  <h1>My First GitHub Pages</h1>

  <div class="card">
    <p>GitHub 저장소와 Pages 배포를 실습하고 있습니다.</p>

    <ul>
      <li>Repository 생성</li>
      <li>HTML 파일 Commit</li>
      <li>GitHub Pages 배포</li>
    </ul>
  </div>
</body>
</html>
```

### Commit의 의미

웹 편집기에서 `Commit changes`를 누르면 단순히 파일을 저장하는 것 이상의 변화가 생깁니다.

```text
index.html 파일 생성
→ 변경 내용에 Commit ID 부여
→ main 브랜치의 최신 상태 변경
→ Pages 배포가 참조할 파일 준비 완료
```

## 4. Pages 배포 방식 선택

GitHub Pages에는 두 가지 대표적인 배포 방식이 있습니다.

<div class="training-grid">
  <div class="training-card"><strong>Deploy from a branch</strong><p>HTML, CSS, JavaScript처럼 별도 빌드가 필요 없는 파일을 main의 root 또는 docs 폴더에서 배포합니다. 이번 실습 방식입니다.</p></div>
  <div class="training-card"><strong>GitHub Actions</strong><p>VitePress, Vue, React처럼 의존성 설치와 build가 필요한 프로젝트에서 생성된 정적 결과물을 배포합니다. 현재 교육 사이트 방식입니다.</p></div>
  <div class="training-card"><strong>선택 기준</strong><p>빌드 과정이 필요 없으면 Branch, 빌드 결과물을 만들어야 하면 Actions를 선택합니다.</p></div>
</div>

두 방식을 동시에 활성화하려 하지 않습니다. 저장소의 구조와 배포 요구사항에 맞는 한 가지 방식을 선택합니다.

## 5. Deploy from a branch 활성화

### 정확한 선택값

```text
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

### 클릭 순서

1. 저장소 상단의 `Settings`를 선택합니다.
2. 왼쪽 메뉴에서 `Code and automation` 영역을 찾습니다.
3. `Pages`를 선택합니다.
4. `Build and deployment`를 확인합니다.
5. `Source`에서 `Deploy from a branch`를 선택합니다.
6. Branch에서 `main`을 선택합니다.
7. Folder에서 `/ (root)`를 선택합니다.
8. `Save`를 선택합니다.
9. 배포가 시작됐다는 상태 또는 workflow 링크를 확인합니다.

### 각 선택값의 의미

| 선택값 | 의미 | 잘못 선택하면 |
|---|---|---|
| Deploy from a branch | 지정한 브랜치의 정적 파일을 배포 | Actions 설정과 혼동할 수 있음 |
| main | 최신 `index.html`이 있는 브랜치 | 다른 브랜치를 선택하면 파일이 없을 수 있음 |
| `/ (root)` | 저장소 최상위 폴더를 배포 | `index.html` 위치와 폴더가 다르면 404 발생 |
| Save | 설정을 저장하고 배포 시작 | 저장하지 않으면 workflow가 시작되지 않음 |

::: tip 모바일 화면
저장소 상단 탭이 보이지 않으면 탭 영역을 좌우로 이동하거나 더보기 메뉴를 확인합니다. `Settings` 안에서는 `Actions`가 아니라 `Pages`를 선택해야 합니다. 화면이 지나치게 좁으면 브라우저의 데스크톱 사이트 보기를 사용합니다.
:::

## 6. 배포 상태 확인

### Actions에서 확인

1. 저장소 상단의 `Actions`를 선택합니다.
2. Pages 관련 workflow를 엽니다.
3. 실행 상태를 확인합니다.

| 표시 | 의미 | 행동 |
|---|---|---|
| 노란색 | 실행 중 | 완료될 때까지 대기 |
| 초록색 | 배포 성공 | 공개 URL 접속 |
| 빨간색 | 배포 실패 | 실패 단계와 설정 확인 |

### 공개 URL 확인

Settings → Pages에서 표시되는 URL을 사용합니다. 프로젝트 저장소의 일반적인 주소 형태는 다음과 같습니다.

```text
https://<github-id>.github.io/my-first-pages-<github-id>/
```

사용자 ID와 저장소 이름이 URL에 그대로 반영됩니다.

### 404가 발생할 때

다음 순서로 확인합니다.

1. Actions workflow가 초록색 성공인가?
2. Pages 설정을 `Save`했는가?
3. Branch가 `main`인가?
4. Folder가 `/ (root)`인가?
5. `index.html`이 저장소 루트에 있는가?
6. URL의 GitHub ID와 저장소 이름이 정확한가?
7. 배포 직후라면 1~3분 뒤 새로고침했는가?

## 7. 수정 후 재배포

첫 배포가 성공하면 `index.html`을 한 번 더 수정합니다.

1. 저장소에서 `index.html`을 엽니다.
2. 파일 편집 버튼을 선택합니다.
3. 제목을 바꿉니다.
4. 설명 문장을 한 줄 추가합니다.
5. Commit message에 `Update page introduction`을 입력합니다.
6. main에 Commit합니다.
7. Actions의 새 실행을 확인합니다.
8. 배포 성공 후 웹페이지를 새로고침합니다.

```text
파일 수정
→ 새 Commit
→ Pages workflow 자동 실행
→ 새 버전 배포
→ 공개 URL 내용 변경
```

GitHub Pages는 파일을 한 번 업로드하고 끝나는 서비스가 아니라, 저장소의 변경 이력을 기반으로 사이트를 반복 배포합니다.

## 8. 참가자 완료 체크리스트

<ul class="checklist">
<li>GitHub 저장소를 만들었다.</li>
<li>저장소를 Public으로 설정했다.</li>
<li>README를 포함해 생성했다.</li>
<li>저장소 루트에 index.html을 만들었다.</li>
<li>첫 Commit을 생성했다.</li>
<li>Pages Source를 Deploy from a branch로 설정했다.</li>
<li>main / (root)를 선택했다.</li>
<li>Actions에서 배포 성공을 확인했다.</li>
<li>공개 URL에 접속했다.</li>
<li>HTML을 수정하고 재배포를 확인했다.</li>
</ul>

## 9. 문제 해결

### Settings가 보이지 않음

- 저장소 메인 화면인지 확인
- 저장소 관리자 권한 확인
- 모바일의 숨겨진 탭 또는 더보기 확인

### Pages 메뉴가 보이지 않음

- Settings의 `Code and automation` 영역 확인
- 개인 저장소의 관리자 권한 확인
- 조직 계정이라면 Pages 제한 정책 확인

### Workflow가 실행되지 않음

- Pages Source를 저장했는지 확인
- main 브랜치가 존재하는지 확인
- `index.html`이 root에 있는지 확인
- 저장소 Actions가 허용됐는지 확인

### Public 저장소를 만들 수 없음

- 계정 또는 조직 정책 확인
- 강사 시연을 관찰하고 Local-only HTML 실습으로 전환
- 정책을 우회해 임의의 외부 계정을 사용하지 않음

### 회사 자료를 올리려는 경우

즉시 업로드를 중단합니다. 이미 Commit했다면 단순 삭제나 Private 전환만으로 끝내지 말고 조직의 보안 사고 대응 절차를 확인합니다.

---

**공식 자료 확인일:** 2026-07-21  
**공식 참고:** [Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) · [Uploading a project](https://docs.github.com/en/get-started/start-your-journey/uploading-a-project-to-github) · [Creating a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) · [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) · [Using custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
