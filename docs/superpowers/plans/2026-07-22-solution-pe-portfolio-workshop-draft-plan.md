# Solution PE Portfolio Workshop Draft Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a separate 63-slide, 120-minute Minimal Dark HTML workshop draft that teaches Solution PE팀 Staff to create and publish a personal work portfolio with Claude Code.

**Architecture:** Preserve the existing root deck and create a standalone draft under `drafts/solution-pe-portfolio-workshop/`. Keep the final presentation as one self-contained HTML file with inline CSS and JavaScript, keep the full talk track in a neighboring Markdown script, and enforce content, timing, navigation, and safety requirements with Node built-in tests.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner, headless Google Chrome, make-slide `minimal-dark` theme reference

## Global Constraints

- Audience: Solution PE팀 Staff.
- Presenter: 원용석.
- Duration: exactly 120 minutes.
- Draft size: 55–70 slides; target 63.
- Output: standalone `index.html` with all CSS and JavaScript inline; no build step or runtime package install.
- Visual direction: make-slide `minimal-dark`, with full, split, and wide compositions.
- Example: one continuous personal work portfolio case from empty repository to public URL.
- Lab: 12 numbered steps with prompt or command, expected result, human check, and first troubleshooting action.
- Language: beginner-friendly Korean; English only for product names, exact feature names, commands, and code.
- Safety: no real company data, customer or employee information, secrets, tokens, private URLs, force push, or unattended deletion.
- Preserve keyboard navigation, Space navigation, touch swipe, fullscreen, progress, counter, print, and popup speaker notes.
- Validate all slides at 1440×900 and representative lab slides at 390×844.
- Do not replace the root `index.html` before the user reviews the draft.

---

## File Map

- Create `drafts/solution-pe-portfolio-workshop/index.html` — final standalone 63-slide Minimal Dark draft.
- Create `drafts/solution-pe-portfolio-workshop/script.md` — full Korean speaking script organized by slide.
- Create `tests/workshop-draft.test.js` — structural, narrative, safety, timing, and interaction-source contract.
- Modify only if QA finds copy defects: `drafts/solution-pe-portfolio-workshop/index.html` and `script.md`.

---

### Task 1: Add the standalone deck shell and contract

**Files:**
- Create: `tests/workshop-draft.test.js`
- Create: `drafts/solution-pe-portfolio-workshop/index.html`

**Interfaces:**
- Consumes: no earlier task output.
- Produces: `index.html` with sequential `data-slide`, integer `data-minutes`, non-empty `data-notes`, `goTo(index)`, `toggleFullscreen()`, `toggleNotes()`, `updateProgress()`, and `updateCounter()`.

- [ ] **Step 1: Write the failing shell test**

```js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const deckPath = path.join(root, 'drafts', 'solution-pe-portfolio-workshop', 'index.html');

function readDeck() {
  return fs.readFileSync(deckPath, 'utf8');
}

test('draft is a standalone Minimal Dark HTML deck with required controls', () => {
  const html = readDeck();
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /--bg:\s*#0a0a0a/);
  assert.match(html, /--accent:\s*#3b82f6/);
  for (const required of [
    'function goTo',
    'function toggleFullscreen',
    'function toggleNotes',
    'function updateProgress',
    'function updateCounter',
    "addEventListener('touchstart'",
    '@media print',
  ]) assert.match(html, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});
```

- [ ] **Step 2: Run the shell test and confirm failure**

Run: `node --test tests/workshop-draft.test.js`

Expected: FAIL with `ENOENT` for `drafts/solution-pe-portfolio-workshop/index.html`.

- [ ] **Step 3: Create the Minimal Dark shell and one opening slide**

Use the approved preview at `previews/make-slide-comparison/minimal-dark.html` as the visual reference. Copy its exact navigation, progress, counter, fullscreen, touch, print, and popup-note behavior. Start with this audience-facing slide:

