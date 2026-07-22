# Full Neon Terminal Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the strong Neon Terminal visual system to all 73 workshop slides, verify every delivery format, and deploy the stable deck path through `wys1110/claude-code-part-training` GitHub Pages.

**Architecture:** Keep the deck as one standalone HTML artifact and promote the existing `.skill-slide` visual rules into shared `.slide` rules. Preserve all content and runtime behavior, add regression contracts around the global theme and Pages validation, then have the current main-branch Pages workflow build a minimal `_site/` artifact that maps the source deck to the clean public path `/solution-pe-portfolio-workshop/`.

**Tech Stack:** Static HTML/CSS/JavaScript, Node `node:test`, Playwright/Chromium render checks, GitHub Actions Pages, GitHub CLI.

## Global Constraints

- Preserve exactly 73 slides, 120 minutes, and 73 presenter-note sections with exact embedded-note parity.
- Use terminal black `#050807`, neon green `#5CFF95`, neon cyan `#44D9FF`, alert red `#FF6B7A`, terminal ink `#EAFFF1`, and muted green `#8AA89A`.
- Apply the terminal grid, angular panels, terminal typography, and `context → skill → evidence ▋` status rail to every slide.
- Do not change slide content, order, timing, navigation, notes behavior, root deck files, or unrelated user changes.
- Preserve desktop 1440×900, mobile 390×844, print, keyboard, touch, accessibility, and reduced-motion behavior.
- Publish only after local and rendered verification passes.

---

### Task 1: Lock the global Neon Terminal contract

**Files:**
- Modify: `tests/workshop-draft.test.js`

**Interfaces:**
- Consumes: `readDeck()` and `parseDeckSlides()` already defined by the test file.
- Produces: regression contracts requiring a global theme and preserved deck semantics.

- [ ] **Step 1: Replace the Minimal Dark theme assertion with a failing global Neon Terminal assertion**

Add a test that checks the theme tokens, the global `.slide` background/grid/status-rail selectors, terminal typography, exact slide count, and absence of a skill-only background rule:

```js
test('all 73 slides use the strong Neon Terminal visual system', () => {
  const html = readDeck();
  const slides = parseDeckSlides(html);
  assert.equal(slides.length, 73);
  for (const token of [
    '--terminal-bg:#050807', '--neon-green:#5cff95', '--neon-cyan:#44d9ff',
    '--neon-red:#ff6b7a', '--terminal-ink:#eafff1', '--terminal-muted:#8aa89a',
  ]) assert.ok(html.toLowerCase().includes(token));
  assert.match(html, /\.slide\{[^}]*background:var\(--terminal-bg\)/s);
  assert.match(html, /\.slide::before\{[^}]*linear-gradient/s);
  assert.match(html, /\.slide::after\{content:"context\s+→\s+skill\s+→\s+evidence\s+▋"/s);
  assert.match(html, /\.slide h1,\.slide h2,\.slide h3\{[^}]*font-family:var\(--mono\)/s);
  assert.doesNotMatch(html, /\.skill-slide\{[^}]*background:var\(--terminal-bg\)/s);
});
```

- [ ] **Step 2: Add preservation assertions**

Extend the contract to require reduced motion and exact print colors without weakening existing slide/time/note tests:

```js
assert.match(html, /@media\(prefers-reduced-motion:reduce\)/);
assert.match(html, /@media print\{[^}]*-webkit-print-color-adjust:exact/s);
```

- [ ] **Step 3: Run the focused test and verify RED**

Run: `node --test tests/workshop-draft.test.js`

Expected: FAIL because Minimal Dark is still the global theme and terminal grid/status rail only apply to `.skill-slide`.

---

### Task 2: Promote Neon Terminal to the shared slide system

**Files:**
- Modify: `drafts/solution-pe-portfolio-workshop/index.html`
- Test: `tests/workshop-draft.test.js`

**Interfaces:**
- Consumes: the existing HTML slide structure and theme contract from Task 1.
- Produces: one shared Neon Terminal CSS system used by every `.slide`; runtime functions and slide markup remain compatible.

- [ ] **Step 1: Replace global Minimal Dark tokens with the approved terminal palette**

Use these shared values and keep semantic aliases for existing components:

```css
:root {
  --bg:#050807; --surface:#06130f; --border:rgba(68,217,255,.24);
  --text:#eafff1; --muted:#8aa89a; --accent:#5cff95;
  --good:#5cff95; --bad:#ff6b7a; --neon-green:#5cff95;
  --neon-cyan:#44d9ff; --neon-red:#ff6b7a;
  --terminal-bg:#050807; --terminal-ink:#eafff1;
  --terminal-muted:#8aa89a; --mono:'JetBrains Mono',monospace;
  --body:'Pretendard Variable',Pretendard,system-ui,sans-serif;
}
```

