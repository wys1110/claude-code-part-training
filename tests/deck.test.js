'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.join(__dirname, '..');

function loadSlides() {
  const context = vm.createContext({ window: {} });
  for (const file of ['slides-1.js', 'slides-2.js', 'slides-3.js', 'slides-4.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
  }
  return context.window.SLIDES;
}

test('deck has 29 sequential slides with positive timing metadata', () => {
  const slides = loadSlides();
  assert.equal(slides.length, 29);
  assert.deepEqual(Array.from(slides, slide => slide.id), Array.from({ length: 29 }, (_, index) => index + 1));
  assert.ok(slides.every(slide => slide.minutes > 0));
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

test('Pages workflow builds the 81-slide workshop at the root and alias paths', () => {
  const workflow = fs.readFileSync(path.join(ROOT, '.github/workflows/pages.yml'), 'utf8');
  assert.match(workflow, /range\(1, 30\)/);
  assert.match(workflow, /drafts\/solution-pe-portfolio-workshop\/index\.html/);
  assert.match(workflow, /workshop slide ids/);
  assert.match(workflow, /list\(range\(1, 82\)\)/);
  assert.match(workflow, /<h2>CONTENTS<\/h2>/);
  assert.match(workflow, /skill_slides/);
  assert.match(workflow, /comparison_slides/);
  assert.match(workflow, /Claude Code vs Codex/);
  assert.doesNotMatch(workflow, /120 minutes|120분|sum\([^\n]+\)\s*-\s*120/);
  assert.match(workflow, /python scripts\/build_workshop\.py drafts\/solution-pe-portfolio-workshop\/index\.html _site\/index\.html/);
  assert.match(workflow, /python scripts\/enrich_skill_pages\.py _site\/index\.html _site\/index\.html/);
  assert.match(workflow, /python scripts\/add_tool_comparison\.py _site\/index\.html _site\/index\.html/);
  assert.match(workflow, /cp _site\/index\.html _site\/solution-pe-portfolio-workshop\/index\.html/);
  assert.doesNotMatch(workflow, /cp index\.html styles\.css app\.js/);
  assert.match(workflow, /path:\s*\.\/_site/);
});
