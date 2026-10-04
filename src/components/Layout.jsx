import { NavLink, Outlet } from 'react-router-dom';
import { useProgress } from '../state/ProgressContext.jsx';
import { levelFor } from '../engine/xp.js';
import SyncBadge from './SyncBadge.jsx';

const NAV = [
  { to: '/', label: 'Home', icon: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z' },
  { to: '/learn', label: 'Learn', icon: 'M4 5h7v14H4zM13 5h7v14h-7z' },
  { to: '/practice', label: 'Practice', icon: 'M5 12l4 4L19 6' },
  { to: '/vocabulary', label: 'Words', icon: 'M5 4h11l3 3v13H5zM9 10h6M9 14h6' },
  { to: '/games', label: 'Games', icon: 'M6 9h12a3 3 0 0 1 3 3v2a3 3 0 0 1-5 2l-1-1H9l-1 1a3 3 0 0 1-5-2v-2a3 3 0 0 1 3-3zM8 11v3M6.5 12.5h3' },
  { to: '/progress', label: 'Progress', icon: 'M5 20V10M12 20V4M19 20v-7' }
];

function Icon({ d }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;
}

export default function Layout() {
  const { state } = useProgress();
  const lvl = levelFor(state?.xp || 0);
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand"><img src="./icon.svg" alt="" width="34" height="34" /><span>Khata</span></div>
        <nav aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className="side-link"><Icon d={n.icon} />{n.label}</NavLink>
          ))}
        </nav>
        <NavLink to="/profile" className="side-link side-profile">Profile and settings</NavLink>
      </aside>

      <div className="main">
        <header className="topbar">
          <NavLink to="/profile" className="lvl-chip" aria-label={`Level ${lvl.level}, ${lvl.name}`}>
            <span className="lvl-num">{lvl.level}</span>
            <span className="lvl-bar"><span style={{ width: `${lvl.progress * 100}%` }} /></span>
          </NavLink>
          <span className="stat-chip" title="XP"><b>{(state?.xp || 0).toLocaleString()}</b> XP</span>
          <span className="stat-chip streak" title="Current streak"><b>{state?.streak?.current || 0}</b> day streak</span>
          <SyncBadge />
        </header>
        <main className="content"><Outlet /></main>
      </div>

      <nav className="bottomnav" aria-label="Main">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'} className="bn-link"><Icon d={n.icon} /><span>{n.label}</span></NavLink>
        ))}
      </nav>
    </div>
  );
}
