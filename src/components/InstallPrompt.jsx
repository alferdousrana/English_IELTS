// Shown as soon as the app opens (unless installed or dismissed recently), plus an
// "Install app" button that stays available in the top bar and Profile.
import { useState } from 'react';
import { useInstall, promptInstall } from '../ui/install.js';
import Icon from './Icons.jsx';

const KEY = 'ie:install-dismissed';
const recentlyDismissed = () => { try { return Date.now() - Number(localStorage.getItem(KEY) || 0) < 3 * 864e5; } catch { return false; } };

export function InstallHelp({ ios, ready, onInstalled }) {
  if (ready) return <button className="btn btn-primary btn-wide" onClick={async () => { if ((await promptInstall()) === 'accepted') onInstalled?.(); }}><Icon name="download" size={20} /> Install app</button>;
  if (ios) return (
    <ol className="install-steps">
      <li>Open this page in <b>Safari</b>.</li>
      <li>Tap the <b>Share</b> button <Icon name="share" size={18} /> at the bottom of the screen.</li>
      <li>Choose <b>Add to Home Screen</b>, then <b>Add</b>.</li>
    </ol>
  );
  return (
    <ol className="install-steps">
      <li><b>Android (Chrome):</b> tap the ⋮ menu, then <b>Install app</b> or <b>Add to Home screen</b>.</li>
      <li><b>Laptop (Chrome or Edge):</b> click the install icon at the right end of the address bar, or open the ⋮ / … menu and choose <b>Install IELTS English</b>.</li>
      <li>If the button above doesn't appear yet, use the page for a few seconds — the browser enables install after a short visit.</li>
    </ol>
  );
}

export default function InstallPrompt() {
  const { ready, installed, ios } = useInstall();
  const [open, setOpen] = useState(() => !recentlyDismissed());
  if (installed || !open) return null;
  const close = () => { try { localStorage.setItem(KEY, String(Date.now())); } catch { /* ignore */ } setOpen(false); };
  return (
    <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-labelledby="install-title">
      <div className="sheet install-sheet">
        <img src="./icon-192.png" alt="" width="72" height="72" className="install-icon" />
        <h2 id="install-title">Install IELTS English</h2>
        <p>Put the app on your home screen or desktop. It opens full screen like a real app, starts faster, and keeps working when the internet is weak.</p>
        <InstallHelp ios={ios} ready={ready} onInstalled={() => setOpen(false)} />
        <button className="btn btn-quiet" onClick={close}>Not now</button>
      </div>
    </div>
  );
}
