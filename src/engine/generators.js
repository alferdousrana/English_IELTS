// Practice question generators. Every question is built from a seed, so its id
// ("gen:<category>:<seed>[:m]") is enough to rebuild the exact same question later —
// that is how generated mistakes come back in spaced review without storing them.
import * as B from '../data/practice/banks.js';
import { WORDS, WORD_BY_ID } from '../data/vocabulary/words.js';

export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = (r, a) => a[Math.floor(r() * a.length)];
const shuffle = (r, a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const uniq = (a) => [...new Set(a)];
function opts(r, answer, distractors, n = 4) {
  const d = uniq(distractors.filter((x) => x && x !== answer));
  return shuffle(r, [answer, ...shuffle(r, d).slice(0, n - 1)]);
}
const regular = (b) => (b.endsWith('e') ? `${b}d` : `${b}ed`);

// ── Grammar helpers ─────────────────────────────────────────
const S_ = (s, initial) => (initial || s.t === 'I' || s.name ? s.t : s.t.charAt(0).toLowerCase() + s.t.slice(1));
const is3 = (s) => s.p === '3s';
const beF = (s, past) => (past ? (s.p === '1s' || is3(s) ? 'was' : 'were') : s.p === '1s' ? 'am' : is3(s) ? 'is' : 'are');
const haveF = (s) => (is3(s) ? 'has' : 'have');
const doF = (s) => (is3(s) ? 'does' : 'do');
const ps = (s, v) => (is3(s) ? v.s : v.b);
const neg = (aux) => (aux === 'am' ? 'am not' : aux === 'will' ? 'won\'t' : aux === 'can' ? 'can\'t' : `${aux}n't`);
const actVerbs = B.VERBS.filter((v) => v.a.length);
const telVerbs = B.VERBS.filter((v) => v.t.length);
const durVerbs = actVerbs.filter((v) => !['go', 'catch', 'take', 'buy', 'send', 'drink', 'eat', 'sell', 'carry'].includes(v.b));
const pickSubj = (r, f = () => true) => pick(r, B.SUBJECTS.filter(f));

const TENSE = {
  PS: ['Present Simple', 'habits, routines and facts', 'নিয়মিত কাজ বা সাধারণ সত্য'],
  PC: ['Present Continuous', 'an action happening now', 'এই মুহূর্তে চলমান কাজ'],
  PP: ['Present Perfect', 'past to now, or a past action with a result now', 'অতীত থেকে এখন পর্যন্ত, বা ফল এখনও আছে'],
  PPC: ['Present Perfect Continuous', 'an activity that started in the past and is still going on', 'অতীতে শুরু হয়ে এখনও চলছে'],
  PaS: ['Past Simple', 'a finished action at a finished time', 'অতীতের নির্দিষ্ট সময়ে শেষ হওয়া কাজ'],
  PaC: ['Past Continuous', 'an action in progress when something else happened', 'অতীতে কোনো কাজ চলছিল'],
  PaP: ['Past Perfect', 'an action finished before another past action', 'অতীতের দুটি কাজের আগেরটি'],
  FS: ['Future Simple', 'a future action or prediction', 'ভবিষ্যতে ঘটবে'],
  FC: ['Future Continuous', 'an action in progress at a future time', 'ভবিষ্যতের নির্দিষ্ট সময়ে চলতে থাকবে'],
  FP: ['Future Perfect', 'an action finished before a future time', 'ভবিষ্যতের নির্দিষ্ট সময়ের আগেই শেষ হবে']
};
function form(t, s, v) {
  return {
    PS: ps(s, v), PC: `${beF(s)} ${v.ing}`, PP: `${haveF(s)} ${v.pp}`, PPC: `${haveF(s)} been ${v.ing}`,
    PaS: v.past, PaC: `${beF(s, true)} ${v.ing}`, PaP: `had ${v.pp}`, FS: `will ${v.b}`, FC: `will be ${v.ing}`, FP: `will have ${v.pp}`
  }[t];
}
// Each frame lists only distractor tenses that are clearly wrong there.
const TENSE_FRAMES = [
  { t: 'PC', k: 'a', f: (s, c) => `${S_(s, 1)} ___ ${c} at the moment.`, d: ['PS', 'PaS', 'PP'], sig: '"At the moment" shows the action is happening now.' },
  { t: 'PS', k: 'a', f: (s, c) => `These days, ${S_(s)} ___ ${c} every evening.`, d: ['PaS', 'PaP', 'PaC'], sig: '"These days … every evening" describes a present routine.' },
  { t: 'PaS', k: 'a', f: (s, c) => `${S_(s, 1)} ___ ${c} yesterday.`, d: ['PS', 'PP', 'FS'], sig: '"Yesterday" is a finished time. Present Perfect cannot be used with it.' },
  { t: 'PaS', k: 'a', f: (s, c) => `${S_(s, 1)} ___ ${c} two days ago.`, d: ['PS', 'PP', 'FC'], sig: '"Ago" always points to a finished past time.' },
  { t: 'FS', k: 'a', f: (s, c) => `${S_(s, 1)} ___ ${c} tomorrow.`, d: ['PaS', 'PP', 'PaP'], sig: '"Tomorrow" is future time.' },
  { t: 'PP', k: 't', f: (s, c) => `${S_(s, 1)} ___ ${c} already, so we can go now.`, d: ['PS', 'PaC', 'FC'], sig: '"Already" + a result now ("so we can go now") → Present Perfect.' },
  { t: 'PPC', k: 'a', f: (s, c) => `${S_(s, 1)} ___ ${c} since nine o'clock this morning.`, d: ['PC', 'PS', 'PaC'], sig: 'Started in the past and still continuing, with "since" → Present Perfect Continuous. "Is …ing since" is a common mistake.' },
  { t: 'PaC', k: 'a', f: (s, c) => `When the phone rang, ${S_(s)} ___ ${c}.`, d: ['PC', 'PS', 'PP'], sig: 'An action was in progress when another short action (the phone rang) happened.' },
  { t: 'PaP', k: 't', f: (s, c) => `By the time we arrived, ${S_(s)} ___ ${c}.`, d: ['PP', 'PS', 'FP'], sig: '"By the time we arrived" (past) → the earlier action uses Past Perfect.' },
  { t: 'FC', k: 'a', f: (s, c) => `This time tomorrow, ${S_(s)} ___ ${c}.`, d: ['PC', 'PaC', 'PP'], sig: '"This time tomorrow" = an action in progress at a future moment.' },
  { t: 'FP', k: 't', f: (s, c) => `By next Friday, ${S_(s)} ___ ${c}.`, d: ['PaP', 'PP', 'PaS'], sig: '"By next Friday" = finished before a future time.' }
];

const BN = {
  sva: 'he/she/it বা একজন ব্যক্তি হলে Present Simple-এ verb-এর সাথে s/es যোগ হয়।',
  be: 'I → am/was; he/she/it → is/was; you/we/they → are/were।',
  dodoes: 'প্রশ্ন ও না-বোধক বাক্যে do/does/did-এর পরে সবসময় verb-এর মূল রূপ (base form) বসে।',
  pronouns: 'কাজ যে করে সে subject (I, he); কাজ যার ওপর হয় সে object (me, him)।',
  articles: 'a/an নির্ভর করে পরের শব্দের উচ্চারণের প্রথম ধ্বনির ওপর, বানানের ওপর নয়।',
  plurals: 'কিছু noun-এর বহুবচন নিয়ম মেনে চলে না — এগুলো মুখস্থ করতে হয়।',
  past: 'অতীতের নির্দিষ্ট সময়ে শেষ হওয়া কাজে verb-এর past form (V2) ব্যবহার হয়।',
  perfect: 'have/has/had-এর পরে past participle (V3) বসে।',
  negq: 'না-বোধক ও প্রশ্নে auxiliary (do/does/did/is…) লাগে; did-এর পরে verb আবার মূল রূপে ফিরে যায়।',
  tags: 'positive বাক্য হলে tag negative হয়, negative হলে tag positive হয়; একই auxiliary ব্যবহার করতে হয়।',
  quantifiers: 'গোনা যায় এমন noun → many/a few; গোনা যায় না এমন noun → much/a little।',
  compare: 'ছোট adjective → -er/-est; বড় adjective → more/most।',
  gerinf: 'কিছু verb-এর পরে -ing বসে (enjoy, avoid), কিছুর পরে to + verb (want, decide)।',
  passive: 'Passive = be + past participle; কাজটি কে করেছে তার চেয়ে কাজটি বেশি গুরুত্বপূর্ণ।',
  prepositions: 'সময়: at (ঘড়ির সময়), on (দিন/তারিখ), in (মাস/বছর)।',
  errors: 'বাংলায় "সে যায়" আর "সে যাচ্ছে" আলাদা — ইংরেজিতেও tense ঠিক রাখতে হবে।'
};

// ── Generators: (r, o) => question. o.mcq forces multiple choice. ──
const G = {};

G.sva = (r, o) => {
  const s = pickSubj(r), v = pick(r, actVerbs), c = pick(r, v.a);
  const end = pick(r, ['every day.', 'on Sundays.', 'after work.']);
  const ans = ps(s, v), other = is3(s) ? v.b : v.s;
  const why = s.note ? `${s.note} So the verb takes -s/-es: ${v.s}.`
    : is3(s) ? `"${s.t}" is third-person singular (he/she/it), so the Present Simple verb takes -s/-es: ${v.s}.`
      : `"${s.t}" is not he/she/it, so use the base form: ${v.b}.`;
  if (!o.mcq && r() < 0.3) return { type: 'type', prompt: `${S_(s, 1)} ___ (${v.b}) ${c} ${end}`, sub: 'Write the correct form of the verb.', answer: ans, explanation: why };
  return { type: 'mcq', prompt: `${S_(s, 1)} ___ ${c} ${end}`, options: opts(r, ans, [other, `${beF(s)} ${v.b}`, v.ing]), answer: ans, explanation: why };
};

G.be = (r) => {
  const s = pickSubj(r), adj = pick(r, B.BE_ADJ), past = r() < 0.5, q = r() < 0.35;
  const ans = beF(s, past), pool = ['am', 'is', 'are', 'was', 'were'];
  const when = past ? 'yesterday' : 'today';
  const why = `${past ? '"Yesterday" → past: was (I/he/she/it) or were (you/we/they).' : '"Today" → present: am (I), is (he/she/it), are (you/we/they).'} Subject: "${s.t}" → ${ans}.`;
  if (q) return { type: 'mcq', prompt: `___ ${S_(s)} ${adj} ${when}?`, options: opts(r, cap(ans), pool.map(cap)), answer: cap(ans), explanation: why };
  return { type: 'mcq', prompt: `${S_(s, 1)} ___ ${adj} ${when}.`, options: opts(r, ans, pool), answer: ans, explanation: why };
};

G.dodoes = (r) => {
  const kind = Math.floor(r() * 5), v = pick(r, actVerbs), c = pick(r, v.a);
  if (kind === 0) {
    const s = pickSubj(r), ans = cap(doF(s));
    return { type: 'mcq', prompt: `___ ${S_(s)} ${v.b} ${c} every day?`, options: opts(r, ans, [is3(s) ? 'Do' : 'Does', cap(beF(s)), is3(s) ? 'Has' : 'Have']), answer: ans, explanation: `Present Simple question: ${is3(s) ? 'Does + he/she/it' : 'Do + I/you/we/they'} + base verb.` };
  }
  if (kind === 1) {
    const s = pickSubj(r);
    return { type: 'mcq', prompt: `___ ${S_(s)} ${v.b} ${c} yesterday?`, options: opts(r, 'Did', ['Do', 'Does', cap(beF(s, true))]), answer: 'Did', explanation: '"Yesterday" → past question: Did + subject + base verb, for every subject.' };
  }
  if (kind === 2) {
    const s = pickSubj(r), ans = neg(doF(s));
    return { type: 'mcq', prompt: `${S_(s, 1)} ___ ${v.b} ${c} on weekends.`, options: opts(r, ans, [neg(is3(s) ? 'do' : 'does'), neg(beF(s)), 'not']), answer: ans, explanation: `Present Simple negative: ${is3(s) ? 'he/she/it + doesn\'t' : 'I/you/we/they + don\'t'} + base verb. English never uses "${S_(s)} not ${v.b}".` };
  }
  if (kind === 3) {
    const s = pickSubj(r, is3);
    return { type: 'mcq', prompt: `Does ${S_(s)} ___ ${c} every day?`, options: opts(r, v.b, [v.s, v.ing, v.past]), answer: v.b, explanation: `After "does", the verb goes back to its base form: does + ${v.b} (not ${v.s}). The -s is already in "does".` };
  }
  const s = pickSubj(r);
  return { type: 'mcq', prompt: `${S_(s, 1)} didn't ___ ${c} last night.`, options: opts(r, v.b, [v.past, v.ing, v.s]), answer: v.b, explanation: `After "didn't", use the base form: didn't ${v.b} (not didn't ${v.past}). "Did" already shows the past.` };
};

G.pronouns = (r) => {
  const keys = Object.keys(B.PRONOUNS), k = pick(r, keys), p = B.PRONOUNS[k];
  const slot = pick(r, ['s', 'o', 'pa', 'pp', 'r']);
  const all = uniq(['s', 'o', 'pa', 'pp', 'r'].map((x) => p[x]));
  const verb3 = (b, s3) => (p.v3 ? s3 : b);
  const frames = {
    s: [`___ (${k}) ${p.be} late again.`, `___ (${k}) ${verb3('live', 'lives')} near the station.`, `___ (${k}) ${verb3('want', 'wants')} to study abroad.`],
    o: [`Please call ___ (${k}) tonight.`, `The teacher gave ___ (${k}) a lot of homework.`, `Nobody told ___ (${k}) about the meeting.`],
    pa: [`I found ___ (${k}) keys on the table.`, `Is this ___ (${k}) bag?`, `We loved ___ (${k}) new flat.`],
    pp: [`That umbrella is ___ (${k}).`, `The final decision is ___ (${k}).`, `Is this coat ___ (${k})?`],
    r: [`${cap(p.s)} taught ___ to cook.`, `${cap(p.s)} hurt ___ while playing football.`, `${cap(p.s)} looked at ___ in the mirror.`]
  };
  if (k === 'I' && slot === 'pp') return G.pronouns(r);
  const name = { s: 'subject pronoun (does the action)', o: 'object pronoun (receives the action)', pa: 'possessive adjective (before a noun)', pp: 'possessive pronoun (no noun after it)', r: 'reflexive pronoun (subject and object are the same person)' }[slot];
  let ans = p[slot], prompt = pick(r, frames[slot]);
  const display = (x) => (slot === 's' && x !== 'I' ? cap(x) : x);
  const extra = { s: ['me', 'my'], o: ['I', 'mine'], pa: ['me', 'mine'], pp: ['my', 'me'], r: ['myself', 'ourself'] }[slot];
  return { type: 'mcq', prompt, options: opts(r, display(ans), [...all, ...extra].map(display)), answer: display(ans), explanation: `This gap needs ${/^[aeiou]/.test(name) ? 'an' : 'a'} ${name}: ${display(ans)}.` };
};

G.articles = (r) => {
  const kind = r();
  if (kind < 0.35) {
    const [p, a, why] = pick(r, B.ARTICLE_AN);
    return { type: 'mcq', prompt: p, sub: 'Choose a or an.', options: ['a', 'an'], answer: a, explanation: why };
  }
  if (kind < 0.65) {
    const [adj, a] = pick(r, B.ART_ADJ), n = pick(r, B.ART_NOUNS);
    const vowel = a === 'an', yoo = adj === 'useful' || adj === 'unique';
    return { type: 'mcq', prompt: pick(r, B.ART_FRAMES).replace('{x}', `${adj} ${n}`), sub: 'Choose a or an.', options: ['a', 'an'], answer: a,
      explanation: `The article depends on the next word, "${adj}", not on "${n}". "${adj}" starts with a ${vowel ? 'vowel' : yoo ? '/j/ ("you") — a consonant' : 'consonant'} sound → ${a}.` };
  }
  const [p, a, why] = pick(r, B.ARTICLE_THE);
  const pool = ['a', 'an', 'the', '—'];
  return { type: 'mcq', prompt: p, sub: 'Choose the correct article. "—" means no article.', options: opts(r, a, pool), answer: a, explanation: why };
};

G.plurals = (r, o) => {
  const [s, pl, wrong, why] = pick(r, B.PLURALS);
  if (!o.mcq && r() < 0.5) return { type: 'type', prompt: `Write the plural of "${s}".`, answer: pl, explanation: why };
  return { type: 'mcq', prompt: `What is the plural of "${s}"?`, options: opts(r, pl, wrong), answer: pl, explanation: why };
};

G.past = (r, o) => {
  if (r() < 0.45) {
    const v = pick(r, B.IRREGULAR);
    const ans = v.past;
    if (!o.mcq && r() < 0.6) return { type: 'type', prompt: `Past simple of "${v.b}":`, sub: 'Write one word.', answer: ans, explanation: `${v.b} → ${v.past} → ${v.pp}. It is an irregular verb, so it does not take -ed.` };
    return { type: 'mcq', prompt: `Past simple of "${v.b}"?`, options: opts(r, ans, [regular(v.b), v.pp.split('/')[0], regular(v.past), v.b, `${v.b}${v.b.slice(-1)}ed`, `${v.b}s`]), answer: ans, explanation: `${v.b} → ${v.past} → ${v.pp}. Irregular verbs must be learned.` };
  }
  const s = pickSubj(r), v = pick(r, actVerbs), c = pick(r, v.a);
  const irr = v.past !== regular(v.b);
  const why = `"Yesterday" → Past Simple. ${irr ? `"${v.b}" is irregular: ${v.past}.` : `Regular verb: ${v.b} + -ed = ${v.past}.`} The past form is the same for every subject.`;
  if (!o.mcq && r() < 0.35) return { type: 'type', prompt: `${S_(s, 1)} ___ (${v.b}) ${c} yesterday.`, answer: v.past, explanation: why };
  return { type: 'mcq', prompt: `${S_(s, 1)} ___ ${c} yesterday.`, options: opts(r, v.past, [ps(s, v), irr ? regular(v.b) : `${beF(s, true)} ${v.b}`, v.ing, v.pp !== v.past ? v.pp : `${beF(s, true)} ${v.b}`]), answer: v.past, explanation: why };
};

G.perfect = (r, o) => {
  if (r() < 0.4) {
    const v = pick(r, B.IRREGULAR), ans = v.pp.split('/')[0];
    if (!o.mcq && r() < 0.6) return { type: 'type', prompt: `Past participle (V3) of "${v.b}":`, sub: 'Write one word.', answer: ans, accept: v.pp.split('/'), explanation: `${v.b} → ${v.past} → ${v.pp}.` };
    return { type: 'mcq', prompt: `Past participle (V3) of "${v.b}"?`, options: opts(r, ans, [regular(v.b), v.past, v.b, `${v.past}en`, `${v.b}${v.b.slice(-1)}ed`, `${v.b}s`]), answer: ans, explanation: `${v.b} → ${v.past} → ${v.pp}. After have/has/had we use the V3 form.` };
  }
  const s = pickSubj(r), v = pick(r, telVerbs), c = pick(r, v.t);
  const why = `Present Perfect = have/has + past participle (V3). "${v.b}" → ${v.pp}. "Just" means a very short time ago.`;
  if (!o.mcq && r() < 0.35) return { type: 'type', prompt: `${S_(s, 1)} ${haveF(s)} just ___ (${v.b}) ${c}.`, answer: v.pp, explanation: why };
  return { type: 'mcq', prompt: `${S_(s, 1)} ${haveF(s)} just ___ ${c}.`, options: opts(r, v.pp, [v.past !== v.pp ? v.past : regular(v.b), v.b, v.ing, v.s]), answer: v.pp, explanation: why };
};

G.tenses = (r, o) => {
  if (r() < 0.12) {
    const s = pickSubj(r), v = pick(r, B.STATIVE), d = pick(r, B.DURATIONS.filter((x) => x.startsWith('since')));
    const ans = form('PP', s, v);
    return { type: 'mcq', prompt: `${S_(s, 1)} ___ ${v.a[0]} ${d}.`, options: opts(r, ans, [form('PS', s, v), form('PC', s, v), form('PaS', s, v)]), answer: ans,
      explanation: `From the past until now with "${d.split(' ')[0]}" → Present Perfect. "${v.b}" here is a state verb, so we don't use the continuous form.`, bn: 'অতীত থেকে এখন পর্যন্ত চলমান অবস্থা বোঝাতে since/for সহ Present Perfect।' };
  }
  const f = pick(r, TENSE_FRAMES), s = pickSubj(r), v = pick(r, f.k === 'a' ? (f.t === 'PPC' ? durVerbs : actVerbs) : telVerbs), c = pick(r, f.k === 'a' ? v.a : v.t);
  const ans = form(f.t, s, v), [name, use, bn] = TENSE[f.t];
  const why = `${f.sig} ${name} is used for ${use}: ${ans}.`;
  if (!o.mcq && r() < 0.3) return { type: 'type', prompt: f.f(s, c).replace('___', `___ (${v.b})`), sub: 'Write the verb in the correct tense.', answer: ans, explanation: why, bn };
  return { type: 'mcq', prompt: f.f(s, c), options: opts(r, ans, f.d.map((t) => form(t, s, v))), answer: ans, explanation: why, bn };
};

function baseSentence(r) {
  const k = Math.floor(r() * 3), s = pickSubj(r, (x) => x.t !== 'I' || k !== 2);
  if (k === 0) { const v = pick(r, actVerbs), c = pick(r, v.a); return { k: 'PS', s, v, c, text: `${S_(s, 1)} ${ps(s, v)} ${c}.` }; }
  if (k === 1) { const v = pick(r, actVerbs), c = pick(r, v.a); return { k: 'PaS', s, v, c, text: `${S_(s, 1)} ${v.past} ${c} yesterday.` }; }
  const adj = pick(r, B.BE_ADJ); return { k: 'BE', s, adj, text: `${S_(s, 1)} ${beF(s)} ${adj}.` };
}
G.negq = (r, o) => {
  const b = baseSentence(r), { s, v, c } = b, wantQ = r() < 0.5;
  let full, short, wrong, why;
  if (b.k === 'PS') {
    full = wantQ ? `${cap(doF(s))} ${S_(s)} ${v.b} ${c}?` : `${S_(s, 1)} ${doF(s)} not ${v.b} ${c}.`;
    short = wantQ ? full : `${S_(s, 1)} ${neg(doF(s))} ${v.b} ${c}.`;
    wrong = wantQ ? [`${cap(beF(s))} ${S_(s)} ${v.b} ${c}?`, `${S_(s, 1)} ${ps(s, v)} ${c}?`, `${cap(doF(s))} ${S_(s)} ${v.s} ${c}?`]
      : [`${S_(s, 1)} not ${ps(s, v)} ${c}.`, `${S_(s, 1)} ${neg(doF(s))} ${v.s} ${c}.`, `${S_(s, 1)} ${neg(beF(s))} ${v.b} ${c}.`];
    why = `Present Simple ${wantQ ? 'question: Do/Does + subject + base verb' : 'negative: don\'t/doesn\'t + base verb'}. "${S_(s, 1)}" → ${doF(s)}.`;
  } else if (b.k === 'PaS') {
    full = wantQ ? `Did ${S_(s)} ${v.b} ${c} yesterday?` : `${S_(s, 1)} did not ${v.b} ${c} yesterday.`;
    short = wantQ ? full : `${S_(s, 1)} didn't ${v.b} ${c} yesterday.`;
    wrong = wantQ ? [`Did ${S_(s)} ${v.past} ${c} yesterday?`, `${cap(doF(s))} ${S_(s)} ${v.b} ${c} yesterday?`, `${cap(beF(s, true))} ${S_(s)} ${v.b} ${c} yesterday?`]
      : [`${S_(s, 1)} didn't ${v.past} ${c} yesterday.`, `${S_(s, 1)} not ${v.past} ${c} yesterday.`, `${S_(s, 1)} ${neg(beF(s, true))} ${v.b} ${c} yesterday.`];
    why = `Past Simple ${wantQ ? 'question: Did + subject + base verb' : 'negative: didn\'t + base verb'}. After "did", "${v.past}" goes back to "${v.b}".`;
  } else {
    full = wantQ ? `${cap(beF(s))} ${S_(s)} ${b.adj}?` : `${S_(s, 1)} ${beF(s)} not ${b.adj}.`;
    short = wantQ ? full : `${S_(s, 1)} ${neg(beF(s))} ${b.adj}.`;
    wrong = wantQ ? [`${cap(doF(s))} ${S_(s)} ${b.adj}?`, `${cap(doF(s))} ${S_(s)} be ${b.adj}?`, `${S_(s, 1)} ${beF(s)} ${b.adj}?`]
      : [`${S_(s, 1)} ${neg(doF(s))} ${b.adj}.`, `${S_(s, 1)} not ${b.adj}.`, `${S_(s, 1)} ${neg(doF(s))} be ${b.adj}.`];
    why = `With "be", don't add do/does. ${wantQ ? 'Question: move am/is/are before the subject.' : 'Negative: am/is/are + not.'}`;
  }
  const task = wantQ ? 'Make it a question.' : 'Make it negative.';
  if (!o.mcq && r() < 0.55) return { type: 'type', prompt: b.text, sub: task, answer: short, accept: [full, short], explanation: why, bn: BN.negq };
  return { type: 'mcq', prompt: b.text, sub: task, options: opts(r, short, wrong.filter(Boolean)), answer: short, explanation: why, bn: BN.negq };
};

G.tags = (r) => {
  const s = pickSubj(r, (x) => !x.noTag && !x.multi), v = pick(r, actVerbs), c = pick(r, v.a), k = Math.floor(r() * 7);
  const P = s.pr, others = ['he', 'she', 'they', 'it', 'you'].filter((x) => x !== P);
  let stem, tag, wrong;
  if (k <= 1 && s.t === 'I') return G.tags(r);
  if (k === 0) { const be = beF(s); stem = `${S_(s, 1)} ${be} ${pick(r, B.BE_ADJ)}`; tag = `${neg(be)} ${P}`; wrong = [`${be} ${P}`, `${neg(doF(s))} ${P}`, `${neg(be)} ${pick(r, others)}`]; }
  else if (k === 1) { const be = beF(s); stem = `${S_(s, 1)} ${neg(be)} ${pick(r, B.BE_ADJ)}`; tag = `${be} ${P}`; wrong = [`${neg(be)} ${P}`, `${doF(s)} ${P}`, `${be} ${pick(r, others)}`]; }
  else if (k === 2) { stem = `${S_(s, 1)} ${ps(s, v)} ${c}`; tag = `${neg(doF(s))} ${P}`; wrong = [`${doF(s)} ${P}`, `${neg(beF(s))} ${P}`, `${neg(is3(s) ? 'do' : 'does')} ${P}`]; }
  else if (k === 3) { stem = `${S_(s, 1)} ${neg(doF(s))} ${v.b} ${c}`; tag = `${doF(s)} ${P}`; wrong = [`${neg(doF(s))} ${P}`, `${beF(s)} ${P}`, `did ${P}`]; }
  else if (k === 4) { stem = `${S_(s, 1)} ${v.past} ${c} yesterday`; tag = `didn't ${P}`; wrong = [`did ${P}`, `${neg(doF(s))} ${P}`, `${neg(beF(s, true))} ${P}`]; }
  else if (k === 5) { stem = `${S_(s, 1)} can ${v.b} ${c}`; tag = `can't ${P}`; wrong = [`can ${P}`, `${neg(doF(s))} ${P}`, `won't ${P}`]; }
  else { stem = `${S_(s, 1)} will ${v.b} ${c} tomorrow`; tag = `won't ${P}`; wrong = [`will ${P}`, `${neg(doF(s))} ${P}`, `wouldn't ${P}`]; }
  const why = `Use the same auxiliary as the sentence, with the opposite polarity (positive → negative tag, negative → positive tag), and a pronoun for the subject (${S_(s, 1)} → ${P}).`;
  return { type: 'mcq', prompt: `${stem}, ___?`, options: opts(r, tag, wrong), answer: tag, explanation: why, bn: BN.tags };
};

G.quantifiers = (r) => {
  const k = Math.floor(r() * 3), unc = r() < 0.5;
  const list = unc ? B.UNCOUNT : B.COUNT;
  if (k === 0) {
    const [n] = pick(r, list), ans = unc ? 'much' : 'many';
    return { type: 'mcq', prompt: `How ___ ${n} ${unc ? 'is' : 'are'} there?`, options: opts(r, ans, ['much', 'many', 'a lot', 'few']), answer: ans,
      explanation: `"${n}" is ${unc ? 'uncountable → How much' : 'countable (plural) → How many'}.${n === 'news' ? ' "News" looks plural but is uncountable.' : ''}${n === 'people' ? ' "People" is the plural of "person".' : ''}` };
  }
  const [n] = pick(r, list.filter((x) => x[1]));
  if (k === 1) {
    const ans = unc ? 'much' : 'many';
    return { type: 'mcq', prompt: `We don't have ___ ${n} left.`, options: opts(r, ans, ['much', 'many', 'a few', 'a little']), answer: ans, explanation: `Negative sentence: ${unc ? 'uncountable noun → much' : 'countable noun → many'}.` };
  }
  const ans = unc ? 'a little' : 'a few';
  return { type: 'mcq', prompt: `We have only ___ ${n} left.`, options: opts(r, ans, ['a few', 'a little', 'much', 'many']), answer: ans, explanation: `Small amount: ${unc ? 'uncountable noun → a little' : 'countable noun → a few'}.` };
};

G.compare = (r, o) => {
  const a = pick(r, B.ADJ), n = pick(r, a.n), sup = r() < 0.45;
  const ans = sup ? a.s : a.c;
  let wrong;
  if (a.irr) wrong = sup ? [`${a.b}est`, `most ${a.b}`, a.c] : [`${a.b}er`, `more ${a.b}`, a.s];
  else if (a.long) wrong = sup ? [`${a.b}est`, `more ${a.b}`, `the ${a.b}est`] : [`${a.b}er`, `most ${a.b}`, `more ${a.b}er`];
  else wrong = sup ? [`most ${a.b}`, `most ${a.s}`, `${a.b}est`, a.c] : [`more ${a.b}`, `more ${a.c}`, `${a.b}er`, a.s];
  wrong = wrong.filter((x) => x !== ans);
  const why = a.irr ? `"${a.b}" is irregular: ${a.b} → ${a.c} → ${a.s}.`
    : a.long ? `Long adjectives (2+ syllables, not ending in -y) use more/most: ${a.c}, the ${a.s}.`
      : `Short adjectives add -er/-est${/(g|t|n)$/.test(a.b) && a.c.length === a.b.length + 3 ? ' (double the final consonant after a short vowel)' : /y$/.test(a.b) ? ' (y → i)' : ''}: ${a.c}, the ${a.s}.`;
  const prompt = sup ? `This is the ___ ${n} I have ever seen.` : `This ${n} is ___ than that one.`;
  if (!o.mcq && r() < 0.4) return { type: 'type', prompt: prompt.replace('___', `___ (${a.b})`), answer: ans, explanation: why, bn: BN.compare };
  return { type: 'mcq', prompt, options: opts(r, ans, wrong), answer: ans, explanation: why, bn: BN.compare };
};

G.gerinf = (r) => {
  const ing = r() < 0.5, [vv, skillOnly] = pick(r, ing ? B.ING_VERBS : B.TO_VERBS);
  const a = pick(r, B.ACTS.filter((x) => !skillOnly || x.k)), s = pickSubj(r);
  const ans = ing ? `${a.ing}${a.r}` : `to ${a.b}${a.r}`;
  return { type: 'mcq', prompt: `${S_(s, 1)} ${vv} ___.`, options: opts(r, ans, [ing ? `to ${a.b}${a.r}` : `${a.ing}${a.r}`, `${a.b}${a.r}`, `to ${a.ing}${a.r}`]), answer: ans,
    explanation: `"${vv}" is followed by ${ing ? 'the -ing form (gerund)' : 'to + base verb (infinitive)'}. Verbs like enjoy, avoid, keep, consider, miss take -ing; want, decide, hope, plan, agree, refuse, promise, need, manage take to + verb.`, bn: BN.gerinf };
};

G.passive = (r, o) => {
  const e = pick(r, B.PASSIVE), [obj, num] = pick(r, e.o), t = pick(r, ['PS', 'PaS', 'PP', 'FS']);
  const [b, s3, past, pp] = e.v, pl = num === 'p';
  const actV = { PS: e.n === 's' ? s3 : b, PaS: past, PP: `${e.n === 's' ? 'has' : 'have'} ${pp}`, FS: `will ${b}` }[t];
  const beP = { PS: pl ? 'are' : 'is', PaS: pl ? 'were' : 'was', PP: pl ? 'have been' : 'has been', FS: 'will be' }[t];
  const beWrongNum = { PS: pl ? 'is' : 'are', PaS: pl ? 'was' : 'were', PP: pl ? 'has been' : 'have been', FS: 'will been' }[t];
  const beWrongTense = { PS: pl ? 'were' : 'was', PaS: pl ? 'are' : 'is', PP: pl ? 'were' : 'was', FS: pl ? 'are' : 'is' }[t];
  const by = e.omit ? '' : ` by ${e.a.charAt(0).toLowerCase() + e.a.slice(1)}`.replace(' by nadia', ' by Nadia');
  const active = `${e.a} ${actV} ${obj}.`;
  const ans = `${cap(obj)} ${beP} ${pp}${by}.`;
  const wrong = [`${cap(obj)} ${beWrongNum} ${pp}${by}.`, `${cap(obj)} ${beWrongTense} ${pp}${by}.`, `${cap(obj)} ${beP} ${b}${by}.`];
  const why = `Passive = be + past participle. Keep the tense of the active verb (${TENSE[t][0]}) in the form of "be": ${beP}. The verb agrees with the new subject "${obj}" (${pl ? 'plural' : 'singular'}).${e.omit ? ` We leave out "by ${e.a.toLowerCase()}" because it gives no useful information.` : ''}`;
  if (!o.mcq && r() < 0.3) return { type: 'type', prompt: active, sub: 'Rewrite in the passive.', answer: ans, accept: [ans, ans.replace(/ by .+\.$/, '.')], explanation: why, bn: BN.passive };
  return { type: 'mcq', prompt: active, sub: 'Choose the correct passive sentence.', options: opts(r, ans, wrong), answer: ans, explanation: why, bn: BN.passive };
};

G.prepositions = (r) => {
  const k = r();
  if (k < 0.35) {
    const [p, x] = pick(r, B.PREP_TIME);
    return { type: 'mcq', prompt: pick(r, B.PREP_TIME_FRAMES).replace('{x}', x), options: ['in', 'on', 'at'], answer: p, explanation: B.PREP_TIME_WHY[p], bn: BN.prepositions };
  }
  if (k < 0.65) {
    const [p, x, who] = pick(r, B.PREP_PLACE);
    const frame = who === 'k' ? 'The keys are ___ {x}.' : who === 'p' ? 'Rina is ___ {x} right now.' : pick(r, ['The keys are ___ {x}.', 'Rina is ___ {x} right now.']);
    return { type: 'mcq', prompt: frame.replace('{x}', x), options: ['in', 'on', 'at'], answer: p, explanation: B.PREP_PLACE_WHY[p] };
  }
  const [p, a, alt = []] = pick(r, B.PREP_DEP);
  return { type: 'mcq', prompt: p, options: opts(r, a, B.PREP_POOL.filter((x) => !alt.includes(x))), answer: a, explanation: `Fixed combination: learn it as one chunk — "${p.replace('___', a).replace(/[.!?]$/, '')}".` };
};

G.wh = (r) => {
  const [p, a, alt] = pick(r, B.WH);
  return { type: 'mcq', prompt: p, options: opts(r, a, B.WH_POOL.filter((x) => !alt.includes(x))), answer: a, explanation: `${B.WH_WHY[a]} → ${a}.` };
};

G.modals = (r) => {
  const [p, a, alt, why] = pick(r, B.MODALS);
  const capFirst = p.startsWith('___');
  const pool = B.MODAL_POOL.filter((x) => !alt.map((y) => y.toLowerCase()).includes(x) && x !== a.toLowerCase());
  const o = opts(r, a, pool.map((x) => (capFirst ? cap(x) : x)));
  return { type: 'mcq', prompt: p, options: o, answer: a, explanation: why };
};

G.conditionals = (r, o) => {
  const [p, a, wrong, why] = pick(r, B.CONDITIONALS);
  if (!o.mcq && r() < 0.3) return { type: 'type', prompt: p, sub: 'Write the verb in the correct form.', answer: a, accept: a === 'were' ? ['were', 'was'] : [a], explanation: why };
  return { type: 'mcq', prompt: p.replace(/ \(([^)]+)\)/, ''), options: opts(r, a, wrong), answer: a, explanation: why };
};

