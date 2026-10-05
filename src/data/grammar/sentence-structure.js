export default {
  id: 'sentence-structure',
  title: 'Sentence structure',
  difficulty: 'beginner',
  explanation: [
    {
      heading: '1. What is a sentence?',
      en: 'A sentence is a group of words that expresses a complete idea. Every complete English sentence has at least two parts: a subject (who or what the sentence is about) and a verb (what the subject does or is). It starts with a capital letter and ends with a full stop (.), a question mark (?) or an exclamation mark (!).',
      bn: 'Sentence মানে এমন একগুচ্ছ শব্দ যা একটি সম্পূর্ণ ভাব প্রকাশ করে। প্রতিটি পূর্ণ English sentence-এ অন্তত দুটি অংশ থাকতেই হবে: subject (কে বা কী নিয়ে কথা হচ্ছে) এবং verb (subject কী করে বা কী অবস্থায় আছে)। বাক্য শুরু হয় capital letter দিয়ে, শেষ হয় full stop (.), question mark (?) বা exclamation mark (!) দিয়ে।',
      points: ['Birds fly. → Birds = subject, fly = verb.', 'The baby is sleeping. → The baby = subject, is sleeping = verb.', '"In the morning." → এটি sentence নয়, কারণ এখানে subject ও verb কোনোটাই নেই।']
    },
    {
      heading: '2. The biggest difference from Bangla: word order',
      en: 'In Bangla the verb usually comes at the end: "আমি ভাত খাই" (I rice eat). In English the verb comes right after the subject, and the object comes after the verb: "I eat rice." This Subject + Verb + Object order is fixed; changing it changes the meaning or makes the sentence wrong.',
      bn: 'বাংলায় ক্রিয়া সাধারণত বাক্যের শেষে বসে (আমি ভাত খাই), কিন্তু English-এ verb বসে subject-এর ঠিক পরে (I eat rice)। Bangla speaker-দের সবচেয়ে বড় ভুল এখান থেকেই হয়: "I rice eat" লিখে ফেলা। English-এ word order বদলালে অর্থও বদলে যায়: "The dog bit the man" আর "The man bit the dog" — দুটো সম্পূর্ণ আলাদা ঘটনা!',
      table: {
        head: ['বাংলা ক্রম', 'English ক্রম', 'Example'],
        rows: [
          ['কর্তা + কর্ম + ক্রিয়া', 'Subject + Verb + Object', 'আমি বই পড়ি → I read books.'],
          ['কর্তা + স্থান + ক্রিয়া', 'Subject + Verb + Place', 'সে স্কুলে যায় → She goes to school.'],
          ['কর্তা + সময় + কর্ম + ক্রিয়া', 'Subject + Verb + Object + Time', 'আমি রোজ চা খাই → I drink tea every day.']
        ]
      }
    },
    {
      heading: '3. Five patterns you will use every day',
      en: 'Almost every English sentence follows one of these five patterns. S = subject, V = verb, O = object (receives the action), C = complement (describes the subject), Adverbial = where, when or how.',
      table: {
        head: ['Pattern', 'Example', 'বাংলা'],
        rows: [
          ['S + V', 'Birds fly.', 'পাখিরা ওড়ে।'],
          ['S + V + O', 'I eat rice.', 'আমি ভাত খাই।'],
          ['S + V + C', 'She is a teacher.', 'সে একজন শিক্ষক।'],
          ['S + V + O + O', 'Rahim gave me a book.', 'রহিম আমাকে একটি বই দিল।'],
          ['S + V + (O) + Adverbial', 'They live in Dhaka.', 'তারা ঢাকায় থাকে।']
        ]
      },
      bn: 'Object কাজটি গ্রহণ করে (I eat rice — কী খাই? rice)। Complement subject-কে বর্ণনা করে (She is a teacher — she আর a teacher একই মানুষ)। Adverbial বলে কোথায়, কখন বা কীভাবে (in Dhaka, every day, quickly)।'
    },
    {
      heading: '4. Where do time, place and manner go?',
      en: 'Words that tell how, where and when normally go at the end, in this order: manner → place → time. Never put them between the verb and its object.',
      bn: 'কীভাবে (manner), কোথায় (place), কখন (time) — এই তথ্যগুলো সাধারণত বাক্যের শেষে বসে, এই ক্রমে। Verb আর object-এর মাঝখানে কখনো বসবে না। "He speaks very well English" ভুল, সঠিক: "He speaks English very well."',
      points: ['She sang beautifully at the party last night. (how → where → when)', 'Time can also go at the very start: Last night, she sang at the party.', '✗ I every day study English.  ✓ I study English every day.']
    },
    {
      heading: '5. Three traps for Bangla speakers',
      en: '1) Missing "be": Bangla often has no verb in sentences like "সে শিক্ষক", but English always needs one: "She is a teacher." 2) Missing subject: weather and time sentences need "It": "It is raining." 3) Fragments: "Because I was tired." is not a sentence on its own — it needs a main clause.',
      bn: 'বাংলায় "হয়/আছে" বাদ দিলেও চলে, English-এ চলে না — verb ছাড়া কোনো sentence হয় না। "বৃষ্টি হচ্ছে" বলতে "It is raining" লাগে, কারণ English-এ subject খালি রাখা যায় না। আর "Because…" দিয়ে শুরু হওয়া অংশ একা sentence হয় না।',
      tip: 'মনে রাখার সূত্র: প্রতিটি English sentence-এ জিজ্ঞেস করুন — Subject কোথায়? Verb কোথায়? Verb কি subject-এর ঠিক পরে আছে?'
    }
  ],
  examples: [
    { en: 'Birds fly.', bn: 'পাখিরা ওড়ে।', why: 'S + V pattern। "Birds" হলো subject, "fly" হলো verb। "Fly" verb-টির পরে কোনো object লাগে না, তাই মাত্র দুই শব্দেই sentence সম্পূর্ণ।' },
    { en: 'I eat rice.', bn: 'আমি ভাত খাই।', why: 'S + V + O। বাংলায় ক্রিয়া "খাই" শেষে বসে, কিন্তু English-এ verb "eat" বসেছে subject "I"-এর ঠিক পরে, তারপর object "rice"।' },
    { en: 'She is a teacher.', bn: 'সে একজন শিক্ষক।', why: 'S + V + C। বাংলায় "হয়" বলা লাগে না, কিন্তু English-এ "is" অবশ্যই লাগবে। "A teacher" হলো complement, কারণ এটি "she"-কে বর্ণনা করছে।' },
    { en: 'The baby is sleeping.', bn: 'শিশুটি ঘুমাচ্ছে।', why: 'S + V। "Is sleeping" পুরোটা মিলে একটি verb phrase। এখানে কোনো object নেই, কারণ ঘুমানো কাজটি কারো ওপর হয় না।' },
    { en: 'My brother bought a new phone.', bn: 'আমার ভাই একটি নতুন ফোন কিনেছে।', why: 'S + V + O। Subject একাধিক শব্দেরও হতে পারে: "My brother"। Verb "bought"-এর আগের পুরো অংশটাই subject।' },
    { en: 'They live in Dhaka.', bn: 'তারা ঢাকায় থাকে।', why: 'S + V + Adverbial। "In Dhaka" জায়গা বোঝায়, এটি object নয়। লক্ষ করুন, verb "live" বসেছে "in Dhaka"-এর আগে।' },
    { en: 'The food smells good.', bn: 'খাবারটি থেকে ভালো গন্ধ আসছে।', why: 'S + V + C। এখানে "smell" একটি linking verb, তাই এর পরে adjective "good" বসে, adverb "well" নয়।' },
    { en: 'Rahim gave me a book.', bn: 'রহিম আমাকে একটি বই দিল।', why: 'S + V + O + O। দুটি object: আগে মানুষ (me), পরে জিনিস (a book)। চাইলে বলা যায়: Rahim gave a book to me।' },
    { en: 'The students finished the test quickly.', bn: 'ছাত্রছাত্রীরা দ্রুত পরীক্ষাটি শেষ করল।', why: 'S + V + O + Adverbial। "Quickly" বসেছে object "the test"-এর পরে। Verb আর object-এর মাঝখানে কখনো adverb বসাবেন না।' },
    { en: 'It is raining outside.', bn: 'বাইরে বৃষ্টি হচ্ছে।', why: 'আবহাওয়ার কথা বলতে "It" subject হিসেবে বসে। বাংলায় কর্তা নেই, কিন্তু English-এ subject খালি রাখা যায় না, তাই "It"।' },
    { en: 'My father works in a bank.', bn: 'আমার বাবা একটি ব্যাংকে কাজ করেন।', why: 'S + V + Adverbial। Subject "My father", verb "works", তারপর জায়গা "in a bank"। বাংলার "ব্যাংকে কাজ করেন" ক্রম উল্টে English-এ "works in a bank" হয়েছে।' },
    { en: 'We watched a film last night.', bn: 'আমরা গতরাতে একটি সিনেমা দেখেছি।', why: 'S + V + O + Time। সময় "last night" বসেছে একদম শেষে। বাংলায় সময় আগে বসে (গতরাতে), English-এ সাধারণত শেষে।' },
    { en: 'The children laughed.', bn: 'বাচ্চারা হাসল।', why: 'S + V। ছোট হলেও এটি একটি সম্পূর্ণ sentence, কারণ subject (The children) ও verb (laughed) দুটোই আছে।' },
    { en: 'Nadia looks tired today.', bn: 'নাদিয়াকে আজ ক্লান্ত দেখাচ্ছে।', why: 'S + V + C + Time। "Look" এখানে linking verb, তাই adjective "tired" বসেছে। "Today" সময় বোঝায়, তাই শেষে।' },
    { en: 'The teacher explained the rule clearly.', bn: 'শিক্ষক নিয়মটি পরিষ্কারভাবে বুঝিয়ে দিলেন।', why: 'S + V + O + Manner। কীভাবে বোঝালেন? "Clearly"। এটি object "the rule"-এর পরে বসেছে।' },
    { en: 'She sent her mother a message.', bn: 'সে তার মাকে একটি বার্তা পাঠাল।', why: 'S + V + O + O। আগে কাকে (her mother), পরে কী (a message)। বিকল্প: She sent a message to her mother।' },
    { en: 'It is five o\'clock now.', bn: 'এখন পাঁচটা বাজে।', why: 'সময় বলতেও "It" subject হিসেবে লাগে। "Is five o\'clock now" লিখলে subject থাকে না, তাই ভুল।' },
    { en: 'English is very important for my career.', bn: 'আমার ক্যারিয়ারের জন্য ইংরেজি খুবই গুরুত্বপূর্ণ।', why: 'S + V + C + Adverbial। বাংলার মতো "গুরুত্বপূর্ণ" দিয়ে শুরু করা যাবে না; subject "English" আগে, তারপর verb "is"।' },
    { en: 'The bus stopped suddenly.', bn: 'বাসটি হঠাৎ থেমে গেল।', why: 'S + V + Manner। "Stop" এখানে object ছাড়াই সম্পূর্ণ। কীভাবে থামল? "Suddenly" — শেষে বসেছে।' },
    { en: 'My friends and I play football on Fridays.', bn: 'আমি ও আমার বন্ধুরা শুক্রবারে ফুটবল খেলি।', why: 'S + V + O + Time। Subject এখানে "My friends and I"। ভদ্রতার নিয়ম: "I" সবসময় শেষে বসে (my friends and I)।' }
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
    { id: 'ss_mcq_10', concept: 'complete-sentence', prompt: 'Which one is a complete sentence?', options: ['Because I was tired.', 'Running in the park.', 'The children laughed.', 'In the morning.'], answer: 'The children laughed.', explanation: 'A complete sentence needs a subject + verb and must make sense alone. "Because I was tired" depends on another clause.' },
    { id: 'ss_mcq_11', concept: 'word-order', prompt: 'Choose the correct sentence.', options: ['She to school goes.', 'She goes to school.', 'Goes she to school.', 'To school she goes.'], answer: 'She goes to school.', explanation: 'Subject + Verb + Place: She + goes + to school. The verb does not go at the end like in Bangla.' },
    { id: 'ss_mcq_12', concept: 'adverb-position', prompt: 'Choose the correct sentence.', options: ['I every day drink tea.', 'I drink every day tea.', 'I drink tea every day.', 'Every day tea I drink.'], answer: 'I drink tea every day.', explanation: 'Time expressions like "every day" go at the end (or at the very beginning). They never go between the verb and its object.' },
    { id: 'ss_mcq_13', concept: 'subject', prompt: 'What is the subject? "My best friend from school lives in Sylhet."', options: ['My best friend from school', 'lives', 'in Sylhet', 'school'], answer: 'My best friend from school', explanation: 'Who lives in Sylhet? My best friend from school. The subject is the whole group of words before the verb "lives".' },
    { id: 'ss_mcq_14', concept: 'complete-sentence', prompt: 'Which one is NOT a complete sentence?', options: ['The shop opens at nine.', 'After the meeting.', 'He smiled.', 'It is cold.'], answer: 'After the meeting.', explanation: '"After the meeting" has no subject and no verb. It only tells us when.' },
    { id: 'ss_mcq_15', concept: 'missing-be', prompt: 'আমার বোন খুব বুদ্ধিমান। Choose the correct English.', options: ['My sister very clever.', 'My sister is very clever.', 'My sister very clever is.', 'Very clever my sister.'], answer: 'My sister is very clever.', explanation: 'Bangla has no verb here, but English needs "is" between the subject and the adjective.' },
    { id: 'ss_mcq_16', concept: 'object', prompt: 'Which sentence has an object?', options: ['The sun rises.', 'She is happy.', 'He opened the door.', 'They arrived late.'], answer: 'He opened the door.', explanation: 'He opened what? The door. The other sentences have no word that receives an action.' },
    { id: 'ss_mcq_17', concept: 'adverb-position', prompt: 'Choose the best order.', options: ['She sang at the party beautifully last night.', 'She sang beautifully at the party last night.', 'She sang last night beautifully at the party.', 'She beautifully at the party sang last night.'], answer: 'She sang beautifully at the party last night.', explanation: 'The usual order at the end of a sentence is manner (how) → place (where) → time (when).' },
    { id: 'ss_mcq_18', concept: 'dummy-subject', prompt: 'Choose the correct sentence.', options: ['Is very windy today.', 'It is very windy today.', 'Today very windy.', 'Windy is today.'], answer: 'It is very windy today.', explanation: 'English sentences cannot start without a subject. For weather we use "It".' },
    { id: 'ss_mcq_19', concept: 'double-object', prompt: 'Choose the correct sentence.', options: ['Please tell the story me.', 'Please tell me the story.', 'Please me tell the story.', 'Please tell to me the story.'], answer: 'Please tell me the story.', explanation: 'Verb + person + thing: tell me the story. Or: tell the story to me. "Tell to me the story" is wrong.' },
    { id: 'ss_mcq_20', concept: 'word-order', prompt: 'Which sentence means the dog did the biting?', options: ['The man bit the dog.', 'The dog bit the man.', 'The man was bitten the dog.', 'Bit the dog the man.'], answer: 'The dog bit the man.', explanation: 'In English, word order shows who does the action. The subject (the dog) comes first, then the verb, then the object (the man).' }

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
    },
    {
      id: 'ss_wr_11', concept: 'word-order', subtype: 'Bangla → English',
      prompt: 'আমার ভাই একটি গাড়ি কিনেছে।',
      accepted: ['My brother bought a car.', 'My brother has bought a car.'],
      checks: [
        { pattern: 'my brother\\s+a car\\s+(bought|has bought)', what: 'Bangla word order: the verb is at the end.', why: 'Put the verb right after the subject: My brother bought a car.', concept: 'word-order' },
        { pattern: 'bought\\s+car\\b', what: 'The article "a" is missing.', why: '"Car" is a singular countable noun, so it needs "a": a car.', concept: 'missing-article' }
      ],
      explanation: 'S + V + O: My brother + bought + a car.'
    },
    {
      id: 'ss_wr_12', concept: 'adverb-position', subtype: 'Rearrange the words',
      prompt: 'tea / drink / every / I / morning',
      accepted: ['I drink tea every morning.', 'Every morning I drink tea.', 'Every morning, I drink tea.'],
      explanation: 'Subject + verb + object + time: I drink tea every morning.'
    },
    {
      id: 'ss_wr_13', concept: 'missing-be', subtype: 'Correct the sentence',
      prompt: 'The weather very nice today.',
      accepted: ['The weather is very nice today.'],
      checks: [{ pattern: 'weather\\s+very\\s+nice', what: 'The verb is missing.', why: 'Add "is" between the subject and the adjective: The weather is very nice.', concept: 'missing-be' }],
      explanation: 'Subject + is + adjective: The weather is very nice today.'
    },
    {
      id: 'ss_wr_14', concept: 'dummy-subject', subtype: 'Bangla → English',
      prompt: 'বাইরে খুব ঠান্ডা।',
      accepted: ['It is very cold outside.', 'It\'s very cold outside.', 'It is very cold out.'],
      checks: [
        { pattern: '^\\s*(is|very|outside)', what: 'The sentence has no subject.', why: 'Weather sentences need "It" as the subject: It is very cold outside.', concept: 'dummy-subject' },
        { pattern: '^\\s*it\\s+very', what: 'The verb "is" is missing.', why: 'It + is + very cold.', concept: 'missing-be' }
      ],
      explanation: 'It + is + very cold + outside.'
    },
    {
      id: 'ss_wr_15', concept: 'double-object', subtype: 'Bangla → English',
      prompt: 'মা আমাকে একটি চিঠি পাঠিয়েছেন।',
      accepted: ['My mother sent me a letter.', 'Mother sent me a letter.', 'My mother sent a letter to me.', 'Mother sent a letter to me.', 'My mother has sent me a letter.', 'My mother has sent a letter to me.', 'Mom sent me a letter.', 'Mum sent me a letter.'],
      checks: [
        { pattern: 'sent\\s+to me\\s+a letter', what: '"to" is used before the person when the thing comes after it.', why: 'Use either "sent me a letter" or "sent a letter to me".', concept: 'double-object' },
        { pattern: 'me a letter sent', what: 'Bangla word order: the verb is at the end.', why: 'Subject + verb first: My mother sent me a letter.', concept: 'word-order' }
      ],
      explanation: 'S + V + person + thing: My mother sent me a letter.'
    },
    {
      id: 'ss_wr_16', concept: 'adverb-position', subtype: 'Correct the sentence',
      prompt: 'She speaks fluently three languages.',
      accepted: ['She speaks three languages fluently.'],
      checks: [{ pattern: 'speaks\\s+fluently\\s+three', what: 'The adverb is between the verb and its object.', why: 'Keep verb + object together (speaks three languages), then add "fluently".', concept: 'adverb-position' }],
      explanation: 'Verb + object + adverb of manner.'
    },
    {
      id: 'ss_wr_17', concept: 'word-order', subtype: 'Rearrange the words',
      prompt: 'in / my / Chattogram / parents / live',
      accepted: ['My parents live in Chattogram.'],
      explanation: 'Subject (my parents) + verb (live) + place (in Chattogram).'
    },
    {
      id: 'ss_wr_18', concept: 'subject', subtype: 'Correct the sentence',
      prompt: 'Is five o\'clock now.',
      accepted: ['It is five o\'clock now.', 'It\'s five o\'clock now.', 'It is 5 o\'clock now.'],
      checks: [{ pattern: '^\\s*is\\s+(five|5)', what: 'The sentence has no subject.', why: 'Time sentences need "It" as the subject: It is five o\'clock.', concept: 'dummy-subject' }],
      explanation: 'English always needs a subject. For time, use "It".'
    },
    {
      id: 'ss_wr_19', concept: 'complete-sentence', subtype: 'Make it a complete sentence',
      prompt: 'Add a subject and a verb: "___ ___ hard every day." (use: My sister / studies)',
      accepted: ['My sister studies hard every day.'],
      checks: [{ pattern: 'my sister\\s+study\\b', what: 'The verb needs -ies with "my sister".', why: 'My sister = she, so study → studies.', concept: 'sva' }],
      explanation: 'Subject (My sister) + verb (studies) + how (hard) + when (every day).'
    },
    {
      id: 'ss_wr_20', concept: 'word-order', subtype: 'Bangla → English',
      prompt: 'আমরা গতকাল একটি সিনেমা দেখেছি।',
      accepted: ['We watched a film yesterday.', 'We watched a movie yesterday.', 'We saw a film yesterday.', 'We saw a movie yesterday.', 'Yesterday we watched a film.', 'Yesterday we watched a movie.', 'Yesterday, we watched a film.', 'Yesterday, we watched a movie.'],
      checks: [
        { pattern: '^\\s*we\\s+yesterday', what: '"Yesterday" is between the subject and the verb.', why: 'Put time words at the end or at the very start: We watched a film yesterday.', concept: 'adverb-position' },
        { pattern: 'have (watched|seen).*yesterday', what: 'Present Perfect is used with "yesterday".', why: '"Yesterday" is a finished time, so use the past simple: watched.', concept: 'tense-use' }
      ],
      explanation: 'S + V + O + time: We + watched + a film + yesterday.'
    }

  ]
};
