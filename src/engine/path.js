import { ALL_TOPICS } from '../data/curriculum.js';
import { hasContent } from '../data/grammar/index.js';
import { isDue } from './srs.js';
import { dayKey } from './dates.js';
import { conceptLabel } from '../data/concepts.js';

/** done | open | locked | soon. A topic opens when every earlier playable topic is passed (≥60%). */
export function topicStatus(id, topics = {}) {
  if (!hasContent(id)) return 'soon';
  if (topics[id]?.completed) return 'done';
  for (const t of ALL_TOPICS) {
    if (t.id === id) return 'open';
    if (hasContent(t.id) && !topics[t.id]?.completed) return 'locked';
  }
  return 'locked';
}

export function nextTopic(topics = {}) {
  return ALL_TOPICS.find((t) => topicStatus(t.id, topics) === 'open') || null;
}

export function dueMistakes(mistakes = {}, today = dayKey()) {
  return Object.values(mistakes).filter((m) => isDue(m, today)).sort((a, b) => b.count - a.count);
}

/** Group open mistakes by concept, weighted by how often they repeat. */
export function weaknesses(mistakes = {}) {
  const by = {};
  for (const m of Object.values(mistakes)) {
    if (m.resolved) continue;
    const k = m.concept || 'other';
    by[k] = by[k] || { concept: k, label: conceptLabel(k), questions: 0, mistakes: 0 };
    by[k].questions += 1;
    by[k].mistakes += m.count || 1;
  }
  return Object.values(by).sort((a, b) => b.mistakes - a.mistakes);
}
