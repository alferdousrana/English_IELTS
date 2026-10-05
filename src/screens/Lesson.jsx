import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loadTopic } from '../data/grammar/index.js';
import { topicById } from '../data/curriculum.js';
import { conceptLabel } from '../data/concepts.js';
import { useProgress } from '../state/ProgressContext.jsx';
import { topicStatus } from '../engine/path.js';
import { XP } from '../engine/xp.js';
import { CAT_TOPICS } from '../engine/unlocks.js';
import { CAT } from '../engine/generators.js';
import MCQ from '../components/MCQ.jsx';
import Written from '../components/Written.jsx';
import { celebrateCorrect, celebrateWrong, celebrateBig } from '../ui/celebrate.js';

const STEPS = ['Explanation', 'Examples', 'MCQ', 'Written', 'Result'];
const PASS = 0.6;

export default function Lesson() {
  const { topicId } = useParams();
  const meta = topicById(topicId);
  const { state, recordAnswer, completeTopic, saveDraft, clearDraft } = useProgress();
  const nav = useNavigate();
  const [topic, setTopic] = useState(null);

  // Resume from the saved draft (synced across devices), if there is one.
  const saved = state?.drafts?.[topicId];
  const draft = saved && !saved.cleared ? saved : null;
  const log = useRef(draft?.log || []); // { id, type, correct, concept, xp }
  const [step, setStep] = useState(draft?.step ?? 0);
  const [i, setI] = useState(() => (draft ? countType(draft.log, draft.step === 3 ? 'written' : 'mcq') : 0));
  const [, force] = useState(0);
  const prevScore = useRef(draft ? draft.prev : state?.topics?.[topicId]?.lastScore ?? null);

  useEffect(() => { loadTopic(topicId).then(setTopic); }, [topicId]);
  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  const status = topicStatus(topicId, state?.topics);
  const repeat = Boolean(state?.topics?.[topicId]?.completed);
  const mult = repeat ? XP.repeatMultiplier : 1;

  if (!meta) return <p>Topic not found. <Link to="/learn">Back to the path</Link></p>;
  if (status === 'soon') return <section className="page"><h1>{meta.title}</h1><p>This lesson is not written yet. It arrives with the next content batch.</p><Link className="btn" to="/learn">Back to the path</Link></section>;
  if (status === 'locked') return <section className="page"><h1>{meta.title}</h1><p>This lesson opens after you pass the lesson before it with at least 60%.</p><Link className="btn" to="/learn">Back to the path</Link></section>;
  if (!topic) return <p className="loading">Loading lesson…</p>;

  const nM = topic.mcq.length, nW = topic.written.length, total = nM + nW;
  const doneM = countType(log.current, 'mcq'), doneW = countType(log.current, 'written');
  const answered = doneM + doneW;

  function persist(nextStep = step) { saveDraft(topicId, { step: nextStep, log: log.current, prev: prevScore.current }); }
  function go(n) {
    if (n === 4) return;
    setStep(n);
    if (n === 2) setI(Math.min(doneM, nM));
    if (n === 3) setI(Math.min(doneW, nW));
    persist(n);
  }

  function logAnswer(q, correct, myAnswer, correctAnswer, minor, concept) {
    if (log.current.some((x) => x.id === q.id)) return; // already counted (e.g. after resume)
    const xp = Math.round((correct ? (q.type === 'mcq' ? XP.mcqCorrect : minor ? XP.writtenMinor : XP.writtenCorrect) : 0) * mult);
    log.current = [...log.current, { id: q.id, type: q.type, correct, concept: concept || q.concept, xp }];
    recordAnswer({ question: { ...q, concept: concept || q.concept }, topicId, correct, myAnswer, correctAnswer, xp });
    if (correct) celebrateCorrect({ xp }); else celebrateWrong();
    persist();
    force((n) => n + 1);
  }

  function finish() {
    const l = log.current;
    const score = l.filter((x) => x.correct).length;
    const perfect = score === total, passed = score / total >= PASS;
    const bonus = Math.round(((passed ? XP.lessonComplete : 0) + (perfect ? XP.perfectBonus : 0)) * mult);
    const weak = {};
    l.filter((x) => !x.correct).forEach((x) => { weak[x.concept] = (weak[x.concept] || 0) + 1; });
    completeTopic({
      topicId, kind: 'lesson', score, total,
      mcq: { correct: l.filter((x) => x.type === 'mcq' && x.correct).length, total: nM },
      written: { correct: l.filter((x) => x.type === 'written' && x.correct).length, total: nW },
      bonusXp: bonus, weakConcepts: weak
    });
    clearDraft(topicId);
    setStep(4);
    if (passed) setTimeout(() => celebrateBig(perfect ? 'Perfect score' : 'Lesson passed', `${meta.title}: ${Math.round((score / total) * 100)}%`, perfect ? '🏆' : '✅'), 300);
  }
  // After the last question of a section, go to whatever is still unfinished.
  function afterSection() {
    const m = countType(log.current, 'mcq'), w = countType(log.current, 'written');
    if (m >= nM && w >= nW) return finish();
    if (m < nM) go(2); else go(3);
  }

  return (
    <section className="page lesson">
      <div className="lesson-head">
        <Link to="/learn" className="back" aria-label="Back to learning path">←</Link>
        <div>
          <h1>{meta.title}</h1>
          <p className="muted" lang="bn">{meta.titleBn}</p>
        </div>
      </div>
      <ol className="stepper" aria-label="Lesson steps">
        {STEPS.map((s, n) => {
          const extra = n === 2 ? ` ${doneM}/${nM}` : n === 3 ? ` ${doneW}/${nW}` : '';
          const isDone = (n === 2 && doneM >= nM) || (n === 3 && doneW >= nW) || (n < 2 && step > n);
          return (
            <li key={s} className={`${n === step ? 'cur' : ''} ${isDone ? 'past' : ''}`}>
              {n === 4 ? <span>{s}</span> : <button type="button" onClick={() => go(n)} disabled={step === 4} aria-current={n === step ? 'step' : undefined}>{s}<small>{extra}</small></button>}
            </li>
          );
        })}
      </ol>
      {(step === 2 || step === 3) && <div className="lesson-progress" aria-label={`${answered} of ${total} answered`}><span style={{ width: `${(answered / total) * 100}%` }} /></div>}
      {draft && step < 2 && answered > 0 && <p className="resume-note">Welcome back — you have answered {answered} of {total}. <button className="btn btn-small" onClick={() => go(doneM < nM ? 2 : 3)}>Continue questions</button></p>}
      {repeat && step < 4 && <p className="fb-note">Retake: XP is halved because you already passed this lesson.</p>}

      {step === 0 && (
        <div className="explain">
          {topic.explanation.map((s) => (
            <article key={s.heading} className="explain-block">
              <h2>{s.heading}</h2>
              {s.en && <p>{s.en}</p>}
              {s.bn && <p className="bn" lang="bn">{s.bn}</p>}
              {s.table && (
                <div className="table-wrap"><table>
                  <thead><tr>{s.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>{s.table.rows.map((r) => <tr key={r.join()}>{r.map((c, k) => <td key={k} lang={/[\u0980-\u09FF]/.test(c) ? 'bn' : 'en'}>{c}</td>)}</tr>)}</tbody>
                </table></div>
              )}
              {s.points && <ul className="explain-points">{s.points.map((p) => <li key={p} lang={/[\u0980-\u09FF]/.test(p) ? 'bn' : 'en'}>{p}</li>)}</ul>}
              {s.tip && <p className="explain-tip" lang="bn">{s.tip}</p>}
            </article>
          ))}
          <div className="btn-row">
            <button className="btn btn-primary" onClick={() => go(1)}>See {topic.examples.length} examples</button>
            <button className="btn" onClick={() => go(2)}>Skip to MCQ</button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <ol className="examples">
            {topic.examples.map((e) => (
              <li key={e.en}>
                <p className="ex-en">{e.en}</p>
                <p className="ex-bn" lang="bn">{e.bn}</p>
                <p className="ex-why" lang="bn">{e.why}</p>
              </li>
            ))}
          </ol>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={() => go(2)}>Start {nM} MCQs</button>
            <button className="btn" onClick={() => go(3)}>Skip to written</button>
          </div>
        </div>
      )}

      {step === 2 && (i >= nM
        ? <SectionDone title={`All ${nM} MCQs answered`} left={nW - doneW} leftLabel="written questions" onGo={() => (doneW < nW ? go(3) : finish())} goLabel={doneW < nW ? 'Go to written questions' : 'See my result'} />
        : (
          <>
            <p className="counter">MCQ {i + 1} of {nM}</p>
            <MCQ key={topic.mcq[i].id} q={topic.mcq[i]}
              onAnswered={(ok, o) => logAnswer(topic.mcq[i], ok, o, topic.mcq[i].answer)}
              nextLabel={i + 1 < nM ? 'Next question' : doneW < nW ? 'Go to written questions' : 'See my result'}
              onNext={() => { if (i + 1 < nM) setI(i + 1); else afterSection(); }} />
          </>
        ))}

      {step === 3 && (i >= nW
        ? <SectionDone title={`All ${nW} written questions answered`} left={nM - doneM} leftLabel="MCQs" onGo={() => (doneM < nM ? go(2) : finish())} goLabel={doneM < nM ? 'Finish the remaining MCQs' : 'See my result'} />
        : (
          <>
            <p className="counter">Written {i + 1} of {nW}</p>
            <Written key={topic.written[i].id} q={topic.written[i]}
              nextLabel={i + 1 < nW ? 'Next question' : doneM < nM ? 'Go to remaining MCQs' : 'See my result'}
              onCommit={({ correct, myAnswer, correctAnswer, minor, concept }) => {
                logAnswer(topic.written[i], correct, myAnswer, correctAnswer, minor, concept);
                if (i + 1 < nW) setI(i + 1); else afterSection();
              }} />
          </>
        ))}

      {step === 4 && <Result log={log.current} total={total} prev={prevScore.current} topicId={topicId} nav={nav} mult={mult}
        onRetry={() => { prevScore.current = state.topics[topicId]?.lastScore ?? null; log.current = []; setI(0); setStep(2); persist(2); }} />}
    </section>
  );
}

function countType(log = [], type) { return log.filter((x) => x.type === type).length; }

function SectionDone({ title, left, leftLabel, onGo, goLabel }) {
  return (
    <div className="section-done">
      <h2>{title}</h2>
      <p className="muted">{left > 0 ? `${left} ${leftLabel} are still left. Your result appears when both parts are finished.` : 'Both parts are finished.'}</p>
      <button className="btn btn-primary" onClick={onGo}>{goLabel}</button>
    </div>
  );
}

function Result({ log, total, prev, onRetry, nav, mult, topicId }) {
  const score = log.filter((x) => x.correct).length;
  const pct = Math.round((score / total) * 100);
  const xp = log.reduce((a, x) => a + x.xp, 0);
  const passed = pct >= PASS * 100;
  const bonus = Math.round(((passed ? XP.lessonComplete : 0) + (score === total ? XP.perfectBonus : 0)) * mult);
  const weak = useMemo(() => {
    const w = {};
    log.filter((x) => !x.correct).forEach((x) => { w[x.concept] = (w[x.concept] || 0) + 1; });
    return Object.entries(w).sort((a, b) => b[1] - a[1]);
  }, [log]);
  const mcq = log.filter((x) => x.type === 'mcq'), wr = log.filter((x) => x.type === 'written');
  const opened = passed ? Object.entries(CAT_TOPICS).filter(([, ts]) => ts.includes(topicId)).map(([c]) => CAT[c]?.title).filter(Boolean) : [];

  let message;
  if (!passed) message = `You scored ${pct}%. ${weak[0] ? `Your main weakness here is ${conceptLabel(weak[0][0]).toLowerCase()}.` : ''} You need 60% to open the next lesson. Review the mistakes, then try again.`;
  else if (weak.length) message = `You scored ${pct}% and passed. ${conceptLabel(weak[0][0])} still caused mistakes, so those questions will return in your review.`;
  else message = `You scored ${pct}%. No mistakes in this attempt.`;
  const change = prev !== null && prev !== undefined ? pct - prev : null;

  return (
    <div className="result">
      <p className={`result-score ${passed ? '' : 'fail'}`}><b>{pct}%</b><span>{score} of {total} correct</span></p>
      <p className="result-msg">{message}</p>
      {change !== null && <p className="muted">Previous attempt: {prev}%. {change > 0 ? `Your accuracy improved by ${change} percentage points.` : change < 0 ? `That is ${-change} points lower than last time.` : 'Same as last time.'}</p>}
      {opened.length > 0 && <p className="insight">Unlocked in Practice: {opened.join(', ')}.</p>}
      <dl className="result-grid">
        <div><dt>MCQ</dt><dd>{mcq.filter((x) => x.correct).length}/{mcq.length}</dd></div>
        <div><dt>Written</dt><dd>{wr.filter((x) => x.correct).length}/{wr.length}</dd></div>
        <div><dt>XP earned</dt><dd>+{xp + bonus}</dd></div>
      </dl>
      {weak.length > 0 && (
        <div className="weak-list">
          <h2>Mistakes by concept</h2>
          <ul>{weak.map(([c, n]) => <li key={c}><span>{conceptLabel(c)}</span><b>{n}</b></li>)}</ul>
        </div>
      )}
      <div className="btn-row">
        {weak.length > 0 && <button className="btn btn-primary" onClick={() => nav('/practice')}>Review these mistakes</button>}
        <button className="btn" onClick={onRetry}>Retake questions</button>
        <button className="btn" onClick={() => nav('/learn')}>Back to the path</button>
      </div>
    </div>
  );
}
