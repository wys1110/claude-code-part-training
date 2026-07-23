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

function buildComparisonWorkshop() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'workshop-tool-comparison-'));
  const base = path.join(tempDir, 'base.html');
  const enriched = path.join(tempDir, 'enriched.html');
  const output = path.join(tempDir, 'index.html');
  runPython('build_workshop.py', [
    path.join(ROOT, 'drafts', 'solution-pe-portfolio-workshop', 'index.html'),
    base,
  ]);
  runPython('enrich_skill_pages.py', [base, enriched]);
  runPython('add_tool_comparison.py', [enriched, output]);
  return fs.readFileSync(output, 'utf8');
}

test('public workshop includes two Claude Code vs Codex slides', () => {
  const html = buildComparisonWorkshop();
  const slideIds = Array.from(
    html.matchAll(/<section\s+class="[^"]*\bslide\b[^"]*"\s+data-slide="(\d+)"/g),
    match => Number(match[1]),
  );

  assert.deepEqual(slideIds, Array.from({ length: 81 }, (_, index) => index + 1));
  assert.match(html, /data-slide="28"[^>]*data-minutes="3"/);
  assert.match(html, /data-slide="29"[^>]*data-minutes="3"/);
  assert.match(html, /Claude Code vs Codex: 무엇이 다른가\?/);
  assert.match(html, /도구가 아니라 작업 방식으로 선택한다/);
  assert.match(html, /TERMINAL-FIRST/);
  assert.match(html, /MULTI-SURFACE/);
  assert.match(html, /CLAUDE\.md/);
  assert.match(html, /Skills와 Plugins/);
  assert.match(html, /https:\/\/docs\.anthropic\.com\/en\/docs\/claude-code\/overview/);
  assert.match(html, /https:\/\/openai\.com\/codex\//);
});

test('contents and speaker notes remain aligned after comparison insertion', () => {
  const html = buildComparisonWorkshop();

  assert.match(html, /<span class="contents-range">28–29<\/span><strong>Claude Code vs Codex<\/strong>/);
  assert.match(html, /<span class="contents-range">30–39<\/span><strong>좋은 요청과 Git 기본<\/strong>/);
  assert.match(html, /<span class="contents-range">80–81<\/span><strong>다음 업무와 마무리<\/strong>/);
  assert.match(html, /onclick="goTo\(27\)" aria-label="28페이지 Claude Code와 Codex 비교로 이동"/);
  assert.match(html, /전체 교육을 일곱 구간으로 안내합니다/);

  const match = html.match(/<script type="application\/json" id="speaker-notes-data">([\s\S]*?)<\/script>/);
  assert.ok(match);
  const notes = JSON.parse(match[1]);
  assert.equal(notes.length, 81);
  assert.deepEqual(notes.map(note => note.slide), Array.from({ length: 81 }, (_, index) => index + 1));
  assert.equal(notes[27].title, 'Claude Code vs Codex: 무엇이 다른가?');
  assert.equal(notes[28].title, '도구가 아니라 작업 방식으로 선택한다');
  assert.match(notes[27].body, /^\[약 3분\]/);
  assert.match(notes[28].body, /^\[약 3분\]/);
  assert.ok(notes[27].body.length > 300);
  assert.ok(notes[28].body.length > 300);
});
