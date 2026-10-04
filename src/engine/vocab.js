// Daily vocabulary schedule and word stages.
import { WORDS } from '../data/vocabulary/words.js';
import { daysBetween } from './dates.js';

export const STAGES = ['New', 'Recognised', 'Understood', 'Can use', 'Mastered'];
export const PER_DAY = 5;

export function dayInfo(startDate, today) {
  const day = Math.max(1, daysBetween(startDate || today, today) + 1);
  const week = Math.floor((day - 1) / 7), dw = (day - 1) % 7;
  return { day, week, dw, examDay: dw === 6 };
}
// Days 1–6 of each week unlock 5 words; day 7 is review only.
export function unlockedCount(state, today) {
  const i = dayInfo(state.profile.startDate, today);
  const scheduled = PER_DAY * (i.week * 6 + Math.min(i.dw + 1, 6));
  return Math.min(WORDS.length, scheduled + (state.vocab?.extra || 0) * PER_DAY);
}
export const unlockedWords = (state, today) => WORDS.slice(0, unlockedCount(state, today));

export function stageOf(rec) {
  if (!rec) return 0;
  const k = rec.k || {}, ok = (x) => (k[x]?.[0] || 0) > 0;
  const recog = ok('meaning') || ok('bn');
  const under = recog && (ok('blank') || ok('syn') || ok('ant') || ok('context'));
  const use = under && ok('compose');
  if (use && rec.exam && (rec.days || []).length >= 2) return 4;
  if (use) return 3;
  if (under) return 2;
  if (recog) return 1;
  return 0;
}
/** Today's batch: the first unlocked words you haven't learned yet (so missed days catch up). */
export function todaysBatch(state, today) {
  const words = unlockedWords(state, today), recs = state.vocab?.words || {};
  const pending = words.filter((w) => stageOf(recs[w.id]) < 1);
  if (pending.length) return { words: pending.slice(0, PER_DAY), pending: pending.length, done: false };
  return { words: words.filter((w) => recs[w.id]?.intro === today).slice(0, PER_DAY), pending: 0, done: true };
}
export const weekWords = (week) => WORDS.slice(week * 30, week * 30 + 30);
/** The earliest week whose 30 words are all learned but whose exam isn't passed yet. */
export function examWeek(state, today) {
  const recs = state.vocab?.words || {}, exams = state.vocab?.exams || {}, info = dayInfo(state.profile.startDate, today);
  for (let w = 0; w * 30 < WORDS.length; w++) {
    const ws = weekWords(w);
    if (ws.length < 30) break;
    const learned = ws.every((x) => stageOf(recs[x.id]) >= 1);
    if (!learned) return null;
    if ((exams[w]?.pct || 0) < 70 && (info.week > w || info.examDay || learned)) return w;
  }
  return null;
}
export function stageCounts(state) {
  const c = [0, 0, 0, 0, 0], recs = state.vocab?.words || {};
  WORDS.forEach((w) => { if (recs[w.id]) c[stageOf(recs[w.id])]++; });
  return c;
}