```html
<section class="slide full active" data-slide="1" data-minutes="1"
  data-notes="[1분] Solution PE팀 Staff에게 오늘 만들 결과를 먼저 보여줍니다. 발표자는 원용석입니다.">
  <div>
    <span class="tag">Solution PE팀 Staff · 실무 워크숍</span>
    <h1>Claude Code로<br><span class="accent">업무 포트폴리오 만들기</span></h1>
    <p>빈 저장소에서 공개 URL까지 · 발표 원용석</p>
  </div>
</section>
```

- [ ] **Step 4: Run the shell test and confirm success**

Run: `node --test tests/workshop-draft.test.js`

Expected: 1 test passes, 0 fail.

- [ ] **Step 5: Commit the shell**

```bash
git add tests/workshop-draft.test.js drafts/solution-pe-portfolio-workshop/index.html
git commit -m "test: define workshop draft shell"
```

---

### Task 2: Build the opening, Claude Code, prompt, and Git sections

**Files:**
- Modify: `tests/workshop-draft.test.js`
- Modify: `drafts/solution-pe-portfolio-workshop/index.html`

**Interfaces:**
- Consumes: the shell and `.slide` metadata contract from Task 1.
- Produces: slides 1–21 totaling 33 minutes with one portfolio case, current Claude Code terms, and exact Git evidence.

- [ ] **Step 1: Add a failing test for slides 1–21**

```js
test('opening and core sections contain the approved practical story', () => {
  const html = readDeck();
  for (const phrase of [
    'Solution PE팀 Staff', '원용석', '개인 업무 포트폴리오',
    '작업 파트너', 'Plan', '권한', 'git status', 'git diff', 'Commit', 'Push',
    '포트폴리오 하나 만들어줘', '완료 기준',
  ]) assert.match(html, new RegExp(phrase));
  assert.match(html, /data-slide="21"/);
});
```

- [ ] **Step 2: Run the new test and confirm failure**

Run: `node --test tests/workshop-draft.test.js`

Expected: FAIL because `data-slide="21"` and the practical story do not exist.

- [ ] **Step 3: Author slides 1–21 using this exact map**

| ID | Min | Takeaway title |
| ---: | ---: | --- |
| 1 | 1 | Claude Code로 업무 포트폴리오 만들기 |
| 2 | 1 | 오늘은 공개 URL 하나를 완성한다 |
| 3 | 1 | 완료는 메시지가 아니라 세 가지 증거로 판단한다 |
| 4 | 2 | 공개 가능한 정보만 사용하고 중요한 행동은 확인한다 |
| 5 | 2 | Claude Code는 말을 듣고 도구를 쓰는 작업 파트너다 |
| 6 | 2 | 사람은 목적과 금지사항과 완료 기준을 정한다 |
| 7 | 2 | 작업 폴더는 책상이고 파일과 터미널은 도구다 |
| 8 | 2 | 안전한 작업은 확인부터 Diff까지 반복한다 |
| 9 | 1 | Plan은 만들기 전에 보는 작업 도면이다 |
| 10 | 1 | 권한 확인은 실수를 막는 문지기다 |
| 11 | 2 | “완료했습니다”보다 화면과 Git 상태를 본다 |
| 12 | 2 | “포트폴리오 만들어줘”에는 판단 기준이 없다 |
| 13 | 2 | 좋은 요청은 대상·결과·금지·확인의 네 칸이다 |
| 14 | 1 | 같은 목표도 요청이 구체적이면 결과가 달라진다 |
| 15 | 1 | 공개할 내용과 공개하면 안 될 내용을 먼저 나눈다 |
| 16 | 2 | 제작 승인은 Plan의 네 항목을 확인한 뒤에 한다 |
| 17 | 2 | Git은 되돌아갈 수 있는 저장 지점을 만든다 |
| 18 | 1 | git status는 지금 바뀐 것을 알려준다 |
| 19 | 2 | git diff는 실제로 바뀐 내용을 보여준다 |
| 20 | 1 | Commit은 설명이 붙은 저장 지점이다 |
| 21 | 2 | Push는 확인한 저장 지점을 GitHub로 보낸다 |

