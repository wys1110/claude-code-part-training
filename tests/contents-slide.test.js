'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.join(__dirname, '..');

function buildWorkshop() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'workshop-contents-'));
  const output = path.join(tempDir, 'index.html');
  const result = spawnSync('python3', [
    path.join(ROOT, 'scripts', 'build_workshop.py'),
    path.join(ROOT, 'drafts', 'solution-pe-portfolio-workshop', 'index.html'),
    output,
  ], { encoding: 'utf8' });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  return fs.readFileSync(output, 'utf8');
}

function slideIds(html) {
  return Array.from(
    html.matchAll(/<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"/g),
    match => Number(match[1]),
  );
}

test('public workshop inserts CONTENTS and expands the five popular skills', () => {
  const html = buildWorkshop();

  assert.deepEqual(slideIds(html), Array.from({ length: 79 }, (_, index) => index + 1));
  assert.match(html, /data-slide="1"[\s\S]*?<\/section>\s*<section class="slide wide contents-slide" data-slide="2"/);
  assert.match(html, /<h2>CONTENTS<\/h2>/);
  assert.match(html, />13–27<\/span><strong>Claude Code Skills<\/strong>/);
  assert.match(html, />70–77<\/span><strong>GitHub Pages 배포<\/strong>/);
  assert.match(html, /onclick="goTo\(69\)"/);

  const detailTitles = [
    'brainstorming은 네 질문으로 요구사항을 고정한다',
    'writing-plans는 네 칸으로 실행 가능성을 확인한다',
    'frontend-design은 30초 읽기 순서를 설계한다',
    'systematic-debugging은 네 단계로 원인을 좁힌다',
    'verification-before-completion은 네 증거를 한 번에 묶는다',
  ];
  for (const title of detailTitles) assert.match(html, new RegExp(`<h2>${title}<\\/h2>`));

  const minutes = Array.from(
    html.matchAll(/<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="\d+"\s+data-minutes="([0-9.]+)"/g),
    match => Number(match[1]),
  );
  assert.equal(minutes.length, 79);
  assert.ok(Math.abs(minutes.reduce((sum, value) => sum + value, 0) - 120) < 0.001);
});

test('speaker notes remain aligned after CONTENTS and skill expansion', () => {
  const html = buildWorkshop();
  const match = html.match(/<script type="application\/json" id="speaker-notes-data">([\s\S]*?)<\/script>/);
  assert.ok(match);

  const notes = JSON.parse(match[1]);
  assert.equal(notes.length, 79);
  assert.deepEqual(notes.map(note => note.slide), Array.from({ length: 79 }, (_, index) => index + 1));
  assert.equal(notes[1].title, 'CONTENTS');
  assert.equal(notes[2].title, '오늘은 공개 URL 하나를 완성한다');
  assert.equal(notes[16].title, 'brainstorming은 네 질문으로 요구사항을 고정한다');
  assert.equal(notes[18].title, 'writing-plans는 네 칸으로 실행 가능성을 확인한다');
  assert.equal(notes[20].title, 'frontend-design은 30초 읽기 순서를 설계한다');
  assert.equal(notes[22].title, 'systematic-debugging은 네 단계로 원인을 좁힌다');
  assert.equal(notes[24].title, 'verification-before-completion은 네 증거를 한 번에 묶는다');
});