G.errors = (r) => {
  const k = Math.floor(r() * 6), v = pick(r, actVerbs), c = pick(r, v.a);
  if (k === 0) {
    const s = pickSubj(r);
    const ok = `${S_(s, 1)} ${ps(s, v)} ${c} every day.`;
    return { type: 'mcq', prompt: 'Which sentence is correct?', options: opts(r, ok, [`${S_(s, 1)} ${is3(s) ? v.b : v.s} ${c} every day.`, `${S_(s, 1)} ${beF(s)} ${v.b} ${c} every day.`, `${S_(s, 1)} ${v.ing} ${c} every day.`]), answer: ok,
      explanation: `Present Simple for a routine. ${is3(s) ? `"${S_(s, 1)}" is he/she/it → ${v.s}.` : `"${S_(s, 1)}" → base form ${v.b}.`} Never "${beF(s)} + base verb".`, bn: BN.sva };
  }
  if (k === 1) {
    const s = pickSubj(r), ok = `${S_(s, 1)} didn't ${v.b} ${c} yesterday.`;
    return { type: 'mcq', prompt: 'Which sentence is correct?', options: opts(r, ok, [`${S_(s, 1)} didn't ${v.past} ${c} yesterday.`, `${S_(s, 1)} ${neg(doF(s))} ${v.past} ${c} yesterday.`, `${S_(s, 1)} not ${v.past} ${c} yesterday.`]), answer: ok,
      explanation: 'Past negative: didn\'t + base verb. "Didn\'t went / didn\'t watched" is a very common mistake: "did" already carries the past.', bn: BN.dodoes };
  }
  if (k === 2) {
    const s = pickSubj(r), ok = `Did ${S_(s)} ${v.b} ${c} yesterday?`;
    return { type: 'mcq', prompt: 'Which question is correct?', options: opts(r, ok, [`Did ${S_(s)} ${v.past} ${c} yesterday?`, `${cap(doF(s))} ${S_(s)} ${v.past} ${c} yesterday?`, `Did ${S_(s)} ${v.ing} ${c} yesterday?`]), answer: ok,
      explanation: 'Past question: Did + subject + base verb.', bn: BN.dodoes };
  }
  if (k === 3) {
    const s = pickSubj(r), vt = pick(r, telVerbs), ct = pick(r, vt.t), ok = `${S_(s, 1)} ${haveF(s)} ${vt.pp} ${ct}.`;
    return { type: 'mcq', prompt: 'Which sentence is correct?', options: opts(r, ok, [`${S_(s, 1)} ${haveF(s)} ${vt.pp} ${ct} yesterday.`, `${S_(s, 1)} ${haveF(s)} ${vt.b} ${ct}.`, `${S_(s, 1)} ${is3(s) ? 'have' : 'has'} ${vt.pp} ${ct}.`]), answer: ok,
      explanation: 'Present Perfect = have/has + V3, and it cannot be used with a finished time like "yesterday".', bn: BN.perfect };
  }
  if (k === 4) {
    const s = pickSubj(r), st = pick(r, B.STATIVE), d = pick(r, B.DURATIONS), ok = `${S_(s, 1)} ${haveF(s)} ${st.pp} ${st.a[0]} ${d}.`;
    const wrongD = d.startsWith('since') ? d.replace('since', 'for') : d.replace('for', 'since');
    return { type: 'mcq', prompt: 'Which sentence is correct?', options: opts(r, ok, [`${S_(s, 1)} ${beF(s)} ${st.ing} ${st.a[0]} ${d}.`, `${S_(s, 1)} ${ps(s, st)} ${st.a[0]} ${d}.`, `${S_(s, 1)} ${haveF(s)} ${st.pp} ${st.a[0]} ${wrongD}.`]), answer: ok,
      explanation: 'Past → now: Present Perfect, not Present Simple/Continuous. "Since" + a starting point (2019, last summer); "for" + a length of time (five years).', bn: 'বাংলায় "আমি পাঁচ বছর ধরে চিনি" বলা হয় present-এ, কিন্তু ইংরেজিতে have known লাগে।' };
  }
  const s = pickSubj(r, is3), ok = `Does ${S_(s)} ${v.b} ${c}?`;
  return { type: 'mcq', prompt: 'Which question is correct?', options: opts(r, ok, [`Does ${S_(s)} ${v.s} ${c}?`, `Do ${S_(s)} ${v.b} ${c}?`, `Is ${S_(s)} ${v.b} ${c}?`]), answer: ok,
    explanation: 'Does + he/she/it + base verb. The -s moves to "does", so the main verb has no -s.', bn: BN.dodoes };
};

