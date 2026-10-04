// Mistake categories. Weakness analysis groups mistakes by these ids.
export const CONCEPTS = {
  'word-order': { label: 'Word order (S + V + O)', bn: 'শব্দের ক্রম' },
  'missing-be': { label: 'Missing "be" verb', bn: 'am/is/are বাদ পড়া' },
  'subject': { label: 'Finding the subject', bn: 'কর্তা চেনা' },
  'object': { label: 'Finding the object', bn: 'কর্ম চেনা' },
  'complement': { label: 'Subject complement', bn: 'কর্তার পরিপূরক' },
  'linking-verb': { label: 'Linking verbs + adjectives', bn: 'Linking verb' },
  'adverb-position': { label: 'Adverb position', bn: 'ক্রিয়া বিশেষণের অবস্থান' },
  'dummy-subject': { label: '"It" as subject', bn: 'It দিয়ে শুরু' },
  'double-object': { label: 'Two objects (give me a book)', bn: 'দুইটি কর্ম' },
  'complete-sentence': { label: 'Complete sentences', bn: 'পূর্ণ বাক্য' },
  'missing-article': { label: 'Missing article (a/an)', bn: 'a/an বাদ পড়া' },
  'preposition': { label: 'Prepositions', bn: 'Preposition' },
  'be-plus-verb': { label: 'Extra "be" before a main verb (is go)', bn: 'is/are + মূল ক্রিয়ার ভুল' },
  'sva': { label: 'Subject-verb agreement', bn: 'কর্তা-ক্রিয়ার মিল' },
  'do-does': { label: 'Do / Does choice', bn: 'Do না Does' },
  'base-after-does': { label: 'Base verb after do/does/doesn\'t', bn: 'does-এর পর মূল ক্রিয়া' },
  'negative': { label: 'Negative sentences', bn: 'না-বাচক বাক্য' },
  'question-form': { label: 'Question word order', bn: 'প্রশ্নের গঠন' },
  'spelling-s': { label: 'Spelling of -s / -es / -ies', bn: '-s/-es বানান' },
  'have-has': { label: 'Have / Has', bn: 'Have না Has' },
  'tense-use': { label: 'When to use the tense', bn: 'Tense-এর ব্যবহার' },
  'signal-words': { label: 'Signal words', bn: 'সংকেত শব্দ' },
  'collocation': { label: 'Natural word choice', bn: 'স্বাভাবিক শব্দ ব্যবহার' }
};
export const conceptLabel = (id) => CONCEPTS[id]?.label || id;
