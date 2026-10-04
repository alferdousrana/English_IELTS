# Khata — Architecture and Plan

Personal English foundation → IELTS 7.5+ trainer. This document answers section 56 (A–H) of the master brief and records what is built versus planned.

**Build status**

| Milestone | Scope | Status |
|---|---|---|
| 1 | Project setup, responsive shell, navigation, dashboard, learning path, topic system, Firebase config, Google login | Done |
| 2 | Lessons: explanation → 10 examples → 10 MCQs → 10 written, results, XP | Done (engine complete; 2 of 64 topics written) |
| 3 | Mistake tracking, review, 100-question master tests, progress | Mistake tracking + spaced review + progress done; master tests next |
| 4 | Vocabulary (5/day, 10 sentences/word, 7-day review, exams) | Planned |
| 5 | Games, badges, boss battles | Levels + streaks done; rest planned |
| 6 | Reading, Writing, Speaking, Paraphrasing Lab | Planned |
| 7 | Analytics, PWA offline, personalised review | Weakness analysis + "Practise this now" done; service worker planned |
| 8 | Hardening, security, deployment docs | Rules, CI deploy, README done |

---

## A. Architecture

```
┌──────────────────────── Browser (GitHub Pages, static) ────────────────────────┐
│  React UI (screens/, components/)                                              │
│        │ reads/writes                                                          │
│  ProgressContext ──► local store (localStorage, per user)  ◄── always first    │
│        │ debounced batch (2.5 s, on tab hide, on reconnect)                    │
│        ▼                                                                       │
│  firebase/sync.js ──► Firestore (with its own IndexedDB offline cache)         │
│                                                                                │
│  Engines (pure JS, unit-tested, no React):                                     │
│    evaluate.js  written-answer checker      srs.js     spaced repetition       │
│    xp.js        XP rules + level table      streak.js  forgiving streaks       │
│    path.js      unlocks, due list, weakness analysis                           │
│                                                                                │
│  Content (data/): curriculum.js, concepts.js, grammar/<topic>.js (lazy-loaded) │
└────────────────────────────────────────────────────────────────────────────────┘
          │ Google sign-in (popup, redirect fallback)
          ▼
   Firebase Auth ──► uid ──► users/{uid}/… (Firestore rules: owner-only)
```

**Frontend.** React 18 + Vite, plain CSS with design tokens, `HashRouter` so deep links work on GitHub Pages without a 404 workaround. `base: './'` so the build works at any repo path. No UI library; one runtime dependency besides React and Firebase (react-router).

**Authentication.** Firebase Auth with Google. Popup first; falls back to redirect when a mobile browser blocks popups. A guest mode keeps progress in this browser only and is clearly labelled "Local only: not synced"; on first sign-in, guest progress is merged into the account.

**Firestore.** One user document holds small, frequently-read data (XP, streak, topic scores). Growing data (mistakes, daily stats, quiz results) lives in subcollections so the main doc stays small. See §C.

**Sync and offline.** Every change is applied to the local store immediately and saved to localStorage along with a list of *what* changed (dirty sets). After 2.5 s of quiet, or when the tab is hidden, or when the network returns, the changes are pushed in **one** `writeBatch`. A failed push puts the dirty items back; nothing is lost. Firestore's persistent cache adds a second safety net. On sign-in, local and remote snapshots are merged field-by-field (max XP, best scores, newest mistake state, per-day maxima) so work from two devices is not overwritten.

**Question engine.** Every question is plain data with metadata (`id, topic, skill, type, difficulty, concept, prompt, options/answer` or `accepted/checks`, `explanation, xp`). `loadTopic()` attaches the metadata, so components never hard-code questions.

