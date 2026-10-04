import { useState } from 'react';
import { evaluateWritten } from '../engine/evaluate.js';

/** Red-pen view: extra words struck through, missing words written in. */
function RedPen({ diff }) {
  return (
    <p className="redpen" aria-label="Correction">
      {diff.map((d, i) => d.t === 'same' ? <span key={i}>{d.w} </span>
        : d.t === 'extra' ? <del key={i}>{d.w}</del>
        : <ins key={i}>{d.w}</ins>)}
    </p>
  );
}

export default function Written({ q, onCommit, nextLabel = 'Next question' }) {
  const [text, setText] = useState('');
  const [res, setRes] = useState(null);
  const [selfAccepted, setSelfAccepted] = useState(false);

  function check(e) {
    e.preventDefault();
    const r = evaluateWritten(q, text);
    if (r.verdict === 'empty') return;
    setRes(r);
  }

  function next() {
    const ok = res.verdict === 'correct' || res.verdict === 'minor' || selfAccepted;
    onCommit({ correct: ok, minor: res.verdict === 'minor', selfAccepted, myAnswer: text, correctAnswer: res.matched, concept: res.concept });
  }

  const isRight = res && (res.verdict === 'correct' || res.verdict === 'minor');
  const short = q.accepted[0].split(' ').length <= 2;

  return (
    <div className="q-card">
      <p className="q-type">{q.subtype}</p>
      <p className="q-prompt" lang={/[\u0980-\u09FF]/.test(q.prompt) ? 'bn' : 'en'}>{q.prompt}</p>
      <form onSubmit={check} className="written-form">
        {short
          ? <input className="answer-input" value={text} onChange={(e) => setText(e.target.value)} disabled={!!res} placeholder="Type the missing word" autoComplete="off" autoCapitalize="off" spellCheck="false" aria-label="Your answer" />
          : <textarea className="answer-input" rows={2} value={text} onChange={(e) => setText(e.target.value)} disabled={!!res} placeholder="Write your answer in English" spellCheck="false" aria-label="Your answer" />}
        {!res && <button type="submit" className="btn btn-primary" disabled={!text.trim()}>Check answer</button>}
      </form>

      {res && (
        <div className={`feedback ${isRight ? 'fb-right' : 'fb-wrong'}`} role="status">
          <p className="fb-title">{res.verdict === 'correct' ? 'Correct.' : res.verdict === 'minor' ? 'Correct, with small slips.' : 'Not correct yet.'}</p>
          <dl className="review-grid">
            <dt>Your answer</dt><dd>{text}</dd>
            <dt>Correct answer</dt><dd>{res.matched}</dd>
            {res.verdict === 'wrong' && res.diff && <><dt>Correction</dt><dd><RedPen diff={res.diff} /></dd></>}
            {res.problems.map((p, i) => (
              <div key={i} className="problem">
                <dt>What was wrong</dt><dd>{p.what}</dd>
                <dt>Why</dt><dd>{p.why}</dd>
              </div>
            ))}
            {res.notes.length > 0 && <><dt>Also fix</dt><dd><ul className="notes">{res.notes.map((n) => <li key={n}>{n}</li>)}</ul></dd></>}
            {(q.better || res.verdict === 'wrong') && <><dt>Natural version</dt><dd className="better">{q.better || res.matched}</dd></>}
          </dl>
          {res.verdict === 'wrong' && !selfAccepted && (
            <button type="button" className="btn btn-quiet" onClick={() => setSelfAccepted(true)}>
              My answer is also correct
            </button>
          )}
          {selfAccepted && <p className="fb-note">Marked as correct by you. The checker compares against model answers, so a valid alternative can be missed. Be honest with yourself here.</p>}
          <button type="button" className="btn btn-primary" onClick={next} autoFocus>{nextLabel}</button>
        </div>
      )}
    </div>
  );
}
