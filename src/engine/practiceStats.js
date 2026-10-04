// Per-category practice statistics and mastery levels.
// state.practice[cat] = { n: answered, c: correct, r: last 30 results as "1"/"0", last: day }
export const MASTERY = ['New', 'Learning', 'Good', 'Strong', 'Mastered'];

export function recentAcc(p) {
  if (!p?.r) return null;
  const r = p.r.slice(-20);
  return r.length ? [...r].filter((x) => x === '1').length / r.length : null;
}
export function mastery(p) {
  if (!p || p.n < 10) return 0;
  const a = recentAcc(p) ?? 0;
  if (p.n >= 100 && a >= 0.95) return 4;
  if (p.n >= 40 && a >= 0.85) return 3;
  if (a >= 0.7) return 2;
  return 1;
}
export function bumpPractice(p = { n: 0, c: 0, r: '' }, correct, day) {
  return { n: p.n + 1, c: p.c + (correct ? 1 : 0), r: (p.r + (correct ? '1' : '0')).slice(-30), last: day };
}
/** Weight for adaptive mixing: weaker and less-practised categories come up more. */
export function weight(p, openMistakes = 0) {
  const a = recentAcc(p);
  const acc = a === null || p.n < 5 ? 0.55 : a;
  return 1 + 3 * (1 - acc) + Math.min(3, openMistakes * 0.5);
}
export function weightedPick(items, weights) {
  const total = weights.reduce((x, y) => x + y, 0);
  let t = Math.random() * total;
  for (let i = 0; i < items.length; i++) { t -= weights[i]; if (t <= 0) return items[i]; }
  return items[items.length - 1];
}
