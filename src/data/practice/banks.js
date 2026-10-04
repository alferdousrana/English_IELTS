// Raw material for the question generators. Generators combine these lists, so every
// entry multiplies the question count. Keep entries natural and unambiguous.

const v = (b, s, ing, past, pp, a = [], t = []) => ({ b, s, ing, past, pp, a, t });

// p: 1s = I, 2 = you, pl = plural, 3s = he/she/it. pr = pronoun used in question tags.
export const SUBJECTS = [
  { t: 'I', p: '1s', pr: 'I' }, { t: 'You', p: '2', pr: 'you' }, { t: 'We', p: 'pl', pr: 'we' },
  { t: 'They', p: 'pl', pr: 'they' }, { t: 'He', p: '3s', pr: 'he' }, { t: 'She', p: '3s', pr: 'she' },
  { t: 'My brother', p: '3s', pr: 'he' }, { t: 'My sister', p: '3s', pr: 'she' },
  { t: 'Rahim', p: '3s', pr: 'he', name: 1 }, { t: 'Nadia', p: '3s', pr: 'she', name: 1 },
  { t: 'Mr Karim', p: '3s', pr: 'he', name: 1 }, { t: 'The students', p: 'pl', pr: 'they' },
  { t: 'My parents', p: 'pl', pr: 'they' }, { t: 'Tanvir and Mitu', p: 'pl', pr: 'they', name: 1, multi: 1 },
  { t: 'Our neighbours', p: 'pl', pr: 'they' },
  { t: 'One of my friends', p: '3s', pr: 'they', noTag: 1, note: 'The real subject is "one" (singular), not "friends".' },
  { t: 'Each student', p: '3s', pr: 'they', noTag: 1, note: '"Each" + singular noun always takes a singular verb.' },
  { t: 'Everyone in my family', p: '3s', pr: 'they', noTag: 1, note: '"Everyone" is grammatically singular, even though it means many people.' }
];

// a = activity complements (habits, ongoing actions); t = complements for completed actions.
export const VERBS = [
  v('watch', 'watches', 'watching', 'watched', 'watched', ['TV', 'the news', 'football matches'], ['the film', 'the match']),
  v('play', 'plays', 'playing', 'played', 'played', ['football', 'the guitar', 'chess'], ['the match']),
  v('study', 'studies', 'studying', 'studied', 'studied', ['English', 'maths', 'biology']),
  v('read', 'reads', 'reading', 'read', 'read', ['the newspaper', 'novels', 'comics'], ['the book', 'the instructions']),
  v('cook', 'cooks', 'cooking', 'cooked', 'cooked', ['dinner', 'rice', 'fish curry'], ['dinner', 'the rice']),
  v('work', 'works', 'working', 'worked', 'worked', ['in a bank', 'at home', 'in the garden']),
  v('listen', 'listens', 'listening', 'listened', 'listened', ['to music', 'to the radio', 'to podcasts']),
  v('teach', 'teaches', 'teaching', 'taught', 'taught', ['English', 'young children', 'maths']),
  v('wait', 'waits', 'waiting', 'waited', 'waited', ['for the bus', 'for a taxi']),
  v('drive', 'drives', 'driving', 'drove', 'driven', ['to work', 'a small car']),
  v('talk', 'talks', 'talking', 'talked', 'talked', ['to customers', 'on the phone']),
  v('swim', 'swims', 'swimming', 'swam', 'swum', ['in the river', 'in the pool']),
  v('run', 'runs', 'running', 'ran', 'run', ['in the park', 'along the river']),
  v('write', 'writes', 'writing', 'wrote', 'written', ['emails', 'stories', 'reports'], ['the letter', 'the email', 'the essay']),
  v('sing', 'sings', 'singing', 'sang', 'sung', ['songs', 'in a choir']),
  v('go', 'goes', 'going', 'went', 'gone', ['to school', 'to the gym', 'to the market']),
  v('do', 'does', 'doing', 'did', 'done', ['homework', 'the shopping', 'exercise'], ['the homework']),
  v('fix', 'fixes', 'fixing', 'fixed', 'fixed', ['computers', 'old bikes'], ['the bike', 'the computer', 'the door']),
  v('carry', 'carries', 'carrying', 'carried', 'carried', ['a heavy bag', 'the boxes']),
  v('wash', 'washes', 'washing', 'washed', 'washed', ['the dishes', 'the car', 'clothes'], ['the dishes', 'the car']),
  v('speak', 'speaks', 'speaking', 'spoke', 'spoken', ['English', 'Bangla']),
  v('eat', 'eats', 'eating', 'ate', 'eaten', ['rice', 'fruit', 'vegetables'], ['lunch', 'dinner']),
  v('drink', 'drinks', 'drinking', 'drank', 'drunk', ['tea', 'coffee', 'milk']),
  v('sell', 'sells', 'selling', 'sold', 'sold', ['vegetables', 'old books'], ['the car', 'the house']),
  v('catch', 'catches', 'catching', 'caught', 'caught', ['the bus', 'fish'], ['the thief']),
  v('finish', 'finishes', 'finishing', 'finished', 'finished', [], ['the report', 'the project', 'the assignment']),
  v('clean', 'cleans', 'cleaning', 'cleaned', 'cleaned', ['the house', 'the kitchen'], ['the kitchen', 'the room']),
  v('leave', 'leaves', 'leaving', 'left', 'left', [], ['the office', 'the house', 'the party']),
  v('buy', 'buys', 'buying', 'bought', 'bought', ['vegetables', 'groceries'], ['the tickets', 'a new phone']),
  v('send', 'sends', 'sending', 'sent', 'sent', ['emails', 'messages'], ['the parcel', 'the message', 'the invitation']),
  v('pay', 'pays', 'paying', 'paid', 'paid', [], ['the bill', 'the rent']),
  v('complete', 'completes', 'completing', 'completed', 'completed', [], ['the form', 'the course']),
  v('make', 'makes', 'making', 'made', 'made', ['tea', 'breakfast'], ['dinner', 'the cake', 'a decision']),
  v('build', 'builds', 'building', 'built', 'built', [], ['the bridge', 'a new house']),
  v('find', 'finds', 'finding', 'found', 'found', [], ['the keys', 'a new job']),
  v('take', 'takes', 'taking', 'took', 'taken', ['the bus', 'photos'], ['the exam', 'the medicine']),
  v('forget', 'forgets', 'forgetting', 'forgot', 'forgotten', [], ['the password', 'the address']),
  v('see', 'sees', 'seeing', 'saw', 'seen', [], ['the film']),
  v('choose', 'chooses', 'choosing', 'chose', 'chosen', [], ['a topic', 'the colour'])
];

