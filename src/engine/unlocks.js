// Practice categories open only after you pass a lesson that teaches them.
// A category opens when ANY of its listed topics is passed. Vocabulary depends on learned words instead.
import { topicById } from '../data/curriculum.js';

export const CAT_TOPICS = {
  order: ['sentence-structure', 'basic-sentence-formation'],
  translate: ['sentence-structure'],
  pronouns: ['object', 'pronouns'],
  be: ['subject-complement', 'be-verbs'],
  sva: ['present-simple', 'subject-verb-agreement'],
  dodoes: ['present-simple', 'do-does-did'],
  negq: ['present-simple', 'negative-sentences', 'questions'],
  errors: ['present-simple', 'common-errors'],
  articles: ['articles'],
  plurals: ['nouns'],
  quantifiers: ['determiners'],
  prepositions: ['prepositions'],
  compare: ['adjectives', 'comparatives-superlatives'],
  wh: ['wh-questions'],
  past: ['past-simple'],
  perfect: ['present-perfect'],
  tenses: ['tense-comparison'],
  tags: ['question-tags'],
  modals: ['modal-verbs'],
  gerinf: ['gerunds', 'infinitives'],
  passive: ['active-passive'],
  conditionals: ['conditionals'],
  paraphrase: ['paraphrasing-basics', 'paraphrasing-lab']
};

export function catUnlocked(cat, topics = {}) {
  if (cat === 'vocab') return true;
  return (CAT_TOPICS[cat] || []).some((t) => topics[t]?.completed);
}
/** Title of the first lesson that opens this category, for "Pass X to unlock". */
export const unlockLesson = (cat) => topicById(CAT_TOPICS[cat]?.[0])?.title || 'the matching lesson';
export const unlockedCats = (cats, topics) => cats.filter((c) => catUnlocked(c, topics));
