import { Link } from 'react-router-dom';
import { useProgress } from '../state/ProgressContext.jsx';
import { GRAMMAR_CATS } from '../engine/generators.js';
import { catUnlocked, unlockLesson } from '../engine/unlocks.js';
import { loadResume } from '../ui/resume.js';

// Which practice categories each game draws from. A game opens when at least one is unlocked.
export const FOUNDATION = ['sva', 'be', 'dodoes', 'pronouns', 'articles', 'quantifiers', 'prepositions', 'plurals'];
export const SPEED = ['sva', 'be', 'dodoes', 'articles', 'tenses', 'past', 'prepositions', 'quantifiers', 'pronouns', 'translate'];
export const GAME_CATS = {
  builder: ['order'], 'fill-gap': FOUNDATION, tense: ['tenses'], 'error-hunter': ['errors'], paraphrase: ['paraphrase'],
  speed: SPEED, 'boss-grammar': GRAMMAR_CATS.filter((c) => c !== 'order'), 'boss-foundation': [...GRAMMAR_CATS.filter((c) => c !== 'order'), 'paraphrase']
};
export const gameCats = (id, topics) => (GAME_CATS[id] || []).filter((c) => catUnlocked(c, topics));
export const gameLocked = (id, topics) => (GAME_CATS[id] ? (gameCats(id, topics).length ? null : `Pass the "${unlockLesson(GAME_CATS[id][0])}" lesson to unlock`) : null);

export const GAMES = [
  { id: 'word-match', icon: '🔗', name: 'Word matching', desc: 'Match English words with their Bangla meanings.', kind: 'Vocabulary' },
  { id: 'synonym-match', icon: '🪞', name: 'Synonym match', desc: 'Pair each word with a word of similar meaning.', kind: 'Vocabulary' },
  { id: 'context', icon: '🎯', name: 'Word in context', desc: 'Pick the sentence that uses the word correctly.', kind: 'Vocabulary' },
  { id: 'sentence-match', icon: '🧷', name: 'Sentence matching', desc: 'Join each beginning to its correct ending.', kind: 'Grammar' },
  { id: 'word-sort', icon: '🗂️', name: 'Word sorting', desc: 'Sort words into noun, verb, adjective and adverb.', kind: 'Grammar' },
  { id: 'builder', icon: '🧱', name: 'Sentence builder', desc: 'Tap the words into the right order.', kind: 'Grammar' },
  { id: 'fill-gap', icon: '✏️', name: 'Fill the gap', desc: 'Quick gap-fills from the foundation topics.', kind: 'Grammar' },
  { id: 'tense', icon: '⏳', name: 'Tense challenge', desc: '20 seconds per question. Read the signal words.', kind: 'Grammar' },
  { id: 'error-hunter', icon: '🔍', name: 'Error hunter', desc: 'Only one sentence is correct. Find it.', kind: 'Grammar' },
  { id: 'paraphrase', icon: '🔁', name: 'Paraphrase challenge', desc: 'Choose the IELTS-quality paraphrase.', kind: 'IELTS' },
  { id: 'speed', icon: '⚡', name: 'Speed round', desc: 'As many right answers as you can in 60 seconds.', kind: 'Mixed' },
  { id: 'boss-grammar', icon: '👹', name: 'Grammar boss', desc: '30 hits to win, 5 lives. Weighted to your weak areas.', kind: 'Boss', boss: true },
  { id: 'boss-vocab', icon: '🐲', name: 'Vocabulary boss', desc: '25 hits on your learned words, 5 lives.', kind: 'Boss', boss: true },
  { id: 'boss-foundation', icon: '🐉', name: 'Foundation boss', desc: '50 hits across everything, 5 lives. The big one.', kind: 'Boss', boss: true }
];

export default function Games() {
  const { state } = useProgress();
  return (
    <section className="page games">
      <h1>Games</h1>
      <p className="muted">Same question bank, different pressure. Every answer counts towards your category progress, and wrong answers join your review.</p>
      <div className="game-grid">
        {GAMES.map((g) => {
          const st = state.games[g.id];
          const lock = gameLocked(g.id, state.topics);
          const cont = !lock && loadResume(`game:${g.id}`);
          const Tag = lock ? 'div' : Link;
          return (
            <Tag key={g.id} {...(lock ? { 'aria-disabled': true } : { to: `/games/${g.id}` })} className={`game-card ${g.boss ? 'is-boss' : ''} ${lock ? 'is-locked' : ''}`}>
              <span className="game-icon" aria-hidden="true">{g.icon}</span>
              <span className="game-body">
                <b>{g.name}</b>
                <small>{g.desc}</small>
                {cont && <span className="m-pill m-1">Continue where you left off</span>}
                <span className="game-meta">{lock ? `🔒 ${lock}` : null}{!lock && g.kind}{lock ? '' : st ? ` · played ${st.plays}× · best ${st.best}${g.boss && st.wins ? ` · ${st.wins} win${st.wins > 1 ? 's' : ''}` : ''}` : ' · new'}</span>
              </span>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