// State verbs: not normally used in continuous tenses.
export const STATIVE = [
  v('know', 'knows', 'knowing', 'knew', 'known', ['the manager']),
  v('have', 'has', 'having', 'had', 'had', ['this car']),
  v('own', 'owns', 'owning', 'owned', 'owned', ['a small shop']),
  v('live', 'lives', 'living', 'lived', 'lived', ['in Dhaka'])
];
export const DURATIONS = ['since 2019', 'for five years', 'since last summer', 'for a long time'];

export const BE_ADJ = ['very tired', 'at home', 'late for work', 'busy', 'happy with the result', 'in the library', 'ready for the test'];

// base past participle (slash = both accepted)
export const IRREGULAR = `begin began begun|break broke broken|bring brought brought|build built built|buy bought bought|catch caught caught|choose chose chosen|come came come|cut cut cut|do did done|draw drew drawn|drink drank drunk|drive drove driven|eat ate eaten|fall fell fallen|feel felt felt|fight fought fought|find found found|fly flew flown|forget forgot forgotten|forgive forgave forgiven|freeze froze frozen|get got got/gotten|give gave given|go went gone|grow grew grown|hang hung hung|have had had|hear heard heard|hide hid hidden|hit hit hit|hold held held|hurt hurt hurt|keep kept kept|know knew known|lead led led|leave left left|lend lent lent|let let let|lose lost lost|make made made|mean meant meant|meet met met|pay paid paid|put put put|read read read|ride rode ridden|ring rang rung|rise rose risen|run ran run|say said said|see saw seen|sell sold sold|send sent sent|shake shook shaken|shoot shot shot|show showed shown|shut shut shut|sing sang sung|sink sank sunk|sit sat sat|sleep slept slept|speak spoke spoken|spend spent spent|stand stood stood|steal stole stolen|swim swam swum|take took taken|teach taught taught|tear tore torn|tell told told|think thought thought|throw threw thrown|understand understood understood|wake woke woken|wear wore worn|win won won|write wrote written`
  .split('|').map((x) => { const [b, past, pp] = x.split(' '); return { b, past, pp }; });

export const PLURALS = [
  ['child', 'children', ['childs', 'childrens', 'childes'], 'Irregular plural.'],
  ['man', 'men', ['mans', 'mens', 'manes'], 'Irregular plural: the vowel changes.'],
  ['woman', 'women', ['womans', 'womens', 'womanes'], 'Irregular plural: the vowel changes.'],
  ['tooth', 'teeth', ['tooths', 'teeths', 'toothes'], 'Irregular plural: oo → ee.'],
  ['foot', 'feet', ['foots', 'feets', 'footes'], 'Irregular plural: oo → ee.'],
  ['mouse', 'mice', ['mouses', 'mices', 'mousees'], 'Irregular plural.'],
  ['goose', 'geese', ['gooses', 'geeses', 'goosen'], 'Irregular plural: oo → ee.'],
  ['box', 'boxes', ['boxs', 'boxies', 'boxen'], 'Nouns ending in -x take -es.'],
  ['bus', 'buses', ['buss', 'busies', 'bus'], 'Nouns ending in -s take -es.'],
  ['watch', 'watches', ['watchs', 'watchies', 'watch'], 'Nouns ending in -ch take -es.'],
  ['glass', 'glasses', ['glasss', 'glassies', 'glass'], 'Nouns ending in -ss take -es.'],
  ['dish', 'dishes', ['dishs', 'dishies', 'dish'], 'Nouns ending in -sh take -es.'],
  ['city', 'cities', ['citys', 'cityes', 'citis'], 'Consonant + y → change y to i and add -es.'],
  ['baby', 'babies', ['babys', 'babyes', 'babis'], 'Consonant + y → change y to i and add -es.'],
  ['country', 'countries', ['countrys', 'countryes', 'countris'], 'Consonant + y → change y to i and add -es.'],
  ['lady', 'ladies', ['ladys', 'ladyes', 'ladis'], 'Consonant + y → change y to i and add -es.'],
  ['day', 'days', ['daies', 'dayes', 'dais'], 'Vowel + y → just add -s.'],
  ['boy', 'boys', ['boies', 'boyes', 'boyz'], 'Vowel + y → just add -s.'],
  ['key', 'keys', ['kies', 'keyes', 'keis'], 'Vowel + y → just add -s.'],
  ['knife', 'knives', ['knifes', 'knifs', 'knivs'], '-fe → -ves.'],
  ['leaf', 'leaves', ['leafs', 'leafes', 'leavs'], '-f → -ves.'],
  ['wife', 'wives', ['wifes', 'wifs', 'wivs'], '-fe → -ves.'],
  ['potato', 'potatoes', ['potatos', 'potatoies', 'potatoe'], 'Potato and tomato take -es.'],
  ['tomato', 'tomatoes', ['tomatos', 'tomatoies', 'tomatoe'], 'Potato and tomato take -es.'],
  ['hero', 'heroes', ['heros', 'heroies', 'heroe'], 'Hero takes -es.'],
  ['photo', 'photos', ['photoes', 'photoies', 'photo'], 'Photo and piano only take -s.'],
  ['piano', 'pianos', ['pianoes', 'pianies', 'piano'], 'Photo and piano only take -s.'],
  ['sheep', 'sheep', ['sheeps', 'sheepes', 'sheepen'], 'Same form in singular and plural.'],
  ['criterion', 'criteria', ['criterions', 'criterias', 'criterion'], 'Greek word: -on → -a. Useful in IELTS writing.'],
  ['phenomenon', 'phenomena', ['phenomenons', 'phenomenas', 'phenomenon'], 'Greek word: -on → -a.'],
  ['analysis', 'analyses', ['analysises', 'analysiss', 'analysis'], '-is → -es (pronounced /iːz/).'],
  ['crisis', 'crises', ['crisises', 'crisiss', 'crisis'], '-is → -es (pronounced /iːz/).']
];