G.order = (r) => {
  const k = Math.floor(r() * 5), s = pickSubj(r, (x) => !x.multi), v = pick(r, actVerbs), c = pick(r, v.a);
  let text;
  if (k === 0) text = `${S_(s, 1)} ${ps(s, v)} ${c}.`;
  else if (k === 1) text = `${S_(s, 1)} ${neg(doF(s))} ${v.b} ${c}.`;
  else if (k === 2) text = `${cap(doF(s))} ${S_(s)} ${v.b} ${c}?`;
  else if (k === 3) text = `${S_(s, 1)} didn't ${v.b} ${c}.`;
  else { const vt = pick(r, telVerbs); text = `${S_(s, 1)} ${haveF(s)} just ${vt.pp} ${pick(r, vt.t)}.`; }
  const end = text.slice(-1), words = text.slice(0, -1).split(' ');
  const keepCap = (w, i) => (i === 0 && !(w === 'I' || s.name) ? w.toLowerCase() : w);
  let chips = words.map(keepCap);
  for (let t = 0; t < 6; t++) { chips = shuffle(r, chips); if (chips.join(' ') !== words.map(keepCap).join(' ')) break; }
  const why = { 0: 'Statement word order: Subject + Verb + Object.', 1: 'Negative: Subject + don\'t/doesn\'t + base verb + object.', 2: 'Question: Do/Does + Subject + base verb + object.', 3: 'Past negative: Subject + didn\'t + base verb.', 4: 'Present Perfect: Subject + have/has + just + V3 + object.' }[k];
  return { type: 'order', prompt: 'Put the words in the correct order.', words: chips, end, answer: text, explanation: why };
};

