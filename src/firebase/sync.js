// Firestore sync. Schema:
//   users/{uid}                      main doc: profile, xp, streak, stats, topics, settings, practice, vocab, games, badges, drafts
//   users/{uid}/mistakes/{id}        one doc per mistake (spaced repetition)
//   users/{uid}/dailyProgress/{day}  one doc per study day
//   users/{uid}/quizResults/{auto}   one doc per finished lesson / exam / game
import { getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, getDocs, collection, writeBatch, serverTimestamp } from 'firebase/firestore';

const db = () => getFirestore(getApp());
const clean = (x) => JSON.parse(JSON.stringify(x ?? null)); // Firestore rejects undefined
const MAIN = ['profile', 'xp', 'streak', 'stats', 'topics', 'settings', 'practice', 'vocab', 'games', 'badges', 'drafts'];
const safeId = (id) => String(id).replace(/\//g, '_');

export async function loadRemote(uid) {
  const base = doc(db(), 'users', uid);
  const [main, mis, daily, legacyDaily] = await Promise.all([
    getDoc(base),
    getDocs(collection(base, 'mistakes')),
    getDocs(collection(base, 'dailyProgress')),
    getDocs(collection(base, 'daily')).catch(() => ({ docs: [] }))
  ]);
  if (!main.exists() && mis.empty && daily.empty && !legacyDaily.docs.length) return null;
  const d = main.exists() ? main.data() : {};
  const state = {};
  MAIN.forEach((k) => { if (d[k] !== undefined) state[k] = d[k]; });
  // Older versions may have nested the main fields under "progress".
  if (d.progress && typeof d.progress === 'object') MAIN.forEach((k) => { if (state[k] === undefined && d.progress[k] !== undefined) state[k] = d.progress[k]; });
  state.mistakes = {};
  mis.docs.forEach((m) => { const v = m.data(); state.mistakes[v.questionId || m.id] = v; });
  state.daily = {};
  [...legacyDaily.docs, ...daily.docs].forEach((x) => { state.daily[x.id] = { ...(state.daily[x.id] || {}), ...x.data() }; });
  return state;
}

export async function pushChanges(uid, s, dirty) {
  const base = doc(db(), 'users', uid);
  const ops = [];
  if (dirty.main) {
    const main = {}; MAIN.forEach((k) => { main[k] = clean(s[k]); });
    ops.push((b) => b.set(base, { ...main, updatedAt: serverTimestamp(), schema: 2 }, { merge: true }));
  }
  dirty.mistakes.forEach((id) => { if (s.mistakes[id]) ops.push((b) => b.set(doc(base, 'mistakes', safeId(id)), clean({ ...s.mistakes[id], questionId: id }))); });
  dirty.daily.forEach((day) => { if (s.daily[day]) ops.push((b) => b.set(doc(base, 'dailyProgress', day), clean(s.daily[day]))); });
  dirty.results.forEach((r) => ops.push((b) => b.set(doc(collection(base, 'quizResults')), clean(r))));
  for (let i = 0; i < ops.length; i += 450) {
    const batch = writeBatch(db());
    ops.slice(i, i + 450).forEach((op) => op(batch));
    await batch.commit();
  }
}