export const PRONOUNS = {
  I: { s: 'I', o: 'me', pa: 'my', pp: 'mine', r: 'myself', be: 'am', v3: false },
  you: { s: 'you', o: 'you', pa: 'your', pp: 'yours', r: 'yourself', be: 'are', v3: false },
  he: { s: 'he', o: 'him', pa: 'his', pp: 'his', r: 'himself', be: 'is', v3: true },
  she: { s: 'she', o: 'her', pa: 'her', pp: 'hers', r: 'herself', be: 'is', v3: true },
  we: { s: 'we', o: 'us', pa: 'our', pp: 'ours', r: 'ourselves', be: 'are', v3: false },
  they: { s: 'they', o: 'them', pa: 'their', pp: 'theirs', r: 'themselves', be: 'are', v3: false }
};

export const ARTICLE_AN = [
  ['We waited for ___ hour.', 'an', '"Hour" starts with a silent h, so the first sound is a vowel sound.'],
  ['She is ___ honest person.', 'an', 'The h in "honest" is silent, so the first sound is a vowel.'],
  ['He studies at ___ university in Dhaka.', 'a', '"University" starts with a /j/ ("you") sound, which is a consonant sound.'],
  ['I need ___ umbrella.', 'an', '"Umbrella" starts with the vowel sound /ʌ/.'],
  ['She wears ___ uniform to work.', 'a', '"Uniform" starts with a /j/ sound, a consonant sound.'],
  ['That is ___ European car.', 'a', '"European" starts with a /j/ sound, a consonant sound.'],
  ['I ate ___ egg for breakfast.', 'an', '"Egg" starts with a vowel sound.'],
  ['He bought ___ one-way ticket.', 'a', '"One" starts with a /w/ sound, a consonant sound.'],
  ['She has ___ MBA.', 'an', 'The letter M is pronounced "em", which starts with a vowel sound.'],
  ['It was ___ unusual day.', 'an', '"Unusual" starts with the vowel sound /ʌ/.'],
  ['He is ___ engineer.', 'an', '"Engineer" starts with a vowel sound.'],
  ['There is ___ hospital near my house.', 'a', 'The h in "hospital" is pronounced, so it is a consonant sound.'],
  ['She gave me ___ useful tip.', 'a', '"Useful" starts with a /j/ sound, a consonant sound.'],
  ['I saw ___ owl in the tree.', 'an', '"Owl" starts with a vowel sound.'],
  ['He made ___ honest mistake.', 'an', 'Silent h: "honest" starts with a vowel sound.'],
  ['This is ___ one-time offer.', 'a', '"One" starts with a /w/ sound.'],
  ['She works as ___ X-ray technician.', 'an', 'X is pronounced "eks", which starts with a vowel sound.'],
  ['He wants to be ___ doctor.', 'a', '"Doctor" starts with a consonant sound.'],
  ['We stayed in ___ hotel by the sea.', 'a', 'The h in "hotel" is pronounced in modern English.'],
  ['The film lasts ___ hour and a half.', 'an', 'Silent h: "hour" starts with a vowel sound.']
];
export const ART_ADJ = [['old', 'an'], ['expensive', 'an'], ['ugly', 'an'], ['elegant', 'an'], ['unusual', 'an'], ['new', 'a'], ['useful', 'a'], ['cheap', 'a'], ['heavy', 'a'], ['huge', 'a'], ['unique', 'a']];
export const ART_NOUNS = ['bag', 'phone', 'watch', 'jacket', 'laptop', 'umbrella'];
export const ART_FRAMES = ['She bought ___ {x}.', 'I need ___ {x}.', 'He has ___ {x}.', 'My uncle gave me ___ {x}.'];
export const ARTICLE_THE = [
  ['___ sun rises in the east.', 'the', 'There is only one sun, so we use "the".'],
  ['She is ___ tallest girl in her class.', 'the', 'Superlatives (tallest, best, most…) take "the".'],
  ['Can you close ___ door, please?', 'the', 'Both speakers know which door: a specific one.'],
  ['___ Nile is the longest river in the world.', 'the', 'Names of rivers take "the".'],
  ['I bought a shirt and a hat. ___ shirt was cheap.', 'the', 'Second mention: the shirt is now known.'],
  ['He is ___ best player in our team.', 'the', 'Superlatives take "the".'],
  ['Please pass me ___ salt.', 'the', 'A specific thing on the table that both people can see.'],
  ['___ moon looks beautiful tonight.', 'the', 'There is only one moon.'],
  ['She plays ___ piano very well.', 'the', 'We usually say "play the + instrument".'],
  ['___ honesty is important in every relationship.', '—', 'Abstract uncountable nouns used generally take no article.'],
  ['He speaks ___ English at work.', '—', 'Languages take no article.'],
  ['We usually have ___ dinner at nine.', '—', 'Meals (breakfast, lunch, dinner) normally take no article.'],
  ['She goes to ___ bed at ten.', '—', 'Fixed expression: "go to bed" has no article.'],
  ['___ Dhaka is a busy city.', '—', 'Names of cities take no article.'],
  ['They travelled by ___ bus.', '—', '"By + transport" has no article: by bus, by train, by car.'],
  ['___ Mount Everest is very high.', '—', 'Names of single mountains take no article.'],
  ['___ Bangladesh is a beautiful country.', '—', 'Most country names take no article.']
];

