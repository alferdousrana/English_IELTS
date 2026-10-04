// PWA install. index.html captures `beforeinstallprompt` into window.__bip before React loads.
import { useEffect, useState } from 'react';
export const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
export const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
export async function promptInstall() {
  const e = window.__bip;
  if (!e) return 'unavailable';
  e.prompt();
  const { outcome } = await e.userChoice;
  window.__bip = null;
  window.dispatchEvent(new Event('bip-change'));
  return outcome;
}
export function useInstall() {
  const [ready, setReady] = useState(() => Boolean(window.__bip));
  const [installed, setInstalled] = useState(isStandalone);
  useEffect(() => {
    const on = () => setReady(Boolean(window.__bip));
    const done = () => { setInstalled(true); setReady(false); };
    window.addEventListener('bip-ready', on); window.addEventListener('bip-change', on); window.addEventListener('appinstalled', done);
    return () => { window.removeEventListener('bip-ready', on); window.removeEventListener('bip-change', on); window.removeEventListener('appinstalled', done); };
  }, []);
  return { ready, installed, ios: isIOS() };
}
