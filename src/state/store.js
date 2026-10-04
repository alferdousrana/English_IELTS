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
  daily: {}
});

const key = (owner) => `khata:v1:${owner}`;

export function loadLocal(owner) {
  try {
    const raw = localStorage.getItem(key(owner));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

export function saveLocal(owner, payload) {
  try { localStorage.setItem(key(owner), JSON.stringify(payload)); } catch { /* storage full or blocked */ }
}

export function clearLocal(owner) {
  try { localStorage.removeItem(key(owner)); } catch { /* ignore */ }
}

const maxBy = (a, b, f) => (f(a) >= f(b) ? a : b);

/** Merge two progress snapshots without losing work done on either device. */
export function mergeProgress(a, b) {
  if (!a) return b; if (!b) return a;
  const topics = { ...a.topics };
  for (const [id, t] of Object.entries(b.topics || {})) {
    const o = topics[id];
    topics[id] = !o ? t : {
      ...maxBy(o, t, (x) => x.attempts || 0),
      bestScore: Math.max(o.bestScore || 0, t.bestScore || 0),
      completed: o.completed || t.completed
    };
  }
  const mistakes = { ...a.mistakes };
  for (const [id, m] of Object.entries(b.mistakes || {})) {
    const o = mistakes[id];
    mistakes[id] = !o ? m : maxBy(o, m, (x) => `${x.lastSeen || x.lastMistake || ''}|${x.count || 0}`);
  }
  const daily = { ...a.daily };
  for (const [d, v] of Object.entries(b.daily || {})) {
    const o = daily[d];
    daily[d] = !o ? v : Object.fromEntries(
      [...new Set([...Object.keys(o), ...Object.keys(v)])].map((k) => [k, Math.max(o[k] || 0, v[k] || 0)])
    );
  }
  const sa = a.streak || {}, sb = b.streak || {};
  return {
    profile: { ...b.profile, ...a.profile, startDate: [a.profile?.startDate, b.profile?.startDate].filter(Boolean).sort()[0] },
    xp: Math.max(a.xp || 0, b.xp || 0),
    streak: { ...maxBy(sa, sb, (s) => `${s.last || ''}|${s.current || 0}`), longest: Math.max(sa.longest || 0, sb.longest || 0) },
    stats: {
      answered: Math.max(a.stats?.answered || 0, b.stats?.answered || 0),
      correct: Math.max(a.stats?.correct || 0, b.stats?.correct || 0),
      lessonsCompleted: Math.max(a.stats?.lessonsCompleted || 0, b.stats?.lessonsCompleted || 0)
    },
    topics, mistakes, daily,
    settings: { ...b.settings, ...a.settings }
  };
}
