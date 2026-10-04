import { useState } from 'react';
import { useAuth } from '../state/AuthContext.jsx';
import { useProgress } from '../state/ProgressContext.jsx';
import { levelFor, LEVELS } from '../engine/xp.js';
import { BADGES } from '../engine/badges.js';
import { useTheme } from '../ui/theme.js';
import { soundOn, setSound } from '../ui/celebrate.js';
import { useInstall } from '../ui/install.js';
import { InstallHelp } from '../components/InstallPrompt.jsx';

export default function Profile() {
  const { user, localMode, signIn, signOut, firebaseConfigured, error } = useAuth();
  const { state, setSetting } = useProgress();
  const { theme, setTheme } = useTheme();
  const { installed, ready, ios } = useInstall();
  const [sound, setS] = useState(soundOn);
  const lvl = levelFor(state.xp);
  const earned = BADGES.filter((b) => state.badges[b.id]).length;

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
      <p className="muted">{state.xp.toLocaleString()} XP{lvl.next ? `. ${lvl.toNext} XP to ${lvl.next.name}.` : '.'}</p>
      <ol className="levels">
        {LEVELS.map((l) => <li key={l.level} className={l.level <= lvl.level ? 'reached' : ''}><b>{l.level}</b> {l.name}<span>{l.xp} XP</span></li>)}
      </ol>

      <h2>Badges <small className="muted">{earned} of {BADGES.length}</small></h2>
      <ul className="badge-grid">
        {BADGES.map((b) => (
          <li key={b.id} className={state.badges[b.id] ? 'got' : b.soon ? 'soon' : ''} title={b.desc}>
            <span className="b-icon" aria-hidden="true">{b.icon}</span><b>{b.name}</b><small>{state.badges[b.id] ? `Earned ${state.badges[b.id]}` : b.desc}</small>
          </li>
        ))}
      </ul>

      <h2>Daily goal</h2>
      <div className="seg" role="radiogroup" aria-label="Daily goal in minutes">
        {[20, 30, 45, 60, 90].map((m) => (
          <button key={m} role="radio" aria-checked={state.settings.dailyGoalMinutes === m} className={state.settings.dailyGoalMinutes === m ? 'on' : ''} onClick={() => setSetting('dailyGoalMinutes', m)}>{m} min</button>
        ))}
      </div>

      <h2>Appearance</h2>
      <div className="seg" role="radiogroup" aria-label="Theme">
        {[['system', 'Match device'], ['light', 'Light'], ['dark', 'Dark']].map(([v, l]) => (
          <button key={v} role="radio" aria-checked={theme === v} className={theme === v ? 'on' : ''} onClick={() => setTheme(v)}>{l}</button>
        ))}
      </div>
      <h2>Sound</h2>
      <div className="seg" role="radiogroup" aria-label="Sound effects">
        {[[true, 'Sound on'], [false, 'Sound off']].map(([v, l]) => (
          <button key={l} role="radio" aria-checked={sound === v} className={sound === v ? 'on' : ''} onClick={() => { setSound(v); setS(v); }}>{l}</button>
        ))}
      </div>

      <h2>App</h2>
      {installed ? <p className="muted">Installed. You are using IELTS English as an app.</p> : <InstallHelp ios={ios} ready={ready} />}

      <button className="btn btn-danger" onClick={signOut}>{user ? 'Sign out' : 'Leave guest mode'}</button>
    </section>
  );
}
