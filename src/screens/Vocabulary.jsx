import { useEffect, useMemo, useRef, useState } from 'react';
import { useProgress } from '../state/ProgressContext.jsx';
import { dayKey } from '../engine/dates.js';
import { WORDS, WORD_BY_ID } from '../data/vocabulary/words.js';
import { STAGES, todaysBatch, examWeek, weekWords, unlockedWords, stageOf, stageCounts, dayInfo } from '../engine/vocab.js';
import { vocabFor, makeQuestion } from '../engine/generators.js';
import QuizRunner from '../components/QuizRunner.jsx';
import Icon from '../components/Icons.jsx';
import { PRACTICE_XP } from './Practice.jsx';
import { celebrateBig } from '../ui/celebrate.js';

const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

export function speak(text) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    const v = speechSynthesis.getVoices().find((x) => /en-GB/i.test(x.lang)) || speechSynthesis.getVoices().find((x) => /^en/i.test(x.lang));
    if (v) u.voice = v;
    u.lang = v?.lang || 'en-GB'; u.rate = 0.9;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  } catch { /* speech not supported */ }
}

export function WordCard({ w, stage }) {
  const [all, setAll] = useState(false);
  return (
    <article className="word-card">
      <header className="wc-head">
        <div>
          <h2 className="wc-word">{w.w}</h2>
          <p className="wc-ipa">{w.ipa} <span className="wc-pos">{w.pos}</span> <span className={`lvl-tag lvl-${w.lvl}`}>{w.lvl}</span></p>
        </div>
        <button className="icon-btn big" onClick={() => speak(w.w)} aria-label={`Hear "${w.w}"`}><Icon name="volume" size={24} /></button>
      </header>
      {stage !== undefined && <ol className="stage-track" aria-label={`Stage: ${STAGES[stage]}`}>{STAGES.slice(1).map((s, k) => <li key={s} className={k < stage ? 'on' : ''}>{s}</li>)}</ol>}
      <p className="wc-meaning">{w.m}</p>
      <p className="bn" lang="bn">{w.bn}</p>
      <dl className="wc-facts">
        <div><dt>Synonyms</dt><dd>{w.syn.join(', ')}</dd></div>
        {w.ant.length > 0 && <div><dt>Opposite</dt><dd>{w.ant.join(', ')}</dd></div>}
        <div><dt>Collocations</dt><dd>{w.col.map((c) => <span key={c} className="colloc">{c}</span>)}</dd></div>
        <div><dt>Common mistake</dt><dd>{w.err}</dd></div>
        <div><dt>For IELTS</dt><dd>{w.ielts}</dd></div>
      </dl>
      <h3>10 examples</h3>
      <ol className="wc-examples">
        {(all ? w.ex : w.ex.slice(0, 4)).map((e) => (
          <li key={e}><span>{e}</span><button className="mini-speak" onClick={() => speak(e)} aria-label="Hear this sentence"><Icon name="speaker" size={16} /></button></li>
        ))}
      </ol>
      {!all && <button className="btn btn-small" onClick={() => setAll(true)}>Show all 10 examples</button>}
    </article>
  );
}

function LearnCards({ ids, onDone, onExit }) {
  const [i, setI] = useState(0);
  const touch = useRef(null);
  const w = WORD_BY_ID[ids[i]];
  const go = (d) => setI((x) => Math.max(0, Math.min(ids.length - 1, x + d)));
  useEffect(() => {
    const k = (e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  });
  return (
    <section className="page learn-cards">
      <div className="lesson-head">
        <button className="back" onClick={onExit} aria-label="Back">←</button>
        <div><h1>Today's words</h1><p className="muted">Word {i + 1} of {ids.length}. Read it, hear it, read the examples.</p></div>
      </div>
      <div className="dots">{ids.map((id, k) => <button key={id} className={k === i ? 'on' : k < i ? 'seen' : ''} onClick={() => setI(k)} aria-label={`Word ${k + 1}`} />)}</div>
      <div className="swipe" key={w.id}
        onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - (touch.current ?? 0); if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1); }}>
        <WordCard w={w} />
      </div>
      <div className="btn-row sticky-actions">
        <button className="btn" disabled={i === 0} onClick={() => go(-1)}>Previous</button>
        {i < ids.length - 1
          ? <button className="btn btn-primary" onClick={() => go(1)}>Next word</button>
          : <button className="btn btn-primary" onClick={onDone}>Practise these {ids.length} words</button>}
      </div>
    </section>
  );
}