**Written-answer checker (evaluate.js).** Rule-based, strict, and honest about its limits:
1. Normalise case, punctuation, spacing; expand contractions (doesn't = does not).
2. Match against the author's list of accepted answers. Exact match with capitalisation/punctuation slips → "Correct, with small slips" and the slips are listed.
3. Otherwise run the author's error patterns (`checks`) — e.g. `he go` → subject-verb agreement — to produce *What was wrong* and *Why*, tagged with a concept.
4. Word-level diff (LCS) against the closest accepted answer, rendered in red pen.
5. "My answer is also correct" lets the learner override a valid alternative; the UI states that the checker can miss valid answers. A future AI evaluator (Milestone 6) must run behind a server function (Firebase Functions or similar) so no API key ships in the frontend.

**Learning engine.** `path.js` decides topic status (passed / open / locked / content coming); a topic opens when every earlier playable topic is passed with ≥ 60 %.

**Mistake engine.** Every wrong answer becomes (or updates) a mistake document keyed by question id, carrying concept, both answers, explanation, count, dates and review stage. See §G.

**Vocabulary engine (M4).** Word bank as data (`data/vocabulary/day-XX.js`), 5 words per study day, each with 10 context sentences. Per-word state: `recognised → understood → can use → mastered`, advanced only by production tasks (fill-in, sentence creation), not by recognition alone. Words reuse `srs.js`.

**XP, levels, games, progress.** See §F. Games (M5) will draw from the same question bank and write to the same mistake tracker, so playing a game is never "off the record".

**PWA.** Manifest and icon are in place (installable on Android Chrome). Milestone 7 adds a service worker (cache-first for app shell and lesson chunks, network-first for Firestore) — deferred because a stale service worker during active development causes confusing "old version" bugs.

**GitHub Pages.** GitHub Actions builds with Firebase config from repository variables, runs the unit tests, and deploys `dist/`. See §H and README.

---

## B. Folder structure

```
english-ielts-app/
├─ .github/workflows/deploy.yml     CI: test → build → deploy to GitHub Pages
├─ docs/ARCHITECTURE.md             this file
├─ public/                          manifest.webmanifest, icon.svg (copied as-is)
├─ src/
│  ├─ main.jsx, App.jsx             entry, routes, auth gate
│  ├─ firebase/
│  │  ├─ config.js                  init, Google sign-in, Firestore offline cache
│  │  └─ sync.js                    load + batched push (schema lives here)
│  ├─ state/
│  │  ├─ AuthContext.jsx            user / guest mode
│  │  ├─ ProgressContext.jsx        local-first store, dirty tracking, sync status
│  │  └─ store.js                   localStorage I/O, merge logic
│  ├─ engine/                       pure logic, unit-tested
│  │  ├─ evaluate.js  srs.js  xp.js  streak.js  path.js  dates.js
│  ├─ data/
│  │  ├─ curriculum.js              16-week roadmap
│  │  ├─ concepts.js                mistake categories (EN + BN labels)
│  │  ├─ grammar/                   index.js (registry) + one file per topic
│  │  ├─ vocabulary/  reading/  writing/  speaking/  games/  reviews/   (M4–M6)
│  ├─ components/                   Layout, MCQ, Written, ProgressRing, SyncBadge
│  ├─ screens/                      Home, Learn, Lesson, Practice, Progress, Profile, Login, …
│  └─ styles/global.css             tokens + components
├─ tests/engine.test.js             engine tests + content validator
├─ firestore.rules
├─ .env.example
└─ vite.config.js, package.json, index.html
```

Adding a topic = add `src/data/grammar/<id>.js` with the same shape and register it in `grammar/index.js`. `npm test` rejects it if it lacks 10/10/10 items, if an MCQ answer isn't among its options, if an accepted answer would be marked wrong, or if an error pattern fires on a correct answer.

---

## C. Firestore schema

```
users/{uid}                                   (1 read on sign-in, 1 write per sync)
  profile   { name, email, photo, startDate }
  xp        number
  streak    { current, longest, last: 'YYYY-MM-DD', graceUsedOn, daysStudied }
  stats     { answered, correct, lessonsCompleted }
  topics    { [topicId]: { attempts, lastScore, bestScore, completed, completedOn,
                           history: [{date, score}] (last 10) } }
  settings  { dailyGoalMinutes }
  updatedAt serverTimestamp

users/{uid}/mistakes/{questionId}
  questionId, topic, concept, category, type, question, myAnswer, correctAnswer,
  explanation, count, lastMistake, lastSeen, stage (0–6), nextReview, streakCorrect,
  resolved, resolvedOn

users/{uid}/dailyProgress/{YYYY-MM-DD}
  xp, answered, correct, mistakes, lessons, reviews          (weekly/monthly = aggregates of these)

users/{uid}/quizResults/{autoId}                  append-only
  topicId, kind ('lesson' | 'master' | 'boss' | 'vocab'), date, score, total, pct,
  mcq {correct,total}, written {correct,total}, weakConcepts {concept: n}, at

— planned —
users/{uid}/vocabulary/{wordId}    stage, srs fields, lastUsedCorrectly, contextsSeen
users/{uid}/achievements/{badgeId} earnedAt, value
users/{uid}/writing/{autoId}       prompt, text, wordCount, feedback, minutes
```

Weekly and monthly views are computed from `dailyProgress` on the client rather than stored separately — 120 small docs for four months is cheaper than maintaining duplicate aggregates. Cost per study session: typically 1 batched write every few questions, never one write per click.

---

## D. Four-month curriculum

Rhythm for every week: **Mon–Fri** one grammar topic per day (explanation → 10 examples → 10 MCQs → 10 written) + 5 vocabulary words + due reviews. **Sat** 100-question master test on the week's 5 topics (weighted to mistakes). **Sun** 7-day vocabulary review (30 words) + weakness repair. IELTS habits (paraphrasing, academic words, formal register) appear in small doses from Month 2.

| Month | Week | Topics | Test / milestone |
|---|---|---|---|
| 1 Foundation | 1 | Sentence structure, Subject, Verb, Object, Subject complement | Master test 1 |
| | 2 | Parts of speech, Nouns, Pronouns, Verbs, Adjectives | Master test 2 |
| | 3 | Adverbs, Prepositions, Conjunctions, Articles, Determiners | Master test 3 |
| | 4 | Subject-verb agreement, Helping verbs, Be verbs, Main verbs, Do/Does/Did | Master test 4 |
| 2 Foundation → Tenses | 5 | Basic sentence formation, Positive, Negative, Yes/No questions, WH questions | Master test 5 + **English Foundation Boss Battle** |
| | 6 | Present Simple, Present Continuous, Present Perfect, Present Perfect Continuous, Past Simple | Master test 6 |
| | 7 | Past Continuous, Past Perfect, Past Perfect Continuous, Future Simple, Future Continuous | Master test 7 |
| | 8 | Future Perfect, Future Perfect Continuous, Choosing the right tense, Modal verbs, Conditionals | Master test 8 + **Tense Boss Battle** |
| 3 Advanced grammar | 9 | Active/passive, Relative clauses, Noun clauses, Adverb clauses, Phrase vs clause | Master test 9 |
| | 10 | Gerunds, Infinitives, Participles, Comparatives/superlatives, Reported speech | Master test 10 |
| | 11 | Question tags, Linking/transition words, Compound, Complex & compound-complex, Sentence transformation | Master test 11 |
| | 12 | Parallel structure, Common errors, Paraphrasing basics, Academic vocabulary, Formal writing | Master test 12 + **Advanced Grammar Boss Battle**, IELTS diagnostic |
| 4 IELTS | 13 | How IELTS works, Paraphrasing Lab, Skimming/scanning, T/F/NG, Matching headings | Reading practice set |
| | 14 | Listening prediction & distractors, Form/note completion, Task 1 trends, Task 1 comparisons, Task 2 structure | Listening set + Task 1 timed |
| | 15 | Task 2 opinion, Task 2 discussion/other types, Speaking Part 1, 2, 3 | Task 2 timed + speaking recordings |
| | 16 | Mock tests + weakness repair | **IELTS Mock Battle** |

Vocabulary across 16 weeks: 5 words × 6 days × 16 = ~480 words, moving from high-frequency everyday words toward the Academic Word List.

Per tense, the lesson file covers: structure, meaning, when to use, common mistakes, signal words, comparison with neighbouring tenses, Bangla explanation, examples, MCQs, written questions. Each topic is authored at 5 difficulty tiers (beginner → IELTS-level); lessons draw from the lower tiers first and master tests/boss battles from higher ones, so difficulty rises without sudden jumps.

**Foundation gate.** IELTS units unlock in order like everything else. A strong diagnostic result (M3) will let the learner *test out* of a topic by scoring ≥ 85 % on its master-test slice, but the topic stays open for review and its concepts still appear in mixed tests.

---

## E. Screen map

| Screen | Route | Purpose | Status |
|---|---|---|---|
| Login | (gate) | Google sign-in or guest mode | Done |
| Home | `/` | Greeting, day N of 120, today's mission, continue learning, due reviews, level, streak, top weakness + "Practise this now" | Done |
| Learning path | `/learn` | Month → week → topic map, locks, best scores, master tests and boss nodes | Done |
| Lesson | `/learn/:topic` | Explanation → 10 examples → 10 MCQ → 10 written → result | Done |
| Practice | `/practice` | Review my weaknesses (due + all open), weakness analysis, concept-targeted drills | Done |
| Master test | `/test/:unit` | 100 mixed questions, adaptive weighting | M3 |
| Diagnostic | `/diagnostic` | English diagnostic → recommended start | M3 |
| Vocabulary | `/vocabulary` | Today's 5 words, word detail (10 sentences), practice, 7-day review exam, word stages | M4 |
| Games | `/games` | 12 mini-games, speed round, boss battles | M5 |
| Badges | `/profile/badges` | Earned / locked badges with criteria | M5 |
| Paraphrasing Lab | `/ielts/paraphrase` | Techniques, good vs bad paraphrases, practice | M6 |
| Reading / Listening | `/ielts/reading`, `/ielts/listening` | Question-type practice with explanations | M6 |
| Writing | `/ielts/writing` | Prompt, timer, word count, structured feedback | M6 |
| Speaking | `/ielts/speaking` | Part 1/2/3 prompts, recorder, playback, self-review checklist | M6 |
| Progress | `/progress` | Week stats, 14-day chart, skill scores, weakest areas, topic table | Done (monthly view M7) |
| Profile | `/profile` | Account, level ladder, daily goal, sign out | Done |

---

## F. Gamification

**XP** (in `engine/xp.js`):

| Action | XP |
|---|---|
| Correct MCQ | 5 |
| Correct written answer | 10 (8 with small slips) |
| Correct review of an old mistake | 3 |
| Pass a lesson (≥ 60 %) | +20 |
| Perfect lesson | +10 |
| Retaking a passed topic | all of the above × 0.5 |
| (M3) Master test | 2 per correct + 50 for ≥ 80 % |
| (M4) Word reaches "can use" / "mastered" | 5 / 10 |
| (M5) Boss battle win | 150 + badge |
| (M5) Streak milestones 7 / 30 days | 50 / 200 |

Wrong answers earn nothing; there is no XP for opening screens or tapping through examples. That keeps XP tied to demonstrated skill.

**Levels.** 10 levels from *Beginner* (0 XP) to *IELTS 7+ Candidate* (8,000 XP), tuned so a learner doing the full daily plan (about 700 XP a week at 80 % accuracy) reaches level 10 in Month 3–4. The table is an array — adding levels 11+ is one line each.

**Badges (M5)**, each with a data-defined rule: First Lesson, 100 / 500 / 1,000 Questions, Grammar Starter (unit 1 passed), Grammar Master (all grammar units ≥ 80 %), Vocabulary Builder (50 words at "can use"), Vocabulary Master (300 mastered), 7-Day / 30-Day Streak, Mistake Fixer (25 mistakes resolved), Writing Warrior (10 timed essays), Speaking Explorer (20 recordings self-reviewed), each Boss Battle, IELTS Ready (all mock components attempted with practice estimates ≥ target).

**Rewards.** Messages are generated from data, never generic praise: score, change versus last attempt in percentage points, the concept that caused the most mistakes, how many reviewed items were fixed. A 40 % result says it is 40 % and names the weakness.

**Boss battles.** After units 5, 8, 12 and the IELTS block: large mixed exams drawn from higher difficulty tiers and weighted to open mistakes. Pass mark 70 %; reward XP + badge; failing schedules a targeted repair session instead of a penalty.

**Streaks.** Current, longest, days studied. Missing one day is forgiven automatically once per 7 days; missing more resets *current* only.

---

## G. Learning algorithm

**1. Recording.** Any wrong answer (lesson, test, game) calls `recordMistake`: count +1, stage → 0, next review = today, the learner's answer and the correct one stored, concept attached. For written answers the concept comes from the specific error pattern that fired (e.g. "eat tea" → natural word choice), not just the question's default.

**2. Ladder.** `INTERVALS = [0, 1, 3, 7, 14, 30]` days. A correct review moves one rung up; reaching the end marks the mistake resolved. A wrong review drops it back to stage 0 (later today).

**3. Adaptation.** A question missed 3+ times needs **two consecutive correct reviews per rung** before climbing — chronic errors are not "fixed" by one lucky answer.

**4. Weakness analysis.** Open mistakes are grouped by concept and ranked by total mistake count → "Your weakest area is subject-verb agreement" with a button that starts a drill of exactly those questions.

**5. Adaptive tests (M3).** Master tests and boss battles sample questions with weight `1 + 3 × open mistakes in that concept + 1 if concept accuracy < 70 %`, so weak areas appear more often while every topic still appears. New variant questions for the same concept (e.g. *She ___ English* after *He go to school*) are pulled by concept tag, so the learner sees the idea again in a new sentence rather than memorising one item.

**6. Vocabulary (M4).** Each word climbs `recognised → understood → can use → mastered` only via matching task types: meaning MCQ → context choice → fill-in / correction → free sentence using the word. The same SRS ladder schedules words; the day-7 exam is built from the 30 words, weighted toward words stuck below "can use".

---

## H. Deployment plan (summary — full steps in README)

1. Create Firebase project → enable Google sign-in → create Firestore → paste `firestore.rules` → register a Web app to get the config.
2. Create a GitHub repo, push the code.
3. In the repo: **Settings → Secrets and variables → Actions → Variables**, add the six `VITE_FIREBASE_*` values.
4. **Settings → Pages → Source: GitHub Actions.**
5. Push to `main` → the workflow tests, builds, deploys. URL: `https://<user>.github.io/<repo>/`.
6. Firebase **Authentication → Settings → Authorized domains** → add `<user>.github.io`.
7. Updates: commit and push; the site redeploys in about two minutes.
