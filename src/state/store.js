// Local-first progress store. The UI always reads from here; Firebase sync happens in the background.
import { dayKey } from '../engine/dates.js';

export const EMPTY = () => ({
  profile: { startDate: dayKey() },
  xp: 0,
  streak: { current: 0, longest: 0, last: null, graceUsedOn: null, daysStudied: 0 },
  stats: { answered: 0, correct: 0, lessonsCompleted: 0 },
  topics: {},
  settings: { dailyGoalMinutes: 45 },
  mistakes: {},
  daily: {},
  practice: {},                               // per category: { n, c, r, last }
  vocab: { words: {}, extra: 0, exams: {} },  // per word: { intro, k: {kind: [right, wrong]}, days, exam }
  games: {},                                  // per game: { plays, best, wins, last }
  badges: {}                                  // id → date earned
});

/** Fill fields that older saved progress (v1) doesn't have. */
export function normalize(s) {
  if (!s) return s;
  const e = EMPTY();
  return {
    ...e, ...s,
    profile: { ...e.profile, ...s.profile },
    streak: { ...e.streak, ...s.streak },
    stats: { ...e.stats, ...s.stats },
    settings: { ...e.settings, ...s.settings },
    vocab: { ...e.vocab, ...s.vocab, words: { ...(s.vocab?.words || {}) }, exams: { ...(s.vocab?.exams || {}) } },
    practice: s.practice || {}, games: s.games || {}, badges: s.badges || {},
    topics: s.topics || {}, mistakes: s.mistakes || {}, daily: s.daily || {}
  };
}

const key = (owner) => `khata:v1:${owner}`;

export function loadLocal(owner) {
  try {
    const raw = localStorage.getItem(key(owner));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
export function saveLocal(owner, payload) {
  try { localStorage.setItem(key(owner), JSON.stringify(payload)); } catch { /* storage full or blocked */ }
}
export function clearLocal(owner) {
  try { localStorage.removeItem(key(owner)); } catch { /* ignore */ }
}

const maxBy = (a, b, f) => (f(a) >= f(b) ? a : b);
const mergeMap = (a = {}, b = {}, pick) => {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = out[k] === undefined ? v : pick(out[k], v);
  return out;
};

/** Merge two progress snapshots without losing work done on either device. */
export function mergeProgress(a, b) {
  if (!a) return normalize(b); if (!b) return normalize(a);
  a = normalize(a); b = normalize(b);
  const topics = mergeMap(a.topics, b.topics, (o, t) => ({
    ...maxBy(o, t, (x) => x.attempts || 0),
    bestScore: Math.max(o.bestScore || 0, t.bestScore || 0),
    completed: o.completed || t.completed
  }));
  const mistakes = mergeMap(a.mistakes, b.mistakes, (o, m) => maxBy(o, m, (x) => `${x.lastSeen || x.lastMistake || ''}|${x.count || 0}`));
  const daily = mergeMap(a.daily, b.daily, (o, v) => Object.fromEntries(
    [...new Set([...Object.keys(o), ...Object.keys(v)])].map((k) => [k, Math.max(o[k] || 0, v[k] || 0)])
  ));
  const practice = mergeMap(a.practice, b.practice, (o, p) => maxBy(o, p, (x) => x.n || 0));
  const words = mergeMap(a.vocab.words, b.vocab.words, (o, w) => {
    const k = { ...o.k };
    for (const [kind, [r, x]] of Object.entries(w.k || {})) k[kind] = [Math.max(k[kind]?.[0] || 0, r), Math.max(k[kind]?.[1] || 0, x)];
    return { ...o, ...w, k, intro: [o.intro, w.intro].filter(Boolean).sort()[0], days: [...new Set([...(o.days || []), ...(w.days || [])])].sort().slice(-6), exam: o.exam || w.exam };
  });
  const exams = mergeMap(a.vocab.exams, b.vocab.exams, (o, e) => maxBy(o, e, (x) => x.pct || 0));
  const games = mergeMap(a.games, b.games, (o, g) => ({ plays: Math.max(o.plays || 0, g.plays || 0), best: Math.max(o.best || 0, g.best || 0), wins: Math.max(o.wins || 0, g.wins || 0), last: [o.last, g.last].filter(Boolean).sort().pop() }));
  const badges = mergeMap(a.badges, b.badges, (o, d) => (o < d ? o : d));
  const sa = a.streak, sb = b.streak;
  return {
    profile: { ...b.profile, ...a.profile, startDate: [a.profile?.startDate, b.profile?.startDate].filter(Boolean).sort()[0] },
    xp: Math.max(a.xp || 0, b.xp || 0),
    streak: { ...maxBy(sa, sb, (s) => `${s.last || ''}|${s.current || 0}`), longest: Math.max(sa.longest || 0, sb.longest || 0), daysStudied: Math.max(sa.daysStudied || 0, sb.daysStudied || 0) },
    stats: {
      answered: Math.max(a.stats.answered || 0, b.stats.answered || 0),
      correct: Math.max(a.stats.correct || 0, b.stats.correct || 0),
      lessonsCompleted: Math.max(a.stats.lessonsCompleted || 0, b.stats.lessonsCompleted || 0)
    },
    topics, mistakes, daily, practice, games, badges,
    vocab: { words, exams, extra: Math.max(a.vocab.extra || 0, b.vocab.extra || 0) },
    settings: { ...b.settings, ...a.settings }
  };
}
