// Firestore schema (see docs/ARCHITECTURE.md §C):
//   users/{uid}                       profile, xp, streak, stats, topics (map), settings
//   users/{uid}/mistakes/{questionId} one doc per mistake, with spaced-repetition fields
//   users/{uid}/dailyProgress/{date}  per-day counters for charts
//   users/{uid}/quizResults/{auto}    one doc per finished lesson/test (append-only)
import { doc, getDoc, getDocs, collection, writeBatch, serverTimestamp } from 'firebase/firestore';
import { db } from './config.js';

export async function loadRemote(uid) {
  const [main, mistakes, daily] = await Promise.all([
    getDoc(doc(db, 'users', uid)),
    getDocs(collection(db, 'users', uid, 'mistakes')),
    getDocs(collection(db, 'users', uid, 'dailyProgress'))
  ]);
  if (!main.exists()) return null;
  const data = main.data();
  const m = {}; mistakes.forEach((d) => { m[d.id] = d.data(); });
  const dl = {}; daily.forEach((d) => { dl[d.id] = d.data(); });
  return {
    profile: data.profile || {}, xp: data.xp || 0, streak: data.streak || {}, stats: data.stats || {},
    topics: data.topics || {}, settings: data.settings || {}, mistakes: m, daily: dl
  };
}

/** Push only what changed, in one atomic batch (max ~500 ops; we stay far below). */
export async function pushChanges(uid, state, dirty) {
  const batch = writeBatch(db);
  if (dirty.main) {
    const { profile, xp, streak, stats, topics, settings } = state;
    batch.set(doc(db, 'users', uid), { profile, xp, streak, stats, topics, settings, updatedAt: serverTimestamp() }, { merge: true });
  }
  for (const id of dirty.mistakes) {
    if (state.mistakes[id]) batch.set(doc(db, 'users', uid, 'mistakes', id), state.mistakes[id]);
  }
  for (const day of dirty.daily) {
    if (state.daily[day]) batch.set(doc(db, 'users', uid, 'dailyProgress', day), state.daily[day]);
  }
  for (const r of dirty.results) {
    batch.set(doc(collection(db, 'users', uid, 'quizResults')), r);
  }
  await batch.commit();
}
