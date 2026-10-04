import { useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProgress } from '../state/ProgressContext.jsx';
import { makeQuestion, GRAMMAR_CATS, CATEGORIES } from '../engine/generators.js';
import { weight, weightedPick } from '../engine/practiceStats.js';
import { WORDS, WORD_BY_ID } from '../data/vocabulary/words.js';
import { SENTENCE_ROUNDS, POS_WORDS, POS_HINT } from '../data/games/index.js';
import QuizRunner from '../components/QuizRunner.jsx';
import { GAMES } from './Games.jsx';
import { PRACTICE_XP, learnedPool } from './Practice.jsx';
import { celebrateCorrect, celebrateWrong, celebrateBig } from '../ui/celebrate.js';

const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const FOUNDATION = ['sva', 'be', 'dodoes', 'pronouns', 'articles', 'quantifiers', 'prepositions', 'plurals'];

export default function GamePlay() {
  const { gameId } = useParams();
  const nav = useNavigate();
  const { state, recordPractice, recordGame } = useProgress();
  const [playId, setPlayId] = useState(0);
  const again = () => setPlayId((n) => n + 1);
  const game = GAMES.find((g) => g.id === gameId);
  const learned = useMemo(() => learnedPool(state), []); // eslint-disable-line react-hooks/exhaustive-deps
  const pool = learned.length >= 8 ? learned : WORDS.slice(0, 30).map((w) => w.id);
  const usingStarter = learned.length < 8;
  // Weights are fixed at the start of a game so the mix doesn't shift mid-play.
  const weights = useMemo(() => Object.fromEntries(CATEGORIES.map((c) => [c.id, weight(state.practice[c.id])])), []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!game) return <section className="page"><p>Game not found.</p><Link className="btn" to="/games">Back to games</Link></section>;

  const exit = () => nav('/games');
  const record = (q, correct, my) => recordPractice({ q, correct, myAnswer: my, xp: correct ? PRACTICE_XP[q.type] || 2 : 0 });
  const xpFor = (q) => PRACTICE_XP[q.type] || 2;
  const adaptive = (cats) => () => makeQuestion(weightedPick(cats, cats.map((c) => weights[c])), { mcq: true, pool });
  const finishGame = (s, extra = {}) => {
    if (s.reason === 'quit' && !s.answered) return;
    const won = extra.won ?? s.won;
    const bonus = won ? 100 : s.pct >= 80 && s.answered >= 8 ? 10 : 0;
    recordGame({ game: game.id, score: extra.score ?? s.correct, total: s.answered, won: Boolean(won), bonusXp: bonus });
    if (won) setTimeout(() => celebrateBig(`${game.name} defeated`, '+100 XP and a badge on your first win.', game.icon), 300);
  };
  const run = (props) => <QuizRunner title={`${game.icon} ${game.name}`} xpFor={xpFor} onAnswer={record} onExit={exit} onFinish={(s) => finishGame(s)} {...props} />;

  switch (game.id) {
    case 'word-match':
      return <Matching game={game} onExit={exit} onFinish={(score, total) => recordGame({ game: game.id, score, total, bonusXp: Math.round(score / 2) })} note={usingStarter && 'Using the first 30 words until you have learned 8 of your own.'}
        key={playId} onRestart={again} makeRounds={() => [0, 1, 2].map(() => shuffle(pool).slice(0, 5).map((id) => ({ id, a: WORD_BY_ID[id].w, b: WORD_BY_ID[id].bn, bLang: 'bn' })))} />;
    case 'synonym-match':
      return <Matching game={game} onExit={exit} onFinish={(score, total) => recordGame({ game: game.id, score, total, bonusXp: Math.round(score / 2) })} note={usingStarter && 'Using the first 30 words until you have learned 8 of your own.'}
        key={playId} onRestart={again} makeRounds={() => [0, 1, 2].map(() => uniqueSyn(shuffle(pool)).slice(0, 5).map((id) => ({ id, a: WORD_BY_ID[id].w, b: WORD_BY_ID[id].syn[0] })))} />;
    case 'sentence-match':
      return <Matching game={game} onExit={exit} onFinish={(score, total) => recordGame({ game: game.id, score, total, bonusXp: Math.round(score / 2) })}
        key={playId} onRestart={again} makeRounds={() => shuffle(SENTENCE_ROUNDS).slice(0, 3).map((r) => r.map(([a, b]) => ({ id: a, a, b })))} long />;
    case 'word-sort': return <Sorting key={playId} onRestart={again} game={game} onExit={exit} onFinish={(score, total) => recordGame({ game: game.id, score, total, bonusXp: score >= total - 1 ? 10 : 0 })} />;
    case 'context': return run({ sub: usingStarter ? 'Starter words' : 'Your learned words', total: 10, next: () => makeQuestion('vocab', { pool, kind: 'context' }) });
    case 'builder': return run({ sub: 'Tap words in order', total: 8, next: () => makeQuestion('order') });
    case 'fill-gap': return run({ sub: 'Foundation grammar', total: 15, next: adaptive(FOUNDATION) });
    case 'tense': return run({ sub: '20 seconds per question', total: 12, mode: { perQ: 20 }, next: () => makeQuestion('tenses', { mcq: true }) });
    case 'error-hunter': return run({ sub: 'One sentence is correct', total: 12, next: () => makeQuestion('errors') });
    case 'paraphrase': return run({ sub: 'Meaning first, then words', total: 9, next: () => makeQuestion('paraphrase') });
    case 'speed': return run({ sub: 'Answer fast', mode: { totalTime: 60, fast: true }, next: adaptive(['sva', 'be', 'dodoes', 'articles', 'tenses', 'past', 'prepositions', 'quantifiers', 'pronouns']) });
    case 'boss-grammar': return run({ sub: 'Weighted to your weak areas', mode: { lives: 5, boss: { name: 'The Grammar Ogre', hp: 30, icon: '👹' } }, next: adaptive(GRAMMAR_CATS.filter((c) => c !== 'order')) });
    case 'boss-vocab': return run({ sub: usingStarter ? 'Starter words' : 'Your learned words', mode: { lives: 5, boss: { name: 'The Word Dragon', hp: 25, icon: '🐲' } }, next: () => makeQuestion('vocab', { pool, mcq: true }) });
    case 'boss-foundation': return run({ sub: 'Everything so far', mode: { lives: 5, boss: { name: 'The Foundation Dragon', hp: 50, icon: '🐉' } }, next: adaptive([...GRAMMAR_CATS.filter((c) => c !== 'order'), 'vocab', 'paraphrase']) });
    default: return null;
  }
}

