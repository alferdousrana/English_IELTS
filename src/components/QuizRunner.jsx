// Runs a sequence of generated questions: practice sessions, vocab quizzes, exams and games.
// Optional modes: per-question timer, total timer (speed round), lives, boss HP.
import { useEffect, useRef, useState } from 'react';
import GenQuestion from './GenQuestion.jsx';
import Icon from './Icons.jsx';
import { rebuild } from '../engine/generators.js';
import { loadResume, saveResume, clearResume } from '../ui/resume.js';

// resumeKey: when set, progress is saved after every answer and restored when the screen opens again.
export default function QuizRunner({ title, sub, next, total = Infinity, onAnswer, xpFor = () => 0, mode = {}, onFinish, onExit, endExtra, endTitle, resumeKey }) {
  const [run, setRun] = useState(0);
  return <Run key={run} {...{ title, sub, next, total, onAnswer, xpFor, mode, onFinish, onExit, endExtra, endTitle, resumeKey }} restart={() => { clearResume(resumeKey); setRun((n) => n + 1); }} />;
}

const revive = (id, review) => { const q = rebuild(id); return q ? (review ? { ...q, review: true } : q) : null; };
function restoreRun(key, next) {
  const s = key && loadResume(key);
  if (!s) return null;
  const results = (s.results || []).map((r) => ({ q: revive(r.id, r.review) || { id: r.id, prompt: r.prompt, answer: r.answer }, correct: r.correct, my: r.my }));
  let i = s.i || 0, q = s.answered ? null : revive(s.qid, s.qReview);
  if (!q) { i = s.answered ? i + 1 : i; q = next(i, results); }
  return { i, q, results, combo: s.combo || 0, lives: s.lives ?? null, hp: s.hp ?? null };
}

