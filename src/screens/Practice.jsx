import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProgress } from '../state/ProgressContext.jsx';
import { dueMistakes, weaknesses } from '../engine/path.js';
import { dayKey } from '../engine/dates.js';
import { loadTopic } from '../data/grammar/index.js';
import { conceptLabel } from '../data/concepts.js';
import { XP } from '../engine/xp.js';
import { CATEGORIES, CAT, makeQuestion, rebuild, catLabel, TOTAL_SIZE } from '../engine/generators.js';
import { mastery, MASTERY, recentAcc, weight, weightedPick } from '../engine/practiceStats.js';
import { unlockedWords, stageOf } from '../engine/vocab.js';
import QuizRunner from '../components/QuizRunner.jsx';
import MCQ from '../components/MCQ.jsx';
import Written from '../components/Written.jsx';
import GenQuestion from '../components/GenQuestion.jsx';
import { loadResume, saveResume, clearResume } from '../ui/resume.js';
import { catUnlocked, unlockLesson } from '../engine/unlocks.js';

const SESSION_MAX = 15;
export const PRACTICE_XP = { mcq: 2, type: 4, order: 3, compose: 5 };
const label = (c) => catLabel(c) || (() => { try { return conceptLabel(c); } catch { return null; } })() || c;
const GROUPS = [...new Set(CATEGORIES.map((c) => c.group))];

export function learnedPool(state) {
  return unlockedWords(state, dayKey()).filter((w) => stageOf(state.vocab.words[w.id]) >= 1).map((w) => w.id);
}