- [ ] **Step 2: Promote the grid and terminal status rail to every slide**

Move the current `.skill-slide` background behavior to `.slide`, keep content above the pseudo-elements, and retain adequate bottom space:

```css
.slide { isolation:isolate; background:var(--terminal-bg); color:var(--terminal-ink); }
.slide::before { content:""; position:absolute; inset:0; z-index:0; background-image:linear-gradient(rgba(92,255,149,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(68,217,255,.035) 1px,transparent 1px); background-size:36px 36px; pointer-events:none; }
.slide::after { content:"context  →  skill  →  evidence   ▋"; position:absolute; left:72px; right:72px; bottom:30px; z-index:1; border-top:1px solid rgba(68,217,255,.24); padding-top:9px; color:var(--neon-cyan); font:600 11px var(--mono); letter-spacing:.08em; text-align:left; pointer-events:none; }
.slide>* { position:relative; z-index:1; }
```

- [ ] **Step 3: Apply terminal typography and panel grammar globally**

Promote skill-only heading, tag, panel, code, good/bad, and small-text rules to `.slide` selectors. Use angular 3–4px corners, translucent green surfaces, cyan borders, green active tags, and red/green comparison rails. Keep Korean body copy on `var(--body)` and use `var(--mono)` for headings, eyebrows, commands, counters, and badges.

- [ ] **Step 4: Harmonize special components**

Update existing `.opening-result`, `.browser-result`, `.browser-toolbar`, `.browser-canvas`, agenda cards, STEP labels, progress bar, counter, notes popup, and fullscreen control to use only the approved terminal palette. Do not change their markup, text, IDs, event listeners, or data attributes.

- [ ] **Step 5: Preserve responsive, print, and reduced-motion behavior**

Generalize mobile status-rail offsets from `.skill-slide::after` to `.slide::after`, apply exact print colors to all slides, and add:

```css
@media(prefers-reduced-motion:reduce) {
  *,*::before,*::after { scroll-behavior:auto!important; transition:none!important; animation:none!important; }
}
```

- [ ] **Step 6: Run focused and full tests for GREEN**

Run:

```bash
node --test tests/workshop-draft.test.js
node --test
git diff --check
```

Expected: focused 28/28 or greater, full 32/32 or greater, zero failures, and no whitespace errors.

- [ ] **Step 7: Commit the global theme**

```bash
git add drafts/solution-pe-portfolio-workshop/index.html tests/workshop-draft.test.js
git commit -m "style: apply neon terminal theme to full workshop"
```

---

### Task 3: Render and interaction QA

**Files:**
- Modify only if a verified defect requires it: `drafts/solution-pe-portfolio-workshop/index.html`
- Modify only when adding a regression: `tests/workshop-draft.test.js`
- Create outside the repository: `/tmp/full-neon-workshop-qa/`

**Interfaces:**
- Consumes: the globally themed deck from Task 2 and the live server at port 8767.
- Produces: desktop/mobile PNGs, metrics, interaction JSON, a 73-page PDF, and a defect-free verified artifact.

- [ ] **Step 1: Confirm the served file is the current worktree file**

Run the port-8767 server if necessary, fetch the deck, and require identical SHA-256 hashes for the served and worktree HTML before visual inspection.

- [ ] **Step 2: Render all 73 desktop slides**

At 1440×900, save one PNG per slide under `/tmp/full-neon-workshop-qa/desktop/`. For every slide record viewport width/height, scroll width/height, visible slide count, active slide ID, and title bounds in `desktop-metrics.json`.

- [ ] **Step 3: Inspect every desktop PNG**

Open all 73 renders individually and check terminal-grid continuity, title contrast, panel boundaries, status-rail separation, code wrapping, progress/counter visibility, ghost slides, clipping, and overlap.

- [ ] **Step 4: Render and inspect mobile risk slides**

At 390×844 render slides `1,2,12-21,32,34,35,39,52,53,58,64,66,67,71,73`. Require zero horizontal overflow and exactly one accessible/visible slide. Vertical scrolling is acceptable only when all content remains reachable and the terminal status rail does not obscure it.

- [ ] **Step 5: Re-run real interactions**

Persist `/tmp/full-neon-workshop-qa/interaction-results.json` covering ArrowRight, Space, ArrowLeft, final-slide clamp, counter/progress, S notes popup on representative slides, touch swipe, `aria-hidden`/`inert`, and fullscreen missing/rejection/normal paths.

- [ ] **Step 6: Print and inspect the PDF**

Generate `/tmp/full-neon-workshop-qa/workshop-neon-73.pdf`, require exactly 73 pages, and render pages `1,2,12,20,32,52,64,66,71,73` for visual inspection of background retention, contrast, clipping, and status rails.