export const PREP_TIME = [
  ['at', '7 o\'clock'], ['at', 'noon'], ['at', 'midnight'], ['at', 'night'], ['at', 'half past six'],
  ['on', 'Monday'], ['on', 'Friday morning'], ['on', '5 May'], ['on', 'New Year\'s Day'], ['on', 'my birthday'],
  ['in', 'July'], ['in', '2019'], ['in', 'the morning'], ['in', 'the evening'], ['in', 'winter'], ['in', 'the 1990s']
];
export const PREP_TIME_FRAMES = ['We met ___ {x}.', 'She called me ___ {x}.', 'The shop was closed ___ {x}.', 'The accident happened ___ {x}.'];
export const PREP_TIME_WHY = { at: 'Use "at" for clock times and points of the day (at noon, at night).', on: 'Use "on" for days and dates (on Monday, on 5 May).', in: 'Use "in" for months, years, seasons, decades and parts of the day (in the morning).' };
export const PREP_PLACE = [
  ['in', 'the box', 'k'], ['in', 'the kitchen', 'b'], ['in', 'Dhaka', 'p'], ['in', 'the car', 'b'], ['in', 'my bag', 'k'], ['in', 'the garden', 'b'],
  ['on', 'the table', 'k'], ['on', 'the floor', 'k'], ['on', 'the second floor', 'p'], ['on', 'the bus', 'p'], ['on', 'the shelf', 'k'],
  ['at', 'the bus stop', 'p'], ['at', 'home', 'p'], ['at', 'work', 'p'], ['at', 'the front desk', 'b']
];
export const PREP_PLACE_WHY = { in: 'Use "in" for something inside an area or container (in the box, in Dhaka).', on: 'Use "on" for surfaces, floors of a building and public transport (on the table, on the bus).', at: 'Use "at" for a point or a usual place (at the bus stop, at home, at work).' };
export const PREP_DEP = [
  ['She is good ___ maths.', 'at', ['in']], ['I am interested ___ history.', 'in'], ['He is afraid ___ dogs.', 'of'],
  ['It depends ___ the weather.', 'on'], ['Please listen ___ the teacher.', 'to'], ['She is married ___ a doctor.', 'to'],
  ['I am responsible ___ this project.', 'for'], ['We arrived ___ the airport late.', 'at', ['in']], ['They arrived ___ Dhaka at night.', 'in'],
  ['I am proud ___ you.', 'of'], ['He apologised ___ being late.', 'for'], ['I agree ___ you.', 'with', ['to']],
  ['He is famous ___ his songs.', 'for'], ['I am tired ___ waiting.', 'of', ['from']], ['Thank you ___ your help.', 'for'],
  ['He succeeded ___ passing the exam.', 'in'], ['I am bad ___ remembering names.', 'at', ['with']], ['This bag belongs ___ my brother.', 'to'],
  ['She insisted ___ paying for dinner.', 'on'], ['Congratulations ___ your new job!', 'on'], ['He suffers ___ headaches.', 'from'],
  ['Pay attention ___ the details.', 'to'], ['I am keen ___ learning French.', 'on']
];
export const PREP_POOL = ['in', 'on', 'at', 'of', 'for', 'to', 'with', 'about', 'from'];

