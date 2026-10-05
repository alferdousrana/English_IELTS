import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { EMPTY, loadLocal, saveLocal, clearLocal, mergeProgress, normalize } from './store.js';
import { loadRemote, pushChanges } from '../firebase/sync.js';
import { dayKey } from '../engine/dates.js';
import { touchStreak } from '../engine/streak.js';
import { recordMistake, reviewMistake } from '../engine/srs.js';
import { bumpPractice } from '../engine/practiceStats.js';
import { stageOf } from '../engine/vocab.js';
import { rebuild } from '../engine/generators.js';

const Ctx = createContext(null);
const SYNC_DELAY = 2500;
const MASTERED_XP = 10;
const freshDirty = () => ({ main: false, mistakes: new Set(), daily: new Set(), results: [] });
const blankDay = () => ({ xp: 0, answered: 0, correct: 0, mistakes: 0, lessons: 0, reviews: 0, games: 0, vocabWords: 0 });

/** Shared bookkeeping for any answered question: streak, XP, totals, today's record. */
function tally(s, d, { correct, xp, review = false }) {
  const today = dayKey();
  s.streak = touchStreak(s.streak, today);
  s.xp += xp;
  s.stats.answered += 1;
  if (correct) s.stats.correct += 1;
  const day = { ...blankDay(), ...s.daily[today] };
  day.xp += xp; day.answered += 1;
  if (review) day.reviews = (day.reviews || 0) + 1;
  if (correct) day.correct += 1; else day.mistakes += 1;
  s.daily[today] = day;
  d.main = true; d.daily.add(today);
  return today;
}
/** Update a vocabulary word's record; returns bonus XP if the word just became Mastered. */
function touchWord(s, wordId, kind, correct, today) {
  const rec = s.vocab.words[wordId] || { k: {}, days: [] };
  const before = stageOf(rec);
  const k = { ...rec.k, [kind]: [(rec.k?.[kind]?.[0] || 0) + (correct ? 1 : 0), (rec.k?.[kind]?.[1] || 0) + (correct ? 0 : 1)] };
  const days = correct ? [...new Set([...(rec.days || []), today])].slice(-6) : rec.days || [];
  const next = { ...rec, k, days, intro: rec.intro || today };
  s.vocab.words[wordId] = next;
  return before < 4 && stageOf(next) === 4 ? MASTERED_XP : 0;
}

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
    setState(normalize(cached?.state) || EMPTY());
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
        const guest = loadLocal('local')?.state;
        let merged = mergeProgress(cached?.state || null, remote);
        if (guest) merged = mergeProgress(merged, guest);
        merged = normalize(merged) || EMPTY();
        merged.profile = { ...merged.profile, name: user.displayName, email: user.email, photo: user.photoURL };
        if (cancelled) return;
        setState(merged);
        dirty.current.main = true;
        Object.keys(merged.mistakes).forEach((id) => { if (!remote?.mistakes?.[id]) dirty.current.mistakes.add(id); });
        Object.keys(merged.daily).forEach((d) => { if (!remote?.daily?.[d]) dirty.current.daily.add(d); });
        if (guest) clearLocal('local');
        flush(merged);
      } catch {
        if (!cancelled) setSync(navigator.onLine ? 'error' : 'offline');
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner]);

  const persistLocal = useCallback((s) => {
    const d = dirty.current;
    saveLocal(owner, { state: s, pending: { main: d.main, mistakes: [...d.mistakes], daily: [...d.daily], results: d.results } });
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
        const today = tally(s, d, { correct, xp });
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

    /** One generated practice / vocabulary / game question. */
    recordPractice({ q, correct, myAnswer, xp = 0 }) {
      update((s, d) => {
        const today = tally(s, d, { correct, xp });
        s.practice[q.cat] = bumpPractice(s.practice[q.cat], correct, today);
        if (q.wordId) s.xp += touchWord(s, q.wordId, q.kind, correct, today);
        if (!correct) {
          s.mistakes[q.id] = recordMistake(s.mistakes[q.id], {
            questionId: q.id, topic: `practice:${q.cat}`, concept: q.cat, type: q.type,
            question: q.prompt, myAnswer, correctAnswer: q.answer, explanation: q.explanation,
            category: q.cat, lastSeen: today
          }, today);
          d.mistakes.add(q.id);
        }
        return s;
      });
    },

    /** Spaced-repetition review of a stored mistake. */
    recordReview({ questionId, correct, myAnswer, xp }) {
      update((s, d) => {
        const m = s.mistakes[questionId];
        if (!m) return s;
        const today = tally(s, d, { correct, xp, review: true });
        s.mistakes[questionId] = { ...reviewMistake(m, correct, today), lastSeen: today, ...(correct ? {} : { myAnswer }) };
        const q = String(questionId).startsWith('gen:') ? rebuild(questionId) : null;
        if (q) {
          s.practice[q.cat] = bumpPractice(s.practice[q.cat], correct, today);
          if (q.wordId) s.xp += touchWord(s, q.wordId, q.kind, correct, today);
        }
        d.mistakes.add(questionId);
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
          attempts: prev.attempts + 1, lastScore: pct, bestScore: Math.max(prev.bestScore, pct),
          completed: prev.completed || passed, completedOn: prev.completedOn || (passed ? today : null),
          history: [...(prev.history || []), { date: today, score: pct }].slice(-10)
        };
        if (passed && !prev.completed) s.stats.lessonsCompleted += 1;
        s.xp += bonusXp;
        const day = { ...blankDay(), ...s.daily[today] };
        day.xp += bonusXp; day.lessons += 1;
        s.daily[today] = day;
        d.main = true; d.daily.add(today);
        d.results.push({ topicId, kind, date: today, score, total, pct, mcq, written, weakConcepts, at: Date.now() });
        return s;
      });
    },

    /** Mark word cards as seen today. */
    introWords(ids) {
      update((s, d) => {
        const today = dayKey();
        ids.forEach((id) => { const r = s.vocab.words[id] || { k: {}, days: [] }; if (!r.intro) s.vocab.words[id] = { ...r, intro: today }; });
        d.main = true;
        return s;
      });
    },
    finishVocabSession({ ids }) {
      update((s, d) => {
        const today = dayKey();
        const day = { ...blankDay(), ...s.daily[today] };
        day.vocabWords = (day.vocabWords || 0) + ids.length;
        s.daily[today] = day;
        d.main = true; d.daily.add(today);
        return s;
      });
    },
    finishVocabExam({ week, score, total, perWord }) {
      update((s, d) => {
        const today = dayKey();
        const pct = Math.round((score / total) * 100);
        const prev = s.vocab.exams[week];
        s.vocab.exams[week] = { pct: Math.max(prev?.pct || 0, pct), last: pct, date: today, attempts: (prev?.attempts || 0) + 1 };
        let bonus = pct >= 70 && !(prev?.pct >= 70) ? 50 : 0;
        Object.entries(perWord).forEach(([id, ok]) => {
          const r = s.vocab.words[id];
          if (!ok || !r) return;
          const before = stageOf(r);
          s.vocab.words[id] = { ...r, exam: true };
          if (before < 4 && stageOf(s.vocab.words[id]) === 4) bonus += MASTERED_XP;
        });
        s.xp += bonus;
        const day = { ...blankDay(), ...s.daily[today] };
        day.xp += bonus; day.vocabExam = 1;
        s.daily[today] = day;
        d.main = true; d.daily.add(today);
        d.results.push({ kind: 'vocab-exam', week, date: today, score, total, pct, at: Date.now() });
        return s;
      });
    },
    unlockMoreWords() { update((s, d) => { s.vocab.extra = (s.vocab.extra || 0) + 1; d.main = true; return s; }); },

    /** A finished game. Individual answers are recorded separately through recordPractice. */
    recordGame({ game, score, total, won = false, bonusXp = 0 }) {
      update((s, d) => {
        const today = dayKey();
        const g = s.games[game] || { plays: 0, best: 0, wins: 0 };
        s.games[game] = { plays: g.plays + 1, best: Math.max(g.best, score), wins: g.wins + (won ? 1 : 0), last: today };
        s.xp += bonusXp;
        s.streak = touchStreak(s.streak, today);
        const day = { ...blankDay(), ...s.daily[today] };
        day.games = (day.games || 0) + 1; day.xp += bonusXp;
        s.daily[today] = day;
        d.main = true; d.daily.add(today);
        d.results.push({ kind: 'game', game, date: today, score, total, won, at: Date.now() });
        return s;
      });
    },

    /** Save a lesson in progress (synced, so it resumes on any device). Full object every time. */
    saveDraft(topicId, draft) {
      update((s, d) => { s.drafts[topicId] = { step: draft.step, log: draft.log, prev: draft.prev ?? null, cleared: false, at: Date.now() }; d.main = true; return s; });
    },
    clearDraft(topicId) {
      update((s, d) => { s.drafts[topicId] = { step: 0, log: [], prev: null, cleared: true, at: Date.now() }; d.main = true; return s; });
    },

    awardBadges(ids) {
      update((s, d) => { const today = dayKey(); ids.forEach((id) => { if (!s.badges[id]) s.badges[id] = today; }); d.main = true; return s; });
    },

    setSetting(k, v) { update((s, d) => { s.settings[k] = v; d.main = true; return s; }); }
  }), [state, sync, flush, update]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useProgress = () => useContext(Ctx);
