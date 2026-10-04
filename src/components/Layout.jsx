import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useProgress } from '../state/ProgressContext.jsx';
import { useAuth } from '../state/AuthContext.jsx';
import { levelFor } from '../engine/xp.js';
import { newlyEarned, BADGE_BY_ID } from '../engine/badges.js';
import { celebrateBig } from '../ui/celebrate.js';
import { useTheme } from '../ui/theme.js';
import { useInstall } from '../ui/install.js';
import { InstallHelp } from './InstallPrompt.jsx';
import Icon from './Icons.jsx';

const NAV = [
  ['/', 'Home', 'home'], ['/learn', 'Learn', 'learn'], ['/practice', 'Practice', 'practice'],
  ['/vocabulary', 'Words', 'words'], ['/games', 'Games', 'games'], ['/progress', 'Progress', 'progress']
];
const SYNC = {
  synced: ['Synced', 'Synced with Firebase', ''], syncing: ['Saving', 'Saving to Firebase…', 'sync-busy'],
  pending: ['Pending', 'Saved on device, syncing soon', 'sync-busy'], offline: ['Offline', 'Offline: saved on this device', 'sync-warn'],
  error: ['Retry', 'Sync failed: tap to retry', 'sync-warn'], local: ['Local', 'Local only (guest mode)', 'sync-busy'], idle: ['…', 'Starting…', 'sync-busy']
};

export default function Layout() {
  const { state, sync, flush, awardBadges } = useProgress();
  const { user } = useAuth();
  const { dark, setTheme } = useTheme();
  const { installed, ready, ios } = useInstall();
  const [installOpen, setInstallOpen] = useState(false);
  const loc = useLocation();
  const lvl = levelFor(state.xp);
  const prevLevel = useRef(lvl.level);
  const [s1, s2, cls] = SYNC[sync] || SYNC.idle;

  useEffect(() => {
    if (lvl.level > prevLevel.current) celebrateBig(`Level ${lvl.level}: ${lvl.name}`, 'You reached a new level through real practice.', '⭐');
    prevLevel.current = lvl.level;
  }, [lvl.level, lvl.name]);
  useEffect(() => {
    const ids = newlyEarned(state);
    if (!ids.length) return;
    awardBadges(ids);
    ids.slice(0, 2).forEach((id, k) => setTimeout(() => celebrateBig(`Badge: ${BADGE_BY_ID[id].name}`, BADGE_BY_ID[id].desc, BADGE_BY_ID[id].icon), 600 + k * 3400));
  }, [state, awardBadges]);
  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);

  return (
    <div className="shell">
      <nav className="sidebar" aria-label="Main">
        <Link to="/" className="brand"><img src="./icon.svg" alt="" width="36" height="36" /><span>IELTS<br />English</span></Link>
        {NAV.map(([to, label, icon]) => (
          <NavLink key={to} to={to} end={to === '/'} className="side-link"><Icon name={icon} />{label}</NavLink>
        ))}
        <NavLink to="/profile" className="side-link side-profile"><Icon name="user" />{user?.displayName?.split(' ')[0] || 'Profile'}</NavLink>
      </nav>
      <div className="main">
        <header className="topbar">
          <Link to="/profile" className="lvl-chip" aria-label={`Level ${lvl.level}, ${state.xp} XP. Open profile`}>
            <span className="lvl-num">{lvl.level}</span>
            <span className="lvl-bar"><span style={{ width: `${lvl.progress * 100}%` }} /></span>
          </Link>
          <span className="stat-chip"><b>{state.xp.toLocaleString()}</b> XP</span>
          <span className={`stat-chip streak-chip ${state.streak.current ? 'lit' : ''}`}><Icon name="flame" size={16} fill={state.streak.current > 0} /><b>{state.streak.current}</b><span className="hide-sm"> day streak</span></span>
          <button className={`sync ${cls}`} onClick={() => flush()} title={s2}><span className="sync-dot" /><span className="sync-short">{s1}</span><span className="sync-text">{s2}</span></button>
          {!installed && <button className="icon-btn" onClick={() => setInstallOpen(true)} aria-label="Install app" title="Install app"><Icon name="download" size={20} /></button>}
          <button className="icon-btn" onClick={() => setTheme(dark ? 'light' : 'dark')} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} title="Theme"><Icon name={dark ? 'sun' : 'moon'} size={20} /></button>
        </header>
        <main className="content" key={loc.pathname}><Outlet /></main>
      </div>
      <nav className="bottomnav" aria-label="Main">
        {NAV.map(([to, label, icon]) => (
          <NavLink key={to} to={to} end={to === '/'} className="bn-link"><Icon name={icon} />{label}</NavLink>
        ))}
      </nav>
      {installOpen && (
        <div className="sheet-backdrop" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setInstallOpen(false)}>
          <div className="sheet install-sheet">
            <img src="./icon-192.png" alt="" width="64" height="64" className="install-icon" />
            <h2>Install IELTS English</h2>
            <InstallHelp ios={ios} ready={ready} onInstalled={() => setInstallOpen(false)} />
            <button className="btn btn-quiet" onClick={() => setInstallOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