export const ADJ = [
  { b: 'big', c: 'bigger', s: 'biggest', n: ['room', 'house', 'box'] },
  { b: 'small', c: 'smaller', s: 'smallest', n: ['room', 'house', 'car'] },
  { b: 'hot', c: 'hotter', s: 'hottest', n: ['day', 'room'] },
  { b: 'heavy', c: 'heavier', s: 'heaviest', n: ['bag', 'box', 'suitcase'] },
  { b: 'easy', c: 'easier', s: 'easiest', n: ['question', 'test', 'exercise'] },
  { b: 'busy', c: 'busier', s: 'busiest', n: ['road', 'street', 'shop'] },
  { b: 'cheap', c: 'cheaper', s: 'cheapest', n: ['ticket', 'phone', 'hotel'] },
  { b: 'fast', c: 'faster', s: 'fastest', n: ['car', 'train', 'bike'] },
  { b: 'old', c: 'older', s: 'oldest', n: ['building', 'house', 'bridge'] },
  { b: 'long', c: 'longer', s: 'longest', n: ['road', 'river', 'bridge'] },
  { b: 'safe', c: 'safer', s: 'safest', n: ['road', 'car'] },
  { b: 'thin', c: 'thinner', s: 'thinnest', n: ['book', 'phone'] },
  { b: 'large', c: 'larger', s: 'largest', n: ['room', 'city'] },
  { b: 'good', c: 'better', s: 'best', n: ['plan', 'idea', 'answer'], irr: 1 },
  { b: 'bad', c: 'worse', s: 'worst', n: ['plan', 'idea'], irr: 1 },
  { b: 'expensive', c: 'more expensive', s: 'most expensive', n: ['phone', 'watch', 'hotel'], long: 1 },
  { b: 'interesting', c: 'more interesting', s: 'most interesting', n: ['book', 'film', 'lesson'], long: 1 },
  { b: 'beautiful', c: 'more beautiful', s: 'most beautiful', n: ['garden', 'village', 'picture'], long: 1 },
  { b: 'comfortable', c: 'more comfortable', s: 'most comfortable', n: ['chair', 'bed', 'hotel'], long: 1 },
  { b: 'difficult', c: 'more difficult', s: 'most difficult', n: ['question', 'test', 'exercise'], long: 1 },
  { b: 'modern', c: 'more modern', s: 'most modern', n: ['building', 'phone'], long: 1 }
];

export const ACTS = [
  { b: 'swim', ing: 'swimming', r: '', k: 1 }, { b: 'cook', ing: 'cooking', r: ' dinner', k: 1 },
  { b: 'travel', ing: 'travelling', r: ' abroad' }, { b: 'learn', ing: 'learning', r: ' French' },
  { b: 'play', ing: 'playing', r: ' chess', k: 1 }, { b: 'walk', ing: 'walking', r: ' to work' },
  { b: 'drive', ing: 'driving', r: ' at night', k: 1 }, { b: 'speak', ing: 'speaking', r: ' in public', k: 1 },
  { b: 'wake', ing: 'waking', r: ' up early' }, { b: 'eat', ing: 'eating', r: ' spicy food' },
  { b: 'work', ing: 'working', r: ' late' }, { b: 'write', ing: 'writing', r: ' short stories', k: 1 }
];
export const ING_VERBS = [['enjoyed'], ['avoided'], ['kept'], ['considered'], ['missed'], ['disliked'], ['practised', 1]];
export const TO_VERBS = [['wanted'], ['decided'], ['hoped'], ['planned'], ['agreed'], ['refused'], ['promised'], ['needed'], ['managed'], ['learned', 1]];

export const UNCOUNT = [['water', 1], ['money', 1], ['sugar', 1], ['time', 1], ['information'], ['advice'], ['furniture'], ['homework'], ['rice', 1], ['traffic'], ['luggage'], ['milk', 1], ['bread', 1], ['news']];
export const COUNT = [['books'], ['students'], ['cars'], ['chairs', 1], ['eggs', 1], ['questions'], ['friends'], ['apples', 1], ['tickets', 1], ['people'], ['mistakes'], ['photos', 1]];

export const WH = [
  ['___ do you live? — In Mirpur.', 'Where', []], ['___ is your exam? — On Monday.', 'When', ['What time']],
  ['___ did you call me? — Because I needed help.', 'Why', []], ['___ wrote this book? — Humayun Ahmed.', 'Who', []],
  ['___ do you go to the gym? — Three times a week.', 'How often', []], ['___ brothers do you have? — Two.', 'How many', []],
  ['___ does this shirt cost? — 800 taka.', 'How much', []], ['___ bag is this? — It\'s Nadia\'s.', 'Whose', []],
  ['___ did you come here? — By bus.', 'How', []], ['___ is your favourite colour? — Blue.', 'What', ['Which']],
  ['___ does the train leave? — At 6:30.', 'What time', ['When']], ['___ have you lived here? — For ten years.', 'How long', []],
  ['___ are you doing? — I\'m cooking.', 'What', []], ['___ old is your sister? — She\'s twelve.', 'How', []],
  ['___ one do you want, the red or the blue? — The blue one.', 'Which', []], ['___ is the weather like? — Sunny.', 'What', []],
  ['___ is the nearest bank? — Next to the station.', 'Where', []], ['___ milk do we need? — Two litres.', 'How much', []],
  ['___ students passed? — Twenty-five.', 'How many', []], ['___ were you late? — The traffic was terrible.', 'Why', []],
  ['___ is that man? — He\'s our new neighbour.', 'Who', []], ['___ does "reluctant" mean? — Unwilling.', 'What', []],
  ['___ far is the station? — About two kilometres.', 'How', []], ['___ phone is ringing? — It\'s mine.', 'Whose', ['Which']]
];
export const WH_POOL = ['What', 'Where', 'When', 'Why', 'Who', 'Whose', 'Which', 'How', 'How many', 'How much', 'How often', 'How long', 'What time'];
export const WH_WHY = {
  Where: 'The answer is a place.', When: 'The answer is a time or day.', Why: 'The answer gives a reason.', Who: 'The answer is a person.',
  Whose: 'The answer shows who owns something.', Which: 'The answer is a choice from a limited set.', What: 'The answer is a thing or information.',
  How: 'The answer describes the way or degree (How old/far = degree).', 'How many': 'The answer is a number of countable things.',
  'How much': 'The answer is an amount or a price (uncountable).', 'How often': 'The answer is a frequency.', 'How long': 'The answer is a length of time.',
  'What time': 'The answer is a clock time.'
};

