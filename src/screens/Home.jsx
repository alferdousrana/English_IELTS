import { Link } from 'react-router-dom';
import { useProgress } from '../state/ProgressContext.jsx';
import { useAuth } from '../state/AuthContext.jsx';
import { nextTopic, dueMistakes, weaknesses } from '../engine/path.js';
import { dayKey, daysBetween } from '../engine/dates.js';
import { levelFor } from '../engine/xp.js';
import { todaysBatch, examWeek, dayInfo } from '../engine/vocab.js';
import { catLabel, TOTAL_SIZE } from '../engine/generators.js';
import ProgressRing from '../components/ProgressRing.jsx';
import Icon from '../components/Icons.jsx';

const DAILY_QUESTIONS = 30;
const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; };
export const weakLabel = (w) => catLabel(w.concept) || w.label || w.concept;

export default function Home() {
  const { state } = useProgress();
  const { user } = useAuth();
  const today = dayKey();
  const d = state.daily[today] || {};
  const dayNo = daysBetween(state.profile.startDate || today, today) + 1;
  const next = nextTopic(state.topics);
  const due = dueMistakes(state.mistakes);
  const weak = weaknesses(state.mistakes)[0];
  const lvl = levelFor(state.xp);
  const batch = todaysBatch(state, today);
  const exam = examWeek(state, today);
  const info = dayInfo(state.profile.startDate, today);

  const mission = [
    { label: d.lessons > 0 ? 'Finish one grammar lesson' : next ? `Lesson: ${next.title}` : 'Retake a lesson to raise your best score', done: d.lessons > 0, to: next ? `/learn/${next.id}` : '/learn' },
    { label: `Answer ${DAILY_QUESTIONS} questions (${Math.min(d.answered || 0, DAILY_QUESTIONS)}/${DAILY_QUESTIONS})`, done: (d.answered || 0) >= DAILY_QUESTIONS, to: '/practice' },
    exam !== null
      ? { label: `Weekly vocabulary exam (week ${exam + 1})`, done: Boolean(d.vocabExam), to: '/vocabulary' }
      : { label: info.examDay && !batch.words.length ? 'Review this week\'s words' : batch.pending > 5 ? `Learn 5 new words (${batch.pending} waiting)` : 'Learn today\'s 5 words', done: batch.done, to: '/vocabulary' },
    { label: 'Play one game', done: (d.games || 0) > 0, to: '/games' }
  ];
  if (due.length) mission.push({ label: `Review ${due.length} due mistake${due.length > 1 ? 's' : ''}`, done: false, to: '/practice' });
  else if (d.reviews) mission.push({ label: 'Review due mistakes', done: true, to: '/practice' });
  const doneCount = mission.filter((m) => m.done).length;
  const first = (user?.displayName || '').split(' ')[0];

  return (
    <section className="page home">
      <header className="home-head">
        <p className="day-tag">Day {dayNo} of 120</p>
        <h1>{greeting()}{first ? `, ${first}` : ''}.</h1>
        <p className="muted">Today's goal: {state.settings.dailyGoalMinutes} minutes of practice.</p>
      </header>

      <div className="mission">
        <ProgressRing value={doneCount / mission.length} size={92} label="Today's mission progress" />
        <div className="mission-body">
          <h2>Today's mission</h2>
          <ul className="checklist">
            {mission.map((m) => (
              <li key={m.label} className={m.done ? 'done' : ''}>
                <Link to={m.to}><span className="tick" aria-hidden="true" />{m.label}</Link>
              </li>
            ))}
          </ul>
          {doneCount === mission.length && <p className="mission-done">Mission complete for today. Consistency beats intensity.</p>}
        </div>
      </div>

      <div className="tiles">
        <Link to={next ? `/learn/${next.id}` : '/learn'} className="tile tile-main">
          <span className="tile-label">Continue learning</span>
          <span className="tile-value">{next ? next.title : 'Path complete for now'}</span>
          <span className="tile-sub" lang="bn">{next?.titleBn}</span>
        </Link>
        <Link to="/vocabulary" className="tile tile-words">
          <span className="tile-label">Daily vocabulary</span>
          <span className="tile-value tile-small">{exam !== null ? 'Weekly exam ready' : batch.words.length ? batch.words.map((w) => w.w).join(', ') : 'All caught up'}</span>
          <span className="tile-sub">{exam !== null ? '30 words to test' : batch.done ? 'Today\'s words are learned' : `${batch.pending} new word${batch.pending === 1 ? '' : 's'} waiting`}</span>
        </Link>
        <Link to="/practice" className="tile">
          <span className="tile-label">Practice</span>
          <span className="tile-value tile-small">Smart mix</span>
          <span className="tile-sub">{Math.floor(TOTAL_SIZE / 1000)},000+ questions</span>
        </Link>
        <Link to="/practice" className={`tile ${due.length ? 'tile-alert' : ''}`}>
          <span className="tile-label">Review</span>
          <span className="tile-value">{due.length}</span>
          <span className="tile-sub">mistakes due today</span>
        </Link>
        <Link to="/profile" className="tile">
          <span className="tile-label">Level {lvl.level}</span>
          <span className="tile-value tile-small">{lvl.name}</span>
          <span className="tile-sub">{lvl.next ? `${lvl.toNext} XP to level ${lvl.next.level}` : 'Top level'}</span>
        </Link>
        <div className="tile">
          <span className="tile-label">Streak</span>
          <span className="tile-value"><Icon name="flame" size={22} fill={state.streak.current > 0} className="flame" /> {state.streak.current}</span>
          <span className="tile-sub">days · longest {state.streak.longest}</span>
        </div>
      </div>

      {weak && (
        <div className="weak-callout">
          <p>You most often make mistakes with <b>{weakLabel(weak).toLowerCase()}</b> ({weak.mistakes} {weak.mistakes === 1 ? 'time' : 'times'}).</p>
          <Link className="btn btn-primary" to={`/practice?concept=${weak.concept}`}>Practise this now</Link>
        </div>
      )}
    </section>
  );
}
