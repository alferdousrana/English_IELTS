import { Link } from 'react-router-dom';
import { UNITS, PHASES } from '../data/curriculum.js';
import { useProgress } from '../state/ProgressContext.jsx';
import { topicStatus } from '../engine/path.js';
import { CAT } from '../engine/generators.js';
import { CAT_TOPICS } from '../engine/unlocks.js';

const STATUS_TEXT = { done: 'Passed', open: 'Start', locked: 'Locked', soon: 'Lesson coming' };
export default function Learn() {
  const { state } = useProgress();
  return (
    <section className="page learn">
      <h1>Learning path</h1>
      <p className="muted">16 weeks from sentence basics to IELTS mock tests. Lessons open one at a time: pass a lesson with 60% to open the next one. Passing a lesson also unlocks its practice categories.</p>
      <ol className="road" aria-label="Roadmap">
        {['Foundation', 'Tenses', 'Advanced grammar', 'Vocabulary', 'IELTS skills', 'Mock tests', 'Band 7.5+'].map((r, k) => <li key={r} className={k === 0 ? 'here' : ''}>{r}</li>)}
      </ol>
      {[1, 2, 3, 4].map((m) => (
        <div key={m} className="month">
          <h2 className="month-title">Month {m}<span>{PHASES.filter((p) => p.months.includes(m)).map((p) => p.title).join(' and ')}</span></h2>
          {UNITS.filter((u) => u.month === m).map((u) => (
            <div key={u.id} className="unit">
              <h3><span className="week">Week {u.week}</span>{u.title}</h3>
              <ol className="path">
                {u.topics.map((t) => {
                  const st = topicStatus(t.id, state.topics);
                  const best = state.topics[t.id]?.bestScore;
                  const opens = Object.entries(CAT_TOPICS).filter(([, ts]) => ts.includes(t.id)).map(([c]) => CAT[c]?.title).filter(Boolean);
                  const draft = state.drafts?.[t.id];
                  const inProgress = st === 'open' && draft && !draft.cleared && draft.log?.length > 0;
                  const inner = (
                    <>
                      <span className={`node node-${st}`} aria-hidden="true" />
                      <span className="path-text"><b>{t.title}</b><small lang="bn">{t.titleBn}</small>{opens.length > 0 && st !== 'soon' && <small className="opens">{st === 'done' ? 'Unlocked' : 'Unlocks'}: {opens.join(', ')}</small>}</span>
                      <span className={`path-status st-${st}`}>{inProgress ? `Continue · ${draft.log.length}/40` : `${STATUS_TEXT[st]}${best ? ` · best ${best}%` : ''}`}</span>
                    </>
                  );
                  const link = st === 'open' || st === 'done' ? `/learn/${t.id}` : null;
                  return (
                    <li key={t.id} className={`path-item is-${st}`}>
                      {link ? <Link to={link}>{inner}</Link> : <div aria-disabled="true">{inner}</div>}
                    </li>
                  );
                })}
                {u.topics.length > 0 && (
                  <li className="path-item is-test"><Link to="/games/boss-grammar">
                    <span className="node node-test" aria-hidden="true" />
                    <span className="path-text"><b>Grammar boss battle</b><small>Mixed questions on everything so far, weighted to your weak areas</small></span>
                    <span className="path-status">Play</span>
                  </Link></li>
                )}
                {u.boss && (
                  <li className="path-item is-boss"><Link to="/games/boss-foundation">
                    <span className="node node-boss" aria-hidden="true" />
                    <span className="path-text"><b>{u.boss}</b><small>Extra XP and a badge</small></span>
                    <span className="path-status">Play</span>
                  </Link></li>
                )}
              </ol>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
