import { useProgress } from '../state/ProgressContext.jsx';
import { dayKey, addDays } from '../engine/dates.js';
import { weaknesses } from '../engine/path.js';
import { ALL_TOPICS } from '../data/curriculum.js';

function Bars({ days, daily }) {
  const vals = days.map((d) => daily[d] || { answered: 0, correct: 0 });
  const max = Math.max(10, ...vals.map((v) => v.answered));
  const W = 28, G = 8, H = 120;
  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${days.length * (W + G)} ${H + 24}`} role="img" aria-label="Questions answered per day, last 14 days" className="chart">
        {vals.map((v, k) => {
          const h = (v.answered / max) * H;
          const hc = (v.correct / max) * H;
          const x = k * (W + G);
          return (
            <g key={days[k]}>
              <title>{`${days[k]}: ${v.answered} answered, ${v.correct} correct`}</title>
              <rect x={x} y={H - h} width={W} height={h} rx="4" fill="var(--red-soft)" />
              <rect x={x} y={H - hc} width={W} height={hc} rx="4" fill="var(--green)" />
              <text x={x + W / 2} y={H + 16} textAnchor="middle" className="chart-label">{days[k].slice(8)}</text>
            </g>
          );
        })}
      </svg>
      <p className="legend"><span className="lg lg-green" /> correct <span className="lg lg-red" /> wrong</p>
    </div>
  );
}

export default function Progress() {
  const { state } = useProgress();
  const today = dayKey();
  const days = Array.from({ length: 14 }, (_, k) => addDays(today, k - 13));
  const week = days.slice(7).map((d) => state.daily[d] || {});
  const wkAnswered = week.reduce((a, v) => a + (v.answered || 0), 0);
  const wkCorrect = week.reduce((a, v) => a + (v.correct || 0), 0);
  const prev = days.slice(0, 7).map((d) => state.daily[d] || {});
  const pvAnswered = prev.reduce((a, v) => a + (v.answered || 0), 0);
  const pvCorrect = prev.reduce((a, v) => a + (v.correct || 0), 0);
  const acc = (c, a) => (a ? Math.round((c / a) * 100) : null);
  const wkAcc = acc(wkCorrect, wkAnswered), pvAcc = acc(pvCorrect, pvAnswered);
  const grammar = acc(state.stats.correct, state.stats.answered);
  const weak = weaknesses(state.mistakes);
  const studied = ALL_TOPICS.filter((t) => state.topics[t.id]);

  const skills = [
    ['Grammar', grammar], ['Vocabulary', null], ['Reading', null], ['Listening', null], ['Writing', null], ['Speaking', null], ['Paraphrasing', null]
  ];

  return (
    <section className="page">
      <h1>Progress</h1>

      <dl className="result-grid four">
        <div><dt>Questions this week</dt><dd>{wkAnswered}</dd></div>
        <div><dt>Accuracy this week</dt><dd>{wkAcc === null ? '–' : `${wkAcc}%`}</dd></div>
        <div><dt>Topics passed</dt><dd>{state.stats.lessonsCompleted}</dd></div>
        <div><dt>Days studied</dt><dd>{state.streak.daysStudied}</dd></div>
      </dl>
      {wkAcc !== null && pvAcc !== null && (
        <p className="muted">Compared with the week before: {wkAcc - pvAcc >= 0 ? `accuracy up ${wkAcc - pvAcc}` : `accuracy down ${pvAcc - wkAcc}`} percentage points.</p>
      )}

      <h2>Last 14 days</h2>
      <Bars days={days} daily={state.daily} />

      <h2>Skill scores</h2>
      <p className="muted">Accuracy on practice questions. These are not IELTS band scores.</p>
      <ul className="skills">
        {skills.map(([name, v]) => (
          <li key={name}>
            <span>{name}</span>
            <span className="skill-bar"><span style={{ width: `${v || 0}%` }} /></span>
            <b>{v === null ? 'Not measured yet' : `${v}%`}</b>
          </li>
        ))}
      </ul>

      {weak.length > 0 && (
        <>
          <h2>Weakest areas</h2>
          <p>Your weakest area is <b>{weak[0].label.toLowerCase()}</b>.</p>
          <ul className="weak-list plain">{weak.slice(0, 5).map((w) => <li key={w.concept}><span>{w.label}</span><b>{w.mistakes}</b></li>)}</ul>
        </>
      )}

      {studied.length > 0 && (
        <>
          <h2>Topics</h2>
          <div className="table-wrap"><table>
            <thead><tr><th>Topic</th><th>Attempts</th><th>Last</th><th>Best</th></tr></thead>
            <tbody>{studied.map((t) => { const s = state.topics[t.id]; return <tr key={t.id}><td>{t.title}</td><td>{s.attempts}</td><td>{s.lastScore}%</td><td>{s.bestScore}%</td></tr>; })}</tbody>
          </table></div>
        </>
      )}
    </section>
  );
}