Use full composition for IDs 1, 4, 5, 12, and 17; split composition for example/result pairs; wide composition for commands and Diff.

- [ ] **Step 4: Include the exact weak-to-strong prompt example**

```text
약한 요청: 포트폴리오 하나 만들어줘.

강한 요청: 비개발자 동료가 1분 안에 내 역할을 이해하도록 한 페이지로 만들어줘.
모바일에서도 읽기 쉽게 하고, 개인정보와 회사 비공개 자료는 넣지 마.
완료 전에 깨진 링크, 화면 넘침, 변경 파일을 확인해줘.
내 확인 전에는 Commit이나 Push를 하지 마.
```

- [ ] **Step 5: Run tests and commit the core sections**

Run: `node --test tests/workshop-draft.test.js && git diff --check`

Expected: 2 tests pass, 0 fail; no whitespace errors.

```bash
git add tests/workshop-draft.test.js drafts/solution-pe-portfolio-workshop/index.html
git commit -m "feat: add workshop core narrative"
```

---

### Task 3: Add the complete instructor demonstration

**Files:**
- Modify: `tests/workshop-draft.test.js`
- Modify: `drafts/solution-pe-portfolio-workshop/index.html`

**Interfaces:**
- Consumes: the four-part request model and Git evidence from Task 2.
- Produces: slides 22–30 totaling 17 minutes and a full empty-repository-to-reviewed-first-version demonstration.

- [ ] **Step 1: Add a failing demo test**

```js
test('instructor demo reaches a reviewed first version before the break', () => {
  const html = readDeck();
  for (const phrase of [
    '현재 파일과 Git 상태를 확인해줘',
    '아직 파일을 수정하지 말고',
    'index.html', 'styles.css', 'app.js',
    '1440×900', '390×844', '변경 파일',
  ]) assert.match(html, new RegExp(phrase));
  assert.match(html, /data-slide="30"/);
});
```

- [ ] **Step 2: Run the demo test and confirm failure**

Run: `node --test tests/workshop-draft.test.js`

Expected: FAIL because slides 22–30 are absent.

- [ ] **Step 3: Author slides 22–30**

| ID | Min | Takeaway title |
| ---: | ---: | --- |
| 22 | 2 | 시연은 빈 저장소와 공개 가능한 문장으로 시작한다 |
| 23 | 2 | 첫 화면에서 폴더와 Git 기준 상태를 확인한다 |
| 24 | 2 | 첫 프롬프트는 수정이 아니라 조사를 요청한다 |
| 25 | 2 | Plan에서 파일·화면·검증·배포 전 확인을 읽는다 |
| 26 | 2 | 범위가 맞을 때만 제작을 승인한다 |
| 27 | 2 | 첫 버전은 HTML·CSS·JavaScript 세 파일로 만든다 |
| 28 | 2 | 로컬 화면과 모바일 폭을 직접 확인한다 |
| 29 | 2 | “더 예쁘게”를 관찰 가능한 수정 요청으로 바꾼다 |
| 30 | 1 | Diff와 변경 파일이 맞으면 시연 1차 완료다 |

- [ ] **Step 4: Insert the exact investigation and Plan prompt**

```text
이 저장소에 개인 업무 포트폴리오를 만들고 싶어.

먼저 현재 파일과 Git 상태를 확인해줘.
아직 파일을 수정하지 말고 아래 내용을 Plan으로 보여줘.
- 만들거나 바꿀 파일
- 화면 구성
- 데스크톱과 모바일 확인 방법
- GitHub Pages 공개 전에 내가 확인할 내용

저장소 밖의 파일은 건드리지 말고, 삭제·Commit·Push는 내 확인 전에 하지 마.
```

- [ ] **Step 5: Run tests and commit the instructor demo**

Run: `node --test tests/workshop-draft.test.js && git diff --check`

Expected: 3 tests pass, 0 fail.

