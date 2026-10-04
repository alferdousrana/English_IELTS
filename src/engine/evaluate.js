// Rule-based checker for written answers.
// It is strict about grammar, honest about what it cannot judge, and never just says "good".

export function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.!?।,;:"]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const CONTRACTIONS = [
  [/\bdoesn't\b/g, 'does not'], [/\bdon't\b/g, 'do not'], [/\bisn't\b/g, 'is not'],
  [/\baren't\b/g, 'are not'], [/\bdidn't\b/g, 'did not'], [/\bi'm\b/g, 'i am'],
  [/\bhe's\b/g, 'he is'], [/\bshe's\b/g, 'she is'], [/\bit's\b/g, 'it is'], [/\bthey're\b/g, 'they are']
];
function expand(s) {
  return CONTRACTIONS.reduce((acc, [re, full]) => acc.replace(re, full), s);
}

function words(s) { return normalize(s).split(' ').filter(Boolean); }

/** Word-level diff (LCS) between learner answer and target. */
export function diffWords(answer, target) {
  const a = words(answer), b = words(target);
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { out.push({ t: 'same', w: a[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ t: 'extra', w: a[i] }); i++; }
    else { out.push({ t: 'missing', w: b[j] }); j++; }
  }
  while (i < a.length) out.push({ t: 'extra', w: a[i++] });
  while (j < b.length) out.push({ t: 'missing', w: b[j++] });
  return out;
}

function surfaceNotes(raw, target) {
  const notes = [];
  const trimmed = raw.trim();
  const targetIsSentence = /[.?!]$/.test(target.trim()) && /^[A-Z]/.test(target.trim());
  if (targetIsSentence && trimmed && !/^[A-Z]/.test(trimmed))
    notes.push('Start a sentence with a capital letter. বাক্যের শুরুতে বড় হাতের অক্ষর দিন।');
  if (targetIsSentence && !/[.?!]$/.test(trimmed))
    notes.push(`End the sentence with "${target.trim().slice(-1)}". বাক্যের শেষে যতিচিহ্ন দিন।`);
  if (/\?$/.test(target.trim()) && /\.$/.test(trimmed))
    notes.push('This is a question, so it ends with "?" not ".".');
  if (/\bi\b/.test(trimmed)) notes.push('The pronoun "I" is always a capital letter.');
  return notes;
}

/**
 * @param {object} q  question with accepted[], checks[] (optional), better (optional)
 * @param {string} raw learner answer
 * @returns {{verdict:'correct'|'minor'|'wrong'|'empty', matched?:string, problems:Array, notes:string[], diff?:Array, concept?:string}}
 */
export function evaluateWritten(q, raw) {
  if (!raw || !raw.trim()) return { verdict: 'empty', problems: [], notes: [] };
  const ans = expand(normalize(raw));
  const accepted = q.accepted.map((a) => ({ raw: a, norm: expand(normalize(a)) }));
  const hit = accepted.find((a) => a.norm === ans);

  if (hit) {
    const notes = surfaceNotes(raw, hit.raw);
    return { verdict: notes.length ? 'minor' : 'correct', matched: hit.raw, problems: [], notes };
  }

  // Known error patterns written by the content author.
  const problems = (q.checks || [])
    .filter((c) => new RegExp(c.pattern, 'i').test(raw))
    .map((c) => ({ what: c.what, why: c.why, concept: c.concept || q.concept }));

  // Closest accepted answer drives the diff.
  let best = accepted[0], bestScore = -1;
  for (const a of accepted) {
    const d = diffWords(raw, a.raw);
    const score = d.filter((x) => x.t === 'same').length - d.filter((x) => x.t !== 'same').length;
    if (score > bestScore) { bestScore = score; best = a; }
  }
  const diff = diffWords(raw, best.raw);
  if (!problems.length) {
    const missing = diff.filter((x) => x.t === 'missing').map((x) => x.w);
    const extra = diff.filter((x) => x.t === 'extra').map((x) => x.w);
    const parts = [];
    if (extra.length) parts.push(`not expected: "${extra.join(' ')}"`);
    if (missing.length) parts.push(`expected: "${missing.join(' ')}"`);
    problems.push({
      what: `Your sentence differs from the model answer (${parts.join('; ')}).`,
      why: q.explanation,
      concept: q.concept
    });
  }
  return { verdict: 'wrong', matched: best.raw, problems, notes: surfaceNotes(raw, best.raw), diff, concept: problems[0].concept };
}
