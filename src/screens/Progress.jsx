import { Link } from 'react-router-dom';
import { useProgress } from '../state/ProgressContext.jsx';
import { dayKey, addDays } from '../engine/dates.js';
import { weaknesses } from '../engine/path.js';
import { ALL_TOPICS } from '../data/curriculum.js';
import { CATEGORIES, GRAMMAR_CATS, catLabel } from '../engine/generators.js';
import { mastery, MASTERY, recentAcc } from '../engine/practiceStats.js';
import { stageCounts, STAGES } from '../engine/vocab.js';

function Bars({ days, daily }) {
  const vals = days.map((d) => daily[d] || { answered: 0, correct: 0 });
  const max = Math.max(10, ...vals.map((v) => v.answered || 0));
  const W = 28, G = 8, H = 120;
  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${days.length * (W + G)} ${H + 24}`} role="img" aria-label="Questions answered per day, last 14 days" className="chart">
        {vals.map((v, k) => {
          const h = ((v.answered || 0) / max) * H, hc = ((v.correct || 0) / max) * H, x = k * (W + G);
          return (
            <g key={days[k]}>
              <title>{`${days[k]}: ${v.answered || 0} answered, ${v.correct || 0} correct`}</title>
              <rect x={x} y={H - h} width={W} height={h} rx="5" className="bar-wrong" />
              <rect x={x} y={H - hc} width={W} height={hc} rx="5" className="bar-right" />
              <text x={x + W / 2} y={H + 16} textAnchor="middle" className="chart-label">{days[k].slice(8)}</text>
            </g>
          );
        })}
      </svg>
      <p className="legend"><span className="lg lg-green" /> correct <span className="lg lg-red" /> wrong</p>
    </div>
  );
}

const sumDays = (daily, days) => days.reduce((a, d) => { const v = daily[d] || {}; return { answered: a.answered + (v.answered || 0), correct: a.correct + (v.correct || 0), xp: a.xp + (v.xp || 0), studied: a.studied + ((v.answered || v.lessons || v.games) ? 1 : 0) }; }, { answered: 0, correct: 0, xp: 0, studied: 0 });
const acc = (c, a) => (a ? Math.round((c / a) * 100) : null);
const catAcc = (practice, ids) => { const p = ids.map((i) => practice[i]).filter(Boolean); const n = p.reduce((a, x) => a + x.n, 0); return n >= 10 ? acc(p.reduce((a, x) => a + x.c, 0), n) : null; };

export default function Progress() {
  const { state } = useProgress();
  const today = dayKey();
  const days14 = Array.from({ length: 14 }, (_, k) => addDays(today, k - 13));
  const days30 = Array.from({ length: 30 }, (_, k) => addDays(today, k - 29));
  const wk = sumDays(state.daily, days14.slice(7)), pv = sumDays(state.daily, days14.slice(0, 7)), mo = sumDays(state.daily, days30);
  const wkAcc = acc(wk.correct, wk.answered), pvAcc = acc(pv.correct, pv.answered);
  const weak = weaknesses(state.mistakes);
  const studied = ALL_TOPICS.filter((t) => state.topics[t.id]);
  const counts = stageCounts(state);
  const practised = CATEGORIES.filter((c) => state.practice[c.id]);
  const strong = practised.filter((c) => mastery(state.practice[c.id]) >= 3);
  const vocabAcc = state.practice.vocab?.n >= 10 ? acc(state.practice.vocab.c, state.practice.vocab.n) : null;
  const usesWords = counts[3] + counts[4], knowsWords = counts[1] + counts[2] + usesWords;

  const skills = [
    ['Grammar', catAcc(state.practice, GRAMMAR_CATS) ?? acc(state.stats.correct, state.stats.answered)],
    ['Vocabulary', vocabAcc], ['Paraphrasing', catAcc(state.practice, ['paraphrase'])],
    ['Reading', null], ['Listening', null], ['Writing', null], ['Speaking', null]
  ];

  return (
    <section className="page">
      <h1>Progress</h1>
      <dl className="result-grid four">
        <div><dt>Questions this week</dt><dd>{wk.answered}</dd></div>
        <div><dt>Accuracy this week</dt><dd>{wkAcc === null ? '–' : `${wkAcc}%`}</dd></div>
        <div><dt>XP this week</dt><dd>{wk.xp}</dd></div>
        <div><dt>Days studied</dt><dd>{state.streak.daysStudied}</dd></div>
      </dl>
      {wkAcc !== null && pvAcc !== null && (
        <p className="insight">{wkAcc - pvAcc > 0 ? `Your accuracy improved by ${wkAcc - pvAcc} percentage points compared with last week.` : wkAcc - pvAcc < 0 ? `Accuracy is ${pvAcc - wkAcc} points lower than last week. Look at your weakest categories below.` : 'Accuracy is the same as last week.'}</p>
      )}
      {knowsWords >= 5 && usesWords < knowsWords / 3 && <p className="insight">You know the meanings of {knowsWords} words but can use only {usesWords} in your own sentences. Do the sentence-writing step for each word.</p>}

      <h2>Last 14 days</h2>
      <Bars days={days14} daily={state.daily} />

      <h2>Last 30 days</h2>
      <dl className="result-grid four">
        <div><dt>Questions</dt><dd>{mo.answered}</dd></div>
        <div><dt>Accuracy</dt><dd>{acc(mo.correct, mo.answered) ?? '–'}{mo.answered ? '%' : ''}</dd></div>
        <div><dt>Days active</dt><dd>{mo.studied}/30</dd></div>
        <div><dt>Topics passed</dt><dd>{state.stats.lessonsCompleted}</dd></div>
      </dl>

      <h2>Skill scores</h2>
      <p className="muted">Accuracy on practice questions (at least 10 answers). These are not IELTS band scores.</p>
      <ul className="skills">
        {skills.map(([name, v]) => (
          <li key={name}>
            <span>{name}</span>
            <span className="skill-bar"><span style={{ width: `${v || 0}%` }} /></span>
            <b>{v === null ? 'Not measured yet' : `${v}%`}</b>
          </li>
        ))}
      </ul>

      <h2>Practice categories</h2>
      {practised.length ? (
        <>
          <p className="muted">{strong.length} of {CATEGORIES.length} categories at Strong or above.</p>
          <ul className="cat-table">
            {[...practised].sort((a, b) => (recentAcc(state.practice[a.id]) ?? 0) - (recentAcc(state.practice[b.id]) ?? 0)).map((c) => {
              const p = state.practice[c.id], l = mastery(p);
              return <li key={c.id}><Link to={`/practice?cat=${c.id}`}><span>{c.title}</span><span className="skill-bar"><span style={{ width: `${(recentAcc(p) ?? 0) * 100}%` }} /></span><span className={`m-pill m-${l}`}>{MASTERY[l]}</span></Link></li>;
            })}
          </ul>
        </>
      ) : <p className="muted">No practice yet. <Link to="/practice">Start a category</Link>.</p>}

      <h2>Vocabulary</h2>
      <div className="stage-bar">{STAGES.slice(1).map((s, k) => <span key={s} className={`sb sb-${k + 1}`}><b>{counts[k + 1]}</b>{s}</span>)}</div>

      {weak.length > 0 && (
        <>
          <h2>Weakest areas</h2>
          <p>Your weakest area is <b>{(catLabel(weak[0].concept) || weak[0].label || weak[0].concept).toLowerCase()}</b>.</p>
          <ul className="weak-list plain">{weak.slice(0, 5).map((w) => <li key={w.concept}><span>{catLabel(w.concept) || w.label || w.concept}</span><b>{w.mistakes}</b></li>)}</ul>
          <Link className="btn btn-primary" to={`/practice?concept=${weak[0].concept}`}>Practise this now</Link>
        </>
      )}

      {studied.length > 0 && (
        <>
          <h2>Lessons</h2>
          <div className="table-wrap"><table>
            <thead><tr><th>Topic</th><th>Attempts</th><th>Last</th><th>Best</th></tr></thead>
            <tbody>{studied.map((t) => { const s = state.topics[t.id]; return <tr key={t.id}><td>{t.title}</td><td>{s.attempts}</td><td>{s.lastScore}%</td><td>{s.bestScore}%</td></tr>; })}</tbody>
          </table></div>
        </>
      )}
    </section>
  );
}
