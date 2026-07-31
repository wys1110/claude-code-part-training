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

test('Pages workflow builds the focused 42-slide workshop at the root URL only', () => {
  const workflow = fs.readFileSync(path.join(ROOT, '.github/workflows/pages.yml'), 'utf8');
  assert.match(workflow, /range\(1, 43\)/);
  assert.match(workflow, /refactor_42_slide_workshop\.py/);
  assert.match(workflow, /Claude Code Workshop/);
  assert.match(workflow, /Brainstorming/);
  assert.match(workflow, /Caveman/);
  assert.match(workflow, /Ponytail/);
  assert.match(workflow, /Claude Code vs Codex/);
  assert.match(workflow, /cp docs\/handbook\.md _site\/handbook\.md/);
  assert.match(workflow, /path:\s*\.\/_site/);
  assert.doesNotMatch(workflow, /solution-pe-portfolio-workshop/);
  assert.doesNotMatch(workflow, /range\(1, 78\)|77-slide|77 slides/);
});