function uniqueSyn(ids) {
  const seen = new Set();
  return ids.filter((id) => { const s = WORD_BY_ID[id].syn[0]; if (seen.has(s)) return false; seen.add(s); return true; });
}

function Matching({ game, makeRounds, onFinish, onExit, onRestart, long, note }) {
  const rounds = useMemo(makeRounds, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [r, setR] = useState(0);
  const [left, setLeft] = useState(null);
  const [matched, setMatched] = useState([]);
  const [bad, setBad] = useState(null);
  const [firstTry, setFirstTry] = useState(0);
  const missed = useRef(new Set());
  const start = useRef(Date.now());
  const [done, setDone] = useState(null);
  const pairs = rounds[r];
  const rightCol = useMemo(() => shuffle(pairs), [r]); // eslint-disable-line react-hooks/exhaustive-deps
  const leftCol = useMemo(() => shuffle(pairs), [r]); // eslint-disable-line react-hooks/exhaustive-deps
  const total = rounds.reduce((a, x) => a + x.length, 0);

  function pickRight(p) {
    if (!left || matched.includes(p.id)) return;
    if (left === p.id) {
      const m = [...matched, p.id];
      setMatched(m); setLeft(null);
      const ok = !missed.current.has(p.id);
      if (ok) setFirstTry((x) => x + 1);
      celebrateCorrect({});
      if (m.length === pairs.length) {
        setTimeout(() => {
          if (r + 1 < rounds.length) { setR(r + 1); setMatched([]); }
          else {
            const score = firstTry + (ok ? 1 : 0);
            setDone({ score, secs: Math.round((Date.now() - start.current) / 1000) });
            onFinish(score, total);
          }
        }, 500);
      }
    } else {
      missed.current.add(left); setBad(p.id); celebrateWrong();
      setTimeout(() => setBad(null), 450);
    }
  }

  if (done) return (
    <section className="page result run-end">
      <h1>{game.icon} {game.name}</h1>
      <p className={`result-score ${done.score / total >= 0.6 ? '' : 'fail'}`}><b>{done.score}/{total}</b><span>matched on the first try · {done.secs} seconds</span></p>
      <p className="result-msg">{done.score === total ? 'Every pair right the first time.' : `${total - done.score} pair${total - done.score > 1 ? 's' : ''} needed a second try. Those are the ones to study.`}</p>
      <div className="btn-row"><button className="btn btn-primary" onClick={onRestart}>Play again</button><button className="btn" onClick={onExit}>Done</button></div>
    </section>
  );
  return (
    <section className="page lesson match-game">
      <div className="lesson-head">
        <button className="back" onClick={onExit} aria-label="Back">←</button>
        <div><h1>{game.icon} {game.name}</h1><p className="muted">Round {r + 1} of {rounds.length}. Tap a left item, then its match.</p></div>
      </div>
      {note && <p className="fb-note">{note}</p>}
      <div className={`match-board ${long ? 'long' : ''}`}>
        <div className="match-col">
          {leftCol.map((p) => <button key={p.id} className={`match-item ${left === p.id ? 'sel' : ''} ${matched.includes(p.id) ? 'done' : ''}`} disabled={matched.includes(p.id)} onClick={() => setLeft(p.id)}>{p.a}</button>)}
        </div>
        <div className="match-col">
          {rightCol.map((p) => <button key={p.id} lang={p.bLang} className={`match-item ${matched.includes(p.id) ? 'done' : ''} ${bad === p.id ? 'shake' : ''}`} disabled={matched.includes(p.id)} onClick={() => pickRight(p)}>{p.b}</button>)}
        </div>
      </div>
    </section>
  );
}

function Sorting({ game, onFinish, onExit, onRestart }) {
  const words = useMemo(() => shuffle(Object.entries(POS_WORDS).flatMap(([pos, ws]) => shuffle(ws).slice(0, 4).map((w) => ({ w, pos })))), []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [fb, setFb] = useState(null);
  const cur = words[i];
  function pick(pos) {
    if (fb) return;
    const ok = pos === cur.pos;
    if (ok) { setScore((s) => s + 1); celebrateCorrect({}); } else celebrateWrong();
    setFb({ ok, pos });
  }
  function next() {
    setFb(null);
    if (i + 1 >= words.length) { onFinish(score, words.length); setI(words.length); } else setI(i + 1);
  }
  if (i >= words.length) return (
    <section className="page result run-end">
      <h1>{game.icon} {game.name}</h1>
      <p className={`result-score ${score / words.length >= 0.6 ? '' : 'fail'}`}><b>{score}/{words.length}</b><span>sorted correctly</span></p>
      <div className="btn-row"><button className="btn btn-primary" onClick={onRestart}>Play again</button><button className="btn" onClick={onExit}>Done</button></div>
    </section>
  );
  return (
    <section className="page lesson sort-game">
      <div className="lesson-head">
        <button className="back" onClick={onExit} aria-label="Back">←</button>
        <div><h1>{game.icon} {game.name}</h1><p className="muted">{i + 1} of {words.length} · {score} correct</p></div>
      </div>
      <div className="lesson-progress"><span style={{ width: `${(i / words.length) * 100}%` }} /></div>
      <div className={`sort-word ${fb ? (fb.ok ? 'ok' : 'no') : ''}`} key={cur.w}>{cur.w}</div>
      <div className="sort-bins">
        {Object.keys(POS_WORDS).map((p) => (
          <button key={p} className={`bin ${fb && p === cur.pos ? 'right' : ''} ${fb && !fb.ok && p === fb.pos ? 'wrong' : ''}`} onClick={() => pick(p)}>{p}</button>
        ))}
      </div>
      {fb && (
        <div className={`feedback ${fb.ok ? 'fb-right' : 'fb-wrong'}`}>
          <p className="fb-title">{fb.ok ? 'Correct.' : `"${cur.w}" is a${cur.pos === 'Adjective' || cur.pos === 'Adverb' ? 'n' : ''} ${cur.pos.toLowerCase()}.`}</p>
          <p className="fb-why">{POS_HINT[cur.pos]}</p>
          <button className="btn btn-primary" autoFocus onClick={next}>{i + 1 < words.length ? 'Next word' : 'See my result'}</button>
        </div>
      )}
    </section>
  );
}
