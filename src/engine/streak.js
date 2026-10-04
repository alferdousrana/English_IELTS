import { daysBetween, dayKey } from './dates.js';

/**
 * Forgiving streak: missing ONE day is recovered automatically once per 7 days.
 * Missing more resets the current streak, but longest streak and days studied stay.
 */
export function touchStreak(streak = {}, today = dayKey()) {
  const s = { current: 0, longest: 0, last: null, graceUsedOn: null, daysStudied: 0, ...streak };
  if (s.last === today) return s;
  const gap = s.last ? daysBetween(s.last, today) : null;
  let current;
  let graceUsedOn = s.graceUsedOn;
  if (gap === 1) current = s.current + 1;
  else if (gap === 2 && (!graceUsedOn || daysBetween(graceUsedOn, today) >= 7)) {
    current = s.current + 1;
    graceUsedOn = today;
  } else current = 1;
  return { ...s, current, longest: Math.max(s.longest, current), last: today, graceUsedOn, daysStudied: s.daysStudied + 1 };
}
