import { useEffect, useState } from 'react';
const KEY = 'ie:theme';
export const getTheme = () => { try { return localStorage.getItem(KEY) || 'system'; } catch { return 'system'; } };
export function applyTheme(t = getTheme()) {
  const root = document.documentElement;
  if (t === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', t);
  const dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0C0F24' : '#2B2A8C');
}
export function setTheme(t) {
  try { localStorage.setItem(KEY, t); } catch { /* ignore */ }
  applyTheme(t);
  window.dispatchEvent(new Event('ie-theme'));
}
export function useTheme() {
  const [t, set] = useState(getTheme);
  useEffect(() => {
    const on = () => set(getTheme());
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const sys = () => { if (getTheme() === 'system') applyTheme('system'); };
    window.addEventListener('ie-theme', on); mq.addEventListener?.('change', sys);
    return () => { window.removeEventListener('ie-theme', on); mq.removeEventListener?.('change', sys); };
  }, []);
  const dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  return { theme: t, dark, setTheme };
}
