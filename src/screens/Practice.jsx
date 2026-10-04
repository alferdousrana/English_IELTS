import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProgress } from '../state/ProgressContext.jsx';
import { dueMistakes, weaknesses } from '../engine/path.js';
import { loadTopic } from '../data/grammar/index.js';
import { conceptLabel } from '../data/concepts.js';
import { XP } from '../engine/xp.js';
import MCQ from '../components/MCQ.jsx';
import Written from '../components/Written.jsx';

const SESSION_MAX = 15;

async function questionsFor(mistakes) {
  const topics = [...new Set(mistakes.map((m) => m.topic))];
  const loaded = await Promise.all(topics.map(loadTopic));
  const bank = {};
  loaded.filter(Boolean).forEach((t) => [...t.mcq, ...t.written].forEach((q) => { bank[q.id] = q; }));
  return mistakes.map((m) => bank[m.questionId]).filter(Boolean);
}

export default function Practice() {
  const { state } = useProgress();
  const [params, setParams] = useSearchParams();
  const concept = params.get('concept');
  const [session, setSession] = useState(null);

  const due = dueMistakes(state.mistakes);
  const open = Object.values(state.mistakes).filter((m) => !m.resolved);
  const weak = weaknesses(state.mistakes);
  const resolved = Object.values(state.mistakes).filter((m) => m.resolved).length;

  async function start(list, title) {
    const qs = await questionsFor(list.slice(0, SESSION_MAX));
    setSession({ title, qs, i: 0, results: [] });
  }

  // Deep link from "Practise this now".
  useEffect(() => {
    if (concept && !session) {
      const list = open.filter((m) => m.concept === concept).sort((a, b) => b.count - a.count);
      if (list.length) start(list, conceptLabel(concept));
      setParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concept]);

  if (session) return <ReviewSession session={session} setSession={setSession} />;

  return (
    <section className="page">
      <h1>Practice</h1>
      <div className="review-hero">
        <div>
          <h2>Review my weaknesses</h2>
          <p className="muted">{due.length ? `${due.length} mistake${due.length > 1 ? 's are' : ' is'} due today. Questions you got wrong come back until you answer them right on several separate days.` : open.length ? 'Nothing is due right now. Your next reviews are scheduled.' : 'No mistakes recorded yet. Finish a lesson and every wrong answer will be saved here.'}</p>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" disabled={!due.length} onClick={() => start(due, 'Due today')}>Start review ({Math.min(due.length, SESSION_MAX)})</button>
          {open.length > 0 && <button className="btn" onClick={() => start([...open].sort((a, b) => b.count - a.count), 'All open mistakes')}>Practise all open mistakes</button>}
        </div>
      </div>

      <dl className="result-grid">
        <div><dt>Due today</dt><dd>{due.length}</dd></div>
        <div><dt>Still open</dt><dd>{open.length}</dd></div>
        <div><dt>Fixed</dt><dd>{resolved}</dd></div>
      </dl>

      {weak.length > 0 && (
        <div className="weak-list">
          <h2>Weakness analysis</h2>
          <ul>
            {weak.map((w) => (
              <li key={w.concept}>
                <span>{w.label}<small>{w.questions} question{w.questions > 1 ? 's' : ''}, {w.mistakes} mistake{w.mistakes > 1 ? 's' : ''}</small></span>
                <button className="btn btn-small" onClick={() => start(open.filter((m) => m.concept === w.concept), w.label)}>Practise this now</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="coming">
        <h2>More practice modes</h2>
        <p className="muted">Five-topic master tests (100 questions) arrive in Milestone 3. Speed rounds and mini-games are in <Link to="/games">Games</Link>.</p>
      </div>
    </section>
  );
}

function ReviewSession({ session, setSession }) {
  const { recordReview } = useProgress();
  const last = useRef(false);
  const { qs, i, results, title } = session;

  if (!qs.length) return <section className="page"><p>These questions could not be loaded.</p><button className="btn" onClick={() => setSession(null)}>Back</button></section>;

  if (i >= qs.length) {
    const right = results.filter(Boolean).length;
    return (
      <section className="page result">
        <h1>Review finished</h1>
        <p className="result-score"><b>{right}/{results.length}</b><span>correct this time</span></p>
        <p className="result-msg">{right === results.length ? 'Every reviewed question was correct. Each one moves to a longer review interval.' : `${results.length - right} still wrong. Those come back later today; the correct ones are spaced further out.`}</p>
        <button className="btn btn-primary" onClick={() => setSession(null)}>Done</button>
      </section>
    );
  }

  const q = qs[i];
  const advance = (ok) => setSession({ ...session, i: i + 1, results: [...results, ok] });
  return (
    <section className="page lesson">
      <div className="lesson-head">
        <button className="back" onClick={() => setSession(null)} aria-label="End review">←</button>
        <div><h1>Review</h1><p className="muted">{title} · {conceptLabel(q.concept)}</p></div>
      </div>
      <div className="lesson-progress"><span style={{ width: `${(i / qs.length) * 100}%` }} /></div>
      <p className="counter">{i + 1} of {qs.length}</p>
      {q.type === 'mcq'
        ? <MCQ key={q.id + i} q={q} onAnswered={(ok, o) => { recordReview({ questionId: q.id, correct: ok, myAnswer: o, xp: ok ? XP.reviewCorrect : 0 }); last.current = ok; }} onNext={() => advance(last.current)} nextLabel={i + 1 < qs.length ? 'Next' : 'Finish review'} />
        : <Written key={q.id + i} q={q} nextLabel={i + 1 < qs.length ? 'Next' : 'Finish review'} onCommit={({ correct, myAnswer }) => { recordReview({ questionId: q.id, correct, myAnswer, xp: correct ? XP.reviewCorrect : 0 }); advance(correct); }} />}
    </section>
  );
}
