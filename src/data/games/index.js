// Content for the matching and sorting games. Rounds are hand-checked so that every
// beginning fits only one ending inside its round.
export const SENTENCE_ROUNDS = [
  [['If it rains tomorrow,', 'we will cancel the picnic.'], ['She has lived in Dhaka', 'since 2015.'], ['I was cooking dinner', 'when the lights went out.'], ['By the time we arrived,', 'the film had already started.'], ['He is interested', 'in learning Japanese.']],
  [['Although she was tired,', 'she finished her homework.'], ['The report was written', 'by our manager.'], ['If I were you,', 'I would apologise.'], ['They have been waiting', 'for over an hour.'], ['Do you mind', 'opening the window?']],
  [['This is the book', 'that I told you about.'], ['She speaks English', 'more fluently than her brother.'], ['We decided', 'to take the early train.'], ['Unless you hurry,', 'you will miss the bus.'], ['I\'m looking forward', 'to meeting you.']],
  [['Not only is she smart,', 'but she is also kind.'], ['He asked me', 'where I lived.'], ['The more you practise,', 'the better you become.'], ['She suggested', 'going to the beach.'], ['Neither my brother nor my sister', 'likes spicy food.']]
];

export const POS_WORDS = {
  Noun: ['happiness', 'teacher', 'river', 'information', 'decision', 'freedom', 'kitchen', 'childhood', 'knowledge', 'government'],
  Verb: ['arrive', 'believe', 'explain', 'borrow', 'choose', 'destroy', 'improve', 'pretend', 'encourage', 'forget'],
  Adjective: ['careful', 'enormous', 'honest', 'curious', 'expensive', 'dangerous', 'polite', 'ancient', 'narrow', 'delicious'],
  Adverb: ['quickly', 'seldom', 'carefully', 'often', 'honestly', 'suddenly', 'already', 'rarely', 'extremely', 'loudly']
};
export const POS_HINT = {
  Noun: 'A person, place, thing or idea. Endings like -ness, -tion, -dom, -hood, -ment often mark nouns.',
  Verb: 'An action or state: it can follow "to" (to explain) or "I" (I believe).',
  Adjective: 'Describes a noun: a careful driver. Endings like -ful, -ous, -ive, -ent are common.',
  Adverb: 'Describes how, how often or how much: often, quickly. Many end in -ly.'
};