G.paraphrase = (r) => {
  const [orig, best, bad, why] = pick(r, B.PARAPHRASE);
  const options = shuffle(r, [best, ...bad.map((b) => b[0])]);
  return { type: 'mcq', prompt: orig, sub: 'Choose the best paraphrase: same meaning, different words and structure.', options, answer: best,
    explanation: `${why} Why the others fail: ${bad.map((b) => `"${b[0]}" — ${b[1]}`).join(' ')}`,
    bn: 'Paraphrase মানে প্রতিটি শব্দ বদলানো নয় — অর্থ একই রেখে শব্দ ও বাক্যের গঠন বদলানো।' };
};

G.translate = (r) => {
  const [bn, a, wrong, why] = pick(r, B.TRANSLATE);
  return { type: 'mcq', prompt: bn, promptLang: 'bn', sub: 'Choose the correct English translation.', options: opts(r, a, wrong), answer: a, explanation: why };
};

// ── Vocabulary ──────────────────────────────────────────────
const wordRe = (w) => new RegExp(`\\b${w}\\b`, 'i');
const clashes = (a, b) => a.id === b.id || a.syn.includes(b.w) || b.syn.includes(a.w) || a.x.includes(b.w) || b.x.includes(a.w) || a.ant.includes(b.w);
export const VOCAB_KINDS = ['meaning', 'bn', 'blank', 'syn', 'ant', 'context', 'compose'];
export function vocabQuestion(r, w, kind) {
  const others = shuffle(r, WORDS.filter((o) => !clashes(w, o)));
  const samePos = others.filter((o) => o.pos === w.pos);
  const base = { wordId: w.id, word: w.w };
  const exact = w.ex.filter((s) => wordRe(w.w).test(s));
  if (kind === 'ant' && !w.ant.length) kind = 'syn';
  if (kind === 'blank' && !exact.length) kind = 'meaning';
  if (kind === 'context' && !exact.length) kind = 'bn';
  if (kind === 'meaning') return { ...base, kind, type: 'mcq', prompt: `What does "${w.w}" mean?`, options: opts(r, w.m, others.map((o) => o.m)), answer: w.m, explanation: `"${w.w}" (${w.pos}) means ${w.m}. Bangla: ${w.bn}. Example: ${w.ex[0]}` };
  if (kind === 'bn') return { ...base, kind, type: 'mcq', prompt: `Which English word means "${w.bn}"?`, options: opts(r, w.w, samePos.map((o) => o.w)), answer: w.w, explanation: `${w.bn} = "${w.w}" (${w.pos}): ${w.m}.` };
  if (kind === 'blank') {
    const sent = pick(r, exact).replace(wordRe(w.w), '___');
    return { ...base, kind, type: 'mcq', prompt: sent, sub: 'Choose the word that fits.', options: opts(r, w.w, samePos.map((o) => o.w)), answer: w.w, explanation: `"${w.w}" = ${w.m}. Collocations: ${w.col.join(', ')}.` };
  }
  if (kind === 'syn') {
    const ans = w.syn[0];
    return { ...base, kind, type: 'mcq', prompt: `Choose the word closest in meaning to "${w.w}".`, options: opts(r, ans, samePos.length >= 3 ? samePos.map((o) => o.w) : others.map((o) => o.w)), answer: ans, explanation: `Synonyms of "${w.w}": ${w.syn.join(', ')}. In IELTS, a synonym only works if it fits the context and collocation too.` };
  }
  if (kind === 'ant') {
    const ans = w.ant[0];
    return { ...base, kind, type: 'mcq', prompt: `Choose the opposite of "${w.w}".`, options: opts(r, ans, [...w.syn, ...samePos.map((o) => o.w)]), answer: ans, explanation: `Opposite of "${w.w}": ${w.ant.join(', ')}.` };
  }
  if (kind === 'context') {
    const good = pick(r, exact);
    const bad = others.filter((o) => o.pos !== w.pos).flatMap((o) => o.ex.filter((s) => wordRe(o.w).test(s)).slice(0, 1).map((s) => s.replace(wordRe(o.w), w.w)));
    return { ...base, kind, type: 'mcq', prompt: `Which sentence uses "${w.w}" correctly?`, options: opts(r, good, shuffle(r, bad)), answer: good, explanation: `"${w.w}" is a ${w.pos} meaning ${w.m}. In the other sentences it is in the wrong position for a ${w.pos} or has the wrong meaning.` };
  }
  return { ...base, kind: 'compose', type: 'compose', prompt: `Write your own sentence using "${w.w}".`, sub: `${w.pos} · ${w.m}`, answer: w.ex[0], models: [w.ex[1], w.ex[4], w.ex[7]], stem: w.w.replace(/(e|y)$/, ''), explanation: `Collocations to try: ${w.col.join(', ')}. ${w.err}` };
}

