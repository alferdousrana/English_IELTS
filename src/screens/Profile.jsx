import { useAuth } from '../state/AuthContext.jsx';
import { useProgress } from '../state/ProgressContext.jsx';
import { levelFor, LEVELS } from '../engine/xp.js';

export default function Profile() {
  const { user, localMode, signIn, signOut, firebaseConfigured, error } = useAuth();
  const { state, setSetting } = useProgress();
  const lvl = levelFor(state.xp);
  return (
    <section className="page">
      <h1>Profile and settings</h1>
      <div className="profile-card">
        {user?.photoURL && <img src={user.photoURL} alt="" width="56" height="56" referrerPolicy="no-referrer" />}
        <div>
          <p className="profile-name">{user ? user.displayName : 'Guest on this device'}</p>
          <p className="muted">{user ? user.email : 'Progress is stored only in this browser.'}</p>
        </div>
      </div>
      {localMode && firebaseConfigured && (
        <div className="weak-callout">
          <p>Sign in with Google to sync this progress to your other devices. Your guest progress is merged into your account.</p>
          <button className="btn btn-primary" onClick={signIn}>Sign in with Google</button>
        </div>
      )}
      {error && <p className="error">{error}</p>}

      <h2>Level {lvl.level}: {lvl.name}</h2>
      <div className="lvl-track"><span style={{ width: `${lvl.progress * 100}%` }} /></div>
      <p className="muted">{state.xp} XP{lvl.next ? `. ${lvl.toNext} XP to ${lvl.next.name}.` : '.'}</p>
      <ol className="levels">
        {LEVELS.map((l) => <li key={l.level} className={l.level <= lvl.level ? 'reached' : ''}><b>{l.level}</b> {l.name}<span>{l.xp} XP</span></li>)}
      </ol>

      <h2>Daily goal</h2>
      <div className="seg" role="radiogroup" aria-label="Daily goal in minutes">
        {[20, 30, 45, 60, 90].map((m) => (
          <button key={m} role="radio" aria-checked={state.settings.dailyGoalMinutes === m} className={state.settings.dailyGoalMinutes === m ? 'on' : ''} onClick={() => setSetting('dailyGoalMinutes', m)}>{m} min</button>
        ))}
      </div>

      <button className="btn btn-danger" onClick={signOut}>{user ? 'Sign out' : 'Leave guest mode'}</button>
    </section>
  );
}
