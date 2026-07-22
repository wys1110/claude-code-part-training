# Claude Code 5개 스킬 통합 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 120분 포트폴리오 워크숍에 5개 Claude Code 스킬의 사용 전후 비교를 통합하고, 73장 덱·전체 발표자 노트·렌더 QA를 완성한다.

**Architecture:** 기존 standalone HTML 덱의 슬라이드 메타데이터 계약을 유지하면서 신규 10장을 기존 11번 뒤에 삽입하고 이후 ID를 10씩 이동한다. 스킬 챕터는 Neon Terminal 변형을 사용하며, `script.md`와 HTML 내장 노트 JSON은 동일한 73개 섹션을 공유한다.

**Tech Stack:** standalone HTML/CSS/JavaScript, Node.js `node:test`, headless Google Chrome, Poppler `pdfinfo`, local HTTP server

## Global Constraints

- 대상은 `Solution PE팀 Staff`, 발표자는 `원용석`이다.
- 개인 업무 포트폴리오를 GitHub Pages 공개 URL까지 완성하는 하나의 연속 사례를 유지한다.
- 최종 덱은 73개 순차 슬라이드, 정확히 120분이다.
- 기존 STEP 01–12 실습 45분과 휴식 10분은 유지한다.
- 신규 12–21번만 Neon Terminal 변형을 사용하고 나머지 Minimal Dark 기반을 유지한다.
- 다섯 스킬은 `brainstorming`, `writing-plans`, `frontend-design`, `systematic-debugging`, `verification-before-completion`이다.
- 스킬은 절차를 보완하지만 사람은 결과·대상·금지사항·승인 경계·완료 기준을 말해야 한다.
- 복사 가능한 명령에 실행을 방해하는 `$ ` 프롬프트 문자를 넣지 않는다.
- 설치 명령은 공식 Claude Code 문서, `obra/superpowers`, `anthropics/skills`를 기준으로 한다.
- HTML 내장 전체 발표자 노트는 `script.md`의 73개 섹션과 정확히 일치한다.
- 루트 덱 파일은 변경하지 않는다.

---

### Task 1: 73장·120분 구조와 5개 스킬 콘텐츠 추가

**Files:**
- Modify: `tests/workshop-draft.test.js`
- Modify: `drafts/solution-pe-portfolio-workshop/index.html`

**Interfaces:**
- Consumes: 기존 `.slide`, `data-slide`, `data-minutes`, `data-notes` 계약과 슬라이드 1–63 콘텐츠.
- Produces: 73개 순차 슬라이드, 120분 합계, 신규 12–21번 스킬 챕터.

- [ ] **Step 1: 73장 구조와 필수 스킬을 요구하는 실패 테스트 작성**

```js
test('five-skill edition has 73 slides totaling 120 minutes', () => {
  const html = readDeck();
  const tags = [...html.matchAll(/<section\s+class="slide[^"]*"[^>]*data-slide="(\d+)"[^>]*data-minutes="(\d+)"/g)];
  assert.equal(tags.length, 73);
  assert.deepEqual(tags.map(match => Number(match[1])), Array.from({ length: 73 }, (_, i) => i + 1));
  assert.equal(tags.reduce((sum, match) => sum + Number(match[2]), 0), 120);
});

test('skill chapter explains all five skills through before-and-after behavior', () => {
  const html = readDeck();
  for (const phrase of [
    'brainstorming', 'writing-plans', 'frontend-design',
    'systematic-debugging', 'verification-before-completion',
    '스킬 없음', '스킬 사용', '상황을 감지',
    '프롬프트는 짧아져도', '요구사항의 책임은 사람에게 있다',
  ]) assert.match(html, new RegExp(phrase));
  for (let slide = 12; slide <= 21; slide += 1) {
    assert.match(html, new RegExp(`data-slide="${slide}"`));
  }
});
```

- [ ] **Step 2: focused test를 실행해 63장·스킬 부재로 실패 확인**

Run: `node --test tests/workshop-draft.test.js`

Expected: FAIL; expected 73 but actual 63, and `brainstorming` is absent.