export const MODALS = [
  ['You ___ wear a seatbelt. It\'s the law.', 'must', ['should', 'have to'], 'Laws and strong obligation → must.'],
  ['You ___ smoke here. It\'s not allowed.', 'mustn\'t', ['can\'t', 'shouldn\'t'], 'Prohibition → mustn\'t.'],
  ['She ___ speak three languages fluently.', 'can', ['could'], 'Present ability → can.'],
  ['You look tired. You ___ go to bed early.', 'should', ['must'], 'Advice → should.'],
  ['Take an umbrella. It ___ rain later.', 'might', ['may', 'could'], 'Possibility (not certain) → might.'],
  ['___ I use your phone, please?', 'May', ['Can', 'Could'], 'Polite permission → may / can / could.'],
  ['You ___ bring food; we have plenty.', 'needn\'t', ['shouldn\'t', 'don\'t have to'], 'No necessity → needn\'t.'],
  ['When I was five, I ___ swim, but now I swim every day.', 'couldn\'t', ['can\'t'], 'Past lack of ability → couldn\'t.'],
  ['That ___ be true! I saw him an hour ago.', 'can\'t', ['couldn\'t'], 'Logical certainty that something is impossible → can\'t.'],
  ['He has been working all day. He ___ be exhausted.', 'must', [], 'Logical certainty (deduction) → must.'],
  ['___ you like some tea?', 'Would', [], 'Polite offer → Would you like…?'],
  ['Students ___ cheat in the exam.', 'mustn\'t', ['can\'t', 'shouldn\'t'], 'Prohibition → mustn\'t.'],
  ['___ you open the window, please?', 'Could', ['Can', 'Would', 'Will'], 'Polite request → Could you…?'],
  ['You ___ pay for the museum. It\'s free.', 'needn\'t', ['don\'t have to'], 'No necessity → needn\'t.'],
  ['If you want to pass, you ___ study harder.', 'must', ['should', 'have to'], 'Strong necessity → must.']
];
export const MODAL_POOL = ['can', 'could', 'must', 'mustn\'t', 'should', 'might', 'may', 'needn\'t', 'will', 'would', 'can\'t', 'shouldn\'t'];

export const CONDITIONALS = [
  ['If it ___ (rain) tomorrow, we will stay at home.', 'rains', ['will rain', 'rained', 'would rain'], 'First conditional: If + present simple, will + verb.'],
  ['If I ___ (be) rich, I would travel the world.', 'were', ['am', 'will be', 'had been'], 'Second conditional (unreal present): If + past simple. "Were" is preferred for all subjects.'],
  ['If she had studied, she ___ (pass) the exam.', 'would have passed', ['will pass', 'would pass', 'passed'], 'Third conditional: If + past perfect, would have + past participle.'],
  ['If you heat ice, it ___ (melt).', 'melts', ['will melted', 'melted', 'would melt'], 'Zero conditional (general truth): If + present, present.'],
  ['We ___ (miss) the bus if we don\'t hurry.', 'will miss', ['would miss', 'missed', 'would have missed'], 'First conditional: will + verb in the main clause.'],
  ['If I ___ (know) his number, I would call him.', 'knew', ['know', 'will know', 'had known'], 'Second conditional: If + past simple, would + verb.'],
  ['If they ___ (leave) earlier, they wouldn\'t have missed the train.', 'had left', ['left', 'have left', 'would leave'], 'Third conditional: If + past perfect.'],
  ['I would buy that car if it ___ (be) cheaper.', 'were', ['is', 'will be', 'had been'], 'Second conditional: unreal present → were.'],
  ['If he calls, I ___ (tell) him the news.', 'will tell', ['would tell', 'told', 'would have told'], 'First conditional: will + verb.'],
  ['If we ___ (not hurry), we will be late.', 'don\'t hurry', ['won\'t hurry', 'didn\'t hurry', 'hadn\'t hurried'], 'First conditional: the if-clause uses the present simple, not "will".'],
  ['She would be happier if she ___ (live) near the sea.', 'lived', ['lives', 'will live', 'had lived'], 'Second conditional: If + past simple.'],
  ['If I had seen you, I ___ (say) hello.', 'would have said', ['would say', 'will say', 'said'], 'Third conditional: would have + past participle.'],
  ['Unless you water the plants, they ___ (die).', 'will die', ['would die', 'died', 'die'], '"Unless" = "if not". First conditional: will + verb.'],
  ['If water ___ (reach) 100°C, it boils.', 'reaches', ['will reach', 'reached', 'would reach'], 'Zero conditional (scientific fact).'],
  ['If you had told me, I ___ (help) you.', 'would have helped', ['will help', 'would help', 'helped'], 'Third conditional: would have + past participle.']
];

