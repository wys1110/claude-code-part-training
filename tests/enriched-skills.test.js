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

function buildDetailedWorkshop() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'workshop-detailed-skills-'));
  const base = path.join(tempDir, 'base.html');
  const output = path.join(tempDir, 'index.html');
  runPython('build_workshop.py', [
    path.join(ROOT, 'drafts', 'solution-pe-portfolio-workshop', 'index.html'),
    base,
  ]);
  runPython('enrich_skill_pages.py', [base, output]);
  return fs.readFileSync(output, 'utf8');
}

test('five skills have explanation-rich overview and practical pages', () => {
  const html = buildDetailedWorkshop();
  const slideIds = Array.from(
    html.matchAll(/<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"/g),
    match => Number(match[1]),
  );

  assert.deepEqual(slideIds, Array.from({ length: 79 }, (_, index) => index + 1));
  assert.ok((html.match(/skill-rich-slide/g) || []).length >= 10);

  for (const marker of [
    'DEFINITION',
    'WHEN NOT TO USE',
    'BEFORE → AFTER',
    'CORE PRINCIPLES',
    'COPYABLE PROMPT',
    'PROMPT ANATOMY',
    'EXAMPLE OUTPUT',
    'QUALITY GATE',
    'FAILURE PATTERNS',
    'REQUEST EXAMPLE',
  ]) {
    assert.equal((html.match(new RegExp(marker, 'g')) || []).length, 5, marker);
  }

  assert.match(html, /사용하지 말아야 할 때/);
  assert.match(html, /실제 적용 사례/);
  assert.match(html, /프롬프트 문장별 역할/);
  assert.match(html, /좋은 결과 예시/);
  assert.match(html, /brainstorming을 사용해 아래 작업을 구체화해줘/);
  assert.match(html, /systematic-debugging을 사용해 조사해줘/);
  assert.match(html, /verification-before-completion을 사용해 아래 완료 기준을 검증해줘/);

  const skillTimings = Array.from(
    html.matchAll(/<section\s+class="[^"]*\bskill-rich-slide\b[^"]*"\s+data-slide="(\d+)"\s+data-minutes="([0-9.]+)"/g),
    match => ({ page: Number(match[1]), minutes: Number(match[2]) }),
  );
  assert.equal(skillTimings.length, 10);
  assert.deepEqual(skillTimings.map(item => item.page), Array.from({ length: 10 }, (_, index) => index + 16));
  assert.ok(skillTimings.every(item => item.minutes >= 3));
});

test('detailed skill speaker notes remain aligned and support fuller delivery', () => {
  const html = buildDetailedWorkshop();
  const match = html.match(/<script type="application\/json" id="speaker-notes-data">([\s\S]*?)<\/script>/);
  assert.ok(match);

  const notes = JSON.parse(match[1]);
  assert.equal(notes.length, 79);
  assert.deepEqual(notes.map(note => note.slide), Array.from({ length: 79 }, (_, index) => index + 1));
  assert.equal(notes[15].title, 'brainstorming은 만들기 전에 목적과 범위를 맞춘다');
  assert.equal(notes[16].title, 'brainstorming은 네 질문으로 요구사항을 고정한다');
  assert.equal(notes[24].title, 'verification-before-completion은 네 증거를 한 번에 묶는다');
  for (let page = 16; page <= 25; page += 1) {
    assert.match(notes[page - 1].body, /^\[약 3분\]/);
    assert.ok(notes[page - 1].body.length > 250, `page ${page} note is too short`);
  }
});
