export default {
  id: 'subject-complement',
  title: 'Subject complement',
  difficulty: 'beginner',
  explanation: [
    {
      heading: '1. What is a subject complement?',
      en: 'A subject complement comes after a linking verb and tells us what the subject IS or what it is LIKE. It does not receive an action; it describes or renames the subject. A useful test: you can put "=" between the subject and the complement.',
      bn: 'Subject complement (কর্তার পরিপূরক) বসে linking verb-এর পরে, আর বলে subject কী বা কেমন। এর ওপর কোনো কাজ হয় না — এটি subject-কে বর্ণনা করে। সহজ পরীক্ষা: subject আর complement-এর মাঝে "=" বসানো যায় কিনা দেখুন। "She is a doctor" → She = a doctor।',
      points: ['My father is a farmer. → my father = a farmer', 'The room is dark. → the room = dark', 'They became friends. → they = friends']
    },
    {
      heading: '2. Two kinds: noun or adjective',
      table: {
        head: ['Kind', 'Example', 'বাংলা'],
        rows: [
          ['Noun / noun phrase (renames)', 'She is a nurse.', 'সে একজন নার্স।'],
          ['Noun / noun phrase', 'Dhaka is the capital of Bangladesh.', 'ঢাকা বাংলাদেশের রাজধানী।'],
          ['Adjective (describes)', 'The tea is hot.', 'চা-টা গরম।'],
          ['Adjective', 'You look tired.', 'তোমাকে ক্লান্ত দেখাচ্ছে।']
        ]
      },
      bn: 'Noun complement subject-কে নতুন নাম দেয় (a nurse, the capital)। Adjective complement subject-এর গুণ বা অবস্থা বলে (hot, tired)। একবচন countable noun complement-এর আগে a/an লাগবেই: "She is a nurse" — "She is nurse" ভুল।'
    },
    {
      heading: '3. Linking verbs',
      en: 'The most common linking verb is "be" (am, is, are, was, were). Others: become, get, grow, turn (change); seem, appear (impression); look, feel, sound, smell, taste (the senses); remain, stay (no change).',
      table: {
        head: ['Group', 'Verbs', 'Example'],
        rows: [
          ['Be', 'am, is, are, was, were', 'I am ready.'],
          ['Change', 'become, get, grow, turn', 'It is getting dark.'],
          ['Impression', 'seem, appear', 'He seems angry.'],
          ['Senses', 'look, feel, sound, smell, taste', 'The cake smells good.'],
          ['No change', 'remain, stay', 'Please stay calm.']
        ]
      },
      bn: 'বাংলায় "দেখাচ্ছে", "মনে হচ্ছে", "লাগছে", "হয়ে গেল" — এগুলোর English রূপ linking verb: look, seem, feel, become। Linking verb-এর পরে adjective বসে, adverb (-ly) নয়।'
    },
    {
      heading: '4. Complement or object?',
      en: 'After an action verb, the noun is an object (a different thing that receives the action). After a linking verb, the noun is a complement (the same thing as the subject).',
      points: ['He became a teacher. → he = a teacher → complement', 'He met a teacher. → he ≠ a teacher → object', 'She looks happy. (linking: her appearance) vs She looked at the photo. (action)', 'The soup tastes salty. (complement) vs I tasted the soup. (object)'],
      bn: 'একই verb কখনো linking, কখনো action হয়। "I tasted the soup" — আমি কাজটা করলাম, soup হলো object। "The soup tastes salty" — soup-এর বর্ণনা, salty হলো complement।'
    },
    {
      heading: '5. Classic complement mistakes',
      points: ['✗ She doctor. ✓ She is a doctor. (missing "be")', '✗ He is engineer. ✓ He is an engineer. (missing article)', '✗ They are teacher. ✓ They are teachers. (plural subject → plural noun)', '✗ You look nicely. ✓ You look nice. (adjective, not adverb)', '✗ I feel badly. ✓ I feel bad.', '✗ The food smells deliciously. ✓ The food smells delicious.'],
      tip: 'বিশেষ নিয়ম: "I feel well" সঠিক, কারণ এখানে well একটি adjective — অর্থ "সুস্থ"। "I feel good" মানে মন ভালো লাগছে।'
    }
  ],
  examples: [
    { en: 'My father is a farmer.', bn: 'আমার বাবা একজন কৃষক।', why: '"A farmer" হলো noun complement — my father = a farmer। বাংলায় "হন" না বললেও English-এ "is" লাগে।' },
    { en: 'The room is dark.', bn: 'ঘরটা অন্ধকার।', why: '"Dark" adjective complement — ঘরের অবস্থা বোঝাচ্ছে। Linking verb "is"।' },
    { en: 'They became friends.', bn: 'তারা বন্ধু হয়ে গেল।', why: '"Became" linking verb (পরিবর্তন বোঝায়)। "They" plural, তাই complement-ও plural: friends।' },
    { en: 'She is a nurse.', bn: 'সে একজন নার্স।', why: 'একবচন পেশার আগে "a" লাগবে। "She is nurse" লেখা ভুল।' },
    { en: 'Dhaka is the capital of Bangladesh.', bn: 'ঢাকা বাংলাদেশের রাজধানী।', why: 'Complement একটি noun phrase: "the capital of Bangladesh"। একটাই রাজধানী, তাই "the"।' },
    { en: 'You look tired.', bn: 'তোমাকে ক্লান্ত দেখাচ্ছে।', why: '"Look" এখানে linking verb (চেহারা বোঝায়), তাই adjective "tired"। বাংলার "দেখাচ্ছে" = look।' },
    { en: 'It is getting dark.', bn: 'অন্ধকার হয়ে আসছে।', why: '"Get" পরিবর্তন বোঝানো linking verb। Subject "It", complement adjective "dark"।' },
    { en: 'He seems angry.', bn: 'তাকে রাগান্বিত মনে হচ্ছে।', why: '"Seems" linking verb — বাংলার "মনে হচ্ছে"। এর পরে adjective "angry", "angrily" নয়।' },
    { en: 'The cake smells good.', bn: 'কেকটা থেকে ভালো গন্ধ আসছে।', why: '"Smells" এখানে linking verb, তাই adjective "good"। "Smells well" ভুল।' },
    { en: 'Please stay calm.', bn: 'দয়া করে শান্ত থাকুন।', why: '"Stay" linking verb (অবস্থা বদলায় না)। Complement adjective "calm"।' },
    { en: 'My brothers are engineers.', bn: 'আমার ভাইয়েরা প্রকৌশলী।', why: 'Plural subject "My brothers", তাই complement-ও plural: engineers। Plural noun-এর আগে "an" বসে না।' },
    { en: 'He is an honest man.', bn: 'সে একজন সৎ মানুষ।', why: 'Complement "an honest man"। "Honest"-এর h উচ্চারিত হয় না, তাই "an"।' },
    { en: 'The soup tastes salty.', bn: 'স্যুপটা নোনতা লাগছে।', why: '"Tastes" linking verb, "salty" complement। Soup-এর ওপর কোনো কাজ হচ্ছে না, এটি বর্ণনা।' },
    { en: 'I tasted the soup.', bn: 'আমি স্যুপটা চেখে দেখলাম।', why: 'এখানে "tasted" action verb — আমি কাজটা করলাম। তাই "the soup" এখানে object, complement নয়।' },
    { en: 'She became a famous singer.', bn: 'সে একজন বিখ্যাত গায়িকা হয়ে উঠল।', why: '"Became" + noun phrase। She = a famous singer, তাই এটি complement।' },
    { en: 'The children were happy.', bn: 'বাচ্চারা খুশি ছিল।', why: 'Past tense-এ be verb "were" (plural subject)। Complement adjective "happy"।' },
    { en: 'This song sounds familiar.', bn: 'এই গানটা পরিচিত মনে হচ্ছে।', why: '"Sounds" linking verb — বাংলার "শুনে মনে হচ্ছে"। Complement "familiar"।' },
    { en: 'I feel well today.', bn: 'আজ আমি সুস্থ বোধ করছি।', why: 'বিশেষ ক্ষেত্র: "well" এখানে adjective, অর্থ সুস্থ। তাই "feel well" সঠিক।' },
    { en: 'The leaves turn yellow in autumn.', bn: 'শরতে পাতাগুলো হলুদ হয়ে যায়।', why: '"Turn" পরিবর্তন বোঝানো linking verb (রং বদলানো)। Complement "yellow"।' },
    { en: 'My dream is to become a pilot.', bn: 'আমার স্বপ্ন পাইলট হওয়া।', why: 'Complement এখানে "to become a pilot" — একটি to-phrase। My dream = to become a pilot।' }
  ],
  mcq: [
    { id: 'sc_mcq_01', concept: 'complement', prompt: 'What is the subject complement? "My uncle is a police officer."', options: ['My uncle', 'is', 'a police officer', 'police'], answer: 'a police officer', explanation: 'My uncle = a police officer. It comes after the linking verb "is".' },
    { id: 'sc_mcq_02', concept: 'missing-article', prompt: 'Choose the correct sentence.', options: ['She is teacher.', 'She is a teacher.', 'She a teacher.', 'She is an teacher.'], answer: 'She is a teacher.', explanation: 'A singular job needs "a/an": a teacher. "Teacher" starts with a consonant sound → a.' },
    { id: 'sc_mcq_03', concept: 'missing-article', prompt: 'My cousin is ___ engineer.', options: ['a', 'an', 'the', '(no word)'], answer: 'an', explanation: '"Engineer" starts with a vowel sound → an engineer.' },
    { id: 'sc_mcq_04', concept: 'sva', prompt: 'Rina and Mitu are ___.', options: ['doctor', 'a doctor', 'doctors', 'a doctors'], answer: 'doctors', explanation: 'Two people → plural complement: doctors (no "a").' },
    { id: 'sc_mcq_05', concept: 'linking-verb', prompt: 'The flowers smell ___.', options: ['sweetly', 'sweet', 'sweetness', 'more sweetly'], answer: 'sweet', explanation: 'Linking verb (smell) + adjective: smell sweet.' },
    { id: 'sc_mcq_06', concept: 'linking-verb', prompt: 'He seems ___ about the result.', options: ['worriedly', 'worried', 'worry', 'worrying about'], answer: 'worried', explanation: '"Seem" is a linking verb → adjective: seems worried.' },
    { id: 'sc_mcq_07', concept: 'complement', prompt: 'Which sentence has a subject complement?', options: ['She met a lawyer.', 'She became a lawyer.', 'She called a lawyer.', 'She paid a lawyer.'], answer: 'She became a lawyer.', explanation: 'She = a lawyer only in "became". In the others, the lawyer is a different person (an object).' },
    { id: 'sc_mcq_08', concept: 'complement', prompt: 'In "I tasted the curry", "the curry" is:', options: ['a subject complement', 'an object', 'the subject', 'a verb'], answer: 'an object', explanation: '"Tasted" here is an action (I did it), so the curry receives the action → object.' },
    { id: 'sc_mcq_09', concept: 'complement', prompt: 'In "The curry tastes spicy", "spicy" is:', options: ['an object', 'a subject complement', 'an adverb', 'the subject'], answer: 'a subject complement', explanation: '"Tastes" is a linking verb here; "spicy" describes the curry.' },
    { id: 'sc_mcq_10', concept: 'missing-be', prompt: 'আমার মা একজন শিক্ষিকা। Choose the correct English.', options: ['My mother a teacher.', 'My mother is a teacher.', 'My mother is teacher.', 'My mother teacher is.'], answer: 'My mother is a teacher.', explanation: 'Subject + is + a + noun.' },
    { id: 'sc_mcq_11', concept: 'linking-verb', prompt: 'Which verb is NOT a linking verb here?', options: ['She looks beautiful.', 'It became cold.', 'He kicked the ball.', 'You seem busy.'], answer: 'He kicked the ball.', explanation: '"Kicked" is an action with an object. The others connect the subject to a description.' },
    { id: 'sc_mcq_12', concept: 'linking-verb', prompt: 'I don\'t feel ___. I think I have a fever.', options: ['good health', 'well', 'nicely', 'healthily'], answer: 'well', explanation: '"Feel well" = feel healthy. Here "well" is an adjective.' },
    { id: 'sc_mcq_13', concept: 'linking-verb', prompt: 'The weather is getting ___.', options: ['coldly', 'cold', 'colder than', 'coldness'], answer: 'cold', explanation: '"Get" (change) is a linking verb → adjective: getting cold.' },
    { id: 'sc_mcq_14', concept: 'linking-verb', prompt: 'Your idea sounds ___.', options: ['greatly', 'great', 'greatness', 'to great'], answer: 'great', explanation: 'Sound + adjective: sounds great.' },
    { id: 'sc_mcq_15', concept: 'missing-article', prompt: 'Choose the correct sentence.', options: ['He is an university student.', 'He is a university student.', 'He is university student.', 'He a university student.'], answer: 'He is a university student.', explanation: '"University" starts with a /j/ ("you") sound → a university student.' },
    { id: 'sc_mcq_16', concept: 'complement', prompt: 'What is the complement? "The best time to visit Sylhet is winter."', options: ['The best time', 'to visit Sylhet', 'is', 'winter'], answer: 'winter', explanation: 'The best time to visit Sylhet = winter. The long part before "is" is the subject.' },
    { id: 'sc_mcq_17', concept: 'linking-verb', prompt: 'Please keep ___ during the exam.', options: ['quietly', 'quiet', 'quietness', 'quieter than'], answer: 'quiet', explanation: '"Keep" works as a linking verb here (stay) → adjective: keep quiet.' },
    { id: 'sc_mcq_18', concept: 'sva', prompt: 'My sisters ___ students at Dhaka University.', options: ['is', 'are', 'am', 'be'], answer: 'are', explanation: 'Plural subject → are.' },
    { id: 'sc_mcq_19', concept: 'linking-verb', prompt: 'তাকে খুব খুশি মনে হচ্ছিল। Choose the correct English.', options: ['She seemed very happily.', 'She seemed very happy.', 'She was seeming very happy.', 'She seemed very happiness.'], answer: 'She seemed very happy.', explanation: 'Seem + adjective. "Seem" is normally not used in the -ing form.' },
    { id: 'sc_mcq_20', concept: 'complement', prompt: 'Choose the sentence where the noun is a complement.', options: ['Tanvir visited a doctor.', 'Tanvir is a doctor.', 'Tanvir needs a doctor.', 'Tanvir called a doctor.'], answer: 'Tanvir is a doctor.', explanation: 'Only with "is" does Tanvir = a doctor.' }
  ],
  written: [
    {
      id: 'sc_wr_01', concept: 'missing-be', subtype: 'Bangla → English',
      prompt: 'আমার ভাই একজন ডাক্তার।',
      accepted: ['My brother is a doctor.'],
      checks: [
        { pattern: 'brother\\s+(a\\s+)?doctor', what: 'The verb "is" is missing.', why: 'My brother + is + a doctor.', concept: 'missing-be' },
        { pattern: 'is\\s+doctor', what: 'The article "a" is missing.', why: 'A singular job needs "a": a doctor.', concept: 'missing-article' }
      ],
      explanation: 'Subject + is + a + noun.'
    },
    {
      id: 'sc_wr_02', concept: 'missing-article', subtype: 'Correct the sentence',
      prompt: 'She is honest girl.',
      accepted: ['She is an honest girl.'],
      checks: [
        { pattern: 'is\\s+honest\\s+girl', what: 'The article is missing.', why: 'Singular noun → an honest girl (silent h → an).', concept: 'missing-article' },
        { pattern: '\\ba honest', what: '"a" before a vowel sound.', why: 'The h in "honest" is silent, so use "an".', concept: 'missing-article' }
      ],
      explanation: 'an + honest girl.'
    },
    {
      id: 'sc_wr_03', concept: 'sva', subtype: 'Correct the sentence',
      prompt: 'Rahim and Karim are farmer.',
      accepted: ['Rahim and Karim are farmers.'],
      checks: [{ pattern: 'are\\s+(a\\s+)?farmer\\.?$', what: 'The complement is singular.', why: 'Two people → farmers.', concept: 'sva' }],
      explanation: 'Plural subject → plural complement.'
    },
    {
      id: 'sc_wr_04', concept: 'linking-verb', subtype: 'Correct the sentence',
      prompt: 'You look very nicely in that dress.',
      accepted: ['You look very nice in that dress.', 'You look very beautiful in that dress.', 'You look very good in that dress.', 'You look very pretty in that dress.'],
      checks: [{ pattern: 'look\\s+very\\s+nicely', what: 'An adverb after a linking verb.', why: 'Look (appearance) + adjective: look very nice.', concept: 'linking-verb' }],
      explanation: 'Linking verb + adjective.'
    },
    {
      id: 'sc_wr_05', concept: 'linking-verb', subtype: 'Correct the sentence',
      prompt: 'I feel badly about the mistake.',
      accepted: ['I feel bad about the mistake.', 'I feel sorry about the mistake.'],
      checks: [{ pattern: 'feel\\s+badly', what: 'An adverb after "feel".', why: 'Feel + adjective: I feel bad.', concept: 'linking-verb' }],
      explanation: 'feel + adjective.'
    },
    {
      id: 'sc_wr_06', concept: 'linking-verb', subtype: 'Bangla → English',
      prompt: 'খাবারটা থেকে দারুণ গন্ধ আসছে।',
      accepted: ['The food smells delicious.', 'The food smells great.', 'The food smells wonderful.', 'The food smells amazing.', 'The food smells very good.', 'The food smells good.'],
      checks: [
        { pattern: 'smells\\s+(deliciously|well|greatly|wonderfully)', what: 'An adverb after a linking verb.', why: 'Smell + adjective: smells delicious.', concept: 'linking-verb' },
        { pattern: 'coming.*smell', what: 'Word-for-word translation.', why: 'Natural English: The food smells delicious.', concept: 'collocation' }
      ],
      explanation: 'Subject + smells + adjective.'
    },
    {
      id: 'sc_wr_07', concept: 'missing-article', subtype: 'Fill in the blank (a / an)',
      prompt: 'My father is ___ architect.',
      accepted: ['an'],
      checks: [{ pattern: '^\\s*a\\s*$', what: '"a" before a vowel sound.', why: '"Architect" starts with a vowel sound → an.', concept: 'missing-article' }],
      explanation: 'an + vowel sound.'
    },
    {
      id: 'sc_wr_08', concept: 'complement', subtype: 'Write the complement only',
      prompt: '"The new library looks modern." → Complement = ?',
      accepted: ['modern'],
      checks: [{ pattern: '^\\s*(looks|the new library|library)\\s*$', what: 'This is not the complement.', why: 'What is the library like? Modern.', concept: 'complement' }],
      explanation: 'The adjective after the linking verb.'
    },
    {
      id: 'sc_wr_09', concept: 'linking-verb', subtype: 'Bangla → English',
      prompt: 'অন্ধকার হয়ে আসছে।',
      accepted: ['It is getting dark.', 'It\'s getting dark.'],
      checks: [
        { pattern: '^\\s*(is\\s+)?getting dark', what: 'The subject is missing.', why: 'Use "It" as the subject: It is getting dark.', concept: 'dummy-subject' },
        { pattern: 'darkness is coming', what: 'Word-for-word translation.', why: 'Natural English: It is getting dark.', concept: 'collocation' }
      ],
      explanation: 'It + is getting + adjective.'
    },
    {
      id: 'sc_wr_10', concept: 'linking-verb', subtype: 'Fill in the blank (happy / happily)',
      prompt: 'The children seem ___ in their new school.',
      accepted: ['happy'],
      checks: [{ pattern: '^\\s*happily\\s*$', what: 'An adverb after a linking verb.', why: 'Seem + adjective: seem happy.', concept: 'linking-verb' }],
      explanation: 'seem + adjective.'
    },
    {
      id: 'sc_wr_11', concept: 'missing-be', subtype: 'Correct the sentence',
      prompt: 'The exam very easy.',
      accepted: ['The exam was very easy.', 'The exam is very easy.'],
      checks: [{ pattern: 'exam\\s+very', what: 'The verb is missing.', why: 'Add a be verb: The exam was very easy.', concept: 'missing-be' }],
      explanation: 'Subject + be + adjective.'
    },
    {
      id: 'sc_wr_12', concept: 'complement', subtype: 'Rearrange the words',
      prompt: 'became / a / she / famous / writer',
      accepted: ['She became a famous writer.'],
      explanation: 'Subject + linking verb + complement.'
    },
    {
      id: 'sc_wr_13', concept: 'linking-verb', subtype: 'Bangla → English',
      prompt: 'তোমার পরিকল্পনাটা ভালো শোনাচ্ছে।',
      accepted: ['Your plan sounds good.', 'Your plan sounds great.', 'Your plan sounds nice.'],
      checks: [{ pattern: 'sounds\\s+(well|nicely|greatly)', what: 'An adverb after a linking verb.', why: 'Sound + adjective: sounds good.', concept: 'linking-verb' }],
      explanation: 'sound + adjective.'
    },
    {
      id: 'sc_wr_14', concept: 'sva', subtype: 'Bangla → English',
      prompt: 'আমার বোনেরা শিক্ষার্থী।',
      accepted: ['My sisters are students.'],
      checks: [
        { pattern: 'sisters\\s+is', what: '"is" with a plural subject.', why: 'My sisters → are.', concept: 'sva' },
        { pattern: 'are\\s+(a\\s+)?student\\.?$', what: 'Singular complement.', why: 'Plural subject → students.', concept: 'sva' }
      ],
      explanation: 'Plural subject + are + plural noun.'
    },
    {
      id: 'sc_wr_15', concept: 'linking-verb', subtype: 'Fill in the blank (well / good)',
      prompt: 'I had a cold, but now I feel ___ again.',
      accepted: ['well', 'better', 'fine', 'good'],
      checks: [{ pattern: '^\\s*(goodly|healthily)\\s*$', what: 'Not a correct word here.', why: 'Use "well" (healthy) after feel.', concept: 'linking-verb' }],
      explanation: '"Feel well" = healthy again.'
    },
    {
      id: 'sc_wr_16', concept: 'complement', subtype: 'Bangla → English',
      prompt: 'চট্টগ্রাম একটি বন্দর নগরী।',
      accepted: ['Chattogram is a port city.', 'Chittagong is a port city.'],
      checks: [
        { pattern: '(chattogram|chittagong)\\s+(a\\s+)?port', what: 'The verb is missing.', why: 'Add "is": Chattogram is a port city.', concept: 'missing-be' },
        { pattern: 'is\\s+port city', what: 'The article is missing.', why: 'A singular noun needs "a": a port city.', concept: 'missing-article' }
      ],
      explanation: 'Subject + is + a + noun phrase.'
    },
    {
      id: 'sc_wr_17', concept: 'linking-verb', subtype: 'Correct the sentence',
      prompt: 'Please stay calmly.',
      accepted: ['Please stay calm.', 'Please keep calm.'],
      checks: [{ pattern: 'stay\\s+calmly', what: 'An adverb after a linking verb.', why: 'Stay + adjective: stay calm.', concept: 'linking-verb' }],
      explanation: 'stay + adjective.'
    },
    {
      id: 'sc_wr_18', concept: 'missing-article', subtype: 'Bangla → English',
      prompt: 'সে একজন বিশ্ববিদ্যালয়ের শিক্ষক।',
      accepted: ['He is a university teacher.', 'She is a university teacher.', 'He is a university lecturer.', 'She is a university lecturer.', 'He is a teacher at a university.', 'She is a teacher at a university.'],
      checks: [
        { pattern: 'is\\s+an\\s+university', what: '"an" before "university".', why: '"University" starts with a /j/ sound → a university.', concept: 'missing-article' },
        { pattern: 'is\\s+university', what: 'The article is missing.', why: 'He is a university teacher.', concept: 'missing-article' }
      ],
      explanation: 'a + university (consonant sound).'
    },
    {
      id: 'sc_wr_19', concept: 'linking-verb', subtype: 'Bangla → English',
      prompt: 'শীতকালে পাতাগুলো বাদামি হয়ে যায়।',
      accepted: ['The leaves turn brown in winter.', 'The leaves become brown in winter.', 'Leaves turn brown in winter.', 'In winter, the leaves turn brown.', 'In winter the leaves turn brown.'],
      checks: [
        { pattern: 'leaves\\s+turns', what: '-s with a plural subject.', why: 'The leaves (they) → turn.', concept: 'sva' },
        { pattern: 'turn\\s+into\\s+brown', what: '"into" is not used here.', why: 'turn + adjective: turn brown.', concept: 'collocation' }
      ],
      explanation: 'turn (change) + adjective.'
    },
    {
      id: 'sc_wr_20', concept: 'complement', subtype: 'Write the complement only',
      prompt: '"My biggest goal is a band 7.5 in IELTS." → Complement = ?',
      accepted: ['a band 7.5 in IELTS', 'a band 7.5'],
      checks: [{ pattern: '^\\s*(my biggest goal|is)\\s*$', what: 'This is not the complement.', why: 'My biggest goal = a band 7.5 in IELTS.', concept: 'complement' }],
      explanation: 'Everything after the linking verb "is".'
    }
  ]
};
