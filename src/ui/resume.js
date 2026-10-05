// Device-level "continue where I left off" storage for practice, vocabulary and game sessions.
// Lesson drafts are stored in synced progress instead (see ProgressContext.saveDraft).
let owner = 'anon';
export const setResumeOwner = (o) => { owner = o || 'anon'; };
const k = (key) => `ie:r:${owner}:${key}`;
export function loadResume(key) {
  if (!key) return null;
  try { const raw = localStorage.getItem(k(key)); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
export function saveResume(key, value) {
  if (!key) return;
  try { localStorage.setItem(k(key), JSON.stringify({ ...value, at: Date.now() })); } catch { /* storage full */ }
}
export function clearResume(key) {
  if (!key) return;
  try { localStorage.removeItem(k(key)); } catch { /* ignore */ }
}
