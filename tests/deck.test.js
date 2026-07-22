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