// Recognise → understand → use in context → produce.
function dailyQuiz(ids) {
  const p1 = ids.map((id, k) => vocabFor(id, k % 2 ? 'bn' : 'meaning'));
  const p2 = shuffle(ids).map((id) => vocabFor(id, 'blank'));
  const p3 = shuffle(ids).map((id, k) => vocabFor(id, k % 2 ? 'context' : 'syn'));
  const p4 = ids.map((id) => vocabFor(id, 'compose'));
  return [...shuffle(p1), ...p2, ...p3, ...p4];
}
function examQuiz(week) {
  const ids = weekWords(week).map((w) => w.id);
  const kinds = ['blank', 'context', 'syn', 'meaning', 'ant', 'bn'];
  const main = shuffle(ids).map((id, k) => vocabFor(id, kinds[k % kinds.length]));
  const compose = shuffle(ids).slice(0, 5).map((id) => vocabFor(id, 'compose'));
  return [...main, ...compose];
}

export default function Vocabulary() {
  const { state, recordPractice, introWords, finishVocabSession, finishVocabExam, unlockMoreWords } = useProgress();
  const today = dayKey();
  const [mode, setMode] = useState(null);
  const [open, setOpen] = useState(null);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const info = dayInfo(state.profile.startDate, today);
  const batch = todaysBatch(state, today);
  const exam = examWeek(state, today);
  const unlocked = unlockedWords(state, today);
  const counts = stageCounts(state);
  const recs = state.vocab.words;
  const learned = unlocked.filter((w) => stageOf(recs[w.id]) >= 1);
  const canMore = unlocked.length < WORDS.length;
  const list = useMemo(() => unlocked.filter((w) => (filter === 'all' || stageOf(recs[w.id]) === Number(filter)) && (!q || w.w.includes(q.toLowerCase()) || w.bn.includes(q))), [unlocked, recs, filter, q]);
  const record = (qq, correct, my) => recordPractice({ q: qq, correct, myAnswer: my, xp: correct ? PRACTICE_XP[qq.type] || 2 : 0 });

  if (mode?.m === 'learn') return <LearnCards ids={mode.ids} onExit={() => setMode(null)} onDone={() => { introWords(mode.ids); setMode({ m: 'quiz', ids: mode.ids, qs: dailyQuiz(mode.ids) }); }} />;
  if (mode?.m === 'quiz') return (
    <QuizRunner title="Word practice" sub={mode.ids.map((id) => WORD_BY_ID[id].w).join(' · ')} total={mode.qs.length} next={(i) => mode.qs[i]}
      xpFor={(x) => PRACTICE_XP[x.type] || 2} onAnswer={record}
      onFinish={(s) => { if (s.reason !== 'quit') finishVocabSession({ ids: mode.ids }); }}
      endExtra={() => <StageSummary ids={mode.ids} recs={recs} />} onExit={() => setMode(null)} />
  );
  if (mode?.m === 'exam') return (
    <QuizRunner title={`Week ${mode.week + 1} vocabulary exam`} sub="30 words · pass with 70%" total={mode.qs.length} next={(i) => mode.qs[i]}
      xpFor={(x) => PRACTICE_XP[x.type] || 2} onAnswer={record}
      onFinish={(s) => {
        if (s.reason === 'quit') return;
        const perWord = {};
        s.results.forEach(({ q: x, correct }) => { perWord[x.wordId] = (perWord[x.wordId] ?? true) && correct; });
        finishVocabExam({ week: mode.week, score: s.correct, total: s.answered, perWord });
        if (s.pct >= 70) setTimeout(() => celebrateBig('Exam passed', `${s.pct}% on 30 words. Words you got fully right move towards Mastered.`, '📝'), 400);
      }}
      endTitle={(s) => (s.pct >= 70 ? 'Exam passed' : 'Not passed yet')}
      endExtra={(s) => <p className="result-msg">{s.pct >= 70 ? 'You can use most of this week\'s words. Words with any wrong answer stay below Mastered and will keep coming back.' : `You need 70% to pass. Practise the words you missed, then try again. Your score: ${s.pct}%.`}</p>}
      onExit={() => setMode(null)} />
  );
  if (mode?.m === 'all') return (
    <QuizRunner title="Practise my words" sub={`${learned.length} learned words`} total={mode.n || Infinity}
      next={() => { const weakIds = learned.filter((w) => stageOf(recs[w.id]) < 4).map((w) => w.id); return makeQuestion('vocab', { pool: weakIds.length >= 4 ? weakIds : learned.map((w) => w.id) }); }}
      xpFor={(x) => PRACTICE_XP[x.type] || 2} onAnswer={record} onExit={() => setMode(null)} />
  );

  return (
    <section className="page vocab">
      <h1>Vocabulary</h1>
      <p className="muted">Day {info.day} · week {info.week + 1}. Five new words on days 1–6, a 30-word exam on day 7. A word only counts as Mastered when you can use it.</p>

      <div className="stage-bar" aria-label="Words by stage">
        {STAGES.slice(1).map((s, k) => <span key={s} className={`sb sb-${k + 1}`}><b>{counts[k + 1]}</b>{s}</span>)}
      </div>

      {exam !== null && (
        <div className="exam-card">
          <div><h2>Week {exam + 1} exam is ready</h2><p>30 words, 35 questions: meaning, context, gap-fill, synonyms, opposites and 5 sentences you write yourself.</p></div>
          <button className="btn btn-primary" onClick={() => setMode({ m: 'exam', week: exam, qs: examQuiz(exam) })}>Start exam</button>
        </div>
      )}

      <div className="today-words">
        <div className="tw-head">
          <h2>{batch.done ? 'Today\'s words — learned' : info.examDay && !batch.words.length ? 'Day 7: review day' : 'Today\'s 5 words'}</h2>
          {batch.pending > 5 && <span className="m-pill m-1">{batch.pending - 5} more waiting from earlier days</span>}
        </div>
        {batch.words.length > 0 ? (
          <>
            <ul className="tw-list">
              {batch.words.map((w) => (
                <li key={w.id}><button onClick={() => setOpen(w.id)}><b>{w.w}</b><small lang="bn">{w.bn}</small><span className={`m-pill m-${stageOf(recs[w.id])}`}>{STAGES[stageOf(recs[w.id])]}</span></button></li>
              ))}
            </ul>
            <div className="btn-row">
              {!batch.done && <button className="btn btn-primary" onClick={() => setMode({ m: 'learn', ids: batch.words.map((w) => w.id) })}>Learn these words</button>}
              {!batch.done && batch.words.every((w) => recs[w.id]?.intro) && <button className="btn" onClick={() => setMode({ m: 'quiz', ids: batch.words.map((w) => w.id), qs: dailyQuiz(batch.words.map((w) => w.id)) })}>Skip to practice</button>}
              {batch.done && <button className="btn btn-primary" onClick={() => setMode({ m: 'quiz', ids: batch.words.map((w) => w.id), qs: dailyQuiz(batch.words.map((w) => w.id)) })}>Practise today's words again</button>}
            </div>
          </>
        ) : <p className="muted">{info.examDay ? 'No new words today — review and take the weekly exam.' : 'No words waiting.'}</p>}
        {batch.done && canMore && <button className="btn btn-small" onClick={unlockMoreWords}>Learn 5 more words today</button>}
        {!canMore && <p className="fine">You have unlocked all {WORDS.length} words in this version. More word sets come with the next content update.</p>}
      </div>

      {learned.length >= 4 && (
        <div className="btn-row">
          <button className="btn btn-primary" onClick={() => setMode({ m: 'all', n: 20 })}>Practise my words (20)</button>
          <button className="btn" onClick={() => setMode({ m: 'all', n: 0 })}>Endless word practice</button>
        </div>
      )}

      <h2>My words ({unlocked.length})</h2>
      <div className="word-tools">
        <input className="answer-input" placeholder="Search English or বাংলা" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search words" />
        <div className="seg" role="radiogroup" aria-label="Filter by stage">
          {[['all', 'All'], ...STAGES.map((s, k) => [String(k), s])].map(([v, l]) => <button key={v} role="radio" aria-checked={filter === v} className={filter === v ? 'on' : ''} onClick={() => setFilter(v)}>{l}</button>)}
        </div>
      </div>
      <ul className="word-list">
        {list.map((w) => (
          <li key={w.id}><button onClick={() => setOpen(w.id)}>
            <span><b>{w.w}</b> <small>{w.pos}</small></span><span lang="bn" className="muted">{w.bn}</span>
            <span className={`m-pill m-${stageOf(recs[w.id])}`}>{STAGES[stageOf(recs[w.id])]}</span>
          </button></li>
        ))}
        {!list.length && <li className="muted">No words match.</li>}
      </ul>

      {open && (
        <div className="sheet-backdrop" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
          <div className="sheet sheet-tall">
            <WordCard w={WORD_BY_ID[open]} stage={stageOf(recs[open])} />
            <button className="btn btn-wide" onClick={() => setOpen(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

function StageSummary({ ids, recs }) {
  return (
    <div className="weak-list">
      <h2>Where each word stands</h2>
      <ul>{ids.map((id) => { const s = stageOf(recs[id]); return <li key={id}><span>{WORD_BY_ID[id].w}<small lang="bn">{WORD_BY_ID[id].bn}</small></span><span className={`m-pill m-${s}`}>{STAGES[s]}</span></li>; })}</ul>
      <p className="muted">Mastered needs: correct in the weekly exam, your own sentence, and correct answers on at least two different days.</p>
    </div>
  );
}
