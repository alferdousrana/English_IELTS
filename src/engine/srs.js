import { addDays, dayKey } from './dates.js';

// Review ladder in days. Index 0 = "later today".
export const INTERVALS = [0, 1, 3, 7, 14, 30];

/** Record a fresh mistake (or a repeat of an old one). */
export function recordMistake(existing, info, today = dayKey()) {
  const count = (existing?.count || 0) + 1;
  return {
    ...existing,
    ...info,
    count,
    lastMistake: today,
    // Repeat offenders drop back to the bottom of the ladder.
    stage: 0,
    nextReview: today,
    resolved: false,
    streakCorrect: 0
  };
}

/** Update a mistake after it is reviewed. */
export function reviewMistake(m, correct, today = dayKey()) {
  if (!correct) return recordMistake(m, {}, today);
  // A concept missed many times climbs more slowly: it must be right twice per step.
  const needed = m.count >= 3 ? 2 : 1;
  const streakCorrect = (m.streakCorrect || 0) + 1;
  if (streakCorrect < needed) {
    return { ...m, streakCorrect, nextReview: addDays(today, 1) };
  }
  const stage = (m.stage || 0) + 1;
  if (stage >= INTERVALS.length) {
    return { ...m, stage, streakCorrect: 0, resolved: true, resolvedOn: today, nextReview: null };
  }
  return { ...m, stage, streakCorrect: 0, nextReview: addDays(today, Math.max(1, INTERVALS[stage])) };
}

export function isDue(m, today = dayKey()) {
  return !m.resolved && m.nextReview && m.nextReview <= today;
}
