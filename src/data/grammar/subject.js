export default {
  id: 'subject',
  title: 'Subject',
  difficulty: 'beginner',
  explanation: [
    {
      heading: '1. What is the subject?',
      en: 'The subject is the person, thing or idea that the sentence is about. Usually it is the one who does the action. To find it, put "Who?" or "What?" in front of the verb. The answer is the subject.',
      bn: 'Subject (কর্তা) হলো সেই ব্যক্তি, বস্তু বা বিষয় যাকে নিয়ে বাক্যটি — সাধারণত যে কাজটি করে। Subject খোঁজার সহজ উপায়: verb-এর আগে "Who?" বা "What?" দিয়ে প্রশ্ন করুন। যে উত্তর পাবেন, সেটাই subject।',
      points: ['Rina sings. → Who sings? Rina. → Subject = Rina', 'The phone is broken. → What is broken? The phone. → Subject = The phone', 'In English the subject almost always comes BEFORE the verb.']
    },
    {
      heading: '2. A subject can be one word or many words',
      en: 'A subject can be a name (Karim), a pronoun (she), a noun with words around it (the tall man in the blue shirt), two or more nouns joined by "and" (Rahim and Nadia), or even an -ing activity (Swimming is good exercise). Everything before the main verb is usually part of the subject.',
      bn: 'Subject এক শব্দেরও হতে পারে, আবার অনেক শব্দেরও। "The tall man in the blue shirt is my uncle" — এখানে verb "is"-এর আগের পুরো অংশটাই subject। "Swimming is good exercise" — এখানে -ing শব্দ "Swimming" subject।',
      table: {
        head: ['Type', 'Example', 'Subject'],
        rows: [
          ['Name', 'Karim teaches maths.', 'Karim'],
          ['Pronoun', 'She lives in Khulna.', 'She'],
          ['Noun phrase', 'The old house near the river is empty.', 'The old house near the river'],
          ['Two nouns + and', 'Rahim and Nadia are cousins.', 'Rahim and Nadia'],
          ['-ing activity', 'Reading improves vocabulary.', 'Reading']
        ]
      }
    },
    {
      heading: '3. Subject pronouns vs object pronouns',
      en: 'Only subject pronouns can be the subject: I, you, he, she, it, we, they. Object pronouns (me, him, her, us, them) are used after the verb or after a preposition.',
      bn: 'কর্তা হিসেবে শুধু I, you, he, she, it, we, they বসে। Me, him, her, us, them কর্তা হতে পারে না — এগুলো verb-এর পরে বসে। "Me and my friend went…" ভুল; সঠিক: "My friend and I went…"।',
      table: {
        head: ['Subject', 'Object', 'Example'],
        rows: [
          ['I', 'me', 'I called her. / She called me.'],
          ['he', 'him', 'He knows us. / We know him.'],
          ['she', 'her', 'She helped them. / They helped her.'],
          ['we', 'us', 'We met them. / They met us.'],
          ['they', 'them', 'They invited me. / I invited them.']
        ]
      }
    },
    {
      heading: '4. One subject, never zero, never two',
      en: 'An English sentence needs exactly one subject for each verb. Do not leave it out (✗ Is my book. ✓ It is my book.) and do not repeat it with a pronoun (✗ My brother he works in Dubai. ✓ My brother works in Dubai.).',
      bn: 'বাংলায় অনেক সময় কর্তা বাদ দিয়ে বলি ("খুব গরম", "বই পড়ছি"), কিন্তু English-এ subject বাদ দেওয়া যায় না। আবার কথ্য বাংলার মতো দুইবার কর্তা বসানোও ভুল: "My father he is a doctor" না বলে বলুন "My father is a doctor"।',
      points: ['✗ Is raining. ✓ It is raining.', '✗ Am a student. ✓ I am a student.', '✗ The teacher she was angry. ✓ The teacher was angry.']
    },
    {
      heading: '5. "It" and "There" as subjects',
      en: 'Use "It" for weather, time, distance and to talk about a situation: It is hot. It is 6 o\'clock. It is far. Use "There is / There are" to say that something exists: There is a bank near my house. There are 30 students in my class.',
      bn: '"It" বসে আবহাওয়া, সময়, দূরত্ব বোঝাতে। আর কোথাও কিছু "আছে" বোঝাতে There is (একটি) / There are (অনেকগুলো) ব্যবহার করি: "আমার বাসার কাছে একটি ব্যাংক আছে" → There is a bank near my house।',
      tip: 'Subject চেনার ৩টি ধাপ: (১) verb খুঁজুন, (২) verb-এর আগে Who/What জিজ্ঞেস করুন, (৩) উত্তরটাই subject — পুরো শব্দগুচ্ছসহ।'
    }
  ],
  examples: [
    { en: 'Karim teaches maths.', bn: 'করিম গণিত পড়ান।', why: 'Verb হলো "teaches"। Who teaches? Karim। তাই subject "Karim" — একটি নাম।' },
    { en: 'She lives in Khulna.', bn: 'সে খুলনায় থাকে।', why: 'Subject একটি pronoun: "She"। Subject pronoun সবসময় verb-এর আগে বসে।' },
    { en: 'The old house near the river is empty.', bn: 'নদীর কাছের পুরোনো বাড়িটি খালি।', why: 'Verb "is"-এর আগের পুরো অংশ "The old house near the river" হলো subject। মূল শব্দ "house", তাই singular verb "is"।' },
    { en: 'Rahim and Nadia are cousins.', bn: 'রহিম ও নাদিয়া চাচাতো ভাইবোন।', why: '"and" দিয়ে দুজন যুক্ত হয়ে একটি subject হয়েছে। দুজন মানে plural, তাই "are"।' },
    { en: 'Reading improves your vocabulary.', bn: 'পড়া তোমার শব্দভান্ডার উন্নত করে।', why: 'এখানে -ing শব্দ "Reading" (পড়া নামক কাজটি) subject হিসেবে বসেছে। -ing subject singular, তাই "improves"।' },
    { en: 'My friend and I went to the market.', bn: 'আমি ও আমার বন্ধু বাজারে গেলাম।', why: 'Subject-এ "me" নয়, "I" বসে। ভদ্রতার নিয়ম হিসেবে "I" শেষে বসে: My friend and I।' },
    { en: 'It is very hot today.', bn: 'আজ খুব গরম।', why: 'বাংলায় কর্তা নেই, কিন্তু English-এ আবহাওয়া বোঝাতে "It" subject হিসেবে লাগে।' },
    { en: 'There is a bank near my house.', bn: 'আমার বাসার কাছে একটি ব্যাংক আছে।', why: 'কিছু "আছে" বোঝাতে There is। "A bank" একটি, তাই "is"।' },
    { en: 'There are thirty students in my class.', bn: 'আমার ক্লাসে ত্রিশজন ছাত্রছাত্রী আছে।', why: '"Thirty students" অনেকজন, তাই There are। "There have thirty students" লেখা ভুল।' },
    { en: 'My brother works in Dubai.', bn: 'আমার ভাই দুবাইতে কাজ করে।', why: 'Subject একবারই বসবে: "My brother"। "My brother he works" — এখানে দুইবার subject হয়ে যায়, তাই ভুল।' },
    { en: 'The children in the park are playing football.', bn: 'পার্কের বাচ্চারা ফুটবল খেলছে।', why: '"In the park" subject-এর অংশ। মূল শব্দ "children" plural, তাই "are"।' },
    { en: 'Everybody likes her.', bn: 'সবাই তাকে পছন্দ করে।', why: 'Subject "Everybody"। অর্থে অনেক মানুষ হলেও grammar-এ singular, তাই "likes"। আর "her" এখানে object।' },
    { en: 'They invited us to the wedding.', bn: 'তারা আমাদের বিয়েতে দাওয়াত দিল।', why: 'Subject pronoun "They", object pronoun "us"। "Them invited we" — উল্টো রূপ ব্যবহার করলে ভুল হবে।' },
    { en: 'Learning English takes time.', bn: 'ইংরেজি শেখা সময়সাপেক্ষ।', why: 'Subject "Learning English" — একটি -ing phrase। Verb "takes"।' },
    { en: 'It is ten kilometres to the airport.', bn: 'বিমানবন্দর এখান থেকে দশ কিলোমিটার।', why: 'দূরত্ব বোঝাতে "It" subject হিসেবে বসে।' },
    { en: 'My mother and father work in Sylhet.', bn: 'আমার মা ও বাবা সিলেটে কাজ করেন।', why: 'দুজন মিলে subject: "My mother and father"। Plural, তাই "work" (works নয়)।' },
    { en: 'The book on the table is mine.', bn: 'টেবিলের উপরের বইটা আমার।', why: 'Who/What is mine? The book on the table। Subject পুরো phrase, verb "is"।' },
    { en: 'He and his wife run a small restaurant.', bn: 'সে ও তার স্ত্রী একটি ছোট রেস্তোরাঁ চালায়।', why: 'Subject-এ "he" (him নয়) বসে। দুজন মিলে plural, তাই "run"।' },
    { en: 'Nobody answered the phone.', bn: 'কেউ ফোন ধরল না।', why: '"Nobody" subject, এবং এটি নিজেই negative অর্থ দেয়। তাই "didn\'t" লাগে না।' },
    { en: 'Where does your sister study?', bn: 'তোমার বোন কোথায় পড়ে?', why: 'প্রশ্নে subject "your sister" বসে does-এর পরে এবং মূল verb "study"-এর আগে।' }
  ],
  mcq: [
    { id: 'sb_mcq_01', concept: 'subject', prompt: 'What is the subject? "The new students arrived late."', options: ['The new students', 'arrived', 'late', 'new'], answer: 'The new students', explanation: 'Who arrived late? The new students. The whole phrase before the verb is the subject.' },
    { id: 'sb_mcq_02', concept: 'subject-pronoun', prompt: '___ went to the cinema last night.', options: ['Me and Rina', 'Rina and me', 'Rina and I', 'Rina and myself'], answer: 'Rina and I', explanation: 'In the subject position use "I", not "me" or "myself". Put "I" last: Rina and I.' },
    { id: 'sb_mcq_03', concept: 'double-subject', prompt: 'Choose the correct sentence.', options: ['My father he is a doctor.', 'My father is a doctor.', 'He my father is a doctor.', 'My father, he a doctor.'], answer: 'My father is a doctor.', explanation: 'Use one subject only. "My father he…" repeats the subject.' },
    { id: 'sb_mcq_04', concept: 'dummy-subject', prompt: '___ is ten o\'clock.', options: ['There', 'It', 'This time', 'Is (no word)'], answer: 'It', explanation: 'For time we use "It" as the subject: It is ten o\'clock.' },
    { id: 'sb_mcq_05', concept: 'there-is', prompt: '___ a pharmacy next to the school.', options: ['It is', 'There is', 'There are', 'Have'], answer: 'There is', explanation: 'To say something exists, use "There is" + one thing: There is a pharmacy.' },
    { id: 'sb_mcq_06', concept: 'there-is', prompt: '___ many people in the bus.', options: ['There is', 'It is', 'There are', 'They are have'], answer: 'There are', explanation: '"Many people" is plural, so use "There are".' },
    { id: 'sb_mcq_07', concept: 'subject', prompt: 'What is the subject? "Swimming in the river is dangerous."', options: ['the river', 'Swimming in the river', 'dangerous', 'is'], answer: 'Swimming in the river', explanation: 'What is dangerous? Swimming in the river. An -ing activity can be a subject.' },
    { id: 'sb_mcq_08', concept: 'subject-pronoun', prompt: '___ always helps me with my homework.', options: ['Him', 'He', 'His', 'Himself'], answer: 'He', explanation: 'The subject needs a subject pronoun: He.' },
    { id: 'sb_mcq_09', concept: 'subject', prompt: 'Which sentence is missing its subject?', options: ['Is a beautiful day.', 'It is a beautiful day.', 'The day is beautiful.', 'What a beautiful day it is!'], answer: 'Is a beautiful day.', explanation: 'English sentences cannot start with the verb in statements. Add "It": It is a beautiful day.' },
    { id: 'sb_mcq_10', concept: 'sva', prompt: 'The box of apples ___ on the table.', options: ['are', 'is', 'were', 'be'], answer: 'is', explanation: 'The main word of the subject is "box" (singular), not "apples". So: The box … is.' },
    { id: 'sb_mcq_11', concept: 'subject', prompt: 'Find the subject: "Where do your parents live?"', options: ['Where', 'do', 'your parents', 'live'], answer: 'your parents', explanation: 'In questions the subject comes after do/does: Who lives? Your parents.' },
    { id: 'sb_mcq_12', concept: 'subject-pronoun', prompt: '___ are my best friends.', options: ['Them', 'They', 'Their', 'Theirs'], answer: 'They', explanation: '"They" is the subject pronoun. "Them" is only for objects.' },
    { id: 'sb_mcq_13', concept: 'sva', prompt: 'Rahim and his brother ___ in the same school.', options: ['studies', 'study', 'is study', 'studying'], answer: 'study', explanation: 'Two people joined by "and" make a plural subject, so no -s: study.' },
    { id: 'sb_mcq_14', concept: 'sva', prompt: 'Everybody ___ the new teacher.', options: ['like', 'likes', 'are liking', 'liking'], answer: 'likes', explanation: '"Everybody" is grammatically singular → likes.' },
    { id: 'sb_mcq_15', concept: 'dummy-subject', prompt: 'বাড়ি থেকে স্কুল দুই কিলোমিটার। Choose the correct English.', options: ['Is two kilometres from home to school.', 'It is two kilometres from home to school.', 'There two kilometres from home to school.', 'Two kilometres is it from home to school.'], answer: 'It is two kilometres from home to school.', explanation: 'Distance sentences use "It" as the subject.' },
    { id: 'sb_mcq_16', concept: 'double-subject', prompt: 'Choose the correct sentence.', options: ['The children they are playing.', 'The children are playing.', 'They the children are playing.', 'Are playing the children.'], answer: 'The children are playing.', explanation: 'One subject only: The children. Do not repeat it with "they".' },
    { id: 'sb_mcq_17', concept: 'subject', prompt: 'Which word is the subject? "Yesterday my uncle bought a new car."', options: ['Yesterday', 'my uncle', 'bought', 'a new car'], answer: 'my uncle', explanation: 'Who bought? My uncle. "Yesterday" is a time word, not the subject, even though it comes first.' },
    { id: 'sb_mcq_18', concept: 'there-is', prompt: 'আমার ব্যাগে দুটি বই আছে। Choose the correct English.', options: ['There is two books in my bag.', 'There are two books in my bag.', 'It has two books in my bag.', 'Have two books in my bag.'], answer: 'There are two books in my bag.', explanation: 'Use "There are" with a plural noun to say something exists. "It has" and "Have" are Bangla-style translations of "আছে".' },
    { id: 'sb_mcq_19', concept: 'subject-pronoun', prompt: 'My sister and ___ share a room.', options: ['me', 'I', 'myself', 'mine'], answer: 'I', explanation: 'This is the subject of "share", so use "I".' },
    { id: 'sb_mcq_20', concept: 'subject', prompt: 'Which sentence has a correct subject + verb order?', options: ['Very important is English.', 'English very important is.', 'English is very important.', 'Is English very important.'], answer: 'English is very important.', explanation: 'Statements follow Subject + Verb: English + is + very important.' }
  ],
  written: [
    {
      id: 'sb_wr_01', concept: 'subject-pronoun', subtype: 'Correct the sentence',
      prompt: 'Me and my friend play cricket every evening.',
      accepted: ['My friend and I play cricket every evening.', 'I and my friend play cricket every evening.'],
      checks: [{ pattern: '^\\s*(me and|my friend and me)\\b', what: '"me" is used as a subject.', why: 'Subjects need "I", not "me": My friend and I play cricket.', concept: 'subject-pronoun' }],
      better: 'My friend and I play cricket every evening.',
      explanation: 'Subject pronoun "I", placed last for politeness.'
    },
    {
      id: 'sb_wr_02', concept: 'double-subject', subtype: 'Correct the sentence',
      prompt: 'My mother she cooks very well.',
      accepted: ['My mother cooks very well.', 'She cooks very well.'],
      checks: [{ pattern: 'mother\\s+she\\b', what: 'The subject is repeated.', why: 'Use one subject only: My mother cooks very well.', concept: 'double-subject' }],
      better: 'My mother cooks very well.',
      explanation: 'One subject (My mother) + verb (cooks).'
    },
    {
      id: 'sb_wr_03', concept: 'dummy-subject', subtype: 'Bangla → English',
      prompt: 'এখন সাতটা বাজে।',
      accepted: ['It is seven o\'clock now.', 'It\'s seven o\'clock now.', 'It is 7 o\'clock now.', 'It is seven now.', 'It is now seven o\'clock.', 'It is seven o\'clock.'],
      checks: [{ pattern: '^\\s*(is|now is|seven)', what: 'The subject is missing.', why: 'Time sentences need "It": It is seven o\'clock.', concept: 'dummy-subject' }],
      explanation: 'It + is + seven o\'clock + now.'
    },
    {
      id: 'sb_wr_04', concept: 'there-is', subtype: 'Bangla → English',
      prompt: 'আমাদের গ্রামে একটি স্কুল আছে।',
      accepted: ['There is a school in our village.', 'Our village has a school.'],
      checks: [
        { pattern: 'have a school in our village', what: '"have" is used to say something exists.', why: 'Use "There is": There is a school in our village.', concept: 'there-is' },
        { pattern: '^\\s*a school is in our village', what: 'Grammatically possible but unnatural.', why: 'English usually says "There is a school in our village."', concept: 'collocation' },
        { pattern: 'there are a school', what: '"There are" is used with one thing.', why: 'One school → There is.', concept: 'there-is' }
      ],
      explanation: 'There is + a school + in our village.'
    },
    {
      id: 'sb_wr_05', concept: 'there-is', subtype: 'Fill in the blank',
      prompt: 'There ___ five rooms in our flat.',
      accepted: ['are'],
      checks: [{ pattern: '^\\s*(is|have|has)\\s*$', what: 'Wrong verb for a plural noun.', why: '"Five rooms" is plural → There are.', concept: 'there-is' }],
      explanation: 'There are + plural noun.'
    },
    {
      id: 'sb_wr_06', concept: 'subject-pronoun', subtype: 'Fill in the blank (she / her)',
      prompt: '___ teaches English at a college.',
      accepted: ['She'],
      checks: [{ pattern: '^\\s*her\\s*$', what: '"Her" is an object pronoun.', why: 'The subject needs "She".', concept: 'subject-pronoun' }],
      explanation: 'Subject pronoun: She.'
    },
    {
      id: 'sb_wr_07', concept: 'subject', subtype: 'Correct the sentence',
      prompt: 'Is very difficult this exercise.',
      accepted: ['This exercise is very difficult.'],
      checks: [{ pattern: '^\\s*is\\s+very', what: 'The verb comes before the subject.', why: 'Statements need Subject + Verb: This exercise is very difficult.', concept: 'subject' }],
      explanation: 'Subject first: This exercise + is + very difficult.'
    },
    {
      id: 'sb_wr_08', concept: 'subject', subtype: 'Write the subject only',
      prompt: 'The girl with the red bag is my cousin. → Subject = ?',
      accepted: ['The girl with the red bag'],
      checks: [{ pattern: '^\\s*the girl\\s*$', what: 'Only part of the subject.', why: 'The subject is everything before the verb "is": The girl with the red bag.', concept: 'subject' }],
      explanation: 'Who is my cousin? The girl with the red bag.'
    },
    {
      id: 'sb_wr_09', concept: 'sva', subtype: 'Bangla → English',
      prompt: 'রহিম ও করিম ভালো বন্ধু।',
      accepted: ['Rahim and Karim are good friends.'],
      checks: [
        { pattern: 'karim\\s+is\\s+good', what: '"is" with a plural subject.', why: 'Two people → are.', concept: 'sva' },
        { pattern: 'karim\\s+good friends', what: 'The verb is missing.', why: 'Add "are": Rahim and Karim are good friends.', concept: 'missing-be' },
        { pattern: 'good friend\\.?$', what: '"friend" should be plural.', why: 'Two people are two friends: good friends.', concept: 'sva' }
      ],
      explanation: 'Plural subject (Rahim and Karim) + are.'
    },
    {
      id: 'sb_wr_10', concept: 'dummy-subject', subtype: 'Bangla → English',
      prompt: 'আজ খুব বাতাস।',
      accepted: ['It is very windy today.', 'It\'s very windy today.', 'Today it is very windy.', 'Today, it is very windy.'],
      checks: [
        { pattern: '^\\s*(today\\s+)?(is\\s+)?very windy', what: 'The subject is missing.', why: 'Weather needs "It": It is very windy today.', concept: 'dummy-subject' },
        { pattern: 'very wind\\b', what: '"wind" is a noun.', why: 'Use the adjective "windy": It is very windy.', concept: 'collocation' }
      ],
      explanation: 'It + is + very windy + today.'
    },
    {
      id: 'sb_wr_11', concept: 'subject-pronoun', subtype: 'Rewrite with a pronoun',
      prompt: 'Replace the subject with a pronoun: "My parents are at home."',
      accepted: ['They are at home.'],
      checks: [{ pattern: '^\\s*them\\b', what: '"Them" is an object pronoun.', why: 'Use the subject pronoun "They".', concept: 'subject-pronoun' }],
      explanation: 'My parents = they.'
    },
    {
      id: 'sb_wr_12', concept: 'subject', subtype: 'Rearrange the words',
      prompt: 'near / lives / my / grandmother / the mosque',
      accepted: ['My grandmother lives near the mosque.'],
      explanation: 'Subject (My grandmother) + verb (lives) + place.'
    },
    {
      id: 'sb_wr_13', concept: 'double-subject', subtype: 'Correct the sentence',
      prompt: 'The teacher she gave us homework.',
      accepted: ['The teacher gave us homework.', 'She gave us homework.'],
      checks: [{ pattern: 'teacher\\s+she\\b', what: 'The subject is repeated.', why: 'One subject only: The teacher gave us homework.', concept: 'double-subject' }],
      better: 'The teacher gave us homework.',
      explanation: 'The teacher + gave + us + homework.'
    },
    {
      id: 'sb_wr_14', concept: 'subject', subtype: 'Bangla → English',
      prompt: 'সাঁতার কাটা স্বাস্থ্যের জন্য ভালো।',
      accepted: ['Swimming is good for health.', 'Swimming is good for your health.', 'Swimming is good for our health.', 'Swimming is good for the health.', 'Swimming is healthy.'],
      checks: [
        { pattern: '^\\s*swim\\s+is', what: 'The base verb is used as the subject.', why: 'Use the -ing form for an activity as a subject: Swimming is…', concept: 'subject' },
        { pattern: '^\\s*swimming\\s+good', what: 'The verb is missing.', why: 'Add "is": Swimming is good for health.', concept: 'missing-be' }
      ],
      explanation: 'An -ing activity as subject: Swimming + is + good for health.'
    },
    {
      id: 'sb_wr_15', concept: 'there-is', subtype: 'Correct the sentence',
      prompt: 'It has many shops in this street.',
      accepted: ['There are many shops in this street.', 'There are many shops on this street.', 'This street has many shops.'],
      checks: [{ pattern: '^\\s*it has', what: '"It has" is used to say something exists.', why: 'Use "There are": There are many shops in this street.', concept: 'there-is' }],
      explanation: 'Existence → There is / There are.'
    },
    {
      id: 'sb_wr_16', concept: 'subject-pronoun', subtype: 'Fill in the blank (we / us)',
      prompt: '___ are going to Cox\'s Bazar next week.',
      accepted: ['We'],
      checks: [{ pattern: '^\\s*us\\s*$', what: '"Us" is an object pronoun.', why: 'The subject needs "We".', concept: 'subject-pronoun' }],
      explanation: 'Subject pronoun: We.'
    },
    {
      id: 'sb_wr_17', concept: 'sva', subtype: 'Fill in the blank (be)',
      prompt: 'The keys to the car ___ in my bag.',
      accepted: ['are'],
      checks: [{ pattern: '^\\s*is\\s*$', what: 'The verb agrees with "car" instead of "keys".', why: 'The main word of the subject is "keys" (plural) → are.', concept: 'sva' }],
      explanation: 'Subject: The keys (to the car) → plural → are.'
    },
    {
      id: 'sb_wr_18', concept: 'subject', subtype: 'Bangla → English',
      prompt: 'আমি একজন ছাত্র।',
      accepted: ['I am a student.', 'I\'m a student.'],
      checks: [
        { pattern: '^\\s*am a student', what: 'The subject "I" is missing.', why: 'English needs a subject: I am a student.', concept: 'subject' },
        { pattern: '^\\s*i\\s+(a\\s+)?student', what: 'The verb "am" is missing.', why: 'I + am + a student.', concept: 'missing-be' },
        { pattern: '^\\s*i am student', what: 'The article "a" is missing.', why: 'A singular job/role needs "a": a student.', concept: 'missing-article' }
      ],
      explanation: 'I + am + a + student.'
    },
    {
      id: 'sb_wr_19', concept: 'subject-pronoun', subtype: 'Bangla → English',
      prompt: 'সে এবং আমি একই অফিসে কাজ করি।',
      accepted: ['He and I work in the same office.', 'She and I work in the same office.', 'He and I work at the same office.', 'She and I work at the same office.'],
      checks: [
        { pattern: '^\\s*(him|her) and (i|me)', what: 'An object pronoun is used as subject.', why: 'Use "He/She and I".', concept: 'subject-pronoun' },
        { pattern: 'and me work', what: '"me" is used as subject.', why: 'Use "I" in the subject: He and I work…', concept: 'subject-pronoun' },
        { pattern: 'and i works', what: '-s added to a plural subject.', why: 'Two people → work.', concept: 'sva' }
      ],
      explanation: 'Plural subject (He and I) + work + in the same office.'
    },
    {
      id: 'sb_wr_20', concept: 'subject', subtype: 'Write the subject only',
      prompt: 'Does your younger brother like football? → Subject = ?',
      accepted: ['your younger brother', 'Your younger brother'],
      checks: [{ pattern: '^\\s*(does|brother)\\s*$', what: 'This is not the full subject.', why: 'Who likes football? Your younger brother.', concept: 'subject' }],
      explanation: 'In a question the subject comes after does: your younger brother.'
    }
  ]
};
