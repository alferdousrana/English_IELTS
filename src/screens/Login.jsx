import { useAuth } from '../state/AuthContext.jsx';

export default function Login() {
  const { signIn, continueLocally, firebaseConfigured, error } = useAuth();
  return (
    <main className="login">
      <div className="login-card">
        <img src="./icon.svg" alt="" width="72" height="72" />
        <h1>Khata</h1>
        <p className="login-lead">Your English exercise book: grammar foundations first, then IELTS 7.5+ preparation.</p>
        <p className="muted" lang="bn">প্রতিদিন অনুশীলন, প্রতিটি ভুলের পুনরাবৃত্তি।</p>
        {firebaseConfigured
          ? <button className="btn btn-primary btn-google" onClick={signIn}>Continue with Google</button>
          : <p className="error">Firebase is not configured yet. Add your keys to <code>.env.local</code> (see README) to enable Google sign-in and sync.</p>}
        {error && <p className="error">{error}</p>}
        <button className="btn btn-quiet" onClick={continueLocally}>Use on this device without signing in</button>
        <p className="fine">Without signing in, progress stays in this browser only. You can sign in later and it will be merged into your account.</p>
      </div>
    </main>
  );
}