// ── Catalogue ───────────────────────────────────────────────
const nS = B.SUBJECTS.length, nAct = actVerbs.reduce((a, v) => a + v.a.length, 0), nTel = telVerbs.reduce((a, v) => a + v.t.length, 0);
export const CATEGORIES = [
  { id: 'sva', title: 'Subject–verb agreement', bn: 'কর্তা ও ক্রিয়ার মিল', group: 'Foundations', size: nS * nAct * 3 * 2 },
  { id: 'be', title: 'Am / is / are / was / were', bn: 'Be verb', group: 'Foundations', size: nS * B.BE_ADJ.length * 4 },
  { id: 'dodoes', title: 'Do / does / did', bn: 'প্রশ্ন ও না-বোধক', group: 'Foundations', size: nS * nAct * 5 },
  { id: 'pronouns', title: 'Pronouns', bn: 'সর্বনাম', group: 'Foundations', size: 6 * 15 },
  { id: 'articles', title: 'Articles: a / an / the', bn: 'আর্টিকেল', group: 'Foundations', size: B.ARTICLE_AN.length + B.ART_ADJ.length * B.ART_NOUNS.length * B.ART_FRAMES.length + B.ARTICLE_THE.length },
  { id: 'plurals', title: 'Plural nouns', bn: 'বহুবচন', group: 'Foundations', size: B.PLURALS.length * 2 },
  { id: 'quantifiers', title: 'Much / many / a few / a little', bn: 'পরিমাণবাচক শব্দ', group: 'Foundations', size: B.UNCOUNT.length + B.COUNT.length + 22 },
  { id: 'prepositions', title: 'Prepositions', bn: 'পদান্বয়ী অব্যয়', group: 'Foundations', size: B.PREP_TIME.length * 4 + B.PREP_PLACE.length * 2 + B.PREP_DEP.length },
  { id: 'tenses', title: 'Tense challenge (all 12 tenses)', bn: 'কাল', group: 'Verbs and tenses', size: TENSE_FRAMES.length * nS * nAct * 2 },
  { id: 'past', title: 'Past simple and irregular verbs', bn: 'অতীত কাল', group: 'Verbs and tenses', size: B.IRREGULAR.length * 2 + nS * nAct * 2 },
  { id: 'perfect', title: 'Present perfect and V3', bn: 'পুরাঘটিত বর্তমান', group: 'Verbs and tenses', size: B.IRREGULAR.length * 2 + nS * nTel * 2 },
  { id: 'negq', title: 'Negatives and questions', bn: 'না-বোধক ও প্রশ্নবোধক', group: 'Verbs and tenses', size: nS * (nAct * 2 + B.BE_ADJ.length) * 4 },
  { id: 'tags', title: 'Question tags', bn: 'প্রশ্ন ট্যাগ', group: 'Verbs and tenses', size: 13 * nAct * 7 },
  { id: 'modals', title: 'Modal verbs', bn: 'মোডাল ক্রিয়া', group: 'Verbs and tenses', size: B.MODALS.length },
  { id: 'gerinf', title: 'Gerund or infinitive', bn: '-ing নাকি to + verb', group: 'Verbs and tenses', size: (B.ING_VERBS.length + B.TO_VERBS.length) * B.ACTS.length * nS },
  { id: 'passive', title: 'Passive voice', bn: 'কর্মবাচ্য', group: 'Advanced grammar', size: B.PASSIVE.length * 2 * 4 },
  { id: 'conditionals', title: 'Conditionals (if…)', bn: 'শর্তবাচক বাক্য', group: 'Advanced grammar', size: B.CONDITIONALS.length * 2 },
  { id: 'compare', title: 'Comparatives and superlatives', bn: 'তুলনা', group: 'Advanced grammar', size: B.ADJ.reduce((a, x) => a + x.n.length, 0) * 4 },
  { id: 'errors', title: 'Error hunter', bn: 'ভুল খুঁজুন', group: 'Sentences', size: nS * nAct * 6 },
  { id: 'order', title: 'Sentence builder', bn: 'বাক্য সাজাও', group: 'Sentences', size: (nS - 1) * nAct * 5 },
  { id: 'wh', title: 'Wh- questions', bn: 'Wh- প্রশ্ন', group: 'Sentences', size: B.WH.length },
  { id: 'translate', title: 'Bangla → English', bn: 'অনুবাদ', group: 'Sentences', size: B.TRANSLATE.length },
  { id: 'paraphrase', title: 'IELTS paraphrasing', bn: 'একই অর্থ, ভিন্ন ভাষায়', group: 'IELTS skills', size: B.PARAPHRASE.length },
  { id: 'vocab', title: 'My vocabulary', bn: 'আমার শব্দভান্ডার', group: 'Vocabulary', size: WORDS.length * VOCAB_KINDS.length * 6, needsWords: true }
];
export const CAT = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
export const catLabel = (id) => CAT[id]?.title;
export const TOTAL_SIZE = CATEGORIES.reduce((a, c) => a + c.size, 0);
export const GRAMMAR_CATS = CATEGORIES.filter((c) => c.id !== 'vocab' && c.id !== 'paraphrase').map((c) => c.id);