```bash
git add tests/workshop-draft.test.js drafts/solution-pe-portfolio-workshop/index.html
git commit -m "feat: add instructor portfolio demo"
```

---

### Task 4: Add the 12-step participant lab

**Files:**
- Modify: `tests/workshop-draft.test.js`
- Modify: `drafts/solution-pe-portfolio-workshop/index.html`

**Interfaces:**
- Consumes: demo prompts and expected-result patterns from Task 3.
- Produces: break slide 31 and participant lab slides 32–53 totaling 55 minutes, including the 10-minute break and 45-minute lab.

- [ ] **Step 1: Add a failing lab contract**

```js
test('participant lab contains all twelve numbered steps and completion checks', () => {
  const html = readDeck();
  for (let step = 1; step <= 12; step += 1) {
    assert.match(html, new RegExp(`STEP ${String(step).padStart(2, '0')}`));
  }
  for (const phrase of ['복사할 프롬프트', '정상 결과', '직접 확인', '안 될 때 먼저']) {
    assert.match(html, new RegExp(phrase));
  }
  assert.match(html, /data-slide="53"/);
});
```

- [ ] **Step 2: Run the lab test and confirm failure**

Run: `node --test tests/workshop-draft.test.js`

Expected: FAIL because the numbered lab is absent.

- [ ] **Step 3: Author slides 31–53**

Use slide 31 for a 10-minute break and environment check. Use slides 32–53 for these 12 actions, with 2 minutes per slide except slide 53 at 3 minutes:

| Slide group | Step | Participant action |
| --- | --- | --- |
| 32 | STEP 01 | 완성 결과와 세 가지 증거 확인 |
| 33–34 | STEP 02 | 공개 가능한 이름·역할·역량·프로젝트 문장 준비 |
| 35–36 | STEP 03 | GitHub Public 저장소 생성과 주소 확인 |
| 37–38 | STEP 04 | Clone과 `git status` 기준 상태 확인 |
| 39–41 | STEP 05 | Claude Code 실행, 현재 파일과 Git 상태 조사 |
| 42–43 | STEP 06 | Plan 요청과 파일·화면·검증·안전 검토 |
| 44–45 | STEP 07 | 합의한 Plan대로 첫 버전 제작 |
| 46–47 | STEP 08 | 로컬 화면과 모바일 폭 직접 확인 |
| 48–49 | STEP 09 | 색상·여백·순서를 포함한 디자인 개선 요청 |
| 50 | STEP 10 | Diff·삭제·민감정보·깨진 링크 검토 |
| 51–52 | STEP 11 | Add·Commit·Push와 GitHub 반영 확인 |
| 53 | STEP 12 | Pages 설정 전에 배포 체크 완료 |

- [ ] **Step 4: Insert the exact implementation prompt**

```text
방금 합의한 Plan대로만 만들어줘.

포트폴리오 내용:
- 이름과 담당 업무: [공개 가능한 문장]
- 내가 해결하는 문제: [한 문장]
- 핵심 역량 세 가지: [역량 1], [역량 2], [역량 3]
- 대표 업무: [공개 가능한 사례]
- 협업 방식: [한 문장]

HTML, CSS, JavaScript만 사용하고 별도 설치나 빌드는 만들지 마.
완료 전에 데스크톱, 모바일, 깨진 링크, 변경 파일을 확인해줘.
내 확인 전에는 Commit이나 Push를 하지 마.
```

- [ ] **Step 5: Insert the exact design revision prompt**

```text
첫 화면을 확인했어. 내용은 유지하고 아래만 개선해줘.
- 제목과 핵심 역량의 시각적 우선순위를 더 분명하게
- 카드 사이 여백을 넓게
- 강조색은 한 가지로 제한
- 모바일에서 가로 넘침 제거

수정 후 바뀐 파일과 확인 결과를 알려줘. Commit이나 Push는 하지 마.
```

- [ ] **Step 6: Run tests and commit the participant lab**

Run: `node --test tests/workshop-draft.test.js && git diff --check`

