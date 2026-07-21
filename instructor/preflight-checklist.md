# 강사 사전 점검 체크리스트

<div class="badge-row"><span>D-1 점검</span><span>교육 당일 점검</span><span>실패 대안 포함</span></div>

## D-3 ~ D-1

<ul class="checklist">
<li>GitHub Pages 최신 배포 확인</li>
<li>교육 저장소가 Public인지 확인</li>
<li>실습 프로젝트의 의도된 실패 테스트 확인</li>
<li>정답 branch 또는 patch를 비공개 로컬에 준비</li>
<li>VS Code, Git, Node.js, Claude Code 설치 안내 배포</li>
<li>GitHub 계정 사용 가능 여부 조사</li>
<li>사내망에서 GitHub와 Claude Code 접속 가능한지 확인</li>
<li>공개 예제 외 내부 자료가 포함되지 않았는지 재검토</li>
</ul>

## 교육 당일 30분 전

```bash
git status
git switch main
git pull
npm install
npm run docs:build
cd labs/task-board
npm test
claude --version
```

확인할 사항:

- Pages 링크 정상 접속
- 프로젝터 해상도에서 글자 크기 충분
- VS Code Explorer·Terminal·Source Control이 한 화면에 표시
- Claude Code 로그인 상태
- demo branch 초기 상태
- GitHub push 가능 여부

## 데모 환경

### VS Code

- 글자 크기 확대
- 미니맵 비활성화 또는 축소
- 불필요한 확장 알림 닫기
- Source Control 아이콘이 보이도록 Activity Bar 유지
- Terminal 패널 높이 확보

### 브라우저

- GitHub 저장소 탭
- Actions 또는 Pages 탭
- 예시 Pull Request 화면
- 로그인 정보나 개인 저장소 탭은 닫기

### 터미널

- 프롬프트 경로가 너무 길지 않게 설정
- 이전 명령과 민감한 환경변수 출력 제거
- 글자 크기 확대

## 준비할 branch

```text
main                         원본 실습 상태
demo/task-board-fix          라이브 시연용
backup/demo-complete         네트워크 실패 시 보여줄 완료 상태
```

백업 branch는 참가자가 실수로 사용하지 않도록 강사 로컬에서만 관리할 수 있습니다.

## 참가자 경로 두 가지

### A안 — GitHub 가능

```text
Fork → Clone → Branch → Commit → Push → Pull Request
```

### B안 — GitHub 또는 네트워크 제한

```text
강사 제공 폴더 → Local Git → Branch → Commit
```

교육 시작 때 두 경로를 명확히 안내합니다. B안 참가자는 push와 PR을 완료 기준에서 제외합니다.

## 실패 상황별 대응

### Claude Code 로그인이 안 됨

1. 참가자는 강사 데모를 관찰
2. 프롬프트 작성과 계획 리뷰를 2인 1조로 수행
3. 강사가 실행한 결과를 자신의 VS Code에서 diff로 읽음

### GitHub 접속이 안 됨

1. ZIP 또는 사전 배포 폴더 사용
2. `git init` 또는 포함된 `.git`으로 local branch 실습
3. push·PR은 녹화 또는 예시 화면으로 대체

### npm test가 실행되지 않음

확인 순서:

```bash
pwd
ls
node --version
npm --version
```

Windows PowerShell에서는 `ls` 대신 `Get-ChildItem`도 가능합니다.

### 참가자가 main에서 수정함

변경을 잃지 않고 새 branch를 만듭니다.

```bash
git switch -c practice/<github-id>
```

아직 commit하지 않았다면 일반적으로 변경 파일은 새 branch에 유지됩니다. 실행 전에 `git status`로 확인합니다.

### 참가자가 관련 없는 파일까지 수정함

- Source Control에서 파일별 diff 확인
- 필요한 파일만 stage
- 관련 없는 변경은 commit에서 제외
- 되돌리기 전 대상 파일을 다시 확인

### 시간이 10분 이상 지연됨

삭제 순서:

1. MCP·Hooks 상세
2. PR 직접 생성
3. Skills·Subagents 추가 예시
4. 참가자 개별 발표

절대 삭제하지 않는 것:

- branch
- baseline 테스트
- Plan 또는 수정 전 계획
- diff 리뷰
- 보안 원칙

## 강의 종료 후

<ul class="checklist">
<li>참가자의 반복 질문 기록</li>
<li>실패한 설치 항목 기록</li>
<li>실습 완료율 확인</li>
<li>Pages 문서의 오류와 부족한 설명 수정</li>
<li>실제 업무 적용 후보를 민감정보 없이 정리</li>
<li>다음 교육에서는 Core 구간 시간 배분 조정</li>
</ul>
