import { Link } from 'react-router-dom';
import { UNITS, PHASES } from '../data/curriculum.js';
import { useProgress } from '../state/ProgressContext.jsx';
import { topicStatus } from '../engine/path.js';

const STATUS_TEXT = { done: 'Passed', open: 'Start', locked: 'Locked', soon: 'Content coming' };

export default function Learn() {
  const { state } = useProgress();
  const months = [1, 2, 3, 4];
  return (
    <section className="page learn">
      <h1>Learning path</h1>
      <p className="muted">16 weeks from sentence basics to IELTS mock tests. Pass a topic with 60% to open the next one.</p>
      {months.map((m) => (
        <div key={m} className="month">
          <h2 className="month-title">Month {m}<span>{PHASES.filter((p) => p.months.includes(m)).map((p) => p.title).join(' and ')}</span></h2>
          {UNITS.filter((u) => u.month === m).map((u) => (
            <div key={u.id} className="unit">
              <h3><span className="week">Week {u.week}</span>{u.title}</h3>
              <ol className="path">
                {u.topics.map((t) => {
                  const st = topicStatus(t.id, state.topics);
                  const best = state.topics[t.id]?.bestScore;
                  const inner = (
                    <>
                      <span className={`node node-${st}`} aria-hidden="true" />
                      <span className="path-text"><b>{t.title}</b><small lang="bn">{t.titleBn}</small></span>
                      <span className={`path-status st-${st}`}>{STATUS_TEXT[st]}{best ? ` · best ${best}%` : ''}</span>
                    </>
                  );
                  return (
                    <li key={t.id} className={`path-item is-${st}`}>
                      {st === 'open' || st === 'done' ? <Link to={`/learn/${t.id}`}>{inner}</Link> : <div aria-disabled="true">{inner}</div>}
                    </li>
                  );
                })}
                {u.topics.length > 0 && (
                  <li className="path-item is-test"><div aria-disabled="true">
                    <span className="node node-test" aria-hidden="true" />
                    <span className="path-text"><b>Master test: 100 questions</b><small>Covers the 5 topics above, weighted to your mistakes</small></span>
                    <span className="path-status">Milestone 3</span>
                  </div></li>
                )}
                {u.boss && (
                  <li className="path-item is-boss"><div aria-disabled="true">
                    <span className="node node-boss" aria-hidden="true" />
                    <span className="path-text"><b>{u.boss}</b><small>Extra XP and a badge</small></span>
                    <span className="path-status">Milestone 5</span>
                  </div></li>
                )}
              </ol>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
