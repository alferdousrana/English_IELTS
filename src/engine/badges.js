import { mastery } from './practiceStats.js';
import { stageCounts } from './vocab.js';

const good = (s, lvl) => Object.entries(s.practice || {}).filter(([k, p]) => k !== 'vocab' && mastery(p) >= lvl).length;
const resolved = (s) => Object.values(s.mistakes || {}).filter((m) => m.resolved).length;

export const BADGES = [
  { id: 'first-lesson', icon: '🎓', name: 'First lesson', desc: 'Pass your first grammar topic', test: (s) => s.stats.lessonsCompleted >= 1 },
  { id: 'q100', icon: '💯', name: '100 questions', desc: 'Answer 100 questions', test: (s) => s.stats.answered >= 100 },
  { id: 'q500', icon: '🔥', name: '500 questions', desc: 'Answer 500 questions', test: (s) => s.stats.answered >= 500 },
  { id: 'q1000', icon: '🚀', name: '1,000 questions', desc: 'Answer 1,000 questions', test: (s) => s.stats.answered >= 1000 },
  { id: 'q5000', icon: '🏔️', name: '5,000 questions', desc: 'Answer 5,000 questions', test: (s) => s.stats.answered >= 5000 },
  { id: 'grammar-starter', icon: '🧩', name: 'Grammar starter', desc: 'Reach Good in 3 practice categories', test: (s) => good(s, 2) >= 3 },
  { id: 'grammar-master', icon: '👑', name: 'Grammar master', desc: 'Reach Strong in 12 grammar categories', test: (s) => good(s, 3) >= 12 },
  { id: 'streak7', icon: '📅', name: '7-day streak', desc: 'Study 7 days in a row', test: (s) => s.streak.longest >= 7 },
  { id: 'streak30', icon: '🌟', name: '30-day streak', desc: 'Study 30 days in a row', test: (s) => s.streak.longest >= 30 },
  { id: 'vocab30', icon: '📚', name: 'Vocabulary builder', desc: 'Learn 30 words', test: (s) => stageCounts(s).slice(1).reduce((a, b) => a + b, 0) >= 30 },
  { id: 'vocab-exam', icon: '📝', name: 'Week of words', desc: 'Pass a 7-day vocabulary exam', test: (s) => Object.values(s.vocab?.exams || {}).some((e) => e.pct >= 70) },
  { id: 'vocab-master', icon: '🏆', name: 'Vocabulary master', desc: 'Master 50 words', test: (s) => stageCounts(s)[4] >= 50 },
  { id: 'first-game', icon: '🎮', name: 'Player one', desc: 'Finish your first game', test: (s) => Object.keys(s.games || {}).length > 0 },
  { id: 'speed20', icon: '⚡', name: 'Lightning', desc: 'Score 20+ in a Speed Round', test: (s) => (s.games?.speed?.best || 0) >= 20 },
  { id: 'boss', icon: '🐉', name: 'Boss slayer', desc: 'Win a boss battle', test: (s) => Object.entries(s.games || {}).some(([k, g]) => k.startsWith('boss') && g.wins > 0) },
  { id: 'fixer', icon: '🩹', name: 'Mistake fixer', desc: 'Fix 10 old mistakes through review', test: (s) => resolved(s) >= 10 },
  { id: 'writing', icon: '✒️', name: 'Writing warrior', desc: 'Arrives with the IELTS writing module', test: () => false, soon: true },
  { id: 'speaking', icon: '🎙️', name: 'Speaking explorer', desc: 'Arrives with the IELTS speaking module', test: () => false, soon: true },
  { id: 'ielts-ready', icon: '🎯', name: 'IELTS ready', desc: 'Arrives with full mock tests', test: () => false, soon: true }
];
export const BADGE_BY_ID = Object.fromEntries(BADGES.map((b) => [b.id, b]));
export const newlyEarned = (s) => BADGES.filter((b) => !s.badges?.[b.id] && b.test(s)).map((b) => b.id);