Expected: 4 tests pass, 0 fail.

```bash
git add tests/workshop-draft.test.js drafts/solution-pe-portfolio-workshop/index.html
git commit -m "feat: add step-by-step participant lab"
```

---

### Task 5: Add publication, troubleshooting, closing, and final timing checks

**Files:**
- Modify: `tests/workshop-draft.test.js`
- Modify: `drafts/solution-pe-portfolio-workshop/index.html`

**Interfaces:**
- Consumes: lab Step 12 and pushed repository state from Task 4.
- Produces: slides 54–63, exactly 63 slides and 120 minutes, with public URL verification and a deliberate close.

- [ ] **Step 1: Add the final failing contract**

```js
test('draft has 63 slides totaling 120 minutes with complete notes', () => {
  const html = readDeck();
  const tags = [...html.matchAll(/<section\s+class="slide[^"]*"[^>]*data-slide="(\d+)"[^>]*data-minutes="(\d+)"[^>]*data-notes="([^"]+)"/g)];
  assert.equal(tags.length, 63);
  assert.deepEqual(tags.map(match => Number(match[1])), Array.from({ length: 63 }, (_, i) => i + 1));
  assert.equal(tags.reduce((sum, match) => sum + Number(match[2]), 0), 120);
  assert.ok(tags.every(match => match[3].trim().length >= 20));
});

test('publication and troubleshooting end with observable evidence', () => {
  const html = readDeck();
  for (const phrase of [
    'Settings → Pages → Deploy from a branch → main → /(root)',
    '404', 'index.html', 'Push', '민감정보', '공개 URL', 'git status',
    '시키고 끝내지 말고, 결과를 직접 확인한다',
  ]) assert.match(html, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});
```

- [ ] **Step 2: Run the final tests and confirm failure**

Run: `node --test tests/workshop-draft.test.js`

Expected: FAIL because slides 54–63 and the 120-minute total are absent.

- [ ] **Step 3: Author slides 54–63**

| ID | Min | Takeaway title |
| ---: | ---: | --- |
| 54 | 1 | Pages는 확인한 정적 파일을 공개 URL로 연결한다 |
| 55 | 1 | 설정 경로는 main과 /(root)를 선택한다 |
| 56 | 2 | 배포는 잠시 기다린 뒤 공개 URL을 직접 연다 |
| 57 | 1 | 404가 나오면 Git 상태부터 순서대로 확인한다 |
| 58 | 2 | Push하지 않은 변경은 GitHub Pages에 보이지 않는다 |
| 59 | 2 | index.html 위치와 프로젝트 URL 경로를 확인한다 |
| 60 | 1 | 민감정보를 노출했다면 삭제만 하지 말고 자격 증명을 폐기한다 |
| 61 | 2 | 공개 URL·Git 동기화·모바일 화면이 완료 증거다 |
| 62 | 2 | 다음 업무에서는 같은 루프를 더 작은 작업에 적용한다 |
| 63 | 1 | 시키고 끝내지 말고, 결과를 직접 확인한다 |

- [ ] **Step 4: Run the complete content contract**

Run: `node --test tests/workshop-draft.test.js && git diff --check`

Expected: all tests pass; 63 sequential slides; exactly 120 minutes; no whitespace errors.

- [ ] **Step 5: Commit the complete draft content**

```bash
git add tests/workshop-draft.test.js drafts/solution-pe-portfolio-workshop/index.html
git commit -m "feat: complete workshop draft content"
```

---

### Task 6: Write the complete presenter script and verify every screen

**Files:**
- Create: `drafts/solution-pe-portfolio-workshop/script.md`
- Modify if QA finds issues: `drafts/solution-pe-portfolio-workshop/index.html`
- Modify if contract changes: `tests/workshop-draft.test.js`

**Interfaces:**
- Consumes: sequential 63-slide deck and each slide's `data-notes`.
- Produces: one script section per slide, 63 desktop renders, representative mobile renders, verified navigation, and a browser review URL.

- [ ] **Step 1: Add a failing script parity test**

