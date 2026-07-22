# Claude Code Practical Workshop Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 44-slide feature tour with a 29-slide, 120-minute beginner-friendly workshop that ends with a static website committed, pushed, and published through GitHub Pages.

**Architecture:** Keep the existing static `index.html` + JavaScript slide-data + CSS renderer. Treat slide data as the content boundary, make the renderer derive navigation from the data instead of magic numbers, and add Node built-in tests for narrative invariants before rewriting the content.

**Tech Stack:** HTML5, CSS3, browser JavaScript, Node.js built-in test runner, headless Google Chrome

## Global Constraints

- Keep the deck at 27–30 slides and exactly 120 minutes; target 29 slides.
- Explain with expert accuracy in Korean that an elementary-school student can follow.
- Use English only for product names, exact feature names, and commands.
- Keep static HTML, CSS, and JavaScript with no package install or build step.
- Preserve keyboard navigation, overview, speaker notes, fullscreen, print, copy buttons, and hash navigation.
- Use current official permission names; teach `default` and `plan`, and remove `Manual` from audience-facing copy.
- Include plan and implementation prompts that participants can copy as written.
- Validate every slide at 1440×900 and representative slides at 390×844.

---

### Task 1: Add deck contract tests

**Files:**
- Create: `tests/deck.test.js`

**Interfaces:**
- Consumes: `window.SLIDES` assembled by `slides-1.js` through `slides-4.js`
- Produces: `loadSlides(): Array<object>` and contract tests used by the content rewrite

- [ ] **Step 1: Write failing narrative and structure tests**

```js
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadSlides() {
  const context = vm.createContext({ window: {} });
  for (const file of ['slides-1.js', 'slides-2.js', 'slides-3.js', 'slides-4.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
  }
  return context.window.SLIDES;
}

test('deck has 29 sequential slides and lasts 120 minutes', () => {
  const slides = loadSlides();
  assert.equal(slides.length, 29);
  assert.deepEqual(Array.from(slides, slide => slide.id), Array.from({ length: 29 }, (_, index) => index + 1));
  assert.equal(slides.reduce((sum, slide) => sum + slide.minutes, 0), 120);
});

test('deck includes the practical Pages outcome and copyable prompts', () => {
  const slides = loadSlides();
  const allText = JSON.stringify(slides);
  assert.match(allText, /GitHub Pages/);
  assert.match(allText, /index\.html/);
  assert.match(allText, /아직 파일을 수정하지 말고/);
  assert.match(allText, /내 확인 전에는 commit이나 push하지 마/);
  assert.ok(slides.filter(slide => slide.copy).length >= 2);
});

test('audience-facing copy avoids removed advanced topics and stale mode names', () => {
  const slides = loadSlides();
  const visibleText = slides.map(({ title, items, code, callout, danger }) => JSON.stringify({ title, items, code, callout, danger })).join('\n');
  assert.doesNotMatch(visibleText, /Manual|Subagents|Agent Teams|bypassPermissions|dontAsk/);
});

test('every slide has complete presenter guidance', () => {
  for (const slide of loadSlides()) {
    assert.ok(slide.title);
    assert.ok(slide.section);
    assert.ok(slide.minutes > 0);
    assert.ok(slide.notes);
    assert.ok(slide.action);
    assert.ok(slide.transition);
  }
});
```

- [ ] **Step 2: Run tests and confirm the current deck fails the new contract**

Run: `node --test tests/deck.test.js`

Expected: failures showing 44 slides instead of 29 and removed advanced topics still present.

- [ ] **Step 3: Commit the failing contract test**

```bash
git add tests/deck.test.js
git commit -m "test: define practical workshop deck contract"
```

---

### Task 2: Rewrite the narrative and remove fixed slide-count assumptions

**Files:**
- Modify: `slides-1.js`
- Modify: `slides-2.js`
- Modify: `slides-3.js`
- Modify: `slides-4.js`
- Modify: `app.js`
- Modify: `index.html`

**Interfaces:**
- Consumes: existing slide fields `id`, `section`, `minutes`, `title`, `layout`, `items`, `code`, `copy`, `callout`, `danger`, `notes`, `action`, `transition`
- Produces: 29 sequential slide objects totaling 120 minutes and renderer navigation based on `slides.length`

- [ ] **Step 1: Replace the four slide-data files with the approved 29-slide arc**

Use this exact ID/time allocation:

```text
1–3 Start: 2, 2, 1 minutes
4–10 Claude Code Core: 3, 3, 3, 3, 3, 2, 3 minutes
11–15 Git & GitHub: 3, 3, 3, 3, 3 minutes
16–20 Instructor Demo: 3, 5, 4, 4, 4 minutes
21 Break: 10 minutes
22–26 Participant Lab: 4, 5, 12, 9, 10 minutes
27–29 Troubleshooting & Wrap-up: 4, 3, 3 minutes
```

Split ownership by file:

```text
slides-1.js: slides 1–8
slides-2.js: slides 9–15
slides-3.js: slides 16–22
slides-4.js: slides 23–29
```