export const PASSIVE = [
  { a: 'The police', n: 'pl', v: ['arrest', 'arrest', 'arrested', 'arrested'], o: [['the thief', 's'], ['two men', 'p']] },
  { a: 'My mother', n: 's', v: ['cook', 'cooks', 'cooked', 'cooked'], o: [['the rice', 's'], ['the vegetables', 'p']] },
  { a: 'The company', n: 's', v: ['make', 'makes', 'made', 'made'], o: [['these phones', 'p'], ['the furniture', 's']] },
  { a: 'A famous architect', n: 's', v: ['design', 'designs', 'designed', 'designed'], o: [['the museum', 's'], ['these buildings', 'p']] },
  { a: 'The students', n: 'pl', v: ['clean', 'clean', 'cleaned', 'cleaned'], o: [['the classroom', 's'], ['the windows', 'p']] },
  { a: 'The manager', n: 's', v: ['sign', 'signs', 'signed', 'signed'], o: [['the contract', 's'], ['the letters', 'p']] },
  { a: 'Millions of people', n: 'pl', v: ['watch', 'watch', 'watched', 'watched'], o: [['the final', 's'], ['these videos', 'p']] },
  { a: 'The farmers', n: 'pl', v: ['grow', 'grow', 'grew', 'grown'], o: [['rice', 's'], ['vegetables', 'p']] },
  { a: 'The teacher', n: 's', v: ['mark', 'marks', 'marked', 'marked'], o: [['the test', 's'], ['the exam papers', 'p']] },
  { a: 'The workers', n: 'pl', v: ['build', 'build', 'built', 'built'], o: [['the bridge', 's'], ['new roads', 'p']] },
  { a: 'Nadia', n: 's', v: ['write', 'writes', 'wrote', 'written'], o: [['the report', 's'], ['these emails', 'p']] },
  { a: 'The mechanic', n: 's', v: ['repair', 'repairs', 'repaired', 'repaired'], o: [['my car', 's'], ['the brakes', 'p']] },
  { a: 'Someone', n: 's', v: ['steal', 'steals', 'stole', 'stolen'], o: [['my bike', 's'], ['the documents', 'p']], omit: 1 },
  { a: 'People', n: 'pl', v: ['speak', 'speak', 'spoke', 'spoken'], o: [['English', 's'], ['many languages', 'p']], omit: 1 }
];

export const TRANSLATE = [
  ['আমি প্রতিদিন ইংরেজি পড়ি।', 'I study English every day.', ['I am study English every day.', 'I studies English every day.', 'I studying English every day.'], 'Habit → Present Simple. With "I", use the base verb.'],
  ['সে স্কুলে যায়।', 'She goes to school.', ['She go to school.', 'She is go to school.', 'She going to school.'], 'She → verb + es (goes).'],
  ['আমরা গতকাল সিনেমা দেখেছি।', 'We watched a film yesterday.', ['We have watched a film yesterday.', 'We watch a film yesterday.', 'We were watch a film yesterday.'], '"Yesterday" is a finished time → Past Simple, not Present Perfect.'],
  ['তুমি কি চা খাও?', 'Do you drink tea?', ['Are you drink tea?', 'Does you drink tea?', 'You drinks tea?'], 'Present Simple question: Do + you + base verb.'],
  ['সে এখন রান্না করছে।', 'She is cooking now.', ['She cooks now.', 'She cooking now.', 'She is cook now.'], 'Action happening now → is + verb-ing.'],
  ['আমি কখনো বিমানে চড়িনি।', 'I have never travelled by plane.', ['I never have travelled by plane.', 'I did never travel by plane.', 'I have never travel by plane.'], 'Life experience → have + never + past participle.'],
  ['তারা আগামীকাল ঢাকায় আসবে।', 'They will come to Dhaka tomorrow.', ['They will came to Dhaka tomorrow.', 'They are come to Dhaka tomorrow.', 'They came to Dhaka tomorrow.'], 'Future → will + base verb.'],
  ['আমার একজন বড় ভাই আছে।', 'I have an elder brother.', ['I have a elder brother.', 'I has an elder brother.', 'I am an elder brother.'], '"Elder" starts with a vowel sound → an. With "I", use "have".'],
  ['সে কি গতকাল অফিসে গিয়েছিল?', 'Did he go to the office yesterday?', ['Did he went to the office yesterday?', 'Does he go to the office yesterday?', 'Was he go to the office yesterday?'], 'Did + base verb (go), never "did + went".'],
  ['বাইরে বৃষ্টি হচ্ছে।', 'It is raining outside.', ['It raining outside.', 'It is rain outside.', 'Raining is outside.'], 'Weather uses "it" as the subject: It is raining.'],
  ['আমি তিন বছর ধরে এখানে আছি।', 'I have been here for three years.', ['I am here for three years.', 'I have been here since three years.', 'I was here for three years.'], 'Past → now with a period of time → have been + for.'],
  ['দরজাটা বন্ধ করো।', 'Close the door.', ['Closed the door.', 'The door close.', 'Closing the door.'], 'Command → base verb at the start.'],
  ['সে আমার চেয়ে লম্বা।', 'She is taller than me.', ['She is more tall than me.', 'She is tallest than me.', 'She taller than me.'], 'Short adjective → -er + than. Don\'t forget "is".'],
  ['আমি তাকে চিনি না।', 'I don\'t know him.', ['I not know him.', 'I doesn\'t know him.', 'I am not know him.'], 'Negative Present Simple: I + don\'t + base verb.'],
  ['এই বইটি খুব আকর্ষণীয়।', 'This book is very interesting.', ['This book is very interested.', 'This book very interesting.', 'This books is very interesting.'], '-ing adjective describes the thing; -ed describes how a person feels.'],
  ['তুমি কোথায় থাকো?', 'Where do you live?', ['Where you live?', 'Where are you live?', 'Where does you live?'], 'Wh-question: Where + do + subject + verb.'],
  ['যদি বৃষ্টি হয়, আমরা বাসায় থাকব।', 'If it rains, we will stay at home.', ['If it will rain, we will stay at home.', 'If it rain, we will stay at home.', 'If it rained, we will stay at home.'], 'First conditional: If + present simple, will + verb.'],
  ['চিঠিটা গতকাল পাঠানো হয়েছিল।', 'The letter was sent yesterday.', ['The letter sent yesterday.', 'The letter was send yesterday.', 'The letter has been sent yesterday.'], 'Passive past: was + past participle. "Yesterday" → not present perfect.'],
  ['আমার কাছে খুব বেশি টাকা নেই।', 'I don\'t have much money.', ['I don\'t have many money.', 'I haven\'t many money.', 'I don\'t have much moneys.'], 'Money is uncountable → much.'],
  ['সে প্রতিদিন সকালে হাঁটতে যায়।', 'He goes for a walk every morning.', ['He go for a walk every morning.', 'He goes for walk every morning.', 'He going for a walk every morning.'], 'Fixed phrase: go for a walk. He → goes.']
];

