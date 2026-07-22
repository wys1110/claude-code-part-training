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
