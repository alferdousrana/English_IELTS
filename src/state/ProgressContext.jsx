import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { EMPTY, loadLocal, saveLocal, clearLocal, mergeProgress } from './store.js';
import { loadRemote, pushChanges } from '../firebase/sync.js';
import { dayKey } from '../engine/dates.js';
import { touchStreak } from '../engine/streak.js';
import { recordMistake, reviewMistake } from '../engine/srs.js';

const Ctx = createContext(null);
const SYNC_DELAY = 2500;
const freshDirty = () => ({ main: false, mistakes: new Set(), daily: new Set(), results: [] });

export function ProgressProvider({ children }) {
  const { owner, user } = useAuth();
  const [state, setState] = useState(null);
  const [sync, setSync] = useState('idle'); // idle | pending | syncing | synced | offline | local | error
  const dirty = useRef(freshDirty());
  const timer = useRef(null);
  const stateRef = useRef(null);
  stateRef.current = state;

  // Load: local cache first (instant), then merge with Firestore when signed in.
  useEffect(() => {
    if (!owner) { setState(null); return; }
    let cancelled = false;
    const cached = loadLocal(owner);
    setState(cached?.state || EMPTY());
    if (cached?.pending) {
      dirty.current = {
        main: cached.pending.main, mistakes: new Set(cached.pending.mistakes),
        daily: new Set(cached.pending.daily), results: cached.pending.results || []
      };
    }
    if (!user) { setSync('local'); return; }

    (async () => {
      setSync('syncing');
      try {
        const remote = await loadRemote(user.uid);
        // First sign-in on this device: bring any guest progress into the account once.
        const guest = loadLocal('local')?.state;
        let merged = mergeProgress(cached?.state || null, remote);
        if (guest) merged = mergeProgress(merged, guest);
        merged = merged || EMPTY();
        merged.profile = { ...merged.profile, name: user.displayName, email: user.email, photo: user.photoURL };
        if (cancelled) return;
        setState(merged);
        dirty.current.main = true;
        Object.keys(merged.mistakes).forEach((id) => { if (!remote?.mistakes?.[id]) dirty.current.mistakes.add(id); });
        Object.keys(merged.daily).forEach((d) => { if (!remote?.daily?.[d]) dirty.current.daily.add(d); });
        if (guest) clearLocal('local');
        flush(merged);
      } catch (e) {
        if (!cancelled) setSync(navigator.onLine ? 'error' : 'offline');
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner]);

  const persistLocal = useCallback((s) => {
    const d = dirty.current;
    saveLocal(owner, {
      state: s,
      pending: { main: d.main, mistakes: [...d.mistakes], daily: [...d.daily], results: d.results }
    });
  }, [owner]);

  const flush = useCallback(async (s = stateRef.current) => {
    clearTimeout(timer.current);
    if (!user || !s) return;
    const d = dirty.current;
    if (!d.main && !d.mistakes.size && !d.daily.size && !d.results.length) { setSync('synced'); return; }
    if (!navigator.onLine) { setSync('offline'); return; }
    dirty.current = freshDirty();
    setSync('syncing');
    try {
      await pushChanges(user.uid, s, d);
      setSync('synced');
    } catch {
      // Put the changes back so nothing is lost; retry later.
      d.mistakes.forEach((x) => dirty.current.mistakes.add(x));
      d.daily.forEach((x) => dirty.current.daily.add(x));
      dirty.current.results.push(...d.results);
      dirty.current.main = dirty.current.main || d.main;
      setSync(navigator.onLine ? 'error' : 'offline');
    }
    persistLocal(stateRef.current);
  }, [user, persistLocal]);

  useEffect(() => {
    const onVis = () => { if (document.visibilityState === 'hidden') flush(); };
    const onOnline = () => flush();
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('online', onOnline);
    return () => { document.removeEventListener('visibilitychange', onVis); window.removeEventListener('online', onOnline); };
  }, [flush]);

  /** Apply a change, mark what's dirty, save locally now, sync to Firebase after a pause. */
  const update = useCallback((fn) => {
    setState((prev) => {
      const next = fn(structuredClone(prev), dirty.current);
      persistLocal(next);
      return next;
    });
    if (user) {
      setSync('pending');
      clearTimeout(timer.current);
      timer.current = setTimeout(() => flush(), SYNC_DELAY);
    }
  }, [user, persistLocal, flush]);

  const api = useMemo(() => ({
    state, sync, flush,

    /** One answered question inside a lesson or test. */
    recordAnswer({ question, topicId, correct, myAnswer, correctAnswer, xp }) {
      update((s, d) => {
        const today = dayKey();
        s.streak = touchStreak(s.streak, today);
        s.xp += xp;
        s.stats.answered += 1;
        if (correct) s.stats.correct += 1;
        const day = s.daily[today] || { xp: 0, answered: 0, correct: 0, mistakes: 0, lessons: 0, reviews: 0 };
        day.xp += xp; day.answered += 1;
        if (correct) day.correct += 1; else day.mistakes += 1;
        s.daily[today] = day;
        d.main = true; d.daily.add(today);
        if (!correct) {
          s.mistakes[question.id] = recordMistake(s.mistakes[question.id], {
            questionId: question.id, topic: topicId, concept: question.concept, type: question.type,
            question: question.prompt, myAnswer, correctAnswer, explanation: question.explanation,
            category: question.concept, lastSeen: today
          }, today);
          d.mistakes.add(question.id);
        }
        return s;
      });
    },

    /** Spaced-repetition review of a stored mistake. */
    recordReview({ questionId, correct, myAnswer, xp }) {
      update((s, d) => {
        const today = dayKey();
        const m = s.mistakes[questionId];
        if (!m) return s;
        s.mistakes[questionId] = { ...reviewMistake(m, correct, today), lastSeen: today, ...(correct ? {} : { myAnswer }) };
        s.streak = touchStreak(s.streak, today);
        s.xp += xp;
        s.stats.answered += 1;
        if (correct) s.stats.correct += 1;
        const day = s.daily[today] || { xp: 0, answered: 0, correct: 0, mistakes: 0, lessons: 0, reviews: 0 };
        day.xp += xp; day.answered += 1; day.reviews = (day.reviews || 0) + 1;
        if (correct) day.correct += 1; else day.mistakes += 1;
        s.daily[today] = day;
        d.main = true; d.daily.add(today); d.mistakes.add(questionId);
        return s;
      });
    },

    completeTopic({ topicId, kind, score, total, mcq, written, bonusXp, weakConcepts }) {
      update((s, d) => {
        const today = dayKey();
        const pct = Math.round((score / total) * 100);
        const prev = s.topics[topicId] || { attempts: 0, bestScore: 0, history: [] };
        const passed = pct >= 60;
        s.topics[topicId] = {
          ...prev,
          attempts: prev.attempts + 1,
          lastScore: pct,
          bestScore: Math.max(prev.bestScore, pct),
          completed: prev.completed || passed,
          completedOn: prev.completedOn || (passed ? today : null),
          history: [...(prev.history || []), { date: today, score: pct }].slice(-10)
        };
        if (passed && !prev.completed) s.stats.lessonsCompleted += 1;
        s.xp += bonusXp;
        const day = s.daily[today] || { xp: 0, answered: 0, correct: 0, mistakes: 0, lessons: 0, reviews: 0 };
        day.xp += bonusXp; day.lessons += 1;
        s.daily[today] = day;
        d.main = true; d.daily.add(today);
        d.results.push({ topicId, kind, date: today, score, total, pct, mcq, written, weakConcepts, at: Date.now() });
        return s;
      });
    },

    setSetting(k, v) { update((s, d) => { s.settings[k] = v; d.main = true; return s; }); }
  }), [state, sync, flush, update]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useProgress = () => useContext(Ctx);
