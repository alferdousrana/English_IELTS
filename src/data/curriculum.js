// 16-week roadmap. Units of 5 topics; each unit ends with a 100-question Master Test.
// A topic is playable when its content module exists in data/grammar/index.js.
const U = (n, week, month, phase, title, topics, extra = {}) => ({ id: `unit${n}`, n, week, month, phase, title, topics, ...extra });
const T = (id, title, titleBn) => ({ id, title, titleBn });

export const PHASES = [
  { id: 'foundation', title: 'English Foundation', months: [1, 2] },
  { id: 'tenses', title: 'Tenses', months: [2] },
  { id: 'advanced', title: 'Advanced Foundation Grammar', months: [3] },
  { id: 'ielts', title: 'IELTS Preparation', months: [4] }
];

export const UNITS = [
  U(1, 1, 1, 'foundation', 'Building blocks of a sentence', [
    T('sentence-structure', 'Sentence structure', 'বাক্যের গঠন'),
    T('subject', 'Subject', 'কর্তা'),
    T('verb', 'Verb', 'ক্রিয়া'),
    T('object', 'Object', 'কর্ম'),
    T('subject-complement', 'Subject complement', 'কর্তার পরিপূরক')
  ]),
  U(2, 2, 1, 'foundation', 'Parts of speech I', [
    T('parts-of-speech', 'Parts of speech', 'পদ প্রকরণ'),
    T('nouns', 'Nouns', 'বিশেষ্য'),
    T('pronouns', 'Pronouns', 'সর্বনাম'),
    T('verbs', 'Verbs', 'ক্রিয়াপদ'),
    T('adjectives', 'Adjectives', 'বিশেষণ')
  ]),
  U(3, 3, 1, 'foundation', 'Parts of speech II', [
    T('adverbs', 'Adverbs', 'ক্রিয়া বিশেষণ'),
    T('prepositions', 'Prepositions', 'পদান্বয়ী অব্যয়'),
    T('conjunctions', 'Conjunctions', 'সংযোজক অব্যয়'),
    T('articles', 'Articles', 'আর্টিকেল (a/an/the)'),
    T('determiners', 'Determiners', 'নির্ধারক')
  ]),
  U(4, 4, 1, 'foundation', 'How verbs work', [
    T('subject-verb-agreement', 'Subject-verb agreement', 'কর্তা-ক্রিয়ার মিল'),
    T('helping-verbs', 'Helping verbs', 'সাহায্যকারী ক্রিয়া'),
    T('be-verbs', 'Be verbs', 'Be verb (am/is/are/was/were)'),
    T('main-verbs', 'Main verbs', 'মূল ক্রিয়া'),
    T('do-does-did', 'Do / Does / Did', 'Do / Does / Did')
  ]),
  U(5, 5, 2, 'foundation', 'Making sentences', [
    T('basic-sentence-formation', 'Basic sentence formation', 'মৌলিক বাক্য গঠন'),
    T('positive-sentences', 'Positive sentences', 'হ্যাঁ-বাচক বাক্য'),
    T('negative-sentences', 'Negative sentences', 'না-বাচক বাক্য'),
    T('questions', 'Yes/No questions', 'প্রশ্নবোধক বাক্য'),
    T('wh-questions', 'WH questions', 'WH প্রশ্ন')
  ], { boss: 'English Foundation Boss Battle' }),
  U(6, 6, 2, 'tenses', 'Present tenses + Past Simple', [
    T('present-simple', 'Present Simple', 'সাধারণ বর্তমান'),
    T('present-continuous', 'Present Continuous', 'ঘটমান বর্তমান'),
    T('present-perfect', 'Present Perfect', 'পুরাঘটিত বর্তমান'),
    T('present-perfect-continuous', 'Present Perfect Continuous', 'পুরাঘটিত ঘটমান বর্তমান'),
    T('past-simple', 'Past Simple', 'সাধারণ অতীত')
  ]),
  U(7, 7, 2, 'tenses', 'Past and future tenses', [
    T('past-continuous', 'Past Continuous', 'ঘটমান অতীত'),
    T('past-perfect', 'Past Perfect', 'পুরাঘটিত অতীত'),
    T('past-perfect-continuous', 'Past Perfect Continuous', 'পুরাঘটিত ঘটমান অতীত'),
    T('future-simple', 'Future Simple', 'সাধারণ ভবিষ্যৎ'),
    T('future-continuous', 'Future Continuous', 'ঘটমান ভবিষ্যৎ')
  ]),
  U(8, 8, 2, 'tenses', 'Perfect futures, modals, conditionals', [
    T('future-perfect', 'Future Perfect', 'পুরাঘটিত ভবিষ্যৎ'),
    T('future-perfect-continuous', 'Future Perfect Continuous', 'পুরাঘটিত ঘটমান ভবিষ্যৎ'),
    T('tense-comparison', 'Choosing the right tense', 'সঠিক tense বাছাই'),
    T('modal-verbs', 'Modal verbs', 'মোডাল ক্রিয়া'),
    T('conditionals', 'Conditional sentences', 'শর্তসাপেক্ষ বাক্য')
  ], { boss: 'Tense Boss Battle' }),
  U(9, 9, 3, 'advanced', 'Voice and clauses', [
    T('active-passive', 'Active and passive voice', 'কর্তৃবাচ্য ও কর্মবাচ্য'),
    T('relative-clauses', 'Relative clauses', 'Relative clause'),
    T('noun-clauses', 'Noun clauses', 'Noun clause'),
    T('adverb-clauses', 'Adverb clauses', 'Adverb clause'),
    T('phrase-vs-clause', 'Phrase vs clause', 'Phrase ও clause')
  ]),
  U(10, 10, 3, 'advanced', 'Verb forms and comparison', [
    T('gerunds', 'Gerunds', 'Gerund'),
    T('infinitives', 'Infinitives', 'Infinitive'),
    T('participles', 'Participles', 'Participle'),
    T('comparatives-superlatives', 'Comparatives and superlatives', 'তুলনামূলক ও সর্বোচ্চ'),
    T('reported-speech', 'Reported speech', 'পরোক্ষ উক্তি')
  ]),
  U(11, 11, 3, 'advanced', 'Linking and sentence types', [
    T('question-tags', 'Question tags', 'Question tag'),
    T('linking-transition', 'Linking and transition words', 'সংযোগ শব্দ'),
    T('compound-sentences', 'Compound sentences', 'যৌগিক বাক্য'),
    T('complex-sentences', 'Complex and compound-complex sentences', 'জটিল বাক্য'),
    T('sentence-transformation', 'Sentence transformation', 'বাক্য রূপান্তর')
  ]),
  U(12, 12, 3, 'advanced', 'Accuracy and the bridge to IELTS', [
    T('parallel-structure', 'Parallel structure', 'সমান্তরাল গঠন'),
    T('common-errors', 'Common grammar errors', 'সাধারণ ভুল'),
    T('paraphrasing-basics', 'Paraphrasing basics', 'প্যারাফ্রেজিং'),
    T('academic-vocabulary', 'Academic vocabulary', 'একাডেমিক শব্দভান্ডার'),
    T('formal-writing', 'Formal writing style', 'আনুষ্ঠানিক লেখা')
  ], { boss: 'Advanced Grammar Boss Battle' }),
  U(13, 13, 4, 'ielts', 'IELTS foundation and Reading', [
    T('ielts-overview', 'How IELTS works', 'IELTS পরিচিতি'),
    T('paraphrasing-lab', 'Paraphrasing Lab', 'প্যারাফ্রেজিং ল্যাব'),
    T('skimming-scanning', 'Skimming and scanning', 'স্কিমিং ও স্ক্যানিং'),
    T('tfng', 'True / False / Not Given', 'True/False/Not Given'),
    T('matching-headings', 'Matching headings', 'শিরোনাম মেলানো')
  ]),
  U(14, 14, 4, 'ielts', 'Listening and Writing Task 1', [
    T('listening-prediction', 'Listening: prediction and distractors', 'লিসেনিং: অনুমান'),
    T('listening-completion', 'Listening: form and note completion', 'লিসেনিং: ফর্ম পূরণ'),
    T('task1-trends', 'Task 1: overview and trends', 'Task 1: ওভারভিউ'),
    T('task1-comparison', 'Task 1: comparing data, maps, processes', 'Task 1: তুলনা'),
    T('task2-structure', 'Task 2: essay structure', 'Task 2: রচনার গঠন')
  ]),
  U(15, 15, 4, 'ielts', 'Task 2 and Speaking', [
    T('task2-opinion', 'Task 2: opinion essays', 'মতামত রচনা'),
    T('task2-discussion', 'Task 2: discussion and other types', 'আলোচনা রচনা'),
    T('speaking-part1', 'Speaking Part 1', 'স্পিকিং পার্ট ১'),
    T('speaking-part2', 'Speaking Part 2: cue cards', 'স্পিকিং পার্ট ২'),
    T('speaking-part3', 'Speaking Part 3', 'স্পিকিং পার্ট ৩')
  ]),
  U(16, 16, 4, 'ielts', 'Mock tests and weakness repair', [], { boss: 'IELTS Mock Battle' })
];

export const ALL_TOPICS = UNITS.flatMap((u) => u.topics.map((t) => ({ ...t, unitId: u.id, week: u.week, month: u.month, phase: u.phase })));
export const topicById = (id) => ALL_TOPICS.find((t) => t.id === id);
