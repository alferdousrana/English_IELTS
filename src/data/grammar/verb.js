export default {
  id: 'verb',
  title: 'Verb',
  difficulty: 'beginner',
  explanation: [
    {
      heading: '1. What is a verb?',
      en: 'A verb tells us what the subject does (an action) or what the subject is or has (a state). It is the heart of the sentence: without a verb there is no sentence. To find the verb, ask "What does the subject do?" or "What is the subject?"',
      bn: 'Verb (ক্রিয়া) বলে subject কী করে (কাজ), অথবা কী অবস্থায় আছে (অবস্থা)। Verb হলো বাক্যের প্রাণ — verb ছাড়া কোনো English sentence হয় না। বাংলায় "সে খুব ভালো" বলা যায়, কিন্তু English-এ "She is very good" — "is" নামের verb লাগবেই।',
      points: ['Action: She runs every morning. → runs', 'State: I know the answer. → know', 'Being: They are tired. → are']
    },
    {
      heading: '2. Three kinds of verbs',
      table: {
        head: ['Kind', 'What it shows', 'Examples'],
        rows: [
          ['Action verb', 'something you do', 'eat, run, write, build, speak, buy'],
          ['State verb', 'feelings, thoughts, owning', 'know, like, love, want, need, believe, have (own)'],
          ['Linking verb', 'connects the subject to a description', 'be, become, seem, look, feel, taste, smell, sound']
        ]
      },
      bn: 'Action verb দিয়ে দৃশ্যমান কাজ বোঝায় (খাওয়া, লেখা)। State verb দিয়ে মনের অবস্থা বা মালিকানা বোঝায় (জানা, পছন্দ করা)। State verb সাধারণত -ing form-এ বসে না: "I am knowing" ভুল, "I know" সঠিক। Linking verb subject-কে তার বর্ণনার সাথে জোড়া দেয়: She looks happy (happily নয়)।'
    },
    {
      heading: '3. Main verbs and helping verbs',
      en: 'The main verb carries the meaning. Helping (auxiliary) verbs come before it to show tense, negative, questions or ability: be (am, is, are, was, were), do (do, does, did), have (has, have, had) and modals (can, could, will, would, should, must, may, might). Main verb + helping verbs together make the verb phrase.',
      bn: 'Main verb আসল অর্থ বহন করে (read, eat)। Helping verb তার আগে বসে tense, না-বোধক, প্রশ্ন বা সামর্থ্য বোঝায়। "She is reading" — is = helping, reading = main। "He doesn\'t like tea" — doesn\'t = helping, like = main। "I can swim" — can = helping (modal), swim = main।',
      table: {
        head: ['Helping verb', '+ main verb form', 'Example'],
        rows: [
          ['am / is / are', 'verb + ing', 'She is cooking.'],
          ['do / does / did', 'base verb', 'Does he work here?'],
          ['have / has / had', 'past participle (V3)', 'I have finished.'],
          ['can, will, must, should…', 'base verb (no "to")', 'You should rest.']
        ]
      }
    },
    {
      heading: '4. The five forms of a verb',
      table: {
        head: ['Base (V1)', '-s form', 'Past (V2)', '-ing form', 'Past participle (V3)'],
        rows: [
          ['play', 'plays', 'played', 'playing', 'played'],
          ['study', 'studies', 'studied', 'studying', 'studied'],
          ['go', 'goes', 'went', 'going', 'gone'],
          ['eat', 'eats', 'ate', 'eating', 'eaten'],
          ['write', 'writes', 'wrote', 'writing', 'written']
        ]
      },
      bn: 'প্রতিটি verb-এর পাঁচটি রূপ আছে। Regular verb-এ past ও V3 দুটোই -ed (played)। Irregular verb-এর রূপ আলাদা (go → went → gone) — এগুলো মুখস্থ করতে হয়। কোন helping verb-এর পরে কোন রূপ বসবে, সেটাই grammar-এর বড় অংশ।'
    },
    {
      heading: '5. Classic verb mistakes',
      points: ['✗ She very busy. ✓ She is very busy. (missing verb)', '✗ I am go to work. ✓ I go to work. (two main-verb patterns mixed)', '✗ He can drives. ✓ He can drive. (base verb after modals)', '✗ I must to go. ✓ I must go. (no "to" after modals)', '✗ I am knowing him. ✓ I know him. (state verb in -ing)', '✗ She look happily. ✓ She looks happy. (linking verb + adjective)'],
      tip: 'Modal (can, will, must, should) আর do/does/did-এর পরে সবসময় verb-এর base form। কোনো s, ed, ing বা to নয়।'
    }
  ],
  examples: [
    { en: 'She runs every morning.', bn: 'সে প্রতিদিন সকালে দৌড়ায়।', why: '"Runs" একটি action verb — দৃশ্যমান কাজ। She হওয়ায় run-এর সাথে s যোগ হয়েছে।' },
    { en: 'I know the answer.', bn: 'আমি উত্তরটা জানি।', why: '"Know" একটি state verb — মনের অবস্থা। এজন্য "I am knowing" বলা যায় না।' },
    { en: 'They are tired.', bn: 'তারা ক্লান্ত।', why: '"Are" এখানে main verb (be)। বাংলায় "হয়" বলা লাগে না, কিন্তু English-এ verb ছাড়া চলবে না।' },
    { en: 'She is cooking dinner.', bn: 'সে রাতের খাবার রান্না করছে।', why: '"Is" helping verb, "cooking" main verb। am/is/are-এর পরে verb + ing বসে।' },
    { en: 'He doesn\'t like tea.', bn: 'সে চা পছন্দ করে না।', why: '"Doesn\'t" helping verb, "like" main verb। Does/doesn\'t-এর পরে base form, তাই "likes" নয়।' },
    { en: 'I can swim.', bn: 'আমি সাঁতার কাটতে পারি।', why: '"Can" একটি modal (helping verb), "swim" main verb। Modal-এর পরে base form, কোনো "to" নয়।' },
    { en: 'We have finished our homework.', bn: 'আমরা আমাদের বাড়ির কাজ শেষ করেছি।', why: '"Have" helping verb, "finished" past participle (V3)। Have/has-এর পরে সবসময় V3।' },
    { en: 'The soup tastes delicious.', bn: 'স্যুপটির স্বাদ দারুণ।', why: '"Tastes" এখানে linking verb। তাই এর পরে adjective "delicious" বসেছে, adverb নয়।' },
    { en: 'My brother became an engineer.', bn: 'আমার ভাই একজন প্রকৌশলী হয়েছে।', why: '"Became" linking verb — subject-কে "an engineer"-এর সাথে জোড়া দিয়েছে।' },
    { en: 'You should drink more water.', bn: 'তোমার আরো পানি পান করা উচিত।', why: '"Should" modal, "drink" base form। "Should to drink" বা "should drinks" ভুল।' },
    { en: 'Did you call your mother?', bn: 'তুমি কি তোমার মাকে ফোন করেছিলে?', why: '"Did" helping verb, "call" main verb base form-এ। Past বোঝানোর দায়িত্ব did নিয়েছে, তাই "called" নয়।' },
    { en: 'The children played in the garden.', bn: 'বাচ্চারা বাগানে খেলেছিল।', why: 'Regular verb: play-এর past form -ed যোগ করে "played"।' },
    { en: 'He went to Chattogram last week.', bn: 'সে গত সপ্তাহে চট্টগ্রামে গিয়েছিল।', why: 'Irregular verb: go-এর past form "went", "goed" নয়।' },
    { en: 'I need a new phone.', bn: 'আমার একটি নতুন ফোন দরকার।', why: '"Need" state verb। বাংলায় "আমার দরকার" বলি, কিন্তু English-এ subject "I" + verb "need"।' },
    { en: 'She seems happy today.', bn: 'আজ তাকে খুশি মনে হচ্ছে।', why: '"Seems" linking verb, তাই adjective "happy"। "Seems happily" ভুল।' },
    { en: 'They will arrive tomorrow.', bn: 'তারা আগামীকাল পৌঁছাবে।', why: '"Will" helping verb (modal), "arrive" base form। Future বোঝাতে will + base verb।' },
    { en: 'The baby has eaten his food.', bn: 'শিশুটি তার খাবার খেয়ে ফেলেছে।', why: '"Has" + V3। Eat-এর V3 হলো "eaten" (irregular), "ate" নয়।' },
    { en: 'We were at home yesterday.', bn: 'আমরা গতকাল বাসায় ছিলাম।', why: '"Were" হলো be-এর past form, এখানে main verb। "We" plural, তাই was নয়, were।' },
    { en: 'I must finish this report today.', bn: 'আমাকে আজ এই রিপোর্টটি শেষ করতেই হবে।', why: '"Must" modal, "finish" base form। "Must to finish" বলা যায় না।' },
    { en: 'This music sounds beautiful.', bn: 'এই সংগীত শুনতে সুন্দর লাগে।', why: '"Sounds" linking verb, তাই adjective "beautiful"। বাংলার "শুনতে লাগে" English-এ "sounds"।' }
  ],
  mcq: [
    { id: 'vb_mcq_01', concept: 'verb-type', prompt: 'Which word is the verb? "The students wrote an essay."', options: ['students', 'wrote', 'an', 'essay'], answer: 'wrote', explanation: 'What did the students do? They wrote. "Wrote" is the verb (past of write).' },
    { id: 'vb_mcq_02', concept: 'missing-be', prompt: 'Choose the correct sentence.', options: ['My room very small.', 'My room is very small.', 'My room small is.', 'Very small my room.'], answer: 'My room is very small.', explanation: 'Every sentence needs a verb. With an adjective, use a be verb: is.' },
    { id: 'vb_mcq_03', concept: 'main-helping', prompt: 'In "She is reading a book", the main verb is:', options: ['She', 'is', 'reading', 'book'], answer: 'reading', explanation: '"Is" is the helping verb; "reading" carries the meaning, so it is the main verb.' },
    { id: 'vb_mcq_04', concept: 'main-helping', prompt: 'He can ___ three languages.', options: ['speaks', 'speak', 'to speak', 'speaking'], answer: 'speak', explanation: 'After a modal (can, will, must, should), use the base verb with no -s and no "to".' },
    { id: 'vb_mcq_05', concept: 'main-helping', prompt: 'You must ___ your seatbelt.', options: ['to wear', 'wearing', 'wear', 'wears'], answer: 'wear', explanation: 'Modals are followed by the base verb: must wear. Never "must to".' },
    { id: 'vb_mcq_06', concept: 'verb-type', prompt: 'Choose the correct sentence.', options: ['I am knowing your brother.', 'I know your brother.', 'I knowing your brother.', 'I am know your brother.'], answer: 'I know your brother.', explanation: '"Know" is a state verb, so it is not normally used in the -ing form.' },
    { id: 'vb_mcq_07', concept: 'linking-verb', prompt: 'You look ___ today.', options: ['beautifully', 'beautiful', 'beauty', 'more beautifully'], answer: 'beautiful', explanation: '"Look" here is a linking verb (describing appearance), so it takes an adjective: beautiful.' },
    { id: 'vb_mcq_08', concept: 'be-plus-verb', prompt: 'Choose the correct sentence.', options: ['I am go to the office by bus.', 'I go to the office by bus.', 'I am goes to the office by bus.', 'I going to the office by bus.'], answer: 'I go to the office by bus.', explanation: 'For routines use the Present Simple: I go. Do not put "am" before a base verb.' },
    { id: 'vb_mcq_09', concept: 'main-helping', prompt: 'We have ___ the whole film.', options: ['saw', 'see', 'seen', 'seeing'], answer: 'seen', explanation: 'After have/has, use the past participle (V3): see → saw → seen.' },
    { id: 'vb_mcq_10', concept: 'base-after-does', prompt: 'Did she ___ the email?', options: ['sent', 'sends', 'send', 'sending'], answer: 'send', explanation: 'After did, use the base verb. "Did" already shows the past.' },
    { id: 'vb_mcq_11', concept: 'verb-type', prompt: 'Which verb is a linking verb here?', options: ['He kicked the ball.', 'He became a doctor.', 'He bought a car.', 'He wrote a letter.'], answer: 'He became a doctor.', explanation: '"Became" connects "he" to "a doctor" (he = a doctor). The others are action verbs with objects.' },
    { id: 'vb_mcq_12', concept: 'main-helping', prompt: 'Past of "go":', options: ['goed', 'gone', 'went', 'goes'], answer: 'went', explanation: 'Go is irregular: go → went → gone.' },
    { id: 'vb_mcq_13', concept: 'main-helping', prompt: 'They ___ playing cricket now.', options: ['is', 'are', 'do', 'have'], answer: 'are', explanation: 'For -ing actions happening now: they + are + playing.' },
    { id: 'vb_mcq_14', concept: 'linking-verb', prompt: 'This milk smells ___.', options: ['badly', 'bad', 'worse badly', 'to bad'], answer: 'bad', explanation: '"Smell" is a linking verb here, so it takes an adjective: smells bad.' },
    { id: 'vb_mcq_15', concept: 'main-helping', prompt: 'She should ___ more vegetables.', options: ['eats', 'eat', 'eating', 'ate'], answer: 'eat', explanation: 'Should + base verb: should eat.' },
    { id: 'vb_mcq_16', concept: 'verb-type', prompt: 'How many verbs (helping + main) are in "He has been working"?', options: ['one', 'two', 'three', 'four'], answer: 'three', explanation: 'has (helping) + been (helping) + working (main) = three words in one verb phrase.' },
    { id: 'vb_mcq_17', concept: 'main-helping', prompt: 'আমি গাড়ি চালাতে পারি না। Choose the correct English.', options: ['I can\'t drive a car.', 'I can\'t to drive a car.', 'I not can drive a car.', 'I can\'t drives a car.'], answer: 'I can\'t drive a car.', explanation: 'Negative modal: can\'t + base verb.' },
    { id: 'vb_mcq_18', concept: 'main-helping', prompt: 'The past participle (V3) of "write" is:', options: ['wrote', 'writed', 'written', 'writing'], answer: 'written', explanation: 'write → wrote → written.' },
    { id: 'vb_mcq_19', concept: 'missing-be', prompt: 'আমরা খুব খুশি। Choose the correct English.', options: ['We very happy.', 'We are very happy.', 'We are very happily.', 'We is very happy.'], answer: 'We are very happy.', explanation: 'We + are + adjective. Bangla has no verb here; English needs "are".' },
    { id: 'vb_mcq_20', concept: 'verb-type', prompt: 'Which sentence uses a state verb correctly?', options: ['I am wanting a coffee.', 'I want a coffee.', 'I wanting a coffee.', 'I am want a coffee.'], answer: 'I want a coffee.', explanation: '"Want" is a state verb, so use the simple form: I want.' }
  ],
  written: [
    {
      id: 'vb_wr_01', concept: 'missing-be', subtype: 'Correct the sentence',
      prompt: 'She very busy today.',
      accepted: ['She is very busy today.', 'She\'s very busy today.'],
      checks: [{ pattern: '^\\s*she\\s+very', what: 'The verb is missing.', why: 'Add "is": She is very busy today.', concept: 'missing-be' }],
      explanation: 'Subject + is + adjective.'
    },
    {
      id: 'vb_wr_02', concept: 'main-helping', subtype: 'Correct the sentence',
      prompt: 'He can drives a motorbike.',
      accepted: ['He can drive a motorbike.', 'He can ride a motorbike.'],
      checks: [{ pattern: 'can\\s+drives', what: '-s is added after a modal.', why: 'After can, use the base verb: can drive.', concept: 'main-helping' }],
      explanation: 'Modal + base verb. (For motorbikes, "ride" is also natural.)'
    },
    {
      id: 'vb_wr_03', concept: 'main-helping', subtype: 'Correct the sentence',
      prompt: 'I must to finish my work.',
      accepted: ['I must finish my work.'],
      checks: [{ pattern: 'must\\s+to', what: '"to" after a modal.', why: 'Modals are followed directly by the base verb: must finish.', concept: 'main-helping' }],
      explanation: 'Must + base verb.'
    },
    {
      id: 'vb_wr_04', concept: 'verb-type', subtype: 'Correct the sentence',
      prompt: 'I am liking this song.',
      accepted: ['I like this song.', 'I love this song.'],
      checks: [{ pattern: 'am\\s+liking', what: 'A state verb is used in the -ing form.', why: '"Like" is a state verb: I like this song.', concept: 'verb-type' }],
      explanation: 'State verbs use the simple form.'
    },
    {
      id: 'vb_wr_05', concept: 'linking-verb', subtype: 'Correct the sentence',
      prompt: 'The flowers smell nicely.',
      accepted: ['The flowers smell nice.', 'The flowers smell good.', 'The flowers smell lovely.', 'The flowers smell sweet.'],
      checks: [{ pattern: 'smell\\s+nicely', what: 'An adverb after a linking verb.', why: '"Smell" is a linking verb here, so use an adjective: smell nice.', concept: 'linking-verb' }],
      explanation: 'Linking verb + adjective.'
    },
    {
      id: 'vb_wr_06', concept: 'main-helping', subtype: 'Fill in the blank (go)',
      prompt: 'Yesterday we ___ to the zoo.',
      accepted: ['went'],
      checks: [{ pattern: '^\\s*(goed|go|gone|goes)\\s*$', what: 'Wrong form of "go".', why: 'Past simple of go is "went".', concept: 'main-helping' }],
      explanation: 'go → went → gone.'
    },
    {
      id: 'vb_wr_07', concept: 'main-helping', subtype: 'Fill in the blank (eat)',
      prompt: 'I have already ___ my lunch.',
      accepted: ['eaten', 'had'],
      checks: [{ pattern: '^\\s*(ate|eat|eated)\\s*$', what: 'Wrong verb form after "have".', why: 'Have + past participle (V3): eaten.', concept: 'main-helping' }],
      explanation: 'eat → ate → eaten.'
    },
    {
      id: 'vb_wr_08', concept: 'be-plus-verb', subtype: 'Correct the sentence',
      prompt: 'My father is work in a factory.',
      accepted: ['My father works in a factory.', 'My father is working in a factory.'],
      checks: [{ pattern: 'is\\s+work\\b', what: '"is" + base verb.', why: 'Use the Present Simple (works) or the Present Continuous (is working), not "is work".', concept: 'be-plus-verb' }],
      better: 'My father works in a factory.',
      explanation: 'Routine → My father works in a factory.'
    },
    {
      id: 'vb_wr_09', concept: 'main-helping', subtype: 'Bangla → English',
      prompt: 'আমি সাঁতার কাটতে পারি।',
      accepted: ['I can swim.'],
      checks: [
        { pattern: 'can\\s+to\\s+swim', what: '"to" after "can".', why: 'can + base verb: I can swim.', concept: 'main-helping' },
        { pattern: 'can\\s+swimming', what: '-ing after "can".', why: 'can + base verb: I can swim.', concept: 'main-helping' }
      ],
      explanation: 'Subject + can + base verb.'
    },
    {
      id: 'vb_wr_10', concept: 'linking-verb', subtype: 'Bangla → English',
      prompt: 'তোমাকে ক্লান্ত দেখাচ্ছে।',
      accepted: ['You look tired.', 'You seem tired.', 'You are looking tired.'],
      checks: [
        { pattern: 'look\\s+tiredly', what: 'An adverb after a linking verb.', why: 'Use the adjective: You look tired.', concept: 'linking-verb' },
        { pattern: '^\\s*you\\s+tired', what: 'The verb is missing.', why: 'Add a linking verb: You look tired.', concept: 'missing-be' }
      ],
      explanation: 'You + look (linking verb) + tired (adjective).'
    },
    {
      id: 'vb_wr_11', concept: 'base-after-does', subtype: 'Correct the sentence',
      prompt: 'Did you watched the match?',
      accepted: ['Did you watch the match?'],
      checks: [{ pattern: 'did\\s+you\\s+watched', what: 'Past form after "did".', why: 'Did + base verb: Did you watch…?', concept: 'base-after-does' }],
      explanation: '"Did" carries the past; the main verb stays in base form.'
    },
    {
      id: 'vb_wr_12', concept: 'main-helping', subtype: 'Fill in the blank (cook)',
      prompt: 'Look! My mother is ___ biryani.',
      accepted: ['cooking', 'making'],
      checks: [{ pattern: '^\\s*(cook|cooks|cooked)\\s*$', what: 'Wrong form after "is".', why: 'am/is/are + verb-ing: is cooking.', concept: 'main-helping' }],
      explanation: 'is + cooking (happening now).'
    },
    {
      id: 'vb_wr_13', concept: 'main-helping', subtype: 'Bangla → English',
      prompt: 'তোমার ডাক্তারের কাছে যাওয়া উচিত।',
      accepted: ['You should see a doctor.', 'You should go to a doctor.', 'You should go to the doctor.', 'You should see the doctor.', 'You should visit a doctor.'],
      checks: [
        { pattern: 'should\\s+to', what: '"to" after "should".', why: 'should + base verb.', concept: 'main-helping' },
        { pattern: 'should\\s+(goes|going|sees)', what: 'Wrong verb form after "should".', why: 'should + base verb: should see / should go.', concept: 'main-helping' }
      ],
      explanation: 'Advice: You should + base verb.'
    },
    {
      id: 'vb_wr_14', concept: 'verb-type', subtype: 'Bangla → English',
      prompt: 'আমি তোমার কথা বিশ্বাস করি।',
      accepted: ['I believe you.'],
      checks: [{ pattern: 'am\\s+believing', what: 'A state verb in the -ing form.', why: '"Believe" is a state verb: I believe you.', concept: 'verb-type' }],
      explanation: 'State verb in simple form: I believe you.'
    },
    {
      id: 'vb_wr_15', concept: 'main-helping', subtype: 'Fill in the blank (write)',
      prompt: 'She has ___ three books.',
      accepted: ['written'],
      checks: [{ pattern: '^\\s*(wrote|writed|write|writes)\\s*$', what: 'Wrong form after "has".', why: 'has + V3: written.', concept: 'main-helping' }],
      explanation: 'write → wrote → written.'
    },
    {
      id: 'vb_wr_16', concept: 'missing-be', subtype: 'Bangla → English',
      prompt: 'বইটি খুব আকর্ষণীয়।',
      accepted: ['The book is very interesting.', 'This book is very interesting.'],
      checks: [
        { pattern: 'book\\s+very', what: 'The verb is missing.', why: 'The book + is + very interesting.', concept: 'missing-be' },
        { pattern: 'very\\s+interested', what: '"interested" describes a person\'s feeling.', why: 'A thing that causes interest is "interesting".', concept: 'collocation' }
      ],
      explanation: 'Subject + is + adjective.'
    },
    {
      id: 'vb_wr_17', concept: 'main-helping', subtype: 'Make it negative',
      prompt: 'They will come to the party.',
      accepted: ['They will not come to the party.', 'They won\'t come to the party.'],
      checks: [
        { pattern: 'will\\s+not\\s+comes', what: '-s after "will not".', why: 'will not + base verb.', concept: 'main-helping' },
        { pattern: 'they\\s+not\\s+will', what: '"not" is before "will".', why: 'The negative goes after the helping verb: will not / won\'t.', concept: 'negative' }
      ],
      explanation: 'Helping verb + not + base verb.'
    },
    {
      id: 'vb_wr_18', concept: 'verb-type', subtype: 'Rearrange the words',
      prompt: 'seems / the / friendly / teacher / new',
      accepted: ['The new teacher seems friendly.'],
      explanation: 'Subject (The new teacher) + linking verb (seems) + adjective (friendly).'
    },
    {
      id: 'vb_wr_19', concept: 'main-helping', subtype: 'Bangla → English',
      prompt: 'আমরা আমাদের প্রজেক্ট শেষ করেছি।',
      accepted: ['We have finished our project.', 'We\'ve finished our project.', 'We have completed our project.', 'We finished our project.', 'We completed our project.'],
      checks: [
        { pattern: 'have\\s+finish\\b', what: 'Base verb after "have".', why: 'have + V3: have finished.', concept: 'main-helping' },
        { pattern: 'have\\s+complete\\b', what: 'Base verb after "have".', why: 'have + V3: have completed.', concept: 'main-helping' }
      ],
      explanation: 'have + past participle (finished).'
    },
    {
      id: 'vb_wr_20', concept: 'main-helping', subtype: 'Write the verb phrase only',
      prompt: '"My sister is studying in her room." → Verb phrase = ?',
      accepted: ['is studying'],
      checks: [{ pattern: '^\\s*(studying|is)\\s*$', what: 'Only part of the verb phrase.', why: 'The verb phrase is helping verb + main verb: is studying.', concept: 'main-helping' }],
      explanation: 'is (helping) + studying (main).'
    }
  ]
};