- [ ] **Step 3: 기존 1–11번 시간을 17분에서 11분으로 압축**

다음 기존 슬라이드의 `data-minutes="2"`를 `1`로 바꾼다: 4, 5, 6, 7, 8, 11. 제목과 내용은 유지한다.

- [ ] **Step 4: 신규 12–21번을 정확한 맵으로 삽입**

| ID | 분 | 제목 |
| ---: | ---: | --- |
| 12 | 1 | 스킬은 반복 가능한 업무 절차를 불러온다 |
| 13 | 2 | 스킬이 없으면 절차를 긴 프롬프트로 직접 적는다 |
| 14 | 1 | 처음에는 이름을 부르고 익숙해지면 상황에 맡긴다 |
| 15 | 2 | brainstorming은 만들기 전에 목적과 범위를 맞춘다 |
| 16 | 2 | writing-plans는 합의한 일을 실행 순서로 바꾼다 |
| 17 | 2 | frontend-design은 예쁨보다 전달 목적을 설계한다 |
| 18 | 2 | systematic-debugging은 수정 전에 원인을 증명한다 |
| 19 | 2 | verification-before-completion은 완료를 증거로 바꾼다 |
| 20 | 1 | 입문자는 두 번의 설치로 다섯 스킬을 준비한다 |
| 21 | 1 | 프롬프트는 짧아져도 요구사항의 책임은 사람에게 있다 |

슬라이드 13과 15–19는 좌측 `스킬 없음`, 우측 `스킬 사용` 비교를 사용한다. 각 스킬 장에는 `docs/claude-code-beginner-skills-5.md`의 짧은 요청과 사람이 확인할 항목을 포트폴리오 사례에 맞춰 포함한다.

- [ ] **Step 5: 설치 장에 검증된 명령과 출처 표시**

```text
/plugin install superpowers@claude-plugins-official
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
/reload-plugins
```

슬라이드 하단에 `Claude Code Docs · obra/superpowers · anthropics/skills · 2026-07-22 확인`을 표시한다. 설치 수와 Star는 표시하지 않는다.

- [ ] **Step 6: 기존 12–63번을 22–73번으로 순차 이동하고 16분 압축**

기존 ID에 10을 더한다. 다음 기존 슬라이드는 2분에서 1분으로 바꾼다: 12, 13, 16, 17, 19, 21, 22, 25, 26, 29. 나머지 시간은 유지한다. 최종 합계는 120분이어야 한다.

- [ ] **Step 7: focused/full test와 공백 검사를 실행**

Run: `node --test tests/workshop-draft.test.js && node --test tests/*.test.js && git diff --check`

Expected: 신규 구조 테스트와 기존 콘텐츠 테스트가 모두 PASS. 기존 63 상수를 참조하는 테스트는 73으로 갱신되어야 한다.

- [ ] **Step 8: Task 1 커밋**

```bash
git add tests/workshop-draft.test.js drafts/solution-pe-portfolio-workshop/index.html
git commit -m "feat: add five-skill workshop chapter"
```

---

### Task 2: Neon Terminal 스타일과 기존 시연·실습 연결

**Files:**
- Modify: `tests/workshop-draft.test.js`
- Modify: `drafts/solution-pe-portfolio-workshop/index.html`

**Interfaces:**
- Consumes: Task 1의 신규 `.skill-slide` 12–21번과 이동된 기존 슬라이드.
- Produces: Neon Terminal 스킬 챕터와 기존 시연·실습의 `.skill-badge` 연결.

- [ ] **Step 1: 스타일과 배지를 요구하는 실패 테스트 작성**

