import { Link } from 'react-router-dom';
import { useProgress } from '../state/ProgressContext.jsx';

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
          return (
            <Link key={g.id} to={`/games/${g.id}`} className={`game-card ${g.boss ? 'is-boss' : ''}`}>
              <span className="game-icon" aria-hidden="true">{g.icon}</span>
              <span className="game-body">
                <b>{g.name}</b>
                <small>{g.desc}</small>
                <span className="game-meta">{g.kind}{st ? ` · played ${st.plays}× · best ${st.best}${g.boss && st.wins ? ` · ${st.wins} win${st.wins > 1 ? 's' : ''}` : ''}` : ' · new'}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