export default function Practice() {
  const { state, recordPractice, recordReview } = useProgress();
  const [params, setParams] = useSearchParams();
  // The open session is remembered, so leaving the screen or the app returns you to it.
  const [session, setSessionState] = useState(() => reviveSession(loadResume('practice:session'), state));
  const setSession = (sess) => {
    if (sess) { clearResume('practice:run'); clearResume('practice:review'); }
    if (sess) saveResume('practice:session', { ...sess, dueGen: undefined, dueIds: sess.dueGen?.map((q) => q.id), list: undefined, ids: sess.list?.map((m) => m.questionId) });
    else { clearResume('practice:session'); clearResume('practice:run'); clearResume('practice:review'); }
    setSessionState(sess);
  };
  const [picker, setPicker] = useState(null);
  const isOpen = (c) => catUnlocked(c, state.topics);

  const due = dueMistakes(state.mistakes);
  const open = Object.values(state.mistakes).filter((m) => !m.resolved);
  const weak = weaknesses(state.mistakes);
  const resolved = Object.values(state.mistakes).filter((m) => m.resolved).length;
  const pool = useMemo(() => learnedPool(state), [state]);
  const openBy = useMemo(() => open.reduce((a, m) => ({ ...a, [m.concept]: (a[m.concept] || 0) + 1 }), {}), [open]);

  function startCategory(cat, length) {
    setPicker(null);
    setSession({ kind: 'cat', cat, length, title: CAT[cat].title, sub: CAT[cat].bn });
  }
  function startSmart(length = 20) {
    const cats = CATEGORIES.filter((c) => (c.needsWords ? pool.length >= 5 : isOpen(c.id))).map((c) => c.id);
    if (!cats.length) return;
    const w = cats.map((c) => weight(state.practice[c], openBy[c] || 0));
    const dueGen = due.filter((m) => String(m.questionId).startsWith('gen:')).slice(0, 6).map((m) => ({ ...rebuild(m.questionId), review: true })).filter((q) => q.id);
    setSession({ kind: 'smart', cats, w, dueGen, length, title: 'Smart practice', sub: 'Weighted towards your weak areas' });
  }

  // Deep links: ?cat=sva opens a category, ?concept=x practises that weakness.
  useEffect(() => {
    const cat = params.get('cat'), concept = params.get('concept');
    if (cat && CAT[cat] && isOpen(cat)) { setPicker(cat); setParams({}, { replace: true }); }
    else if (concept) {
      if (CAT[concept] && isOpen(concept)) startCategory(concept, 20);
      else {
        const list = open.filter((m) => m.concept === concept).sort((a, b) => b.count - a.count);
        if (list.length) setSession({ kind: 'review', list, title: label(concept) });
      }
      setParams({}, { replace: true });
    }
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  if (session?.kind === 'review') return <ReviewSession list={session.list} title={session.title} onDone={() => setSession(null)} />;
  const smartCats = CATEGORIES.filter((c) => (c.needsWords ? pool.length >= 5 : isOpen(c.id)));
  if (session) {
    const { kind, cat, length } = session;
    const next = (i) => {
      if (kind === 'smart') {
        if (i < session.dueGen.length) return session.dueGen[i];
        return makeQuestion(weightedPick(session.cats, session.w), { pool });
      }
      return makeQuestion(cat, { pool });
    };
    return (
      <QuizRunner title={session.title} sub={session.sub} total={length || Infinity} next={next}
        xpFor={(q) => (q.review ? XP.reviewCorrect : PRACTICE_XP[q.type] || 2)}
        onAnswer={(q, correct, my) => {
          if (q.review) recordReview({ questionId: q.id, correct, myAnswer: my, xp: correct ? XP.reviewCorrect : 0 });
          else recordPractice({ q, correct, myAnswer: my, xp: correct ? PRACTICE_XP[q.type] || 2 : 0 });
        }}
        endExtra={() => kind === 'cat' && <CatLine p={state.practice[cat]} title={CAT[cat].title} />}
        resumeKey="practice:run" onFinish={() => clearResume('practice:session')}
        onExit={() => setSession(null)} />
    );
  }

  return (
    <section className="page practice">
      <h1>Practice</h1>
      <p className="muted">{TOTAL_SIZE.toLocaleString()}+ different questions across {CATEGORIES.length} categories. Every wrong answer is saved and comes back on a spaced schedule.</p>

      <div className="practice-hero">
        <div className="ph-main">
          <h2>Smart practice</h2>
          <p>{smartCats.length ? `A mix from your ${smartCats.length} unlocked categor${smartCats.length > 1 ? 'ies' : 'y'}, weighted towards the ones where your recent accuracy is lowest${due.length ? `, starting with ${Math.min(due.length, 6)} due mistakes` : ''}.` : 'Pass your first lesson to unlock practice categories.'}</p>
          <div className="btn-row">
            <button className="btn btn-primary" disabled={!smartCats.length} onClick={() => startSmart(20)}>Start 20 questions</button>
            <button className="btn" disabled={!smartCats.length} onClick={() => startSmart(50)}>50 questions</button>
          </div>
        </div>
        <div className="ph-review">
          <h2>Review my weaknesses</h2>
          <p className="muted">{due.length ? `${due.length} mistake${due.length > 1 ? 's are' : ' is'} due today.` : open.length ? 'Nothing is due right now.' : 'No mistakes recorded yet.'}</p>
          <div className="btn-row">
            <button className="btn btn-primary" disabled={!due.length} onClick={() => setSession({ kind: 'review', list: due, title: 'Due today' })}>Review ({Math.min(due.length, SESSION_MAX)})</button>
            {open.length > 0 && <button className="btn" onClick={() => setSession({ kind: 'review', list: [...open].sort((a, b) => b.count - a.count), title: 'All open mistakes' })}>All open</button>}
          </div>
        </div>
      </div>

      <dl className="result-grid">
        <div><dt>Due today</dt><dd>{due.length}</dd></div>
        <div><dt>Still open</dt><dd>{open.length}</dd></div>
        <div><dt>Fixed</dt><dd>{resolved}</dd></div>
      </dl>

      {GROUPS.map((g) => (
        <div key={g} className="cat-group">
          <h2>{g}</h2>
          <div className="cat-grid">
            {CATEGORIES.filter((c) => c.group === g).map((c) => {
              const p = state.practice[c.id], lvl = mastery(p), acc = recentAcc(p);
              const locked = c.needsWords ? pool.length < 5 : !isOpen(c.id);
              return (
                <button key={c.id} className={`cat-card lvl-${lvl}`} disabled={locked} onClick={() => setPicker(c.id)}>
                  <span className="cat-top"><b>{c.title}</b><span className={`m-pill m-${locked ? 'lock' : lvl}`}>{locked ? (c.needsWords ? 'Learn 5 words first' : '🔒 Locked') : MASTERY[lvl]}</span></span>
                  <small lang="bn">{c.bn}</small>
                  <span className="cat-bar" aria-hidden="true"><span style={{ width: `${(acc ?? 0) * 100}%` }} /></span>
                  <span className="cat-meta">{locked && !c.needsWords ? `Pass the "${unlockLesson(c.id)}" lesson to unlock` : p ? `${p.n} answered · recent accuracy ${Math.round((acc ?? 0) * 100)}%` : 'Not started'}{openBy[c.id] ? ` · ${openBy[c.id]} open mistake${openBy[c.id] > 1 ? 's' : ''}` : ''}</span>
                  <span className="cat-size">{c.id === 'vocab' ? `${pool.length} learned words` : `${c.size.toLocaleString()} questions`}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {weak.length > 0 && (
        <div className="weak-list">
          <h2>Weakness analysis</h2>
          <ul>
            {weak.map((w) => (
              <li key={w.concept}>
                <span>{label(w.concept)}<small>{w.questions} question{w.questions > 1 ? 's' : ''}, {w.mistakes} mistake{w.mistakes > 1 ? 's' : ''}</small></span>
                <button className="btn btn-small" onClick={() => (CAT[w.concept] ? startCategory(w.concept, 20) : setSession({ kind: 'review', list: open.filter((m) => m.concept === w.concept), title: label(w.concept) }))}>Practise this now</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="muted coming">Mastery levels: New (under 10 answers) → Learning → Good (70%+) → Strong (85%+ after 40 answers) → Mastered (95%+ after 100 answers), based on your last 20 answers. Prefer playing? Try <Link to="/games">Games</Link>.</p>

      {picker && (
        <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-labelledby="pick-title" onClick={(e) => e.target === e.currentTarget && setPicker(null)}>
          <div className="sheet">
            <h2 id="pick-title">{CAT[picker].title}</h2>
            <p className="muted" lang="bn">{CAT[picker].bn}</p>
            <CatLine p={state.practice[picker]} title={CAT[picker].title} />
            <p>How many questions?</p>
            <div className="len-grid">
              {[10, 20, 50].map((n) => <button key={n} className="btn" onClick={() => startCategory(picker, n)}>{n}</button>)}
              <button className="btn btn-primary" onClick={() => startCategory(picker, 0)}>Endless</button>
            </div>
            <button className="btn btn-quiet" onClick={() => setPicker(null)}>Cancel</button>
          </div>
        </div>
      )}
    </section>
  );
}

function reviveSession(d, state) {
  if (!d) return null;
  if (d.kind === 'review') { const list = (d.ids || []).map((id) => state.mistakes[id]).filter(Boolean); return list.length ? { kind: 'review', list, title: d.title } : null; }
  if (d.kind === 'smart') return { ...d, dueGen: (d.dueIds || []).map((id) => { const q = rebuild(id); return q && { ...q, review: true }; }).filter(Boolean) };
  return d;
}

function CatLine({ p, title }) {
  if (!p) return <p className="muted">You haven't practised {title.toLowerCase()} yet.</p>;
  const lvl = mastery(p), acc = Math.round((recentAcc(p) ?? 0) * 100);
  const total = Math.round((p.c / p.n) * 100);
  return <p className="cat-line"><span className={`m-pill m-${lvl}`}>{MASTERY[lvl]}</span> Recent accuracy <b>{acc}%</b> (last {Math.min(20, p.r.length)}), all-time {total}% over {p.n} answers.</p>;
}

async function reviewItems(mistakes) {
  const lessonTopics = [...new Set(mistakes.filter((m) => !String(m.questionId).startsWith('gen:')).map((m) => m.topic).filter((t) => t && !String(t).startsWith('practice:')))];
  const loaded = await Promise.all(lessonTopics.map((t) => loadTopic(t).catch(() => null)));
  const bank = {};
  loaded.filter(Boolean).forEach((t) => [...t.mcq, ...t.written].forEach((q) => { bank[q.id] = q; }));
  return mistakes.map((m) => {
    if (String(m.questionId).startsWith('gen:')) { const q = rebuild(m.questionId); return q && { gen: true, q }; }
    return bank[m.questionId] && { gen: false, q: bank[m.questionId] };
  }).filter(Boolean);
}

function ReviewSession({ list, title, onDone }) {
  const { recordReview } = useProgress();
  const [items, setItems] = useState(null);
  const savedRun = useRef(loadResume('practice:review'));
  const [i, setI] = useState(savedRun.current?.i || 0);
  const [results, setResults] = useState(savedRun.current?.results || []);
  const last = useRef(false);
  useEffect(() => { reviewItems(list.slice(0, SESSION_MAX)).then(setItems); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { saveResume('practice:review', { i, results }); }, [i, results]);

  if (!items) return <p className="loading">Loading your mistakes…</p>;
  if (!items.length) return <section className="page"><p>These questions could not be loaded.</p><button className="btn" onClick={onDone}>Back</button></section>;
  if (i >= items.length) {
    clearResume('practice:review');
    const right = results.filter(Boolean).length;
    return (
      <section className="page result">
        <h1>Review finished</h1>
        <p className={`result-score ${right / results.length >= 0.6 ? '' : 'fail'}`}><b>{right}/{results.length}</b><span>correct this time</span></p>
        <p className="result-msg">{right === results.length ? 'Every reviewed question was correct. Each one moves to a longer review interval.' : `${results.length - right} still wrong. Those come back sooner; the correct ones are spaced further out.`}</p>
        <button className="btn btn-primary" onClick={onDone}>Done</button>
      </section>
    );
  }
  const { q, gen } = items[i];
  const advance = (ok) => { setResults([...results, ok]); setI(i + 1); };
  const rec = (ok, my) => recordReview({ questionId: q.id, correct: ok, myAnswer: my, xp: ok ? XP.reviewCorrect : 0 });
  const nextLabel = i + 1 < items.length ? 'Next' : 'Finish review';
  return (
    <section className="page lesson">
      <div className="lesson-head">
        <button className="back" onClick={onDone} aria-label="End review">←</button>
        <div><h1>Review</h1><p className="muted">{title} · {label(q.concept || q.cat)}</p></div>
      </div>
      <div className="lesson-progress"><span style={{ width: `${(i / items.length) * 100}%` }} /></div>
      <p className="counter">{i + 1} of {items.length}</p>
      {gen
        ? <GenReview key={q.id + i} q={q} onAnswer={(ok, my) => { rec(ok, my); last.current = ok; }} onNext={() => advance(last.current)} nextLabel={nextLabel} />
        : q.type === 'mcq'
          ? <MCQ key={q.id + i} q={q} onAnswered={(ok, o) => { rec(ok, o); last.current = ok; }} onNext={() => advance(last.current)} nextLabel={nextLabel} />
          : <Written key={q.id + i} q={q} nextLabel={nextLabel} onCommit={({ correct, myAnswer }) => { rec(correct, myAnswer); advance(correct); }} />}
    </section>
  );
}

function GenReview(props) { return <GenQuestion {...props} xp={XP.reviewCorrect} />; }
