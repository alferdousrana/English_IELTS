import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loadTopic } from '../data/grammar/index.js';
import { topicById } from '../data/curriculum.js';
import { conceptLabel } from '../data/concepts.js';
import { useProgress } from '../state/ProgressContext.jsx';
import { topicStatus } from '../engine/path.js';
import { XP } from '../engine/xp.js';
import MCQ from '../components/MCQ.jsx';
import Written from '../components/Written.jsx';
import { celebrateCorrect, celebrateWrong, celebrateBig } from '../ui/celebrate.js';

const STEPS = ['Explanation', 'Examples', 'MCQ', 'Written', 'Result'];

export default function Lesson() {
  const { topicId } = useParams();
  const meta = topicById(topicId);
  const { state, recordAnswer, completeTopic } = useProgress();
  const [topic, setTopic] = useState(null);
  const [step, setStep] = useState(0);
  const [i, setI] = useState(0);
  const log = useRef([]); // { id, type, correct, concept, xp }
  const [, force] = useState(0);
  const nav = useNavigate();

  useEffect(() => { loadTopic(topicId).then(setTopic); }, [topicId]);

  const status = topicStatus(topicId, state?.topics);
  const repeat = Boolean(state?.topics?.[topicId]?.completed);
  const mult = repeat ? XP.repeatMultiplier : 1;
  const prevScore = useRef(state?.topics?.[topicId]?.lastScore ?? null);

  if (!meta) return <p>Topic not found. <Link to="/learn">Back to the path</Link></p>;
  if (status === 'soon') return <section className="page"><h1>{meta.title}</h1><p>Lessons for this topic are not written yet. They arrive with the next content batch.</p><Link className="btn" to="/learn">Back to the path</Link></section>;
  if (status === 'locked') return <section className="page"><h1>{meta.title}</h1><p>This topic opens after you pass the earlier topics with at least 60%.</p><Link className="btn" to="/learn">Back to the path</Link></section>;
  if (!topic) return <p className="loading">Loading lesson…</p>;

  const total = topic.mcq.length + topic.written.length;
  const answeredCount = log.current.length;
  const pct = Math.round((answeredCount / total) * 100);

  function logAnswer(q, correct, myAnswer, correctAnswer, minor, concept) {
    const xp = Math.round((correct ? (q.type === 'mcq' ? XP.mcqCorrect : minor ? XP.writtenMinor : XP.writtenCorrect) : 0) * mult);
    log.current.push({ id: q.id, type: q.type, correct, concept: concept || q.concept, xp });
    recordAnswer({ question: { ...q, concept: concept || q.concept }, topicId, correct, myAnswer, correctAnswer, xp });
    if (correct) celebrateCorrect({ xp }); else celebrateWrong();
    force((n) => n + 1);
  }

  function finish() {
    const l = log.current;
    const score = l.filter((x) => x.correct).length;
    const perfect = score === total;
    const passed = score / total >= 0.6;
    const bonus = Math.round(((passed ? XP.lessonComplete : 0) + (perfect ? XP.perfectBonus : 0)) * mult);
    const weak = {};
    l.filter((x) => !x.correct).forEach((x) => { weak[x.concept] = (weak[x.concept] || 0) + 1; });
    completeTopic({
      topicId, kind: 'lesson', score, total,
      mcq: { correct: l.filter((x) => x.type === 'mcq' && x.correct).length, total: topic.mcq.length },
      written: { correct: l.filter((x) => x.type === 'written' && x.correct).length, total: topic.written.length },
      bonusXp: bonus, weakConcepts: weak
    });
    if (passed) setTimeout(() => celebrateBig(perfect ? 'Perfect score' : 'Topic passed', `${meta.title}: ${Math.round((score / total) * 100)}%`, perfect ? '🏆' : '✅'), 300);
    setStep(4);
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
        {STEPS.map((s, n) => <li key={s} className={n === step ? 'cur' : n < step ? 'past' : ''}>{s}</li>)}
      </ol>
      {(step === 2 || step === 3) && (
        <div className="lesson-progress" aria-label={`${answeredCount} of ${total} answered`}><span style={{ width: `${pct}%` }} /></div>
      )}
      {repeat && step < 4 && <p className="fb-note">Retake: XP is halved because you already passed this topic.</p>}

      {step === 0 && (
        <div className="explain">
          {topic.explanation.map((s) => (
            <article key={s.heading} className="explain-block">
              <h2>{s.heading}</h2>
              {s.en && <p>{s.en}</p>}
              {s.table && (
                <div className="table-wrap"><table>
                  <thead><tr>{s.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>{s.table.rows.map((r) => <tr key={r.join()}>{r.map((c, k) => <td key={k} lang={/[\u0980-\u09FF]/.test(c) ? 'bn' : 'en'}>{c}</td>)}</tr>)}</tbody>
                </table></div>
              )}
              {s.bn && <p className="bn" lang="bn">{s.bn}</p>}
            </article>
          ))}
          <button className="btn btn-primary" onClick={() => setStep(1)}>See 10 examples</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <ol className="examples">
            {topic.examples.map((e) => (
              <li key={e.en}>
                <p className="ex-en">{e.en}</p>
                <p className="ex-bn" lang="bn">{e.bn}</p>
                <p className="ex-why">{e.why}</p>
              </li>
            ))}
          </ol>
          <button className="btn btn-primary" onClick={() => { setStep(2); setI(0); }}>Start 10 MCQs</button>
        </div>
      )}

      {step === 2 && (
        <>
          <p className="counter">Question {i + 1} of {topic.mcq.length}</p>
          <MCQ key={topic.mcq[i].id} q={topic.mcq[i]}
            onAnswered={(ok, o) => logAnswer(topic.mcq[i], ok, o, topic.mcq[i].answer)}
            nextLabel={i + 1 < topic.mcq.length ? 'Next question' : 'Go to written practice'}
            onNext={() => { if (i + 1 < topic.mcq.length) setI(i + 1); else { setStep(3); setI(0); } }} />
        </>
      )}

      {step === 3 && (
        <>
          <p className="counter">Written {i + 1} of {topic.written.length}</p>
          <Written key={topic.written[i].id} q={topic.written[i]}
            nextLabel={i + 1 < topic.written.length ? 'Next question' : 'See my result'}
            onCommit={({ correct, myAnswer, correctAnswer, minor, concept }) => {
              logAnswer(topic.written[i], correct, myAnswer, correctAnswer, minor, concept);
              if (i + 1 < topic.written.length) setI(i + 1); else finish();
            }} />
        </>
      )}

      {step === 4 && <Result log={log.current} total={total} prev={prevScore.current} topicId={topicId} onRetry={() => { log.current = []; prevScore.current = state.topics[topicId]?.lastScore; setStep(2); setI(0); }} nav={nav} mult={mult} />}
    </section>
  );
}

function Result({ log, total, prev, onRetry, nav, mult }) {
  const score = log.filter((x) => x.correct).length;
  const pct = Math.round((score / total) * 100);
  const xp = log.reduce((a, x) => a + x.xp, 0);
  const passed = pct >= 60;
  const bonus = Math.round(((passed ? XP.lessonComplete : 0) + (score === total ? XP.perfectBonus : 0)) * mult);
  const weak = useMemo(() => {
    const w = {};
    log.filter((x) => !x.correct).forEach((x) => { w[x.concept] = (w[x.concept] || 0) + 1; });
    return Object.entries(w).sort((a, b) => b[1] - a[1]);
  }, [log]);
  const mcq = log.filter((x) => x.type === 'mcq');
  const wr = log.filter((x) => x.type === 'written');

  let message;
  if (!passed) message = `You scored ${pct}%. ${weak[0] ? `Your main weakness here is ${conceptLabel(weak[0][0]).toLowerCase()}.` : ''} You need 60% to open the next topic. Review the mistakes, then try again.`;
  else if (weak.length) message = `You scored ${pct}% and passed. ${conceptLabel(weak[0][0])} still caused mistakes, so those questions will return in your review.`;
  else message = `You scored ${pct}%. No mistakes in this attempt.`;
  const change = prev !== null && prev !== undefined ? pct - prev : null;

  return (
    <div className="result">
      <p className={`result-score ${passed ? '' : 'fail'}`}><b>{pct}%</b><span>{score} of {total} correct</span></p>
      <p className="result-msg">{message}</p>
      {change !== null && <p className="muted">Previous attempt: {prev}%. {change > 0 ? `Your accuracy improved by ${change} percentage points.` : change < 0 ? `That is ${-change} points lower than last time.` : 'Same as last time.'}</p>}
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
