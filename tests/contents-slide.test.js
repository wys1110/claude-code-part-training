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

test('public workshop inserts CONTENTS between slide 1 and the previous slide 2', () => {
  const html = buildWorkshop();
  const slideIds = Array.from(
    html.matchAll(/<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"/g),
    match => Number(match[1]),
  );

  assert.deepEqual(slideIds, Array.from({ length: 74 }, (_, index) => index + 1));
  assert.match(html, /data-slide="1"[\s\S]*?<\/section>\s*<section class="slide wide contents-slide" data-slide="2"/);
  assert.match(html, /<h2>CONTENTS<\/h2>/);
  assert.match(html, />03–12<\/span><strong>결과와 안전 원칙<\/strong>/);
  assert.match(html, />65–72<\/span><strong>GitHub Pages 배포<\/strong>/);
  assert.match(html, /onclick="goTo\(64\)"/);
});

test('speaker notes remain aligned after inserting CONTENTS', () => {
  const html = buildWorkshop();
  const match = html.match(/<script type="application\/json" id="speaker-notes-data">([\s\S]*?)<\/script>/);
  assert.ok(match);

  const notes = JSON.parse(match[1]);
  assert.equal(notes.length, 74);
  assert.deepEqual(notes.map(note => note.slide), Array.from({ length: 74 }, (_, index) => index + 1));
  assert.equal(notes[1].title, 'CONTENTS');
  assert.equal(notes[2].title, '오늘은 공개 URL 하나를 완성한다');
});