function Run({ title, sub, next, total, onAnswer, xpFor, mode, onFinish, onExit, endExtra, endTitle, restart, resumeKey }) {
  const restored = useRef(undefined);
  if (restored.current === undefined) restored.current = restoreRun(resumeKey, next);
  const R0 = restored.current;
  const [i, setI] = useState(R0?.i ?? 0);
  const [q, setQ] = useState(() => R0?.q ?? next(0, []));
  const [combo, setCombo] = useState(R0?.combo ?? 0);
  const [lives, setLives] = useState(R0?.lives ?? mode.lives ?? null);
  const [hp, setHp] = useState(R0?.hp ?? mode.boss?.hp ?? null);
  const [left, setLeft] = useState(mode.totalTime ?? null);
  const [qLeft, setQLeft] = useState(mode.perQ ?? null);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(null);
  const results = useRef(R0?.results || []), best = useRef(0), livesRef = useRef(R0?.lives ?? mode.lives ?? null), hpRef = useRef(R0?.hp ?? mode.boss?.hp ?? null);
  function save(extra) {
    if (!resumeKey) return;
    saveResume(resumeKey, {
      i, qid: q?.id, qReview: Boolean(q?.review), answered: false, combo, lives: livesRef.current, hp: hpRef.current,
      results: results.current.map((r) => ({ id: r.q.id, review: Boolean(r.q.review), correct: r.correct, my: r.my, prompt: r.q.prompt, answer: r.q.answer })),
      ...extra
    });
  }
  useEffect(() => { if (q && !done) save({}); }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  function end(reason) {
    if (done) return;
    const r = results.current, correct = r.filter((x) => x.correct).length;
    const won = mode.boss ? hpRef.current <= 0 : undefined;
    const summary = { answered: r.length, correct, results: r, bestCombo: best.current, reason, won, pct: r.length ? Math.round((correct / r.length) * 100) : 0 };
    clearResume(resumeKey);
    setDone(summary);
    onFinish?.(summary);
  }

  useEffect(() => {
    if (left === null || done) return undefined;
    if (left <= 0) { end('time'); return undefined; }
    const t = setTimeout(() => setLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [left, done]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (qLeft === null || answered || done) return undefined;
    if (qLeft <= 0) return undefined;
    const t = setTimeout(() => setQLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [qLeft, answered, done]);
  useEffect(() => { if (!q && !done) end('empty'); }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  function answer(correct, my) {
    results.current.push({ q, correct, my });
    setAnswered(true);
    const c = correct ? combo + 1 : 0;
    setCombo(c); best.current = Math.max(best.current, c);
    if (livesRef.current !== null && !correct) { livesRef.current -= 1; setLives(livesRef.current); }
    if (hpRef.current !== null && correct) { hpRef.current -= 1; setHp(hpRef.current); }
    onAnswer?.(q, correct, my);
    save({ answered: true, combo: c });
  }
  function advance() {
    if (done) return;
    if (livesRef.current !== null && livesRef.current <= 0) return end('lives');
    if (hpRef.current !== null && hpRef.current <= 0) return end('boss');
    if (i + 1 >= total) return end('complete');
    const nq = next(i + 1, results.current);
    if (!nq) return end('complete');
    setI(i + 1); setQ(nq); setAnswered(false); setQLeft(mode.perQ ?? null);
  }

  if (done) {
    const { correct, answered: n, pct, bestCombo, won } = done;
    const wrong = done.results.filter((x) => !x.correct);
    const heading = endTitle ? endTitle(done) : mode.boss ? (won ? `${mode.boss.name} defeated` : `${mode.boss.name} won this time`) : mode.totalTime ? `${correct} correct in ${mode.totalTime} seconds` : 'Session finished';
    return (
      <section className="page result run-end">
        <h1>{heading}</h1>
        <p className={`result-score ${pct >= 60 ? '' : 'fail'}`}><b>{pct}%</b><span>{correct} of {n} correct</span></p>
        <dl className="result-grid">
          <div><dt>Answered</dt><dd>{n}</dd></div>
          <div><dt>Correct</dt><dd>{correct}</dd></div>
          <div><dt>Best streak</dt><dd>{bestCombo}</dd></div>
        </dl>
        {endExtra?.(done)}
        {wrong.length > 0 && (
          <div className="weak-list">
            <h2>Your mistakes</h2>
            <p className="muted">Each one is saved and will come back in your spaced review.</p>
            <ul className="mistake-list">
              {wrong.slice(0, 12).map(({ q: mq, my }, k) => (
                <li key={k}><span><b>{mq.prompt}</b>{mq.sub && <small>{mq.sub}</small>}<small className="redpen"><del>{my}</del></small><small className="better">{mq.answer}</small></span></li>
              ))}
            </ul>
          </div>
        )}
        <div className="btn-row">
          <button className="btn btn-primary" onClick={restart}>Go again</button>
          <button className="btn" onClick={onExit}>Done</button>
        </div>
      </section>
    );
  }
  if (!q) return <p className="loading">Preparing questions…</p>;

  const progress = total !== Infinity ? i / total : null;
  return (
    <section className="page lesson runner">
      <div className="lesson-head">
        <button className="back" onClick={() => (results.current.length ? end('quit') : (clearResume(resumeKey), onExit()))} aria-label="End session">←</button>
        <div className="runner-title"><h1>{title}</h1>{sub && <p className="muted">{sub}</p>}</div>
        <div className="runner-stats">
          {combo >= 2 && <span className="combo-pill" key={combo}><Icon name="flame" size={16} fill /> {combo}</span>}
          {lives !== null && <span className="lives" aria-label={`${lives} lives left`}>{Array.from({ length: mode.lives }, (_, k) => <Icon key={k} name="heart" size={18} fill={k < lives} className={k < lives ? 'heart on' : 'heart'} />)}</span>}
          {left !== null && <span className={`clock ${left <= 10 ? 'low' : ''}`}>{left}s</span>}
        </div>
      </div>
      {mode.boss && (
        <div className="boss-bar">
          <span className="boss-icon" aria-hidden="true" key={hp}>{mode.boss.icon}</span>
          <div className="boss-hp" aria-label={`Boss health ${hp} of ${mode.boss.hp}`}><span style={{ width: `${(hp / mode.boss.hp) * 100}%` }} /></div>
          <b>{hp}</b>
        </div>
      )}
      {progress !== null && <div className="lesson-progress"><span style={{ width: `${progress * 100}%` }} /></div>}
      {qLeft !== null && <div className="q-timer"><span style={{ width: `${(qLeft / mode.perQ) * 100}%` }} /></div>}
      <p className="counter">{total !== Infinity ? `Question ${i + 1} of ${total}` : `Question ${i + 1}`}{results.current.length > 0 && ` · ${results.current.filter((x) => x.correct).length} correct`}</p>
      <GenQuestion key={`${q.id}-${i}`} q={q} xp={xpFor(q)} combo={combo} fast={mode.fast} expired={qLeft === 0}
        onAnswer={answer} onNext={advance}
        nextLabel={i + 1 >= total ? 'See my result' : 'Next question'} />
    </section>
  );
}
