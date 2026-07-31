'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.join(__dirname, '..');

function runPython(script, args) {
  const result = spawnSync('python3', [path.join(ROOT, 'scripts', script), ...args], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
}

function buildCompanionWorkshop() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'workshop-companion-skills-'));
  const base = path.join(tempDir, 'base.html');
  const enriched = path.join(tempDir, 'enriched.html');
  const output = path.join(tempDir, 'index.html');
  runPython('build_workshop.py', [
    path.join(ROOT, 'drafts', 'solution-pe-portfolio-workshop', 'index.html'),
    base,
  ]);
  runPython('enrich_skill_pages.py', [base, enriched]);
  runPython('add_companion_skills.py', [enriched, output]);
  return fs.readFileSync(output, 'utf8');
}

test('Caveman and Ponytail replace the install slide without changing slide count', () => {
  const html = buildCompanionWorkshop();
  const slideIds = Array.from(
    html.matchAll(/<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"/g),
    match => Number(match[1]),
  );

  assert.deepEqual(slideIds, Array.from({ length: 79 }, (_, index) => index + 1));
  assert.match(html, /data-slide="26"[^>]*data-minutes="3"/);
  assert.match(html, /Caveman과 Ponytail은 말과 구현을 각각 줄인다/);
  assert.match(html, /CAVEMAN · 응답 압축/);
  assert.match(html, /PONYTAIL · 구현 최소화/);
  assert.match(html, /JuliusBrussee\/caveman/);
  assert.match(html, /DietrichGebert\/ponytail/);
  assert.match(html, /보안·검증·접근성·오류 처리는 줄이지 않습니다/);
});

test('companion skill speaker note remains aligned to page 26', () => {
  const html = buildCompanionWorkshop();
  const match = html.match(/<script type="application\/json" id="speaker-notes-data">([\s\S]*?)<\/script>/);
  assert.ok(match);
  const notes = JSON.parse(match[1]);

  assert.equal(notes.length, 79);
  assert.deepEqual(notes.map(note => note.slide), Array.from({ length: 79 }, (_, index) => index + 1));
  assert.equal(notes[25].title, 'Caveman과 Ponytail은 말과 구현을 각각 줄인다');
  assert.match(notes[25].body, /^\[약 3분\]/);
  assert.match(notes[25].body, /Caveman은 짧게 말하기, Ponytail은 덜 만들기/);
});
