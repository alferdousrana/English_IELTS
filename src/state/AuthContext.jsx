import { createContext, useContext, useEffect, useState } from 'react';
import { firebaseConfigured, watchAuth, signInWithGoogle, logOut } from '../firebase/config.js';

const AuthCtx = createContext(null);
const MODE_KEY = 'khata:mode';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(!firebaseConfigured);
  const [localMode, setLocalMode] = useState(() => {
    try { return localStorage.getItem(MODE_KEY) === 'local'; } catch { return false; }
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!firebaseConfigured) return;
    return watchAuth((u) => { setUser(u); setReady(true); });
  }, []);

  const value = {
    user, ready, error, firebaseConfigured,
    // "owner" decides which local progress bucket and which Firestore user doc is used.
    owner: user ? user.uid : localMode ? 'local' : null,
    localMode: !user && localMode,
    async signIn() {
      setError('');
      try { await signInWithGoogle(); }
      catch (e) {
        if (e.code === 'auth/unauthorized-domain') setError('This domain is not authorised in Firebase. Add it under Authentication → Settings → Authorized domains.');
        else if (e.code !== 'auth/popup-closed-by-user') setError(e.message);
      }
    },
    continueLocally() { try { localStorage.setItem(MODE_KEY, 'local'); } catch { /* ignore */ } setLocalMode(true); },
    async signOut() {
      try { localStorage.removeItem(MODE_KEY); } catch { /* ignore */ }
      setLocalMode(false);
      if (user) await logOut();
    }
  };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
