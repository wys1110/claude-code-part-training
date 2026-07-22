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
  assert.match(html, /data-slide="21"/);
});

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
  assert.match(html, /data-slide="53"/);
});

test('participant lab teaches a clean baseline and reviews actual approved files before staging', () => {
  const html = readDeck();
  const slide = (number) => html.match(new RegExp(`<section class="slide[^>]*data-slide="${number}"[\\s\\S]*?<\\/section>`))?.[0] || '';

  assert.match(slide(35), /README/);
  assert.match(slide(35), /초기 Commit/);
  for (const file of ['index.html', 'styles.css', 'app.js']) {
    assert.match(slide(50), new RegExp(`git diff --no-index /dev/null ${file}`));
    assert.match(slide(50), new RegExp(`git diff --no-index --check /dev/null ${file}`));
  }
  assert.match(slide(50), /exit 1.*정상/);
  assert.match(slide(51), /Plan에서.*검토.*승인/);
  assert.match(slide(51), /실제 파일/);
});

test('slide 53 notes proceed to Pages and the public URL in this session', () => {
  const html = readDeck();
  const notes = html.match(/<section class="slide full" data-slide="53"[\s\S]*?data-notes="([^"]+)"/)?.[1];
  assert.ok(notes, 'slide 53 notes should exist');
  assert.doesNotMatch(notes, /이후 세션|다음 세션|나중/);
  assert.match(notes, /이번 세션에서 바로 Pages 설정과 공개 URL 확인/);
});

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

test('speaker script has one section for every slide', () => {
  const script = fs.readFileSync(path.join(root, 'drafts', 'solution-pe-portfolio-workshop', 'script.md'), 'utf8');
  const headings = [...script.matchAll(/^## Slide (\d+) — /gm)].map(match => Number(match[1]));
  assert.deepEqual(headings, Array.from({ length: 63 }, (_, i) => i + 1));
});