function finish(q, id, cat) {
  return { bn: BN[cat], ...q, id, cat, concept: cat, accept: q.accept || [q.answer] };
}

/** Build one question. ctx.pool = word ids the learner has unlocked (for vocab). */
export function makeQuestion(cat, { seed = Math.floor(Math.random() * 2 ** 31), mcq = false, pool, kind } = {}) {
  const r = rng(seed);
  if (cat === 'vocab') {
    const ids = pool?.length ? pool : WORDS.slice(0, 30).map((w) => w.id);
    const w = WORD_BY_ID[pick(r, ids)];
    const k = kind || pick(r, mcq ? ['meaning', 'bn', 'blank', 'syn', 'ant', 'context'] : VOCAB_KINDS);
    return vocabFor(w.id, k, seed);
  }
  if (!G[cat]) return null;
  const q = G[cat](r, { mcq });
  return finish(q, `gen:${cat}:${seed}${mcq ? ':m' : ''}`, cat);
}
export function vocabFor(wordId, kind, seed = Math.floor(Math.random() * 2 ** 31)) {
  const w = WORD_BY_ID[wordId];
  if (!w) return null;
  const q = vocabQuestion(rng(seed), w, kind);
  return finish(q, `gen:vocab:${seed}:${wordId}:${kind}`, 'vocab');
}
/** Rebuild a question from its id (for spaced review). */
export function rebuild(id) {
  const [g, cat, seed, a, b] = String(id).split(':');
  if (g !== 'gen' || !CAT[cat]) return null;
  try {
    if (cat === 'vocab') return vocabFor(a, b, Number(seed));
    return makeQuestion(cat, { seed: Number(seed), mcq: a === 'm' });
  } catch { return null; }
}

// ── Answer checking ─────────────────────────────────────────
const CONTR = [[/\bcan't\b/g, 'cannot'], [/\bcan not\b/g, 'cannot'], [/\bwon't\b/g, 'will not'], [/\bain't\b/g, 'is not'], [/(\w)n't\b/g, '$1 not'],
  [/\b(i)'m\b/g, '$1 am'], [/\b(he|she|it|that|there|what)'s\b/g, '$1 is'], [/'re\b/g, ' are'], [/'ve\b/g, ' have'], [/'ll\b/g, ' will'], [/'d\b/g, ' would']];
export function norm(s) {
  let t = String(s || '').toLowerCase().replace(/[’‘`]/g, '\'').replace(/\s+/g, ' ').trim().replace(/[.!?]+$/, '').trim();
  CONTR.forEach(([a, b]) => { t = t.replace(a, b); });
  return t.replace(/\s*,\s*/g, ', ').replace(/\s+/g, ' ');
}
export const isCorrect = (q, given) => (q.type === 'mcq' ? given === q.answer : q.accept.some((a) => norm(a) === norm(given)));