The slide titles must follow the approved design map, with the two copyable prompts on slides 17 and 24. Slide 17 contains the plan-only instructor prompt. Slide 24 contains both the agreed content placeholders and the explicit line `내 확인 전에는 commit이나 push하지 마.` Slide 26 uses the manual path `Settings → Pages → Deploy from a branch → main → /(root)`.

- [ ] **Step 2: Remove magic number 44 from the renderer**

Replace fixed validation and navigation bounds with data-derived values:

```js
const expectedMinutes = 120;
const total = slides.reduce((sum, slide) => sum + slide.minutes, 0);
if (!slides.length || total !== expectedMinutes) {
  throw new Error(`Invalid deck: ${slides.length} slides / ${total} minutes`);
}
const lastIndex = slides.length - 1;
```

Use `slides.length` in counters, print metadata, progress calculation, hash bounds, `go()`, and End-key navigation. Set the initial counter text in `index.html` to `1 / 29` and change the document description/title to emphasize the practical Pages workshop.

- [ ] **Step 3: Run the deck contract tests**

Run: `node --test tests/deck.test.js`

Expected: 4 tests pass, 0 fail.

- [ ] **Step 4: Check JavaScript syntax**

Run: `node --check app.js && node --check slides-1.js && node --check slides-2.js && node --check slides-3.js && node --check slides-4.js`

Expected: exit code 0 with no output.

- [ ] **Step 5: Commit the narrative rewrite**

```bash
git add index.html app.js slides-1.js slides-2.js slides-3.js slides-4.js
git commit -m "feat: refocus deck on Pages workshop"
```

---

### Task 3: Improve visual hierarchy and validate every screen

**Files:**
- Modify: `styles.css`
- Modify if QA finds content issues: `slides-1.js`
- Modify if QA finds content issues: `slides-2.js`
- Modify if QA finds content issues: `slides-3.js`
- Modify if QA finds content issues: `slides-4.js`

**Interfaces:**
- Consumes: existing renderer class names and the rewritten 29-slide content
- Produces: safe desktop/mobile layouts with no topbar duplication or controls overlap

- [ ] **Step 1: Simplify the visual hierarchy**

Apply these exact CSS changes:

```css
.slide { padding: 9vh 7vw 15vh; gap: 2.2vh; }
.slide::after { inset: 4vh 3vw 9vh; }
.kicker { display: none; }
h1 { max-width: 88%; font-size: clamp(40px, 4.2vw, 72px); }
.content { max-width: 92%; }
.controls { bottom: 18px; }
```

Keep the topbar as the only section/time label. Reduce card shadows and reserve card grids for true comparisons. Keep prompt blocks readable without reducing body text below the existing 16px minimum.

- [ ] **Step 2: Run automated checks**

Run:

```bash
node --test tests/deck.test.js
node --check app.js
node --check slides-1.js
node --check slides-2.js
node --check slides-3.js
node --check slides-4.js
git diff --check
```

Expected: all tests pass, syntax checks exit 0, and no whitespace errors.

- [ ] **Step 3: Render all desktop slides**

Use headless Chrome at 1440×900 with `file://.../index.html#slide=N`. Save screenshots outside the repository, one per slide, and verify screenshots exist for IDs 1 through 29.

Expected: 29 PNG files, each non-empty.

- [ ] **Step 4: Inspect every desktop slide and representative mobile slides**

Inspect all desktop slides at full size. Render slides 1, 6, 17, 24, 26, and 28 at 390×844. Fix title wrapping, clipped prompts, controls overlap, or unreadable card grids, then repeat Steps 2–4.

- [ ] **Step 5: Verify interaction behavior in headless Chrome**

Confirm `#slide=29` renders the final slide, ArrowRight does not advance past 29, Home returns to 1, End moves to 29, overview contains 29 cards, and copy buttons exist on both prompt slides.

- [ ] **Step 6: Commit the visual and QA changes**

```bash
git add styles.css slides-1.js slides-2.js slides-3.js slides-4.js
git commit -m "style: simplify workshop slide hierarchy"
```

---

### Task 4: Final repository verification and publication

**Files:**
- No new files expected

**Interfaces:**
- Consumes: completed deck, test suite, Git remote configuration
- Produces: verified `main` branch synchronized with `origin/main`

- [ ] **Step 1: Run the complete verification suite**

Run:

```bash
node --test tests/deck.test.js
node --check app.js
node --check slides-1.js
node --check slides-2.js
node --check slides-3.js
node --check slides-4.js
git diff --check
```

Expected: 4 tests pass, 0 fail; syntax and diff checks exit 0.

- [ ] **Step 2: Push and prove synchronization**

Run:

```bash
git push origin main
git fetch origin --prune
git rev-list --left-right --count HEAD...origin/main
git rev-parse HEAD^{tree}
git rev-parse origin/main^{tree}
git status --short --branch
```

Expected: ahead/behind `0 0`, identical tree hashes, and no working-tree entries.
