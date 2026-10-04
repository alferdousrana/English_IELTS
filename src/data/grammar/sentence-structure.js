export default {
  id: 'sentence-structure',
  title: 'Sentence structure',
  difficulty: 'beginner',
  explanation: [
    {
      heading: 'The core pattern: Subject + Verb',
      en: 'Every complete English sentence needs a subject (who/what) and a verb (the action or state). The verb comes right after the subject.',
      bn: 'বাংলায় ক্রিয়া সাধারণত বাক্যের শেষে বসে (আমি ভাত খাই), কিন্তু ইংরেজিতে ক্রিয়া বসে কর্তার ঠিক পরে (I eat rice)। এটাই সবচেয়ে বড় পার্থক্য।'
    },
    {
      heading: 'Five patterns you will use every day',
      table: {
        head: ['Pattern', 'Example', 'বাংলা'],
        rows: [
          ['S + V', 'Birds fly.', 'পাখিরা ওড়ে।'],
          ['S + V + O', 'I eat rice.', 'আমি ভাত খাই।'],
          ['S + V + C', 'She is a teacher.', 'সে একজন শিক্ষক।'],
          ['S + V + O + O', 'Rahim gave me a book.', 'রহিম আমাকে একটি বই দিল।'],
          ['S + V + (O) + Adverbial', 'They live in Dhaka.', 'তারা ঢাকায় থাকে।']
        ]
      }
    },
    {
      heading: 'Two traps for Bangla speakers',
      en: '1) Bangla often has no "is": "সে শিক্ষক". English always needs a verb: "She is a teacher." 2) Weather and time sentences need "It" as a subject: "It is raining."',
      bn: 'বাংলায় "হয়/আছে" বাদ দিলেও চলে, ইংরেজিতে চলে না। আর "বৃষ্টি হচ্ছে" বলতে "It is raining" লাগে — কর্তা হিসেবে It বসাতে হয়।'
    }
  ],
  examples: [
    { en: 'Birds fly.', bn: 'পাখিরা ওড়ে।', why: 'S + V. "Fly" is complete without an object.' },
    { en: 'I eat rice.', bn: 'আমি ভাত খাই।', why: 'S + V + O. The verb "eat" comes before the object "rice", not at the end as in Bangla.' },
    { en: 'She is a teacher.', bn: 'সে একজন শিক্ষক।', why: 'S + V + C. "A teacher" describes "she". English needs "is" here even though Bangla does not.' },
    { en: 'The baby is sleeping.', bn: 'শিশুটি ঘুমাচ্ছে।', why: 'S + V. "Is sleeping" is one verb phrase; there is no object.' },
    { en: 'My brother bought a new phone.', bn: 'আমার ভাই একটি নতুন ফোন কিনেছে।', why: 'S + V + O. The subject can be more than one word: "My brother".' },
    { en: 'They live in Dhaka.', bn: 'তারা ঢাকায় থাকে।', why: 'S + V + Adverbial. "In Dhaka" tells us where; it is not an object.' },
    { en: 'The food smells good.', bn: 'খাবারটি থেকে ভালো গন্ধ আসছে।', why: 'S + V + C. "Smell" is a linking verb here, so it takes an adjective (good), not an adverb (well).' },
    { en: 'Rahim gave me a book.', bn: 'রহিম আমাকে একটি বই দিল।', why: 'S + V + O + O. Person first (me), then thing (a book). Or: Rahim gave a book to me.' },
    { en: 'The students finished the test quickly.', bn: 'ছাত্রছাত্রীরা দ্রুত পরীক্ষাটি শেষ করল।', why: 'S + V + O + Adverbial. Put "quickly" after the object, never between the verb and its object.' },
    { en: 'It is raining outside.', bn: 'বাইরে বৃষ্টি হচ্ছে।', why: 'Weather sentences use "It" as the subject. "Is raining outside" has no subject.' }
  ],
  mcq: [
    { id: 'ss_mcq_01', concept: 'word-order', prompt: 'Choose the correct sentence.', options: ['I rice eat.', 'I eat rice.', 'Eat I rice.', 'Rice I eat.'], answer: 'I eat rice.', explanation: 'English order is Subject + Verb + Object. The verb comes right after the subject.' },
    { id: 'ss_mcq_02', concept: 'missing-be', prompt: 'Choose the correct sentence.', options: ['My mother a doctor.', 'My mother is a doctor.', 'My mother doctor is.', 'My mother is doctor a.'], answer: 'My mother is a doctor.', explanation: 'Every sentence needs a verb. With a noun after the subject, use a be verb: is. "a" comes before "doctor".' },
    { id: 'ss_mcq_03', concept: 'subject', prompt: 'What is the subject? "The old man in the shop sold me a pen."', options: ['The old man in the shop', 'sold', 'me', 'a pen'], answer: 'The old man in the shop', explanation: 'The subject is everything before the verb "sold": who sold? The old man in the shop.' },
    { id: 'ss_mcq_04', concept: 'object', prompt: 'What is the object? "She reads novels every night."', options: ['She', 'reads', 'novels', 'every night'], answer: 'novels', explanation: 'She reads what? Novels. "Every night" tells when; it is an adverbial, not an object.' },
    { id: 'ss_mcq_05', concept: 'linking-verb', prompt: 'The soup tastes ___.', options: ['good', 'well', 'goodly', 'to good'], answer: 'good', explanation: '"Taste" here is a linking verb. Linking verbs (be, seem, taste, smell, look, feel) take adjectives: tastes good.' },
    { id: 'ss_mcq_06', concept: 'complement', prompt: 'Which sentence has a subject complement?', options: ['He became a pilot.', 'He bought a plane.', 'He flew to Sylhet.', 'He sleeps early.'], answer: 'He became a pilot.', explanation: '"A pilot" describes "he" (he = a pilot). In "He bought a plane", the plane is an object, not the same thing as "he".' },
    { id: 'ss_mcq_07', concept: 'adverb-position', prompt: 'Choose the correct sentence.', options: ['He speaks very well English.', 'He speaks English very well.', 'He very well speaks English.', 'Very well he English speaks.'], answer: 'He speaks English very well.', explanation: 'Do not put an adverb between a verb and its object. Verb + object first (speaks English), then the adverb (very well).' },
    { id: 'ss_mcq_08', concept: 'dummy-subject', prompt: '___ is raining outside.', options: ['It', 'There', 'This', 'Is (no word needed)'], answer: 'It', explanation: 'Weather, time and distance sentences use "It" as the subject: It is raining. It is 5 o\'clock.' },
    { id: 'ss_mcq_09', concept: 'double-object', prompt: 'Choose the correct sentence.', options: ['Rina gave a gift her friend.', 'Rina her friend gave a gift.', 'Rina gave her friend a gift.', 'Gave Rina her friend a gift.'], answer: 'Rina gave her friend a gift.', explanation: 'With two objects: verb + person + thing (gave her friend a gift), or verb + thing + to + person (gave a gift to her friend).' },
    { id: 'ss_mcq_10', concept: 'complete-sentence', prompt: 'Which one is a complete sentence?', options: ['Because I was tired.', 'Running in the park.', 'The children laughed.', 'In the morning.'], answer: 'The children laughed.', explanation: 'A complete sentence needs a subject + verb and must make sense alone. "Because I was tired" depends on another clause.' }
  ],
  written: [
    {
      id: 'ss_wr_01', concept: 'word-order', subtype: 'Bangla → English',
      prompt: 'আমি প্রতিদিন ইংরেজি পড়ি।',
      accepted: ['I study English every day.', 'I read English every day.', 'Every day I study English.', 'Every day, I study English.', 'I study English daily.', 'I practise English every day.', 'I practice English every day.'],
      checks: [
        { pattern: '\\bI\\s+(every day|daily)\\s+(study|read)', what: '"Every day" is placed between the subject and verb.', why: 'Time expressions like "every day" go at the end (or at the very start) of the sentence.', concept: 'adverb-position' },
        { pattern: '\\bI\\s+(every day\\s+)?English\\s+(study|read)', what: 'Bangla word order: the verb is at the end.', why: 'English order is Subject + Verb + Object: I study English.', concept: 'word-order' },
        { pattern: '\\beveryday\\b', what: '"everyday" (one word) is an adjective.', why: 'As a time phrase, write "every day" as two words. "Everyday" means ordinary: everyday life.', concept: 'collocation' }
      ],
      better: 'I study English every day.',
      explanation: 'S + V + O + time: I + study + English + every day.'
    },
    {
      id: 'ss_wr_02', concept: 'word-order', subtype: 'Rearrange the words',
      prompt: 'every / English / study / I / day',
      accepted: ['I study English every day.', 'Every day I study English.', 'Every day, I study English.'],
      explanation: 'Subject (I) + verb (study) + object (English) + time (every day).'
    },
    {
      id: 'ss_wr_03', concept: 'missing-be', subtype: 'Correct the sentence',
      prompt: 'My father a farmer.',
      accepted: ['My father is a farmer.'],
      checks: [{ pattern: '^\\s*my father a farmer', what: 'The verb is still missing.', why: 'A sentence needs a verb. Use "is" to connect "my father" and "a farmer".', concept: 'missing-be' }],
      explanation: 'English sentences always need a verb. Subject + is + noun: My father is a farmer.'
    },
    {
      id: 'ss_wr_04', concept: 'adverb-position', subtype: 'Correct the sentence',
      prompt: 'He plays very well football.',
      accepted: ['He plays football very well.'],
      checks: [{ pattern: 'plays very well football', what: 'The adverb is between the verb and its object.', why: 'Keep verb + object together: plays football, then add "very well".', concept: 'adverb-position' }],
      explanation: 'Verb + object stay together; the adverb of manner goes after them.'
    },
    {
      id: 'ss_wr_05', concept: 'missing-article', subtype: 'Bangla → English',
      prompt: 'সে একজন ভালো ছাত্র।',
      accepted: ['He is a good student.', 'She is a good student.'],
      checks: [
        { pattern: '^\\s*(he|she)\\s+(a\\s+)?good student', what: 'The verb "is" is missing.', why: 'Bangla drops "হয়", but English needs "is": He is a good student.', concept: 'missing-be' },
        { pattern: '^\\s*(he|she)\\s+is\\s+good student', what: 'The article "a" is missing.', why: 'A singular countable noun (student) needs "a/an/the" in front of it.', concept: 'missing-article' }
      ],
      explanation: 'He/She + is + a + good student. "একজন" often becomes the article "a".'
    },
    {
      id: 'ss_wr_06', concept: 'dummy-subject', subtype: 'Fill in the blank',
      prompt: '___ is very hot today.',
      accepted: ['It'],
      checks: [{ pattern: '^\\s*(this|weather|there)\\s*$', what: 'This word cannot be the subject here.', why: 'For weather we use "It": It is very hot today.', concept: 'dummy-subject' }],
      explanation: 'Weather sentences start with "It".'
    },
    {
      id: 'ss_wr_07', concept: 'double-object', subtype: 'Rearrange the words',
      prompt: 'a / gave / me / pen / Karim',
      accepted: ['Karim gave me a pen.'],
      explanation: 'Subject (Karim) + verb (gave) + person (me) + thing (a pen).'
    },
    {
      id: 'ss_wr_08', concept: 'word-order', subtype: 'Bangla → English',
      prompt: 'তারা ঢাকায় থাকে।',
      accepted: ['They live in Dhaka.'],
      checks: [
        { pattern: 'they\\s+in dhaka\\s+live', what: 'Bangla word order: the verb is at the end.', why: 'Put the verb right after the subject: They live in Dhaka.', concept: 'word-order' },
        { pattern: 'they\\s+are\\s+live', what: '"are" and "live" are both used.', why: 'Do not add a be verb before a main verb in Present Simple. They live (not: they are live).', concept: 'be-plus-verb' },
        { pattern: 'live\\s+(at|on)\\s+dhaka', what: 'Wrong preposition.', why: 'Use "in" with cities and countries: in Dhaka, in Bangladesh.', concept: 'preposition' }
      ],
      explanation: 'S + V + place: They + live + in Dhaka.'
    },
    {
      id: 'ss_wr_09', concept: 'subject', subtype: 'Correct the sentence',
      prompt: 'Is very important English.',
      accepted: ['English is very important.'],
      checks: [{ pattern: '^\\s*is\\s+very\\s+important', what: 'The sentence starts with the verb; the subject is in the wrong place.', why: 'Subject first: English is very important.', concept: 'subject' }],
      explanation: 'The subject (English) must come before the verb (is).'
    },
    {
      id: 'ss_wr_10', concept: 'linking-verb', subtype: 'Bangla → English',
      prompt: 'খাবারটির স্বাদ ভালো।',
      accepted: ['The food tastes good.', 'The food is good.', 'The food tastes nice.', 'The food is tasty.', 'The food tastes great.', 'The food is delicious.', 'The food tastes delicious.'],
      checks: [
        { pattern: 'tastes?\\s+well', what: '"well" is an adverb.', why: '"Taste" is a linking verb, so it needs an adjective: tastes good.', concept: 'linking-verb' },
        { pattern: '^\\s*food', what: 'The article "the" is missing.', why: '"খাবারটি" means a specific food, so use "the food".', concept: 'missing-article' },
        { pattern: 'taste of the food is good', what: 'Grammatically fine but unnatural.', why: 'Natural English uses the verb: The food tastes good.', concept: 'collocation' }
      ],
      explanation: 'The food + tastes (linking verb) + good (adjective).'
    }
  ]
};
