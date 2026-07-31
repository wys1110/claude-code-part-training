'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.join(__dirname, '..');
const REMOVED_SKILLS = [
  'writing-plans',
  'frontend-design',
  'systematic-debugging',
  'verification-before-completion',
];

function runPython(script, args) {
  const result = spawnSync('python3', [path.join(ROOT, 'scripts', script), ...args], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
}

function buildThreeSkillWorkshop() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'workshop-three-skills-'));
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

test('workshop retains only brainstorming, Caveman, and Ponytail as named skills', () => {
  const html = buildThreeSkillWorkshop();
  const slideIds = Array.from(
    html.matchAll(/<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"/g),
    match => Number(match[1]),
  );
  const skillPages = Array.from(
    html.matchAll(/<section\s+class="[^"]*\bthree-skill-slide\b[^"]*"\s+data-slide="(\d+)"/g),
    match => Number(match[1]),
  );

  assert.deepEqual(slideIds, Array.from({ length: 79 }, (_, index) => index + 1));
  assert.deepEqual(skillPages, Array.from({ length: 14 }, (_, index) => index + 13));
  assert.match(html, /오늘 사용할 스킬은 세 개뿐이다/);
  assert.match(html, /brainstorming은 네 질문으로 요구사항을 고정한다/);
  assert.match(html, /Caveman은 정확성을 유지하면서 답을 압축한다/);
  assert.match(html, /Ponytail은 최소 구현 사다리를 따른다/);
  assert.match(html, /brainstorming · Caveman · Ponytail만 설치한다/);
  assert.match(html, /JuliusBrussee\/caveman/);
  assert.match(html, /DietrichGebert\/ponytail/);
  for (const removed of REMOVED_SKILLS) {
    assert.doesNotMatch(html, new RegExp(removed));
  }
});

test('three-skill speaker notes remain aligned to pages 13 through 26', () => {
  const html = buildThreeSkillWorkshop();
  const match = html.match(/<script type="application\/json" id="speaker-notes-data">([\s\S]*?)<\/script>/);
  assert.ok(match);
  const notes = JSON.parse(match[1]);

  assert.equal(notes.length, 79);
  assert.deepEqual(notes.map(note => note.slide), Array.from({ length: 79 }, (_, index) => index + 1));
  assert.equal(notes[12].title, '오늘 사용할 스킬은 세 개뿐이다');
  assert.equal(notes[16].title, 'brainstorming은 네 질문으로 요구사항을 고정한다');
  assert.equal(notes[17].title, 'Caveman은 정확성을 유지하면서 답을 압축한다');
  assert.equal(notes[22].title, 'Ponytail은 최소 구현 사다리를 따른다');
  assert.equal(notes[25].title, 'brainstorming · Caveman · Ponytail만 설치한다');
  for (let page = 13; page <= 26; page += 1) {
    assert.match(notes[page - 1].body, /^\[약 [23]분\]/);
  }
});
