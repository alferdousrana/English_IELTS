import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './state/AuthContext.jsx';
import { ProgressProvider, useProgress } from './state/ProgressContext.jsx';
import Layout from './components/Layout.jsx';
import InstallPrompt from './components/InstallPrompt.jsx';
import Login from './screens/Login.jsx';
import Home from './screens/Home.jsx';
import Learn from './screens/Learn.jsx';
import Lesson from './screens/Lesson.jsx';
import Practice from './screens/Practice.jsx';
import Vocabulary from './screens/Vocabulary.jsx';
import Games from './screens/Games.jsx';
import GamePlay from './screens/GamePlay.jsx';
import Progress from './screens/Progress.jsx';
import Profile from './screens/Profile.jsx';
import { applyTheme } from './ui/theme.js';
import { setResumeOwner } from './ui/resume.js';

applyTheme();

function Gate() {
  const { ready, owner } = useAuth();
  const { state } = useProgress();
  if (!ready) return <p className="loading">Loading…</p>;
  if (!owner) return <Login />;
  setResumeOwner(owner);
  if (!state) return <p className="loading">Loading your progress…</p>;
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="learn" element={<Learn />} />
        <Route path="learn/:topicId" element={<Lesson />} />
        <Route path="practice" element={<Practice />} />
        <Route path="vocabulary" element={<Vocabulary />} />
        <Route path="games" element={<Games />} />
        <Route path="games/:gameId" element={<GamePlay />} />
        <Route path="progress" element={<Progress />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  // HashRouter: deep links like /#/learn work on GitHub Pages without 404 tricks.
  return (
    <HashRouter>
      <AuthProvider>
        <ProgressProvider>
          <Gate />
          <InstallPrompt />
        </ProgressProvider>
      </AuthProvider>
    </HashRouter>
  );
}
