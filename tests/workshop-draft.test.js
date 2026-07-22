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