```js
test('skill chapter uses neon terminal treatment and workflow badges', () => {
  const html = readDeck();
  for (const token of ['skill-slide', 'neon-grid', 'skill-badge', '--neon-green', '--neon-cyan']) {
    assert.match(html, new RegExp(token));
  }
  for (const skill of ['brainstorming', 'writing-plans', 'frontend-design', 'systematic-debugging', 'verification-before-completion']) {
    assert.ok((html.match(new RegExp(`skill-badge[^>]*>${skill}`, 'g')) || []).length >= 1);
  }
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `node --test tests/workshop-draft.test.js`

Expected: FAIL because neon tokens and badges do not exist.

- [ ] **Step 3: Neon Terminal 디자인 토큰과 레이아웃 추가**

```css
:root{--neon-green:#5cff95;--neon-cyan:#44d9ff;--neon-red:#ff6b7a}
.skill-slide{background:#050807;color:#eafff1}
.skill-slide::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(92,255,149,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(68,217,255,.035) 1px,transparent 1px);background-size:36px 36px;pointer-events:none}
.skill-slide .eyebrow,.skill-badge{font-family:"JetBrains Mono",monospace;color:var(--neon-green)}
.skill-slide .compare-bad{border-color:rgba(255,107,122,.38)}
.skill-slide .compare-good{border-color:rgba(92,255,149,.42)}
```

실제 CSS는 기존 반응형·인쇄 규칙과 충돌하지 않게 배치하고 장식이 본문 위에 올라오지 않게 한다.

- [ ] **Step 4: 이동된 기존 장에 스킬 배지 연결**

- Plan 조사·검토 장: `brainstorming`, `writing-plans`
- 디자인 개선 요청 장: `frontend-design`
- 404 원인 조사 장: `systematic-debugging`
- 공개 URL·Git·모바일 완료 증거 장: `verification-before-completion`

배지는 기존 제목이나 실습 레이블을 대체하지 않는다.

- [ ] **Step 5: focused/full test와 공백 검사**

Run: `node --test tests/workshop-draft.test.js && node --test tests/*.test.js && git diff --check`

Expected: all tests PASS and no whitespace errors.

- [ ] **Step 6: Task 2 커밋**

```bash
git add tests/workshop-draft.test.js drafts/solution-pe-portfolio-workshop/index.html
git commit -m "style: add neon skill workflow treatment"
```

---

### Task 3: 73개 발표자 스크립트와 전체 노트 parity 갱신

**Files:**
- Modify: `tests/workshop-draft.test.js`
- Modify: `drafts/solution-pe-portfolio-workshop/script.md`
- Modify: `drafts/solution-pe-portfolio-workshop/index.html`

**Interfaces:**
- Consumes: 73개 슬라이드의 ID, 제목, 시간.
- Produces: 73개 `## Slide N — 제목` 섹션과 동일한 HTML 내장 JSON 노트.

- [ ] **Step 1: 73개 스크립트 parity 실패 테스트 갱신**

```js
test('speaker script has one section for every slide', () => {
  const script = fs.readFileSync(path.join(root, 'drafts', 'solution-pe-portfolio-workshop', 'script.md'), 'utf8');
  const headings = [...script.matchAll(/^## Slide (\d+) — /gm)].map(match => Number(match[1]));
  assert.deepEqual(headings, Array.from({ length: 73 }, (_, i) => i + 1));
});
```

기존 내장 노트 parity 테스트의 기대 개수도 63에서 73으로 바꾼다.

- [ ] **Step 2: 실패 확인**

Run: `node --test tests/workshop-draft.test.js`

Expected: FAIL because script and embedded notes still have 63 entries.

- [ ] **Step 3: script.md를 73개 섹션으로 재번호화하고 신규 10개 작성**

신규 12–21번 각각에 `[약 N분]`, 포트폴리오 사용 전후 설명, 사람에게 던질 질문, 필요한 `[DEMO]` 또는 `[PRACTICE]`, 다음 장 전환을 작성한다. 이동된 기존 12–63번은 22–73번으로 번호와 시간을 갱신하되 내용 의미는 보존한다.

- [ ] **Step 4: HTML 내장 노트 JSON을 script.md에서 결정적으로 재생성**

각 `{slide,title,body}`는 정규화된 `script.md` 섹션과 정확히 일치해야 한다. JSON의 `<`는 `\u003c`로 이스케이프하고 런타임 fetch를 추가하지 않는다.

- [ ] **Step 5: 스크립트·노트·시간 검증**

Run: `node --test tests/workshop-draft.test.js && node --test tests/*.test.js && git diff --check`

Expected: 73 headings, 73 notes, total 120 minutes, all tests PASS.

- [ ] **Step 6: Task 3 커밋**

```bash
git add tests/workshop-draft.test.js drafts/solution-pe-portfolio-workshop/script.md drafts/solution-pe-portfolio-workshop/index.html
git commit -m "docs: expand presenter script for five skills"
```

---

### Task 4: 전 화면 렌더·상호작용·인쇄 QA와 리뷰 URL 갱신

**Files:**
- Modify if QA finds defects: `drafts/solution-pe-portfolio-workshop/index.html`
- Modify if contracts change: `tests/workshop-draft.test.js`

**Interfaces:**
- Consumes: 최종 73장 덱과 73개 전체 노트.
- Produces: 73개 데스크톱 렌더, 대표 모바일 렌더, 73페이지 PDF, 갱신된 로컬 리뷰 URL.

- [ ] **Step 1: 최종 자동 검증 실행**

Run: `node --test tests/workshop-draft.test.js && node --test tests/*.test.js && git diff --check`

Expected: all tests PASS; 73 sequential slides; 120 minutes.

- [ ] **Step 2: 데스크톱 73장과 대표 모바일 장 렌더**

작업트리 전용 로컬 서버와 headless Chrome을 사용한다. 저장소 밖 임시 폴더에 1440×900 슬라이드 1–73을 저장한다. 모바일 390×844는 1, 12–21, Plan 배지 장, 디자인 배지 장, 404 배지 장, 완료 검증 장, 73을 저장한다. 각 캡처는 300ms 전환 뒤 최소 750ms 대기한다.

- [ ] **Step 3: 모든 데스크톱과 대표 모바일 렌더를 개별 확인**

제목 잘림, Neon 장식 겹침, 비교 열 오버플로, 설치 명령 가독성, 배지 충돌, 모바일 가로 넘침을 확인한다. 결함이 있으면 focused RED 계약을 추가하고 수정 후 영향 장을 재렌더한다.

- [ ] **Step 4: 상호작용과 전체 노트 확인**

ArrowRight, Space, ArrowLeft, 마지막 73 고정, `73 / 73`, 진행률 100%, `S` 팝업의 신규 스킬 전체 노트, touch handler 존재, fullscreen 요청 경로를 확인한다. 임베디드 브라우저가 fullscreen을 거부하면 수동 확인 필요로 정확히 기록한다.

- [ ] **Step 5: 73페이지 PDF 인쇄 검증**

headless Chrome으로 PDF를 만들고 `pdfinfo`에서 `Pages: 73`을 확인한다. 대표 페이지 1, 12, 13, 15–21, 73을 이미지로 렌더해 개별 확인한다.

- [ ] **Step 6: QA 수정이 있으면 커밋**

```bash
git add drafts/solution-pe-portfolio-workshop/index.html tests/workshop-draft.test.js
git commit -m "fix: verify five-skill workshop layouts"
```

변경이 없으면 빈 커밋을 만들지 않는다.

- [ ] **Step 7: 리뷰 URL을 최신 파일로 검증하고 브라우저에 열기**

기존 작업트리 서버 `http://127.0.0.1:8767/drafts/solution-pe-portfolio-workshop/index.html`이 최신 파일을 제공하는지 byte 비교와 HTTP 200으로 확인한다. 사용자가 열어 둔 브라우저를 최신 URL로 새로고침한다.

---

## 완료 조건

- 73장·120분·73개 스크립트·73개 내장 노트 계약이 통과한다.
- 다섯 스킬의 사용 전후 비교와 사람의 요구사항 책임이 명확하다.
- 신규 스킬 챕터는 Neon Terminal 스타일이며 기존 실습은 Minimal Dark로 유지된다.
- 73개 데스크톱, 대표 모바일, 73페이지 인쇄물을 실제로 확인한다.
- 최종 브랜치 리뷰에서 Critical/Important 이슈가 없다.
