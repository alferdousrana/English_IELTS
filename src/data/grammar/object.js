export default {
  id: 'object',
  title: 'Object',
  difficulty: 'beginner',
  explanation: [
    {
      heading: '1. What is an object?',
      en: 'The object is the person or thing that receives the action of the verb. To find it, ask the verb "What?" or "Whom?". The object comes after the verb: Subject + Verb + Object.',
      bn: 'Object (কর্ম) হলো যার ওপর verb-এর কাজটি হয়। খোঁজার উপায়: verb-কে "কী?" বা "কাকে?" দিয়ে প্রশ্ন করুন। English-এ object সবসময় verb-এর পরে বসে। "আমি আম খাই" → I eat mangoes (কী খাই? mangoes = object)।',
      points: ['She bought a dress. → bought what? a dress', 'I called my mother. → called whom? my mother', 'He loves football. → loves what? football']
    },
    {
      heading: '2. Verbs that need an object, and verbs that don\'t',
      en: 'Some verbs must have an object (transitive): buy, make, like, enjoy, tell, need, bring, describe. Others never take a direct object (intransitive): arrive, sleep, laugh, go, come, happen, die. Many can be both: She sings. / She sings a song.',
      bn: 'কিছু verb-এর পরে object লাগবেই (transitive): "I like" একা ভুল — বলতে হবে "I like it"। আবার কিছু verb-এর পরে object বসে না (intransitive): "He arrived the station" ভুল — "He arrived at the station"। কিছু verb দুইভাবেই চলে।',
      table: {
        head: ['Needs an object', 'No object', 'Both'],
        rows: [
          ['buy, make, like, enjoy', 'arrive, sleep, laugh', 'sing, read, eat'],
          ['tell, need, bring, describe', 'go, come, happen, die', 'write, drive, study'],
          ['✓ I enjoyed the film.', '✓ The train arrived.', '✓ She reads. / She reads novels.']
        ]
      }
    },
    {
      heading: '3. Object pronouns',
      en: 'When a pronoun is the object, use the object form: me, you, him, her, it, us, them. Use the same form after prepositions: with me, for him, between you and me.',
      bn: 'Object হিসেবে সর্বনামের রূপ বদলায়: I → me, he → him, she → her, we → us, they → them। Preposition-এর পরেও এই রূপ বসে: "with me", "for them"। "She helped I" বা "between you and I" — ভুল।',
      table: {
        head: ['Subject', 'Object', 'Example'],
        rows: [
          ['I', 'me', 'Please call me.'],
          ['he', 'him', 'I saw him yesterday.'],
          ['she', 'her', 'We invited her.'],
          ['it', 'it', 'I bought a phone and I love it.'],
          ['we', 'us', 'The teacher helped us.'],
          ['they', 'them', 'Tell them the news.']
        ]
      }
    },
    {
      heading: '4. Two objects: give someone something',
      en: 'Verbs like give, send, show, tell, lend, teach, buy and make can have two objects: an indirect object (the person) and a direct object (the thing). Pattern A: verb + person + thing (She gave me a pen). Pattern B: verb + thing + to/for + person (She gave a pen to me). Buy and make use "for": He bought a gift for his wife.',
      bn: 'Give, send, show, tell, buy ইত্যাদি verb-এ দুটি object থাকতে পারে: কাকে (person) আর কী (thing)। দুটি নিয়ম: (A) verb + person + thing → She gave me a pen। (B) verb + thing + to + person → She gave a pen to me। Buy/make-এর সাথে "for": He bought a gift for his wife। কখনো "gave to me a pen" নয়।'
    },
    {
      heading: '5. Where the object goes, and three Bangla traps',
      en: 'Keep the object right after the verb. Adverbs (very much, well, quickly) and time phrases come after the object.',
      points: ['✗ I like very much football. ✓ I like football very much.', '✗ Please explain me the rule. ✓ Please explain the rule to me. (explain + thing + to + person)', '✗ We discussed about the problem. ✓ We discussed the problem. (discuss takes a direct object)', '✗ I bought a shirt. I like. ✓ I like it. (Bangla drops the object; English cannot)'],
      tip: 'কিছু verb-এর সাথে "to" লাগে না (discuss, enter, marry, reach): We reached Dhaka (reached to নয়)। আবার explain, describe, say-এর পরে সরাসরি person বসে না: explain it to me, say it to him।'
    }
  ],
  examples: [
    { en: 'She bought a new dress.', bn: 'সে একটি নতুন জামা কিনল।', why: 'কী কিনল? "a new dress" — এটাই object। Object বসেছে verb "bought"-এর ঠিক পরে।' },
    { en: 'I called my mother.', bn: 'আমি আমার মাকে ফোন করলাম।', why: 'কাকে ফোন করলাম? "my mother" — object। বাংলার "মাকে" English-এ verb-এর পরে বসে।' },
    { en: 'The teacher helped us.', bn: 'শিক্ষক আমাদের সাহায্য করলেন।', why: 'Object pronoun "us"। "Helped we" ভুল, কারণ object-এ we-এর রূপ হয় us।' },
    { en: 'I saw him at the market.', bn: 'আমি তাকে বাজারে দেখলাম।', why: '"Him" হলো he-এর object রূপ। "At the market" জায়গা — object নয়, তাই শেষে।' },
    { en: 'The train arrived late.', bn: 'ট্রেনটি দেরিতে পৌঁছাল।', why: '"Arrive" intransitive — এর পরে object বসে না। "Late" কখন, এটি object নয়।' },
    { en: 'We reached Dhaka at night.', bn: 'আমরা রাতে ঢাকায় পৌঁছালাম।', why: '"Reach"-এর পরে সরাসরি object বসে: reached Dhaka। "Reached to Dhaka" ভুল।' },
    { en: 'He arrived at the station.', bn: 'সে স্টেশনে পৌঁছাল।', why: '"Arrive" object নেয় না, তাই জায়গার আগে preposition "at" লাগে।' },
    { en: 'Rina gave me a pen.', bn: 'রিনা আমাকে একটি কলম দিল।', why: 'দুটি object: আগে কাকে (me), পরে কী (a pen)। Pattern: verb + person + thing।' },
    { en: 'Rina gave a pen to me.', bn: 'রিনা আমাকে একটি কলম দিল।', why: 'একই অর্থ, অন্য নিয়মে: verb + thing + to + person। জিনিস আগে বসলে person-এর আগে "to" লাগে।' },
    { en: 'He bought a gift for his wife.', bn: 'সে তার স্ত্রীর জন্য একটি উপহার কিনল।', why: '"Buy"-এর সাথে person-এর আগে "for" বসে, "to" নয়।' },
    { en: 'I like football very much.', bn: 'আমি ফুটবল খুব পছন্দ করি।', why: 'Object "football" verb-এর ঠিক পরে। "Very much" বসেছে object-এর পরে, মাঝখানে নয়।' },
    { en: 'Please explain the rule to me.', bn: 'দয়া করে নিয়মটা আমাকে বুঝিয়ে দাও।', why: '"Explain"-এর পরে সরাসরি person বসে না। Explain + thing + to + person। "Explain me" ভুল।' },
    { en: 'We discussed the problem.', bn: 'আমরা সমস্যাটি নিয়ে আলোচনা করলাম।', why: '"Discuss"-এর পরে সরাসরি object বসে। "Discussed about" ভুল, যদিও বাংলায় "নিয়ে" বলি।' },
    { en: 'I bought a phone and I love it.', bn: 'আমি একটি ফোন কিনেছি এবং এটা আমার খুব পছন্দ।', why: '"Love" transitive, তাই object "it" লাগবেই। বাংলার মতো object বাদ দেওয়া যায় না।' },
    { en: 'Tell them the news.', bn: 'তাদের খবরটা বলো।', why: 'Object pronoun "them" (person) + "the news" (thing)। Tell-এর সাথে person সরাসরি বসতে পারে।' },
    { en: 'She is reading a novel.', bn: 'সে একটি উপন্যাস পড়ছে।', why: 'কী পড়ছে? "a novel" — object। Verb phrase "is reading"-এর পরে বসেছে।' },
    { en: 'The baby is sleeping.', bn: 'শিশুটি ঘুমাচ্ছে।', why: '"Sleep" intransitive — এর কোনো object নেই। বাক্য এখানেই সম্পূর্ণ।' },
    { en: 'My uncle teaches us English.', bn: 'আমার চাচা আমাদের ইংরেজি পড়ান।', why: 'দুটি object: কাকে (us) + কী (English)। "Teaches English to us"-ও সঠিক।' },
    { en: 'Can you lend me some money?', bn: 'তুমি কি আমাকে কিছু টাকা ধার দিতে পারবে?', why: '"Lend" দুটি object নেয়: me (person) + some money (thing)।' },
    { en: 'This is between you and me.', bn: 'এটা তোমার আর আমার মধ্যে।', why: 'Preposition "between"-এর পরে object pronoun বসে: me। "Between you and I" ভুল।' }
  ],
  mcq: [
    { id: 'ob_mcq_01', concept: 'object', prompt: 'What is the object? "My father repaired the old fan."', options: ['My father', 'repaired', 'the old fan', 'old'], answer: 'the old fan', explanation: 'Repaired what? The old fan. That is the object.' },
    { id: 'ob_mcq_02', concept: 'object-pronoun', prompt: 'The manager called ___ yesterday.', options: ['I', 'me', 'my', 'mine'], answer: 'me', explanation: 'After the verb we use the object pronoun: me.' },
    { id: 'ob_mcq_03', concept: 'object-pronoun', prompt: 'Please give this book to ___.', options: ['she', 'her', 'hers', 'herself'], answer: 'her', explanation: 'After a preposition (to), use the object pronoun: her.' },
    { id: 'ob_mcq_04', concept: 'transitive', prompt: 'Choose the correct sentence.', options: ['We arrived the airport at noon.', 'We arrived at the airport at noon.', 'We arrived to the airport at noon.', 'We arrived on the airport at noon.'], answer: 'We arrived at the airport at noon.', explanation: '"Arrive" has no direct object. Use "arrive at" a place (or "arrive in" a city/country).' },
    { id: 'ob_mcq_05', concept: 'transitive', prompt: 'Choose the correct sentence.', options: ['We reached to Sylhet in the evening.', 'We reached at Sylhet in the evening.', 'We reached Sylhet in the evening.', 'We reached in Sylhet in the evening.'], answer: 'We reached Sylhet in the evening.', explanation: '"Reach" takes a direct object with no preposition: reached Sylhet.' },
    { id: 'ob_mcq_06', concept: 'double-object', prompt: 'Choose the correct sentence.', options: ['She showed to me her photos.', 'She showed me her photos.', 'She showed her photos me.', 'She me showed her photos.'], answer: 'She showed me her photos.', explanation: 'Verb + person + thing (showed me her photos), or verb + thing + to + person (showed her photos to me).' },
    { id: 'ob_mcq_07', concept: 'double-object', prompt: 'He bought a watch ___ his father.', options: ['to', 'for', 'at', 'with'], answer: 'for', explanation: 'With buy and make, the person comes after "for": bought a watch for his father.' },
    { id: 'ob_mcq_08', concept: 'adverb-position', prompt: 'Choose the correct sentence.', options: ['I like very much mangoes.', 'I very much like mangoes very.', 'I like mangoes very much.', 'Very much I like mangoes.'], answer: 'I like mangoes very much.', explanation: 'Keep the object right after the verb; "very much" goes after the object.' },
    { id: 'ob_mcq_09', concept: 'transitive', prompt: 'Choose the correct sentence.', options: ['Please explain me this word.', 'Please explain this word to me.', 'Please explain to me this word me.', 'Please me explain this word.'], answer: 'Please explain this word to me.', explanation: '"Explain" cannot take the person directly. Explain + thing + to + person.' },
    { id: 'ob_mcq_10', concept: 'transitive', prompt: 'Choose the correct sentence.', options: ['We discussed about the plan.', 'We discussed on the plan.', 'We discussed the plan.', 'We discussed with the plan.'], answer: 'We discussed the plan.', explanation: '"Discuss" takes a direct object. No "about".' },
    { id: 'ob_mcq_11', concept: 'object', prompt: 'Which sentence has NO object?', options: ['She wrote a letter.', 'The guests laughed.', 'He fixed the door.', 'They sold their car.'], answer: 'The guests laughed.', explanation: '"Laugh" is intransitive — nothing receives the action.' },
    { id: 'ob_mcq_12', concept: 'object-pronoun', prompt: 'Our neighbours are kind. We often visit ___.', options: ['they', 'them', 'their', 'theirs'], answer: 'them', explanation: 'Object of "visit" → them.' },
    { id: 'ob_mcq_13', concept: 'object-pronoun', prompt: 'This secret is between you and ___.', options: ['I', 'me', 'myself', 'mine'], answer: 'me', explanation: 'After a preposition (between), use the object pronoun: me.' },
    { id: 'ob_mcq_14', concept: 'object', prompt: 'I bought a new bag yesterday, and I really like ___.', options: ['(nothing)', 'it', 'its', 'that one it'], answer: 'it', explanation: '"Like" needs an object. English cannot leave it out as Bangla does.' },
    { id: 'ob_mcq_15', concept: 'object', prompt: 'What is the object? "Every morning, my grandfather reads the newspaper in the garden."', options: ['Every morning', 'my grandfather', 'the newspaper', 'the garden'], answer: 'the newspaper', explanation: 'Reads what? The newspaper. "In the garden" is a place, not an object.' },
    { id: 'ob_mcq_16', concept: 'double-object', prompt: 'রহিম আমাকে একটি গল্প বলল। Choose the correct English.', options: ['Rahim told a story me.', 'Rahim told me a story.', 'Rahim told to me a story.', 'Rahim me told a story.'], answer: 'Rahim told me a story.', explanation: 'Tell + person + thing: told me a story.' },
    { id: 'ob_mcq_17', concept: 'transitive', prompt: 'Which verb needs an object?', options: ['sleep', 'arrive', 'enjoy', 'laugh'], answer: 'enjoy', explanation: '"Enjoy" needs an object: I enjoyed the party. You cannot say just "I enjoyed."' },
    { id: 'ob_mcq_18', concept: 'object-pronoun', prompt: 'Do you know Mr Karim? Yes, I met ___ last week.', options: ['he', 'him', 'his', 'himself'], answer: 'him', explanation: 'Object of "met" → him.' },
    { id: 'ob_mcq_19', concept: 'transitive', prompt: 'He married ___ a doctor.', options: ['with', 'to', '(no word needed)', 'by'], answer: '(no word needed)', explanation: '"Marry" takes a direct object: He married a doctor. (But "He is married to a doctor.")' },
    { id: 'ob_mcq_20', concept: 'double-object', prompt: 'Choose the correct sentence.', options: ['Can you send to me the file?', 'Can you send me the file?', 'Can you send the file me?', 'Can you me send the file?'], answer: 'Can you send me the file?', explanation: 'send + person + thing, or send + thing + to + person.' }
  ],
  written: [
    {
      id: 'ob_wr_01', concept: 'object-pronoun', subtype: 'Correct the sentence',
      prompt: 'The teacher helped we with the project.',
      accepted: ['The teacher helped us with the project.'],
      checks: [{ pattern: 'helped\\s+we', what: 'A subject pronoun is used as the object.', why: 'Object of "helped" → us.', concept: 'object-pronoun' }],
      explanation: 'we → us after a verb.'
    },
    {
      id: 'ob_wr_02', concept: 'transitive', subtype: 'Correct the sentence',
      prompt: 'We discussed about the exam.',
      accepted: ['We discussed the exam.', 'We talked about the exam.'],
      checks: [{ pattern: 'discussed\\s+about', what: '"about" after "discussed".', why: '"Discuss" takes a direct object: discussed the exam. (Or: talked about the exam.)', concept: 'transitive' }],
      explanation: 'discuss + object (no preposition).'
    },
    {
      id: 'ob_wr_03', concept: 'transitive', subtype: 'Correct the sentence',
      prompt: 'Please explain me the answer.',
      accepted: ['Please explain the answer to me.', 'Please explain to me the answer.'],
      checks: [{ pattern: 'explain\\s+me\\b', what: 'The person comes straight after "explain".', why: 'explain + thing + to + person: explain the answer to me.', concept: 'transitive' }],
      better: 'Please explain the answer to me.',
      explanation: 'explain something to someone.'
    },
    {
      id: 'ob_wr_04', concept: 'adverb-position', subtype: 'Correct the sentence',
      prompt: 'I like very much this song.',
      accepted: ['I like this song very much.', 'I really like this song.'],
      checks: [{ pattern: 'like\\s+very\\s+much\\s+this', what: '"very much" is between the verb and its object.', why: 'Verb + object first: like this song very much.', concept: 'adverb-position' }],
      explanation: 'Keep the object next to the verb.'
    },
    {
      id: 'ob_wr_05', concept: 'transitive', subtype: 'Correct the sentence',
      prompt: 'They reached to the hotel at midnight.',
      accepted: ['They reached the hotel at midnight.', 'They arrived at the hotel at midnight.', 'They got to the hotel at midnight.'],
      checks: [{ pattern: 'reached\\s+to', what: '"to" after "reached".', why: '"Reach" takes a direct object: reached the hotel.', concept: 'transitive' }],
      explanation: 'reach + place (no "to"), or arrive at + place.'
    },
    {
      id: 'ob_wr_06', concept: 'object-pronoun', subtype: 'Fill in the blank (they)',
      prompt: 'I don\'t know those people. Have you met ___?',
      accepted: ['them'],
      checks: [{ pattern: '^\\s*(they|their)\\s*$', what: 'Wrong pronoun form.', why: 'Object of "met" → them.', concept: 'object-pronoun' }],
      explanation: 'they → them as an object.'
    },
    {
      id: 'ob_wr_07', concept: 'object-pronoun', subtype: 'Fill in the blank (he)',
      prompt: 'My brother is sick, so I am taking care of ___.',
      accepted: ['him'],
      checks: [{ pattern: '^\\s*(he|his)\\s*$', what: 'Wrong pronoun form.', why: 'After the preposition "of", use the object form: him.', concept: 'object-pronoun' }],
      explanation: 'he → him after a preposition.'
    },
    {
      id: 'ob_wr_08', concept: 'double-object', subtype: 'Rewrite with "to"',
      prompt: 'She sent her friend a birthday card. → She sent a birthday card ___',
      accepted: ['She sent a birthday card to her friend.', 'to her friend'],
      checks: [{ pattern: 'for her friend', what: 'Wrong preposition.', why: '"Send" uses "to" before the person.', concept: 'double-object' }],
      explanation: 'verb + thing + to + person.'
    },
    {
      id: 'ob_wr_09', concept: 'double-object', subtype: 'Bangla → English',
      prompt: 'বাবা আমাকে একটি সাইকেল কিনে দিয়েছেন।',
      accepted: ['My father bought me a bicycle.', 'My father bought a bicycle for me.', 'Father bought me a bicycle.', 'My father bought me a bike.', 'My father bought a bike for me.', 'My father has bought me a bicycle.', 'Dad bought me a bicycle.', 'My dad bought me a bicycle.', 'My dad bought me a bike.'],
      checks: [
        { pattern: 'bought\\s+to\\s+me', what: '"to" before the person.', why: 'Use "bought me a bicycle" or "bought a bicycle for me".', concept: 'double-object' },
        { pattern: 'a (bicycle|bike) to me', what: '"to" with "buy".', why: 'Buy uses "for": bought a bicycle for me.', concept: 'double-object' }
      ],
      explanation: 'buy + person + thing, or buy + thing + for + person.'
    },
    {
      id: 'ob_wr_10', concept: 'object', subtype: 'Bangla → English',
      prompt: 'আমি একটি নতুন জুতা কিনেছি, কিন্তু আমি এটা পছন্দ করি না।',
      accepted: ['I bought new shoes, but I don\'t like them.', 'I bought a new pair of shoes, but I don\'t like them.', 'I have bought new shoes, but I don\'t like them.', 'I bought a new pair of shoes, but I don\'t like it.'],
      checks: [
        { pattern: 'don\'t like\\.?$|do not like\\.?$', what: 'The object is missing after "like".', why: '"Like" needs an object: I don\'t like them.', concept: 'object' },
        { pattern: 'a new shoes', what: '"a" with a plural noun.', why: 'Shoes come in pairs: new shoes, or a new pair of shoes.', concept: 'missing-article' }
      ],
      explanation: 'English needs the object: like them (shoes = plural).'
    },
    {
      id: 'ob_wr_11', concept: 'transitive', subtype: 'Correct the sentence',
      prompt: 'The bus arrived the stop on time.',
      accepted: ['The bus arrived at the stop on time.', 'The bus reached the stop on time.'],
      checks: [{ pattern: 'arrived\\s+the', what: '"arrived" with a direct object.', why: '"Arrive" needs "at": arrived at the stop.', concept: 'transitive' }],
      explanation: 'arrive at + place.'
    },
    {
      id: 'ob_wr_12', concept: 'object', subtype: 'Write the object only',
      prompt: '"My sister is writing a long email to her teacher." → Direct object = ?',
      accepted: ['a long email'],
      checks: [{ pattern: '^\\s*(email|her teacher|to her teacher)\\s*$', what: 'Not the direct object.', why: 'Writing what? A long email. "Her teacher" is the person it goes to.', concept: 'object' }],
      explanation: 'The direct object is the thing: a long email.'
    },
    {
      id: 'ob_wr_13', concept: 'double-object', subtype: 'Rearrange the words',
      prompt: 'me / showed / the way / a stranger',
      accepted: ['A stranger showed me the way.'],
      explanation: 'Subject + verb + person + thing.'
    },
    {
      id: 'ob_wr_14', concept: 'object-pronoun', subtype: 'Correct the sentence',
      prompt: 'Can you come with I to the bank?',
      accepted: ['Can you come with me to the bank?', 'Can you come to the bank with me?'],
      checks: [{ pattern: 'with\\s+i\\b', what: 'A subject pronoun after a preposition.', why: 'After "with" use "me".', concept: 'object-pronoun' }],
      explanation: 'with + object pronoun (me).'
    },
    {
      id: 'ob_wr_15', concept: 'object', subtype: 'Bangla → English',
      prompt: 'সে প্রতিদিন খবরের কাগজ পড়ে।',
      accepted: ['He reads the newspaper every day.', 'She reads the newspaper every day.', 'He reads newspapers every day.', 'She reads newspapers every day.', 'He reads a newspaper every day.', 'She reads a newspaper every day.'],
      checks: [
        { pattern: '(he|she)\\s+(the\\s+)?newspapers?\\s+reads', what: 'Bangla word order: the verb is at the end.', why: 'Subject + verb + object: He reads the newspaper.', concept: 'word-order' },
        { pattern: '(he|she)\\s+read\\s', what: 'The -s is missing.', why: 'He/She → reads.', concept: 'sva' },
        { pattern: '(he|she)\\s+every day', what: '"every day" is between the subject and the verb.', why: 'Put time phrases at the end.', concept: 'adverb-position' }
      ],
      explanation: 'S + V + O + time.'
    },
    {
      id: 'ob_wr_16', concept: 'transitive', subtype: 'Correct the sentence',
      prompt: 'She married with a businessman last year.',
      accepted: ['She married a businessman last year.', 'She got married to a businessman last year.'],
      checks: [{ pattern: 'married\\s+with', what: '"with" after "married".', why: '"Marry" takes a direct object: She married a businessman.', concept: 'transitive' }],
      explanation: 'marry + person (no preposition). Or: get married to + person.'
    },
    {
      id: 'ob_wr_17', concept: 'double-object', subtype: 'Bangla → English',
      prompt: 'শিক্ষক আমাদের একটি কঠিন প্রশ্ন জিজ্ঞেস করলেন।',
      accepted: ['The teacher asked us a difficult question.', 'The teacher asked us a hard question.', 'Our teacher asked us a difficult question.', 'Our teacher asked us a hard question.'],
      checks: [
        { pattern: 'asked\\s+to\\s+us', what: '"to" after "asked".', why: 'ask + person + thing: asked us a question.', concept: 'double-object' },
        { pattern: 'asked\\s+we', what: 'Subject pronoun as object.', why: 'Object of "asked" → us.', concept: 'object-pronoun' }
      ],
      explanation: 'ask + person + question.'
    },
    {
      id: 'ob_wr_18', concept: 'object-pronoun', subtype: 'Rewrite with a pronoun',
      prompt: 'Replace the object with a pronoun: "I met Nadia at the library."',
      accepted: ['I met her at the library.'],
      checks: [{ pattern: 'met\\s+(she|hers)', what: 'Wrong pronoun form.', why: 'Object form of she → her.', concept: 'object-pronoun' }],
      explanation: 'Nadia = she → her (object).'
    },
    {
      id: 'ob_wr_19', concept: 'transitive', subtype: 'Correct the sentence',
      prompt: 'I enjoyed very much.',
      accepted: ['I enjoyed it very much.', 'I enjoyed myself very much.', 'I enjoyed the party very much.'],
      checks: [{ pattern: '^\\s*i enjoyed very much', what: 'The object is missing.', why: '"Enjoy" needs an object: I enjoyed it / I enjoyed myself.', concept: 'transitive' }],
      better: 'I enjoyed it very much.',
      explanation: 'enjoy + object.'
    },
    {
      id: 'ob_wr_20', concept: 'double-object', subtype: 'Bangla → English',
      prompt: 'আমাকে তোমার ফোন নম্বরটা দাও।',
      accepted: ['Give me your phone number.', 'Please give me your phone number.', 'Give me your number.', 'Please give me your number.', 'Give your phone number to me.'],
      checks: [
        { pattern: 'give\\s+to\\s+me', what: '"to" before the person.', why: 'Give + person + thing: Give me your number.', concept: 'double-object' },
        { pattern: '^\\s*me\\s+give', what: 'Bangla word order.', why: 'Commands start with the verb: Give me…', concept: 'word-order' }
      ],
      explanation: 'Command: Give + me + your phone number.'
    }
  ]
};
