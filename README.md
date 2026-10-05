# IELTS English — English Foundation → IELTS 7.5+ Trainer (v3)

A personal, practice-first English training app: bilingual (English + বাংলা) grammar lessons, 88,000+ generated practice questions in 24 categories, a daily vocabulary system with a 7-day exam, 14 games including boss battles, a mistake tracker with spaced repetition, XP/levels/badges/streaks, light and dark themes, and Google sign-in so progress follows you across laptop, phone and tablet. Installable as an app.

## What's new in v3

- **Lessons rewritten at 20 / 20 / 20**: every lesson now has a detailed English + বাংলা explanation (5–6 sections with tables, common mistakes and tips), 20 examples whose explanations are in Bangla (English grammar words stay in English), 20 MCQs and 20 written questions.
- **Week 1 is complete**: Sentence structure, Subject, Verb, Object, Subject complement, plus Present Simple upgraded to the new format.
- **Continue where you left off**: a lesson saves your step and every answer after each question, synced to Firebase, so leaving the app, switching screens or changing device takes you back to the same question. Practice sessions, vocabulary cards/quizzes/exams and games also resume. Reopening the app returns to the last screen you used.
- **Jump between steps**: tap Explanation, Examples, MCQ or Written in the step bar. You can skip MCQs and do the written part first; the result appears when both parts are finished.
- **Strict unlocking**: the next lesson opens only after you pass the current one with 60%. Practice categories and grammar games open only after you pass the lesson that teaches them (for example, Sentence structure unlocks Sentence builder and Bangla → English). Vocabulary practice still depends on learned words.
- **Mobile sentence matching**: two columns side by side, smaller text, long lines wrap.
- Tests now check every registered lesson: 20/20/20, Bangla example explanations, unique ids, valid options, and that every accepted written answer is judged correct.

## What's new in v2

- **Renamed** to IELTS English, with a new deep indigo design, light/dark/system themes (toggle in the top bar or Profile) and a new app icon.
- **Install app**: an install sheet appears as soon as the link opens; an install button stays in the top bar and Profile. Works on Android, Windows/Mac (Chrome/Edge) and iPhone (Share → Add to Home Screen). Includes a service worker for offline use.
- **Joy animations**: confetti, a "+XP" chip and a soft chime on every correct answer, combo streaks ("5 in a row"), and a bigger celebration for level-ups, badges, passed topics and exams. Sound can be turned off in Profile. Respects the device "reduce motion" setting.
- **Practice, rebuilt**: 24 categories (subject–verb agreement, be verbs, do/does/did, pronouns, articles, plurals, quantifiers, prepositions, all tenses, past simple, present perfect, negatives and questions, question tags, modals, gerund/infinitive, passive, conditionals, comparatives, error hunter, sentence builder, wh-questions, Bangla → English, IELTS paraphrasing, my vocabulary). Each shows answered count, recent accuracy and a mastery level. Sessions of 10, 20, 50 or endless. "Smart practice" weights questions towards your weakest categories and starts with due mistakes.
- **Vocabulary**: 5 new words a day (days 1–6), a 30-word exam on day 7, pronunciation (tap the speaker), Bangla meaning, synonyms, opposites, collocations, common mistake, IELTS use and 10 example sentences per word. Words move through Recognised → Understood → Can use → Mastered; Mastered needs your own sentence, the weekly exam and correct answers on two different days. 60 words are written so far (two full weeks).
- **Games**: word matching, synonym match, word in context, sentence matching, word sorting, sentence builder, fill the gap, tense challenge (timed), error hunter, paraphrase challenge, 60-second speed round, and three boss battles.
- **Badges** (19) and an extended **Progress** page: 14-day chart, 30-day summary, skill scores, category mastery, vocabulary stages and insights such as "you know meanings but can't use the words yet".

## Run locally

```bash
npm install
cp .env.example .env.local   # Firebase keys
npm run dev                  # http://localhost:5173
npm test
```

The service worker only registers on the deployed site (not on localhost), so development is never served stale files.

## Updating from v1 (your existing repo)

1. Copy every file from this package into your repository, keeping the folder paths. Overwrite when asked.
2. `global.css`: this package has it at `src/styles/global.css`. Open `src/main.jsx`, look at the line that imports the CSS, and put the new file at that same path (overwrite the old one). If your import is already `./styles/global.css`, nothing to do.
3. You can delete `src/screens/Placeholder.jsx`; nothing uses it now.
4. Firestore rules: Firebase console → Firestore → Rules → paste `firestore.rules` → Publish. (Same idea as before: each user can only read and write `users/{their uid}/…`.)
5. `git add . && git commit -m "v2: IELTS English" && git push`. GitHub Actions rebuilds and deploys in about two minutes.
6. On each device, reload once. Progress already saved on the device is merged into the new format automatically.

## Firebase setup (one time)

1. <https://console.firebase.google.com> → **Add project**.
2. **Authentication → Sign-in method → Google → Enable**.
3. **Firestore Database → Create database** (e.g. `asia-south1`) in production mode.
4. **Firestore → Rules** → paste `firestore.rules` → **Publish**.
5. **Project settings → Your apps → Web** → copy the config values into `.env.local` (and into GitHub → Settings → Secrets and variables → Actions → Variables for deployment).
6. **Authentication → Settings → Authorized domains** → add `<you>.github.io`.

These web config values are not secrets; security comes from the rules and authorized domains. Real secrets (for example an AI key for essay grading) must never go in the frontend.

## Firestore schema (v2)

```
users/{uid}                       profile, xp, streak, stats, topics, settings,
                                  practice (per category), vocab (per word + exams),
                                  games (per game), badges
users/{uid}/mistakes/{questionId} spaced-repetition record for each wrong answer
users/{uid}/dailyProgress/{date}  answered, correct, xp, lessons, reviews, games, vocabWords
users/{uid}/quizResults/{auto}    one record per finished lesson, exam or game
```

Writes are batched: everything saves to the device instantly, then syncs after a 2.5-second pause, when you leave the tab, or when the connection returns.

## How generated questions work

`src/engine/generators.js` builds questions from word banks in `src/data/practice/banks.js` (subjects, 39 verbs with all forms, 76 irregular verbs, nouns, adjectives, curated article/preposition/modal/conditional items). Every question comes from a seed, and its id (`gen:tenses:123456`) is enough to rebuild exactly the same question later — that's how generated mistakes return in spaced review without storing the whole question. Distractors are chosen per pattern so that only one option is correct (for example, "yesterday" never offers Past Continuous as a wrong answer, because it could be right).

**Adding more:** add verbs/subjects/items to `banks.js` and the question count grows automatically. Add vocabulary by appending to `src/data/vocabulary/words.js` (ids `w61`, `w62`…; give each word 10 examples, and list in `x` any other word that could also fit its sentences).

## Known limits (honest list)

- 60 vocabulary words are written (days 1–14). After that the app says more words come with the next content update.
- Typed answers are compared with model answers after normalising capitals, final punctuation and contractions (doesn't = does not). A different but valid sentence can be marked wrong.
- "Use the word" sentences are checked automatically for the word and length, then you compare with model sentences and mark yourself. It is not AI grading.
- Reading, Listening, Writing and Speaking modules and the diagnostic tests are not built yet; their skill scores show "Not measured yet". Nothing in the app is an IELTS band score.
- Written lessons exist for Week 1 and Present Simple. Later topics show "Lesson coming"; they don't block the path, so after Week 1 the next open lesson is Present Simple.
