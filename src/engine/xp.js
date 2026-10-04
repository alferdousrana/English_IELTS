// XP rules and level table. Extend LEVELS to add more levels later.
export const XP = {
  mcqCorrect: 5,
  writtenCorrect: 10,
  writtenMinor: 8,      // correct meaning, small capitalisation/punctuation slip
  reviewCorrect: 3,
  lessonComplete: 20,
  perfectBonus: 10,
  repeatMultiplier: 0.5 // retaking a completed topic earns half XP, so XP keeps meaning
};

export const LEVELS = [
  { level: 1, name: 'Beginner', xp: 0 },
  { level: 2, name: 'Foundation Builder', xp: 150 },
  { level: 3, name: 'Grammar Explorer', xp: 400 },
  { level: 4, name: 'Sentence Builder', xp: 800 },
  { level: 5, name: 'Vocabulary Hunter', xp: 1400 },
  { level: 6, name: 'English Practitioner', xp: 2200 },
  { level: 7, name: 'Intermediate', xp: 3200 },
  { level: 8, name: 'Advanced Foundation', xp: 4500 },
  { level: 9, name: 'IELTS Challenger', xp: 6000 },
  { level: 10, name: 'IELTS 7+ Candidate', xp: 8000 }
];

export function levelFor(xp) {
  let current = LEVELS[0];
  for (const l of LEVELS) if (xp >= l.xp) current = l;
  const next = LEVELS.find((l) => l.xp > xp) || null;
  const span = next ? next.xp - current.xp : 1;
  const into = next ? xp - current.xp : 1;
  return { ...current, next, progress: Math.min(1, into / span), toNext: next ? next.xp - xp : 0 };
}
