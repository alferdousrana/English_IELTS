export default {
  id: 'present-simple',
  title: 'Present Simple',
  difficulty: 'beginner',
  explanation: [
    {
      heading: 'When to use it',
      en: 'Present Simple is used for habits, routines, general facts and fixed timetables.',
      bn: 'সহজভাবে বললে, কোনো কাজ নিয়মিত হয়, সাধারণ সত্য বোঝায়, বা নির্দিষ্ট সময়সূচি থাকলে Present Simple ব্যবহার করি।'
    },
    {
      heading: 'Structure',
      table: {
        head: ['', 'I / You / We / They', 'He / She / It'],
        rows: [
          ['Positive', 'I work.', 'She works.'],
          ['Negative', 'I don\'t work.', 'She doesn\'t work.'],
          ['Question', 'Do you work?', 'Does she work?']
        ]
      },
      bn: 'He/She/It হলে positive বাক্যে verb-এর সাথে s/es যোগ হয়। কিন্তু doesn\'t বা Does থাকলে s চলে যায় does-এর কাছে — মূল verb থাকে base form-এ।'
    },
    {
      heading: 'Spelling of -s / -es',
      table: {
        head: ['Rule', 'Examples'],
        rows: [
          ['Most verbs: + s', 'work → works, play → plays'],
          ['-s, -sh, -ch, -x, -o: + es', 'watch → watches, go → goes, fix → fixes'],
          ['Consonant + y: y → ies', 'study → studies, cry → cries'],
          ['Irregular', 'have → has']
        ]
      }
    },
    {
      heading: 'Signal words and the three classic mistakes',
      en: 'Signal words: always, usually, often, sometimes, never, every day, on Fridays. Mistakes: "He go" (missing s), "Does he goes" (double s), "He don\'t" (wrong auxiliary).',
      bn: 'Does/doesn\'t থাকলে verb-এ আর s বসবে না। He/She/It-এর সাথে don\'t নয়, doesn\'t।'
    }
  ],
  examples: [
    { en: 'She goes to university every day.', bn: 'সে প্রতিদিন বিশ্ববিদ্যালয়ে যায়।', why: 'She is third-person singular, so go → goes (-es after o).' },
    { en: 'I drink tea in the morning.', bn: 'আমি সকালে চা পান করি।', why: 'With I, the verb stays in base form: drink. Note: we "drink" tea, not "eat" it.' },
    { en: 'Water boils at 100 degrees Celsius.', bn: 'পানি ১০০ ডিগ্রি সেলসিয়াসে ফোটে।', why: 'A general scientific fact. Water = it, so boil → boils.' },
    { en: 'My brother studies computer science.', bn: 'আমার ভাই কম্পিউটার বিজ্ঞান পড়ে।', why: 'Consonant + y: study → studies.' },
    { en: 'They don\'t eat meat.', bn: 'তারা মাংস খায় না।', why: 'Negative with they: don\'t + base verb.' },
    { en: 'He doesn\'t watch TV at night.', bn: 'সে রাতে টিভি দেখে না।', why: 'Doesn\'t already carries the -s, so the verb stays "watch", not "watches".' },
    { en: 'Does she speak French?', bn: 'সে কি ফরাসি বলতে পারে / বলে?', why: 'Question: Does + subject + base verb. Not "Does she speaks".' },
    { en: 'Do you live near here?', bn: 'তুমি কি এখানের কাছাকাছি থাকো?', why: 'With you, use Do for the question.' },
    { en: 'The train leaves at 7 p.m.', bn: 'ট্রেনটি সন্ধ্যা ৭টায় ছাড়ে।', why: 'Fixed timetables use Present Simple even for future times.' },
    { en: 'My father has two cars.', bn: 'আমার বাবার দুটি গাড়ি আছে।', why: 'have → has with he/she/it (my father = he).' }
  ],
  mcq: [
    { id: 'ps_mcq_01', concept: 'sva', prompt: 'He ___ to school every day.', options: ['goes', 'go', 'going', 'gone'], answer: 'goes', explanation: 'He = third-person singular, so the verb takes -es: goes.' },
    { id: 'ps_mcq_02', concept: 'sva', prompt: 'My parents ___ in Chattogram.', options: ['lives', 'live', 'living', 'is live'], answer: 'live', explanation: '"My parents" is plural (= they), so no -s: live.' },
    { id: 'ps_mcq_03', concept: 'do-does', prompt: '___ she like coffee?', options: ['Do', 'Does', 'Is', 'Has'], answer: 'Does', explanation: 'Questions with he/she/it use Does.' },
    { id: 'ps_mcq_04', concept: 'base-after-does', prompt: 'Does he ___ English?', options: ['speaks', 'speak', 'speaking', 'spoke'], answer: 'speak', explanation: 'After Does, use the base verb. The -s is already in "does".' },
    { id: 'ps_mcq_05', concept: 'negative', prompt: 'I ___ meat.', options: ['doesn\'t eat', 'don\'t eat', 'not eat', 'am not eat'], answer: 'don\'t eat', explanation: 'With I/you/we/they, the negative is don\'t + base verb.' },
    { id: 'ps_mcq_06', concept: 'base-after-does', prompt: 'She ___ TV in the evening.', options: ['don\'t watch', 'doesn\'t watches', 'doesn\'t watch', 'not watches'], answer: 'doesn\'t watch', explanation: 'She → doesn\'t, then base verb: doesn\'t watch.' },
    { id: 'ps_mcq_07', concept: 'spelling-s', prompt: 'The baby ___ at night.', options: ['crys', 'cries', 'cryes', 'cry'], answer: 'cries', explanation: 'Consonant + y → ies: cry → cries.' },
    { id: 'ps_mcq_08', concept: 'tense-use', prompt: 'Which sentence states a general fact?', options: ['The sun is rising now.', 'The sun rose at 6 today.', 'The sun rises in the east.', 'The sun will rise soon.'], answer: 'The sun rises in the east.', explanation: 'General facts that are always true use Present Simple.' },
    { id: 'ps_mcq_09', concept: 'have-has', prompt: 'Rina ___ a new laptop.', options: ['have', 'has', 'haves', 'is have'], answer: 'has', explanation: 'Rina = she, so have → has.' },
    { id: 'ps_mcq_10', concept: 'signal-words', prompt: 'I visit my grandparents ___.', options: ['right now', 'at the moment', 'every Friday', 'last week'], answer: 'every Friday', explanation: '"Every Friday" shows a routine → Present Simple. "Right now" needs Present Continuous; "last week" needs Past Simple.' }
  ],
  written: [
    {
      id: 'ps_wr_01', concept: 'sva', subtype: 'Fill in the blank (work)',
      prompt: 'She ___ in a bank.',
      accepted: ['works'],
      checks: [{ pattern: '^\\s*work\\s*$', what: 'The -s is missing.', why: 'She = third-person singular, so work → works.', concept: 'sva' }],
      explanation: 'She + works.'
    },
    {
      id: 'ps_wr_02', concept: 'spelling-s', subtype: 'Fill in the blank (watch)',
      prompt: 'My brother ___ football on Fridays.',
      accepted: ['watches'],
      checks: [
        { pattern: '^\\s*watchs\\s*$', what: 'Spelling: "watchs".', why: 'Verbs ending in -ch take -es: watches.', concept: 'spelling-s' },
        { pattern: '^\\s*watch\\s*$', what: 'The -es is missing.', why: 'My brother = he, so the verb needs -es: watches.', concept: 'sva' }
      ],
      explanation: 'watch ends in -ch → watches.'
    },
    {
      id: 'ps_wr_03', concept: 'sva', subtype: 'Correct the sentence',
      prompt: 'He go to the office by bus.',
      accepted: ['He goes to the office by bus.'],
      checks: [{ pattern: '\\bhe\\s+go\\b', what: '"He go" — the -es is still missing.', why: 'He → goes.', concept: 'sva' }],
      explanation: 'Third-person singular takes -s/-es: He goes.'
    },
    {
      id: 'ps_wr_04', concept: 'base-after-does', subtype: 'Correct the sentence',
      prompt: 'Does she likes tea?',
      accepted: ['Does she like tea?'],
      checks: [{ pattern: '\\bdoes\\s+\\w+\\s+likes', what: '"likes" after Does.', why: 'Does already carries the -s, so use the base verb: like.', concept: 'base-after-does' }],
      explanation: 'Does + subject + base verb.'
    },
    {
      id: 'ps_wr_05', concept: 'negative', subtype: 'Make it negative',
      prompt: 'They play cricket.',
      accepted: ['They don\'t play cricket.', 'They do not play cricket.'],
      checks: [
        { pattern: '\\bdoesn\'?t|does not', what: '"doesn\'t" is used with "they".', why: 'They → don\'t. Doesn\'t is only for he/she/it.', concept: 'do-does' },
        { pattern: 'don\'?t\\s+plays|do not\\s+plays', what: '"plays" after don\'t.', why: 'After don\'t, use the base verb: play.', concept: 'base-after-does' },
        { pattern: '^\\s*they\\s+(not|no)\\s+play', what: 'The helper verb "don\'t" is missing.', why: 'Present Simple negatives need do/does: They don\'t play.', concept: 'negative' }
      ],
      explanation: 'They + don\'t + play.'
    },
    {
      id: 'ps_wr_06', concept: 'question-form', subtype: 'Make it a question',
      prompt: 'He lives in Sylhet.',
      accepted: ['Does he live in Sylhet?'],
      checks: [
        { pattern: '^\\s*does\\s+he\\s+lives', what: '"lives" after Does.', why: 'Does + he + base verb: Does he live…?', concept: 'base-after-does' },
        { pattern: '^\\s*do\\s+he', what: '"Do" with "he".', why: 'He/she/it questions use Does.', concept: 'do-does' },
        { pattern: '^\\s*he\\s+lives\\s+in\\s+sylhet\\s*\\?', what: 'Statement word order with a question mark.', why: 'In written English, questions need Does + subject + verb.', concept: 'question-form' }
      ],
      explanation: 'Statement with -s → question with Does + base verb.'
    },
    {
      id: 'ps_wr_07', concept: 'sva', subtype: 'Bangla → English',
      prompt: 'আমার বোন প্রতিদিন সকালে হাঁটে।',
      accepted: ['My sister walks every morning.', 'Every morning my sister walks.', 'Every morning, my sister walks.', 'My sister goes for a walk every morning.', 'My sister takes a walk every morning.', 'My sister walks in the morning every day.', 'My sister walks every day in the morning.'],
      checks: [
        { pattern: 'my sister\\s+walk\\b', what: 'The -s is missing.', why: 'My sister = she, so walk → walks.', concept: 'sva' },
        { pattern: 'my sister\\s+(is\\s+)?(every day|every morning)', what: 'Time expression is between subject and verb.', why: 'Put "every morning" at the end or at the start.', concept: 'adverb-position' },
        { pattern: '\\bis walking\\b', what: 'Present Continuous used for a routine.', why: '"প্রতিদিন" shows a habit → Present Simple.', concept: 'tense-use' }
      ],
      explanation: 'Habit + she → My sister walks every morning.'
    },
    {
      id: 'ps_wr_08', concept: 'negative', subtype: 'Bangla → English',
      prompt: 'সে চা খায় না।',
      accepted: ['He doesn\'t drink tea.', 'She doesn\'t drink tea.', 'He does not drink tea.', 'She does not drink tea.'],
      checks: [
        { pattern: '\\beats?\\s+tea', what: '"eat tea" is not natural English.', why: 'Bangla "খাওয়া" covers eating and drinking. In English, we drink tea, water, coffee.', concept: 'collocation' },
        { pattern: '\\b(he|she)\\s+(don\'?t|do not)', what: '"don\'t" with he/she.', why: 'He/she → doesn\'t.', concept: 'do-does' },
        { pattern: '(doesn\'?t|does not)\\s+drinks', what: '"drinks" after doesn\'t.', why: 'After doesn\'t, use the base verb: drink.', concept: 'base-after-does' }
      ],
      explanation: 'He/She + doesn\'t + drink + tea.'
    },
    {
      id: 'ps_wr_09', concept: 'question-form', subtype: 'Bangla → English',
      prompt: 'তুমি কি গান শোনো?',
      accepted: ['Do you listen to music?', 'Do you listen to songs?'],
      checks: [
        { pattern: 'listen\\s+(music|songs)', what: '"to" is missing after listen.', why: 'The verb is "listen to": listen to music.', concept: 'preposition' },
        { pattern: '^\\s*does\\s+you', what: '"Does" with "you".', why: 'You → Do.', concept: 'do-does' },
        { pattern: '^\\s*are\\s+you\\s+listen', what: '"Are you listen" mixes two tenses.', why: 'For habits: Do you listen…?', concept: 'be-plus-verb' }
      ],
      explanation: 'Do + you + listen to + music?'
    },
    {
      id: 'ps_wr_10', concept: 'sva', subtype: 'Rearrange the words',
      prompt: 'rises / the / east / the / sun / in',
      accepted: ['The sun rises in the east.'],
      checks: [{ pattern: 'the sun rise\\b', what: '"rise" is missing -s.', why: 'The sun = it, so rise → rises.', concept: 'sva' }],
      explanation: 'General fact: The sun (it) + rises + in the east.'
    }
  ]
};
