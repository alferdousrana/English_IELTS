import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateWritten } from '../src/engine/evaluate.js';
import { recordMistake, reviewMistake, isDue } from '../src/engine/srs.js';
import { touchStreak } from '../src/engine/streak.js';
import { levelFor } from '../src/engine/xp.js';
import { mergeProgress, EMPTY } from '../src/state/store.js';
import ps from '../src/data/grammar/present-simple.js';
import { CONCEPTS } from '../src/data/concepts.js';

import { TOPIC_CONTENT } from '../src/data/grammar/index.js';

// Every registered lesson is checked, so a new lesson can't be deployed half-finished.
const ALL = await Promise.all(Object.entries(TOPIC_CONTENT).map(async ([id, load]) => ({ id, t: (await load()).default })));
const BN = /[\u0980-\u09FF]/;

test('content: every lesson has 20 examples, 20 MCQs, 20 written and a detailed explanation', () => {
  for (const { id, t } of ALL) {
    assert.equal(t.id, id, `file id mismatch for ${id}`);
    assert.equal(t.examples.length, 20, `${id} examples`);
    assert.equal(t.mcq.length, 20, `${id} mcq`);
    assert.equal(t.written.length, 20, `${id} written`);
    assert.ok(t.explanation.length >= 4, `${id} needs at least 4 explanation sections`);
    for (const s of t.explanation) assert.ok(s.bn || s.tip, `${id}: section "${s.heading}" has no Bangla`);
    for (const e of t.examples) {
      assert.ok(e.en && e.bn && e.why, `${id}: incomplete example ${e.en}`);
      assert.ok(BN.test(e.why), `${id}: example explanation should be in Bangla: ${e.en}`);
    }
    assert.equal(new Set(t.examples.map((e) => e.en)).size, 20, `${id}: duplicate example`);
  }
});

test('content: MCQ answers exist in options, 4 unique options, known concepts', () => {
  const ids = new Set();
  for (const { t } of ALL) for (const q of [...t.mcq, ...t.written]) {
    assert.ok(!ids.has(q.id), `duplicate id ${q.id}`); ids.add(q.id);
    assert.ok(CONCEPTS[q.concept], `unknown concept ${q.concept} in ${q.id}`);
    assert.ok(q.explanation, `${q.id} has no explanation`);
    if (q.options) {
      assert.ok(q.options.includes(q.answer), q.id);
      assert.equal(new Set(q.options).size, 4, q.id);
    }
    for (const c of q.checks || []) {
      assert.doesNotThrow(() => new RegExp(c.pattern, 'i'), q.id);
      assert.ok(CONCEPTS[c.concept || q.concept], `unknown concept in check of ${q.id}`);
    }
  }
});

test('content: accepted answers are judged correct and never trip their own error checks', () => {
  for (const { t } of ALL) for (const q of t.written) for (const a of q.accepted) {
    const r = evaluateWritten(q, a);
    assert.equal(r.verdict, 'correct', `${q.id}: "${a}" → ${r.verdict} ${JSON.stringify(r.notes)}`);
    for (const c of q.checks || []) assert.ok(!new RegExp(c.pattern, 'i').test(a), `${q.id}: check ${c.pattern} fires on accepted "${a}"`);
  }
});

test('evaluate: catches classic errors with a specific reason', () => {
  const q = ps.written.find((x) => x.id === 'ps_wr_03');
  const r = evaluateWritten(q, 'He go to the office by bus.');
  assert.equal(r.verdict, 'wrong');
  assert.equal(r.concept, 'sva');
  const q2 = ps.written.find((x) => x.id === 'ps_wr_08');
  assert.equal(evaluateWritten(q2, 'She doesnt eat tea.').problems[0].concept, 'collocation');
});

test('evaluate: contractions and minor slips', () => {
  const q = ps.written.find((x) => x.id === 'ps_wr_05');
  assert.equal(evaluateWritten(q, 'They do not play cricket.').verdict, 'correct');
  const r = evaluateWritten(q, "they don't play cricket");
  assert.equal(r.verdict, 'minor');
  assert.ok(r.notes.length >= 2);
});

test('srs: wrong resets, right climbs, repeat offenders climb slower', () => {
  let m = recordMistake(null, { questionId: 'x' }, '2026-10-01');
  assert.equal(m.nextReview, '2026-10-01');
  assert.ok(isDue(m, '2026-10-01'));
  m = reviewMistake(m, true, '2026-10-01');
  assert.equal(m.stage, 1); assert.equal(m.nextReview, '2026-10-02');
  m = reviewMistake(m, true, '2026-10-02');
  assert.equal(m.nextReview, '2026-10-05');
  m = reviewMistake(m, false, '2026-10-05');
  m = reviewMistake(m, false, '2026-10-05');
  assert.equal(m.count, 3); assert.equal(m.stage, 0);
  m = reviewMistake(m, true, '2026-10-05');
  assert.equal(m.stage, 0, 'needs two correct in a row after 3 mistakes');
});

test('streak: one missed day is forgiven once a week', () => {
  let s = touchStreak({}, '2026-10-01');
  s = touchStreak(s, '2026-10-02');
  s = touchStreak(s, '2026-10-04'); // missed 3rd
  assert.equal(s.current, 3);
  s = touchStreak(s, '2026-10-06'); // missed 5th, grace already used
  assert.equal(s.current, 1);
  assert.equal(s.longest, 3);
});

test('levels', () => {
  assert.equal(levelFor(0).level, 1);
  assert.equal(levelFor(150).level, 2);
  assert.equal(levelFor(99999).level, 10);
});

test('merge keeps work from both devices', () => {
  const a = { ...EMPTY(), xp: 100, topics: { x: { attempts: 1, bestScore: 70, completed: true } } };
  const b = { ...EMPTY(), xp: 140, topics: { x: { attempts: 2, bestScore: 50, completed: false } }, mistakes: { q: { count: 2, lastSeen: '2026-10-02' } } };
  const m = mergeProgress(a, b);
  assert.equal(m.xp, 140);
  assert.equal(m.topics.x.bestScore, 70);
  assert.equal(m.topics.x.completed, true);
  assert.ok(m.mistakes.q);
});