- [ ] **Step 7: Fix only evidenced defects with RED→GREEN**

For each defect, add the smallest failing contract to `tests/workshop-draft.test.js`, verify the intended RED, apply the smallest CSS correction, rerun focused/full tests and affected renders, then commit:

```bash
git add drafts/solution-pe-portfolio-workshop/index.html tests/workshop-draft.test.js
git commit -m "fix: resolve full neon workshop render defects"
```

Skip this commit when no source defect is found.

---

### Task 4: Validate and publish the stable Pages path

**Files:**
- Modify: `.github/workflows/pages.yml`
- Modify: `tests/deck.test.js`

**Interfaces:**
- Consumes: verified `drafts/solution-pe-portfolio-workshop/index.html` and the existing main-branch Pages workflow.
- Produces: CI validation for the 73-slide workshop, a minimal `_site/` artifact, and public URL `https://wys1110.github.io/claude-code-part-training/solution-pe-portfolio-workshop/`.

- [ ] **Step 1: Add a failing workflow contract**

In `tests/deck.test.js`, read `.github/workflows/pages.yml` and assert that it validates the workshop file, exact slide count, and exact 120-minute sum:

```js
test('Pages workflow validates and publishes the 73-slide workshop at a clean path', () => {
  const workflow = fs.readFileSync(path.join(ROOT, '.github/workflows/pages.yml'), 'utf8');
  assert.match(workflow, /drafts\/solution-pe-portfolio-workshop\/index\.html/);
  assert.match(workflow, /workshop slide ids/);
  assert.match(workflow, /workshop total/);
  assert.match(workflow, /_site\/solution-pe-portfolio-workshop\/index\.html/);
  assert.match(workflow, /path:\s*\.\/_site/);
});
```

- [ ] **Step 2: Run the workflow test and verify RED**

Run: `node --test tests/deck.test.js`

Expected: FAIL because the existing workflow validates only the root presentation.

- [ ] **Step 3: Extend validation and build a minimal `_site/` artifact in `pages.yml`**

Read `drafts/solution-pe-portfolio-workshop/index.html`, extract `data-slide` and `data-minutes`, and add exact assertions:

```python
workshop = pathlib.Path('drafts/solution-pe-portfolio-workshop/index.html').read_text(encoding='utf-8')
workshop_ids = re.findall(r'data-slide="(\d+)"', workshop)
workshop_minutes = [float(value) for value in re.findall(r'data-minutes="([0-9.]+)"', workshop)]
assert workshop_ids == [str(i) for i in range(1, 74)], f'workshop slide ids: {workshop_ids}'
assert len(workshop_minutes) == 73, f'workshop timing count: {len(workshop_minutes)}'
assert abs(sum(workshop_minutes) - 120) < 0.001, f'workshop total: {sum(workshop_minutes)}'
print('Validated workshop 73 slides / 120 minutes')
```

After validation, add a shell step that copies only the existing root presentation assets and the workshop HTML into the deployment artifact:

```bash
mkdir -p _site/solution-pe-portfolio-workshop
cp index.html styles.css app.js slides-1.js slides-2.js slides-3.js slides-4.js _site/
cp drafts/solution-pe-portfolio-workshop/index.html _site/solution-pe-portfolio-workshop/index.html
touch _site/.nojekyll
```

Change `actions/upload-pages-artifact@v4` to upload `./_site`. This preserves the existing root presentation while excluding tests, plans, source notes, worktree metadata, and unrelated repository files from the public artifact.

- [ ] **Step 4: Run final local verification and commit**

Run:

```bash
node --test
git diff --check
git status --short
```

Expected: all tests pass, no diff-check output, and only intended workflow/test changes before commit.

Commit:

```bash
git add .github/workflows/pages.yml tests/deck.test.js
git commit -m "ci: validate workshop in Pages deployment"
```

- [ ] **Step 5: Push the feature branch and create a PR**

Push `feat/solution-pe-workshop-draft`, create a PR into `main`, and include the local test count, 73-page PDF result, public path, and root-deck preservation in the PR summary.

- [ ] **Step 6: Merge through the repository's normal workflow**

Confirm required checks pass, merge the PR into `main`, and wait for `Deploy presentation to GitHub Pages` to complete successfully. Do not claim deployment from a push or merge alone.

- [ ] **Step 7: Verify the live public deck**

Open `https://wys1110.github.io/claude-code-part-training/solution-pe-portfolio-workshop/` and verify HTTP 200, title `Solution PE팀 Staff · 업무 포트폴리오 워크숍`, `73 / 73` navigation reachability, representative slides `2`, `12`, `52`, and `73`, and strong Neon Terminal styling. Report the workflow run and final URL.
