'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const deckPath = path.join(root, 'drafts', 'solution-pe-portfolio-workshop', 'index.html');

function readDeck() {
  return fs.readFileSync(deckPath, 'utf8');
}

function parseDeckSlides(html) {
  return [...html.matchAll(/<section\s+class="slide[^"]*"[^>]*data-slide="(\d+)"[^>]*data-minutes="(\d+)"[^>]*data-notes="([^"]+)"[\s\S]*?<\/section>/g)]
    .map((match) => {
      const heading = match[0].match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/)?.[1] || '';
      return {
        slide: Number(match[1]),
        minutes: Number(match[2]),
        notes: match[3],
        title: heading
          .replace(/<br\s*\/?\s*>/gi, ' ')
          .replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim(),
        html: match[0],
      };
    });
}

function renderPopupNotes(html, embeddedNotes, slideIndex) {
  const runtime = html.match(/<script>\s*([\s\S]*?)<\/script>\s*<\/body>/)?.[1];
  assert.ok(runtime, 'standalone deck runtime should exist');

  const parsedSlides = parseDeckSlides(html);
  const slideElements = parsedSlides.map((slide) => ({
    dataset: { notes: slide.notes },
    classList: { add() {}, remove() {} },
    scrollTop: 0,
    querySelector(selector) {
      return selector === 'h1,h2' ? { textContent: slide.title } : null;
    },
  }));
  const popupElements = {
    'note-title': { textContent: '' },
    nt: { textContent: '' },
    sn: { textContent: '' },
  };
  const popup = {
    closed: false,
    close() { this.closed = true; },
    document: {
      write() {},
      close() {},
      getElementById(id) { return popupElements[id]; },
    },
  };
  const pageElements = {
    'speaker-notes-data': { textContent: JSON.stringify(embeddedNotes) },
    progress: { style: {} },
    counter: { textContent: '' },
  };
  const context = {
    document: {
      querySelectorAll(selector) { return selector === '.slide' ? slideElements : []; },
      getElementById(id) { return pageElements[id]; },
      addEventListener() {},
      documentElement: {},
      fullscreenElement: null,
    },
    window: { open() { return popup; } },
  };

  vm.runInNewContext(runtime, context);
  context.toggleNotes();
  context.goTo(slideIndex);
  return {
    title: popupElements['note-title'].textContent,
    body: popupElements.nt.textContent,
    counter: popupElements.sn.textContent,
  };
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
    "addEventListener('touchend'",
    '@media print',
  ]) assert.match(html, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('deck source resets each destination slide to its top edge', () => {
  assert.match(readDeck(), /slides\[index\]\.scrollTop\s*=\s*0/);
});

test('mobile CSS contract top-aligns tall wide slides', () => {
  assert.match(readDeck(), /\.slide\.wide\{align-content:start\}/);
});

test('print CSS contract releases the screen viewport clipping', () => {
  assert.match(readDeck(), /@media print\{html,body\{height:auto;overflow:visible\}/);
});

test('print CSS contract keeps full slides horizontally centered', () => {
  assert.match(readDeck(), /\.slide\.full\{display:flex!important;justify-content:center\}/);
});

test('opening and core sections contain the approved practical story', () => {
  const html = readDeck();
  for (const phrase of [
    'Solution PE팀 Staff', '원용석', '개인 업무 포트폴리오',
    '작업 파트너', 'Plan', '권한', 'git status', 'git diff', 'Commit', 'Push',
    '포트폴리오 하나 만들어줘', '완료 기준',
  ]) assert.match(html, new RegExp(phrase));
  assert.match(html, /data-slide="31"/);
});

test('instructor demo reaches a reviewed first version before the break', () => {
  const html = readDeck();
  for (const phrase of [
    '현재 파일과 Git 상태를 확인해줘',
    '아직 파일을 수정하지 말고',
    'index.html', 'styles.css', 'app.js',
    '1440×900', '390×844', '변경 파일',
  ]) assert.match(html, new RegExp(phrase));
  assert.match(html, /data-slide="40"/);
});

test('instructor demo reviews untracked first-version files with no-index diffs', () => {
  const html = readDeck();
  for (const file of ['index.html', 'styles.css', 'app.js']) {
    assert.match(html, new RegExp(`git diff --no-index --check /dev/null ${file}`));
  }
  assert.match(html, /exit 1은 파일 차이를 알리는 정상 결과/);
});

test('participant lab contains all twelve numbered steps and completion checks', () => {
  const html = readDeck();
  for (let step = 1; step <= 12; step += 1) {
    assert.match(html, new RegExp(`STEP ${String(step).padStart(2, '0')}`));
  }
  for (const phrase of ['복사할 프롬프트', '정상 결과', '직접 확인', '안 될 때 먼저']) {
    assert.match(html, new RegExp(phrase));
  }
  assert.match(html, /data-slide="63"/);
});

test('participant lab teaches a clean baseline and reviews actual approved files before staging', () => {
  const html = readDeck();
  const slide = (number) => html.match(new RegExp(`<section class="slide[^>]*data-slide="${number}"[\\s\\S]*?<\\/section>`))?.[0] || '';

  assert.match(slide(45), /README/);
  assert.match(slide(45), /초기 Commit/);
  for (const file of ['index.html', 'styles.css', 'app.js']) {
    assert.match(slide(60), new RegExp(`git diff --no-index /dev/null ${file}`));
    assert.match(slide(60), new RegExp(`git diff --no-index --check /dev/null ${file}`));
  }
  assert.match(slide(60), /exit 1.*정상/);
  assert.match(slide(61), /Plan에서.*검토.*승인/);
  assert.match(slide(61), /실제 파일/);
});

test('slide 63 notes proceed to Pages and the public URL in this session', () => {
  const html = readDeck();
  const notes = html.match(/<section class="slide full" data-slide="63"[\s\S]*?data-notes="([^"]+)"/)?.[1];
  assert.ok(notes, 'slide 63 notes should exist');
  assert.doesNotMatch(notes, /이후 세션|다음 세션|나중/);
  assert.match(notes, /이번 세션에서 바로 Pages 설정과 공개 URL 확인/);
});

test('five-skill edition has 73 slides totaling 120 minutes', () => {
  const html = readDeck();
  const tags = [...html.matchAll(/<section\s+class="slide[^"]*"[^>]*data-slide="(\d+)"[^>]*data-minutes="(\d+)"/g)];
  assert.equal(tags.length, 73);
  assert.deepEqual(tags.map(match => Number(match[1])), Array.from({ length: 73 }, (_, i) => i + 1));
  assert.equal(tags.reduce((sum, match) => sum + Number(match[2]), 0), 120);
});

test('five-skill edition preserves the approved chapter, break, and lab timing map', () => {
  const slides = parseDeckSlides(readDeck());
  const minutes = new Map(slides.map(slide => [slide.slide, slide.minutes]));
  const sum = (from, to) => Array.from(
    { length: to - from + 1 },
    (_, index) => minutes.get(from + index),
  ).reduce((total, value) => total + value, 0);

  assert.deepEqual(
    Array.from({ length: 10 }, (_, index) => minutes.get(index + 12)),
    [1, 2, 1, 2, 2, 2, 2, 2, 1, 1],
  );
  assert.equal(minutes.get(41), 10);
  assert.equal(sum(42, 63), 45);
});

test('all 73 slide summaries are nonempty', () => {
  const html = readDeck();
  const tags = [...html.matchAll(/<section\s+class="slide[^"]*"[^>]*data-slide="(\d+)"[^>]*data-minutes="(\d+)"[^>]*data-notes="([^"]+)"/g)];
  assert.equal(tags.length, 73);
  assert.ok(tags.every(match => match[3].trim().length >= 20));
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
  const slides = new Map(parseDeckSlides(html).map(slide => [slide.slide, slide.html]));
  for (let slide = 15; slide <= 19; slide += 1) {
    assert.match(slides.get(slide), /compare-bad/);
    assert.match(slides.get(slide), /compare-good/);
  }
});

test('skill chapter uses neon terminal treatment and workflow badges', () => {
  const html = readDeck();
  for (const token of ['skill-slide', 'neon-grid', 'skill-badge', '--neon-green', '--neon-cyan']) {
    assert.match(html, new RegExp(token));
  }
  for (const skill of ['brainstorming', 'writing-plans', 'frontend-design', 'systematic-debugging', 'verification-before-completion']) {
    assert.ok((html.match(new RegExp(`skill-badge[^>]*>${skill}`, 'g')) || []).length >= 1);
  }
});

test('publication and troubleshooting end with observable evidence', () => {
  const html = readDeck();
  for (const phrase of [
    'Settings → Pages → Deploy from a branch → main → /(root)',
    '404', 'index.html', 'Push', '민감정보', '공개 URL', 'git status',
    '시키고 끝내지 말고, 결과를 직접 확인한다',
  ]) assert.match(html, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('copyable command displays omit literal shell prompt glyphs', () => {
  assert.doesNotMatch(readDeck(), /\$ (?:git|pwd|ls|cd|claude)\b/);
});

test('speaker script has one section for every slide', () => {
  const script = fs.readFileSync(path.join(root, 'drafts', 'solution-pe-portfolio-workshop', 'script.md'), 'utf8');
  const headings = [...script.matchAll(/^## Slide (\d+) — /gm)].map(match => Number(match[1]));
  assert.deepEqual(headings, Array.from({ length: 73 }, (_, i) => i + 1));
});

test('embedded full speaker notes exactly match all 73 script sections', () => {
  const script = fs.readFileSync(path.join(root, 'drafts', 'solution-pe-portfolio-workshop', 'script.md'), 'utf8');
  const headings = [...script.matchAll(/^## Slide (\d+) — (.+)$/gm)];
  const expected = headings.map((match, index) => ({
    slide: Number(match[1]),
    title: match[2],
    body: script.slice(
      match.index + match[0].length,
      headings[index + 1]?.index ?? script.length,
    ).trim(),
  }));
  assert.equal(expected.length, 73);
  const html = readDeck();
  const payload = html.match(/<script type="application\/json" id="speaker-notes-data">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(payload, 'standalone deck should embed full speaker notes JSON');
  assert.doesNotMatch(payload, /</, 'embedded JSON should escape script-closing input');
  assert.deepEqual(JSON.parse(payload), expected);
});

test('stale 63-entry full notes fall back to the current slide summary', () => {
  const html = readDeck();
  const slides = parseDeckSlides(html);
  const payload = html.match(/<script type="application\/json" id="speaker-notes-data">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(payload, 'standalone deck should embed full speaker notes JSON');
  const embeddedNotes = JSON.parse(payload).slice(0, 63);
  assert.equal(slides.length, 73);
  assert.equal(embeddedNotes.length, 63);

  const popup = renderPopupNotes(html, embeddedNotes, 11);
  assert.equal(popup.title, slides[11].title);
  assert.equal(popup.body, slides[11].notes);
  assert.notEqual(popup.body, embeddedNotes[11].body);
  assert.equal(popup.counter, 'Slide 12 / 73');
});

test('representative skill slide popup uses full timing, prose, cue, and transition', () => {
  const html = readDeck();
  const payload = html.match(/<script type="application\/json" id="speaker-notes-data">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(payload, 'standalone deck should embed full speaker notes JSON');

  const popup = renderPopupNotes(html, JSON.parse(payload), 14);
  assert.equal(popup.title, 'brainstorming은 만들기 전에 목적과 범위를 맞춘다');
  assert.match(popup.body, /^\[약 2분\]/);
  assert.match(popup.body, /포트폴리오/);
  assert.match(popup.body, /brainstorming/);
  assert.match(popup.body, /\[(?:DEMO|PRACTICE)\]/);
  assert.match(popup.body, /다음 장/);
  assert.equal(popup.counter, 'Slide 15 / 73');
});

test('full notes require matching slide IDs and titles before positional use', () => {
  const html = readDeck();
  const slides = parseDeckSlides(html);
  const alignedNotes = slides.map(slide => ({
    slide: slide.slide,
    title: slide.title,
    body: `FULL NOTE ${slide.slide}`,
  }));

  assert.equal(renderPopupNotes(html, alignedNotes, 11).body, 'FULL NOTE 12');

  const wrongId = alignedNotes.map(note => ({ ...note }));
  wrongId[11].slide = 999;
  assert.equal(renderPopupNotes(html, wrongId, 11).body, slides[11].notes);

  const wrongTitle = alignedNotes.map(note => ({ ...note }));
  wrongTitle[11].title = 'WRONG TITLE';
  assert.equal(renderPopupNotes(html, wrongTitle, 11).body, slides[11].notes);
});