```js
test('speaker script has one section for every slide', () => {
  const script = fs.readFileSync(path.join(root, 'drafts', 'solution-pe-portfolio-workshop', 'script.md'), 'utf8');
  const headings = [...script.matchAll(/^## Slide (\d+) — /gm)].map(match => Number(match[1]));
  assert.deepEqual(headings, Array.from({ length: 63 }, (_, i) => i + 1));
});
```

- [ ] **Step 2: Run the parity test and confirm failure**

Run: `node --test tests/workshop-draft.test.js`

Expected: FAIL with `ENOENT` for `script.md`.

- [ ] **Step 3: Write all 63 script sections**

Each section must follow this exact structure with slide-specific prose rather than repeated boilerplate:

```markdown
## Slide 24 — 첫 프롬프트는 수정이 아니라 조사를 요청한다

[약 2분]

첫 요청에서 바로 파일을 만들게 하지 않습니다. 먼저 현재 폴더와 Git 상태를 확인하게 하면 Claude와 참가자가 같은 출발점을 보게 됩니다. 오른쪽 프롬프트를 함께 읽고, “아직 파일을 수정하지 말고”라는 문장이 왜 중요한지 참가자에게 묻습니다.

[DEMO] 프롬프트를 붙여 넣고 Claude가 파일 목록과 Git 상태를 설명하는 데서 멈춥니다.

다음 장에서는 조사 결과를 실제 작업 Plan으로 바꿉니다.
```

- [ ] **Step 4: Run automated checks**

Run:

```bash
node --test tests/workshop-draft.test.js
git diff --check
```

Expected: all tests pass and no whitespace errors.

- [ ] **Step 5: Render every desktop slide and representative mobile slides**

Use headless Google Chrome with the existing local server. Render slides 1–63 at 1440×900. Render slides 1, 13, 24, 42, 44, 50, 55, 57, and 63 at 390×844. Save screenshots outside the repository.

Expected: 63 non-empty desktop PNG files and 9 non-empty mobile PNG files.

- [ ] **Step 6: Inspect each render and fix layout defects**

Inspect every desktop render individually at full size. Fix any clipped title, overlapping controls, unreadable code, excessive wrapping, or mobile horizontal overflow. Repeat Steps 4–6 after each fix batch.

- [ ] **Step 7: Verify interaction behavior**

Confirm ArrowRight and Space advance one slide, ArrowLeft goes back, the final slide cannot advance past 63, `F` toggles fullscreen, `S` opens a separate speaker-notes window, touch handlers exist, counter reaches `63 / 63`, progress reaches 100%, and print preview contains 63 pages.

- [ ] **Step 8: Commit the verified draft and script**

```bash
git add drafts/solution-pe-portfolio-workshop/index.html drafts/solution-pe-portfolio-workshop/script.md tests/workshop-draft.test.js
git commit -m "docs: verify Solution PE workshop draft"
```

---

### Task 7: Open the draft for user review without replacing the current deck

**Files:**
- No repository files expected.

**Interfaces:**
- Consumes: verified `drafts/solution-pe-portfolio-workshop/index.html`.
- Produces: a live local review URL and an evidence-backed handoff.

- [ ] **Step 1: Run final verification**

Run:

```bash
node --test tests/workshop-draft.test.js
git diff --check
git status --short --branch
```

Expected: all workshop tests pass, no whitespace errors, and only previously known unrelated worktree entries remain.

- [ ] **Step 2: Serve and open the draft**

Reuse the existing repository server when available and open:

```text
http://127.0.0.1:8766/drafts/solution-pe-portfolio-workshop/index.html
```

- [ ] **Step 3: Report the review decision requested from the user**

Ask the user to review three things before strengthening content further:

1. Does the 120-minute learning flow feel practical enough?
2. Which sections still feel thin or repetitive?
3. Which slides need real Claude Code or GitHub screenshots instead of CSS examples?

Do not replace the root deck, push, or publish until the user reviews this draft.
