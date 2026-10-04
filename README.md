# Khata — English Foundation → IELTS 7.5+ Trainer

A personal, practice-first English training app: bilingual (English + বাংলা) grammar lessons, strict written-answer checking, a mistake tracker with spaced repetition, XP/levels/streaks, and Google sign-in so progress follows you across laptop, phone and tablet.

- Architecture, Firestore schema, 16-week curriculum, screen map, gamification and the learning algorithm: **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**
- Built so far: Milestones 1–2 plus the core of 3 (mistakes, spaced review, weakness analysis, progress). Two topics are fully written (Sentence structure, Present Simple); the other 62 show as "Content coming".

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in after the Firebase steps below
npm run dev                  # http://localhost:5173
npm test                     # engine tests + content validator
```

Without Firebase keys the app still runs in guest mode (progress stays in that browser, labelled "Local only").

## 1. Firebase setup (one time, ~10 minutes)

1. Go to <https://console.firebase.google.com> → **Add project** → name it (e.g. `khata-english`). Google Analytics is optional.
2. **Build → Authentication → Get started → Sign-in method → Google → Enable**. Choose a support email → **Save**.
3. **Build → Firestore Database → Create database** → pick a location close to you (e.g. `asia-south1` Mumbai or `asia-southeast1` Singapore for Bangladesh) → start in **production mode**.
4. **Firestore → Rules** → replace everything with the contents of `firestore.rules` → **Publish**. These rules let a signed-in user read and write only `users/{their uid}/…`.
5. **Project settings (gear) → General → Your apps → Web (`</>`)** → register an app (no Hosting needed) → copy the `firebaseConfig` values.
6. Put them in `.env.local`:
   ```
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=khata-english.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=khata-english
   VITE_FIREBASE_STORAGE_BUCKET=khata-english.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
   VITE_FIREBASE_APP_ID=1:1234567890:web:abc123
   ```
   These are **not secrets** — Firebase web config is designed to be public; security comes from the rules and authorized domains. Real secrets (e.g. an AI API key for essay grading later) must never go in the frontend; they belong in a server function.
7. `localhost` is already an authorized domain, so Google sign-in works in `npm run dev`.

## 2. GitHub Pages deployment

1. Create a new repository on GitHub (e.g. `english-trainer`). Public or private both work for Pages on paid plans; free accounts need public for Pages.
2. Push the code:
   ```bash
   git init
   git add .
   git commit -m "Khata: milestones 1-2"
   git branch -M main
   git remote add origin https://github.com/<you>/english-trainer.git
   git push -u origin main
   ```
   `.env.local` is git-ignored, so your config is not committed.
3. In the repo: **Settings → Secrets and variables → Actions → Variables tab → New repository variable**. Add the six names from `.env.example` with the same values as `.env.local`.
4. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
5. **Actions** tab → "Deploy to GitHub Pages" → **Run workflow** (or just push again). It runs the tests, builds, and deploys. Your URL is `https://<you>.github.io/english-trainer/`.
6. Back in Firebase: **Authentication → Settings → Authorized domains → Add domain** → `<you>.github.io`. Without this, Google sign-in shows an "unauthorized domain" message.
7. Open the URL on your phone, sign in with the same Google account, and your progress is there. On Android Chrome use **⋮ → Add to Home screen / Install app**; on iPhone Safari use **Share → Add to Home Screen**.

### Updating the live app

Edit → `git commit` → `git push`. The workflow redeploys in about two minutes. If a test fails (for example, a new question whose accepted answer would be marked wrong) the deploy stops and the live site is unchanged.

### Manual build (optional)

`npm run build` produces `dist/`. Because `vite.config.js` uses `base: './'` and the app uses hash routing (`/#/learn`), `dist/` works from any folder or repo name without configuration.

## How sync works

Everything you do is saved to the device instantly, then sent to Firestore in one batch after a short pause, when you leave the tab, or when the connection returns. The top bar shows the state: **Synced**, **Pending**, **Offline** (saved on device), or **Local** (guest mode). If you study on two devices, progress is merged rather than overwritten.

## Adding content

Copy `src/data/grammar/present-simple.js`, change the id, write 10 examples / 10 MCQs / 10 written questions, and register it in `src/data/grammar/index.js`. For written questions, list every answer you would accept in `accepted`, and add `checks` (regex + what/why/concept) for the mistakes you expect. Run `npm test` — it rejects incomplete topics, MCQ answers missing from options, and error patterns that would fire on a correct answer.

## Known limits (honest list)

- Written answers are checked against model answers and known error patterns. A valid sentence the author didn't anticipate can be marked wrong; use "My answer is also correct" and consider adding it to `accepted`.
- No service worker yet (Milestone 7). Progress already survives going offline; lesson content needs one online visit first.
- Skill scores other than grammar show "Not measured yet" until their modules exist. Nothing in the app is an IELTS band score.
