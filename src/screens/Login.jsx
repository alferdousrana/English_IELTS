import { useAuth } from '../state/AuthContext.jsx';

export default function Login() {
  const { signIn, continueLocally, firebaseConfigured, error } = useAuth();
  return (
    <main className="login">
      <div className="login-art" aria-hidden="true">
        <span>Band</span><b>7.5</b><span>one sentence at a time</span>
      </div>
      <div className="login-card">
        <img src="./icon.svg" alt="" width="64" height="64" />
        <h1>IELTS English</h1>
        <p className="login-lead">Grammar foundations first, then IELTS. Thousands of practice questions, every mistake remembered.</p>
        <p className="muted" lang="bn">প্রতিদিন অনুশীলন, প্রতিটি ভুলের পুনরাবৃত্তি।</p>
        {firebaseConfigured
          ? <button className="btn btn-primary btn-google" onClick={signIn}>Continue with Google</button>
          : <p className="error">Firebase is not configured yet. Add your keys to <code>.env.local</code> (see README) to enable Google sign-in and sync.</p>}
        {error && <p className="error">{error}</p>}
        <button className="btn btn-quiet" onClick={continueLocally}>Use on this device without signing in</button>
        <p className="fine">Without signing in, progress stays in this browser only. Sign in later and it is merged into your account.</p>
      </div>
    </main>
  );
}