// IELTS paraphrasing: [original, best paraphrase, [wrong option, why it fails]×3, why the best works]
export const PARAPHRASE = [
  ['Many students prefer online learning because it is convenient.', 'A large number of learners favour online education because of its convenience.',
    [['Online learning is convenient, so all students prefer it.', 'Meaning changed: "many" became "all".'],
     ['Numerous scholars prefer virtual learning because it is suitable.', 'Wrong synonyms: scholars are researchers, not students; "suitable" is not "convenient".'],
     ['Many pupils like on-line learning because it is handy.', 'Only swaps words for informal ones; the structure is unchanged.']],
    'Keeps the meaning, changes the words (students → learners, prefer → favour) and the structure (convenient → because of its convenience).'],
  ['The number of cars in the city has increased sharply since 2010.', 'There has been a sharp rise in the number of cars in the city since 2010.',
    [['The city\'s cars have grown sharply since 2010.', 'Meaning changed: the cars did not grow; their number did.'],
     ['The number of cars in the city increased slightly after 2010.', '"Sharply" became "slightly" — the data is now wrong.'],
     ['The amount of cars in the city has risen sharply since 2010.', '"Amount" is for uncountable nouns; cars are countable.']],
    'Verb → noun change (increased sharply → a sharp rise) with the same meaning and time.'],
  ['Regular exercise reduces the risk of heart disease.', 'People who exercise regularly are less likely to develop heart disease.',
    [['Exercise cures heart disease.', 'Overstated: reducing a risk is not curing a disease.'],
     ['Regular exercise increases the risk of heart disease.', 'The opposite meaning.'],
     ['Frequent exercising decreases the danger of heart illness.', 'Unnatural collocations: "heart illness", "danger of".']],
    'Changes the structure (risk → less likely) while keeping the exact claim.'],
  ['Young people spend too much time on their phones.', 'Teenagers and young adults use their mobile phones excessively.',
    [['Young people spend a lot of time on their phones.', 'Loses the criticism: "too much" is not the same as "a lot".'],
     ['Children never use their phones.', 'Opposite meaning.'],
     ['Youthful persons expend excessive hours on their telephones.', 'Unnatural word choices that sound strange to examiners.']],
    '"Too much time" → "excessively" keeps the negative judgement.'],
  ['The museum was built in 1950.', 'The museum dates from 1950.',
    [['The museum was opened in 1950.', 'Different fact: building and opening are not the same.'],
     ['In 1950 the museum built.', 'Grammar error: the passive "was built" is needed.'],
     ['The museum was constructed before 1950.', 'Changed the date meaning.']],
    '"Dates from" is a natural way to give the year something was built.'],
  ['Unemployment is a serious problem in many countries.', 'Many nations face a significant problem with joblessness.',
    [['Unemployment is a small problem in some countries.', 'Changed both "serious" and "many".'],
     ['All countries have unemployment.', 'Overgeneralised and loses "serious".'],
     ['Unemployment is a grave trouble in plenty nations.', 'Grammar and collocation errors ("plenty nations", "a grave trouble").']],
    'Synonyms that fit the context (nations, significant, joblessness) and a new structure.'],
  ['Fast food is cheap, but it is often unhealthy.', 'Although fast food is inexpensive, it is frequently bad for people\'s health.',
    [['Fast food is cheap and healthy.', 'Opposite meaning.'],
     ['Because fast food is cheap, it is unhealthy.', 'Invents a cause that the original does not state.'],
     ['Fast food is economical, but it is regularly unwell.', '"Unwell" describes people, not food.']],
    '"But" → "Although" changes the structure; "often" → "frequently" keeps the frequency.'],
  ['Most people learn a second language at school.', 'The majority of people acquire a second language during their school years.',
    [['Everyone learns a second language at school.', '"Most" became "everyone".'],
     ['Most people teach a second language at school.', 'Learn ≠ teach.'],
     ['Most persons learn a second tongue in school.', 'Unnatural: "persons", "second tongue".']],
    'Most → the majority of; learn → acquire; at school → during their school years.'],
  ['The government plans to build a new hospital next year.', 'A new hospital is set to be constructed by the government next year.',
    [['The government built a new hospital last year.', 'Wrong time: plan for the future became a past action.'],
     ['The government is planning to destroy the old hospital.', 'Completely different meaning.'],
     ['The government plans to construct a novel hospital next year.', '"Novel" means original/unusual, not "new" in this sense.']],
    'Active → passive ("is set to be constructed") with the same meaning and time.']
];
