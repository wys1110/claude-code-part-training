# Root Workshop Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the 73-slide Neon Terminal workshop open directly at the repository's root GitHub Pages URL while preserving the existing workshop subpath as an identical alias.

**Architecture:** Change only the Pages artifact assembly. Copy the verified workshop HTML to both `_site/index.html` and `_site/solution-pe-portfolio-workshop/index.html`; stop copying the previous root deck assets into the public artifact while leaving their repository source files untouched.

**Tech Stack:** GitHub Actions YAML, static HTML, Node `node:test`, GitHub Pages.

## Global Constraints

- Both public URLs must serve byte-identical copies of `drafts/solution-pe-portfolio-workshop/index.html`.
- The previous 29-slide root deck source files remain in Git; only their public deployment is removed.
- Preserve the existing 73-slide, 120-minute validation and the minimal `_site` artifact.
- Use TDD, run all 32 existing tests plus the new contract, and verify both live URLs after deployment.

---

### Task 1: Publish the workshop at the canonical root and alias paths

**Files:**
- Modify: `tests/deck.test.js`
- Modify: `.github/workflows/pages.yml`

**Interfaces:**
- Consumes: `drafts/solution-pe-portfolio-workshop/index.html` and the existing `Build minimal Pages artifact` workflow step.
- Produces: `_site/index.html` and `_site/solution-pe-portfolio-workshop/index.html` with identical bytes.

- [ ] **Step 1: Write the failing deployment contract**

Update the Pages workflow test to require two workshop copies and reject old root asset copying:

```js
test('Pages workflow publishes the workshop at the root and alias paths', () => {
  const workflow = fs.readFileSync(path.join(ROOT, '.github/workflows/pages.yml'), 'utf8');
  assert.match(workflow, /cp drafts\/solution-pe-portfolio-workshop\/index\.html _site\/index\.html/);
  assert.match(workflow, /cp drafts\/solution-pe-portfolio-workshop\/index\.html _site\/solution-pe-portfolio-workshop\/index\.html/);
  assert.doesNotMatch(workflow, /cp index\.html styles\.css app\.js/);
  assert.match(workflow, /path:\s*\.\/_site/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/deck.test.js`

Expected: FAIL because the workflow still copies the previous root deck assets to `_site/`.

- [ ] **Step 3: Implement the minimal artifact mapping**

Replace the artifact-copy commands with:

```bash
mkdir -p _site/solution-pe-portfolio-workshop
cp drafts/solution-pe-portfolio-workshop/index.html _site/index.html
cp drafts/solution-pe-portfolio-workshop/index.html _site/solution-pe-portfolio-workshop/index.html
touch _site/.nojekyll
```

- [ ] **Step 4: Verify GREEN and simulate the artifact locally**

Run:

```bash
node --test tests/deck.test.js
node --test
git diff --check
```

Build the same layout in a `mktemp -d` directory and require identical SHA-256 values for the source, root copy, and alias copy. Expected: 33/33 tests pass and all three hashes match.

- [ ] **Step 5: Commit the deployment mapping**

```bash
git add .github/workflows/pages.yml tests/deck.test.js
git commit -m "ci: publish workshop at Pages root"
```

---

### Task 2: Merge and verify both public URLs

**Files:**
- No source-file changes unless CI exposes an evidenced defect.

**Interfaces:**
- Consumes: the committed root artifact mapping from Task 1.
- Produces: canonical root URL and backward-compatible alias, both serving the same 73-slide deck.

- [ ] **Step 1: Push and open a PR**

Push `feat/root-workshop-deck`, create a ready PR into `main`, and state that the old root deck remains in Git but is removed from the public Pages artifact.

- [ ] **Step 2: Merge and wait for Pages**

Merge the conflict-free PR, wait for `Deploy presentation to GitHub Pages`, and require a successful conclusion. Do not report completion from merge state alone.

- [ ] **Step 3: Verify the canonical root and alias**

Fetch both URLs and require HTTP 200, title `Solution PE팀 Staff · 업무 포트폴리오 워크숍`, 73 slides, Neon Terminal token `--terminal-bg:#050807`, and identical SHA-256 values:

```text
https://wys1110.github.io/claude-code-part-training/
https://wys1110.github.io/claude-code-part-training/solution-pe-portfolio-workshop/
```

- [ ] **Step 4: Open the canonical root for review**

Navigate the in-app browser to the root URL, verify `1 / 73`, navigate to `73 / 73`, and return to slide 1.
