import { useState } from 'react';

/** One multiple-choice question. Answer is hidden until the learner commits. */
export default function MCQ({ q, onAnswered, onNext, nextLabel = 'Next question' }) {
  const [picked, setPicked] = useState(null);
  const done = picked !== null;
  const correct = picked === q.answer;

  function pick(o) {
    if (done) return;
    setPicked(o);
    onAnswered(o === q.answer, o);
  }

  return (
    <div className="q-card">
      <p className="q-prompt">{q.prompt}</p>
      <div className="options" role="group" aria-label="Answer options">
        {q.options.map((o, i) => {
          const state = !done ? '' : o === q.answer ? 'is-right' : o === picked ? 'is-wrong' : 'is-dim';
          return (
            <button key={o} type="button" className={`option ${state}`} onClick={() => pick(o)} disabled={done && o !== picked && o !== q.answer}>
              <span className="opt-key" aria-hidden="true">{String.fromCharCode(65 + i)}</span>{o}
            </button>
          );
        })}
      </div>
      {done && (
        <div className={`feedback ${correct ? 'fb-right' : 'fb-wrong'}`} role="status">
          <p className="fb-title">{correct ? 'Correct.' : `Not quite. The answer is "${q.answer}".`}</p>
          <p>{q.explanation}</p>
          {!correct && <p className="fb-note">Saved to your review list. It will come back later today.</p>}
          <button type="button" className="btn btn-primary" onClick={onNext} autoFocus>{nextLabel}</button>
        </div>
      )}
    </div>
  );
}
