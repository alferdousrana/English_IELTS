// Renders one generated question (mcq / type / order / compose) with strict feedback:
// your answer, the correct answer, and why. Fires the joy animation on a right answer.
import { useEffect, useRef, useState } from 'react';
import { isCorrect, norm } from '../engine/generators.js';
import { celebrateCorrect, celebrateWrong } from '../ui/celebrate.js';

const TYPE_LABEL = { mcq: 'Choose the answer', type: 'Write the answer', order: 'Build the sentence', compose: 'Use the word' };
const RIGHT = ['Correct.', 'Right.', 'Exactly right.', 'Yes, that\'s it.'];

export default function GenQuestion({ q, onAnswer, onNext, nextLabel = 'Next', xp = 0, combo = 0, expired = false, fast = false }) {
  const [result, setResult] = useState(null); // { correct, my, reason }
  const [picked, setPicked] = useState(null);
  const [text, setText] = useState('');
  const [built, setBuilt] = useState([]); // indexes into q.words
  const [selfCheck, setSelfCheck] = useState(false);
  const nextBtn = useRef(null), input = useRef(null);

  function finish(correct, my, reason) {
    if (result) return;
    setResult({ correct, my, reason });
    onAnswer?.(correct, my);
    if (correct) celebrateCorrect({ xp, combo: combo + 1 }); else celebrateWrong();
    if (fast) setTimeout(() => onNext?.(), correct ? 450 : 1400);
  }

  useEffect(() => { if (expired && !result) finish(false, picked || text || '(time up)', 'Time is up.'); }, [expired]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (result && !fast) nextBtn.current?.focus({ preventScroll: true }); }, [result, fast]);
  useEffect(() => { if (q.type === 'type' && window.matchMedia('(pointer: fine)').matches) input.current?.focus(); }, [q.type]);

  useEffect(() => {
    if (q.type !== 'mcq' || result) return undefined;
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const n = Number(e.key);
      if (n >= 1 && n <= q.options.length) choose(q.options[n - 1]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  function choose(o) { if (result) return; setPicked(o); finish(o === q.answer, o); }
  function submitText(e) { e?.preventDefault(); if (!text.trim() || result) return; finish(isCorrect(q, text), text.trim()); }
  function checkOrder() { const s = built.map((i) => q.words[i]).join(' ') + q.end; finish(norm(s) === norm(q.answer), s); }
  function submitCompose(e) {
    e?.preventDefault();
    const t = text.trim(), words = t.split(/\s+/).filter(Boolean);
    if (!t.toLowerCase().includes(q.stem.toLowerCase())) return finish(false, t, `Your sentence doesn't use "${q.word}".`);
    if (words.length < 5) return finish(false, t, 'Write a full sentence of at least 5 words, so the word appears in a real context.');
    setSelfCheck(true);
  }

  const showReview = result && !result.correct;
  return (
    <div className={`q-card gen-q ${result ? (result.correct ? 'answered-right' : 'answered-wrong') : ''}`}>
      <p className="q-type">{TYPE_LABEL[q.type]}</p>
      <p className="q-prompt" lang={q.promptLang || 'en'}>{q.prompt}</p>
      {q.sub && <p className="q-sub">{q.sub}</p>}

      {q.type === 'mcq' && (
        <div className="options" role="group" aria-label="Answer options">
          {q.options.map((o, i) => {
            const st = !result ? '' : o === q.answer ? 'is-right' : o === picked ? 'is-wrong' : 'is-dim';
            return (
              <button key={o} className={`option ${st}`} disabled={Boolean(result)} onClick={() => choose(o)}>
                <span className="opt-key">{i + 1}</span><span>{o}</span>
              </button>
            );
          })}
        </div>
      )}

      {q.type === 'type' && (
        <form className="written-form" onSubmit={submitText}>
          <input ref={input} className="answer-input" value={text} disabled={Boolean(result)} onChange={(e) => setText(e.target.value)} autoComplete="off" autoCapitalize="off" spellCheck="false" aria-label="Your answer" placeholder="Type your answer" />
          {!result && <button className="btn btn-primary" disabled={!text.trim()}>Check answer</button>}
        </form>
      )}

      {q.type === 'order' && (
        <div className="builder">
          <div className="built" aria-live="polite">
            {built.length === 0 && <span className="built-hint">Tap the words in order</span>}
            {built.map((i, n) => (
              <button key={`${i}-${n}`} className="chip chip-on" disabled={Boolean(result)} onClick={() => setBuilt(built.filter((_, k) => k !== n))}>{q.words[i]}</button>
            ))}
            {built.length > 0 && <span className="built-end">{q.end}</span>}
          </div>
          <div className="pool">
            {q.words.map((w, i) => (
              <button key={i} className="chip" disabled={built.includes(i) || Boolean(result)} onClick={() => setBuilt([...built, i])}>{w}</button>
            ))}
          </div>
          {!result && <button className="btn btn-primary" disabled={built.length !== q.words.length} onClick={checkOrder}>Check sentence</button>}
        </div>
      )}

      {q.type === 'compose' && (
        <form className="written-form" onSubmit={submitCompose}>
          <textarea className="answer-input" rows="3" value={text} disabled={Boolean(result) || selfCheck} onChange={(e) => setText(e.target.value)} aria-label="Your sentence" placeholder={`A sentence with "${q.word}"…`} />
          {!result && !selfCheck && <button className="btn btn-primary" disabled={!text.trim()}>Check my sentence</button>}
          {selfCheck && !result && (
            <div className="self-check">
              <p><b>Compare with these model sentences:</b></p>
              <ul>{q.models.map((m) => <li key={m}>{m}</li>)}</ul>
              <p className="muted">{q.explanation}</p>
              <p>Is your sentence grammatically correct, and does it use "{q.word}" with this meaning? Be strict — this is how the word becomes yours.</p>
              <div className="btn-row">
                <button type="button" className="btn btn-primary" onClick={() => finish(true, text.trim())}>Yes, mine is correct</button>
                <button type="button" className="btn" onClick={() => finish(false, text.trim(), 'You marked your own sentence as needing work. Try again with one of the collocations.')}>No, it has a mistake</button>
              </div>
            </div>
          )}
        </form>
      )}

      {result && (
        <div className={`feedback ${result.correct ? 'fb-right' : 'fb-wrong'}`} role="status">
          <p className="fb-title">{result.correct ? RIGHT[q.id.length % RIGHT.length] : result.reason === 'Time is up.' ? 'Time is up.' : 'Not quite.'}</p>
          {showReview && (
            <dl className="review-grid">
              <dt>Your answer</dt><dd className="redpen"><del>{result.my || '—'}</del></dd>
              <dt>Correct</dt><dd className="better">{q.answer}</dd>
              {result.reason && result.reason !== 'Time is up.' && (<><dt>Problem</dt><dd>{result.reason}</dd></>)}
            </dl>
          )}
          {q.type !== 'compose' || !result.correct ? <p className="fb-why">{q.explanation}</p> : null}
          {q.bn && !result.correct && <p className="bn" lang="bn">{q.bn}</p>}
          {!fast && <button ref={nextBtn} className="btn btn-primary" onClick={onNext}>{nextLabel}</button>}
        </div>
      )}
    </div>
  );
}
