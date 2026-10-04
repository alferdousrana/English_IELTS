import { Link } from 'react-router-dom';
import { UNITS, PHASES } from '../data/curriculum.js';
import { useProgress } from '../state/ProgressContext.jsx';
import { topicStatus } from '../engine/path.js';
import { CAT } from '../engine/generators.js';
import { mastery, MASTERY } from '../engine/practiceStats.js';

const STATUS_TEXT = { done: 'Passed', open: 'Start', locked: 'Locked', soon: 'Lesson coming' };
// Topics whose written lesson isn't ready yet can still be practised with generated questions.
const TOPIC_CAT = [
  [/agreement/i, 'sva'], [/do\s*\/\s*does|do, does|does\/did/i, 'dodoes'], [/\bbe\b|be verb/i, 'be'], [/article/i, 'articles'],
  [/pronoun/i, 'pronouns'], [/preposition/i, 'prepositions'], [/determiner|quantif/i, 'quantifiers'], [/noun/i, 'plurals'],
  [/question tag/i, 'tags'], [/wh/i, 'wh'], [/negative|question/i, 'negq'], [/past simple|past tense|irregular/i, 'past'],
  [/present perfect|participle/i, 'perfect'], [/tense|present|past|future|continuous/i, 'tenses'], [/modal/i, 'modals'],
  [/passive|active/i, 'passive'], [/conditional/i, 'conditionals'], [/gerund|infinitive/i, 'gerinf'],
  [/compar|superlative|adjective/i, 'compare'], [/error|mistake/i, 'errors'], [/sentence|word order|structure|formation/i, 'order']
];
export const catForTopic = (title) => TOPIC_CAT.find(([re]) => re.test(title))?.[1];

export default function Learn() {
  const { state } = useProgress();
  return (
    <section className="page learn">
      <h1>Learning path</h1>
      <p className="muted">16 weeks from sentence basics to IELTS mock tests. Pass a topic with 60% to open the next one. Topics without a written lesson yet can already be practised.</p>
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
                  const cat = st === 'soon' ? catForTopic(t.title) : null;
                  const lvl = cat ? mastery(state.practice[cat]) : 0;
                  const inner = (
                    <>
                      <span className={`node node-${cat ? 'practice' : st}`} aria-hidden="true" />
                      <span className="path-text"><b>{t.title}</b><small lang="bn">{t.titleBn}</small></span>
                      <span className={`path-status st-${cat ? 'practice' : st}`}>{cat ? `Practice · ${MASTERY[lvl]}` : `${STATUS_TEXT[st]}${best ? ` · best ${best}%` : ''}`}</span>
                    </>
                  );
                  const link = st === 'open' || st === 'done' ? `/learn/${t.id}` : cat ? `/practice?cat=${cat}` : null;
                  return (
                    <li key={t.id} className={`path-item is-${cat ? 'practice' : st}`} title={cat ? `Practise ${CAT[cat].title}` : undefined}>
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
