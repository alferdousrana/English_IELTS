// Register topic content modules here. Each is lazy-loaded, so adding topics does not grow the main bundle.
export const TOPIC_CONTENT = {
  'sentence-structure': () => import('./sentence-structure.js'),
  'subject': () => import('./subject.js'),
  'verb': () => import('./verb.js'),
  'object': () => import('./object.js'),
  'subject-complement': () => import('./subject-complement.js'),
  'present-simple': () => import('./present-simple.js')
};
export const hasContent = (id) => Boolean(TOPIC_CONTENT[id]);
export async function loadTopic(id) {
  const loader = TOPIC_CONTENT[id];
  if (!loader) return null;
  const mod = await loader();
  const t = mod.default;
  // Attach metadata so every question is self-describing (topic, skill, type, xp).
  t.mcq = t.mcq.map((q) => ({ ...q, topic: id, skill: 'grammar', type: 'mcq', difficulty: q.difficulty || t.difficulty, xp: 5 }));
  t.written = t.written.map((q) => ({ ...q, topic: id, skill: 'grammar', type: 'written', difficulty: q.difficulty || t.difficulty, xp: 10 }));
  return t;
}
