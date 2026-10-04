// Feedback that answers the learner's action: confetti + XP chip + soft chime for a right
// answer, a short buzz for a wrong one, a bigger moment for level-ups and badges.
// Lightweight canvas confetti, no dependency. Honours prefers-reduced-motion.
const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const COLORS = ['#F5B83D', '#2BD39A', '#8B8CFF', '#FF7AA8', '#46C7F0', '#FF9F5A'];
let last = { x: 200, y: 400 };
if (typeof window !== 'undefined') {
  last = { x: window.innerWidth / 2, y: window.innerHeight * 0.6 };
  window.addEventListener('pointerdown', (e) => { last = { x: e.clientX, y: e.clientY }; }, { passive: true });
}

export const soundOn = () => { try { return localStorage.getItem('ie:sound') !== 'off'; } catch { return true; } };
export const setSound = (on) => { try { localStorage.setItem('ie:sound', on ? 'on' : 'off'); } catch { /* ignore */ } };

let audio;
function tone(freqs, step = 0.09, type = 'sine', gain = 0.05) {
  if (!soundOn()) return;
  try {
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    const t0 = audio.currentTime;
    freqs.forEach((f, i) => {
      const o = audio.createOscillator(), g = audio.createGain(), t = t0 + i * step;
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + step * 2.4);
      o.connect(g).connect(audio.destination); o.start(t); o.stop(t + step * 2.6);
    });
  } catch { /* audio unavailable */ }
}

function burst({ x = last.x, y = last.y, count = 36, power = 1, spread = 70 } = {}) {
  if (reduced()) return;
  const W = window.innerWidth, H = window.innerHeight;
  const c = document.createElement('canvas'), dpr = Math.min(2, window.devicePixelRatio || 1);
  c.className = 'confetti'; c.width = W * dpr; c.height = H * dpr;
  document.body.appendChild(c);
  const ctx = c.getContext('2d'); ctx.scale(dpr, dpr);
  const parts = Array.from({ length: count }, () => {
    const a = (-90 + (Math.random() - 0.5) * spread * 2) * (Math.PI / 180), sp = (5 + Math.random() * 7) * power;
    return { x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: 3 + Math.random() * 4, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: COLORS[(Math.random() * COLORS.length) | 0], sq: Math.random() < 0.6 };
  });
  const start = performance.now();
  (function frame(now) {
    const t = now - start;
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = Math.max(0, 1 - t / 1400);
    parts.forEach((p) => {
      p.vy += 0.28; p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
      if (p.sq) ctx.fillRect(-p.r, -p.r * 0.6, p.r * 2, p.r * 1.2); else { ctx.beginPath(); ctx.arc(0, 0, p.r * 0.8, 0, 7); ctx.fill(); }
      ctx.restore();
    });
    if (t < 1400) requestAnimationFrame(frame); else c.remove();
  })(start);
}

function chip(text, cls = '') {
  const el = document.createElement('div');
  el.className = `joy-chip ${cls}`; el.textContent = text;
  el.style.left = `${Math.min(window.innerWidth - 110, Math.max(16, last.x - 40))}px`;
  el.style.top = `${Math.max(70, last.y - 56)}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

export function celebrateCorrect({ xp = 0, combo = 0 } = {}) {
  const big = combo > 0 && combo % 5 === 0;
  burst({ count: big ? 80 : 32, power: big ? 1.3 : 0.9 });
  chip(xp ? `+${xp} XP` : 'Correct', 'good');
  if (combo >= 3) setTimeout(() => chip(`${combo} in a row`, 'combo'), 200);
  tone(big ? [523, 659, 784, 1047] : [660, 990], big ? 0.08 : 0.07);
  navigator.vibrate?.(15);
}
export function celebrateWrong() {
  tone([196, 165], 0.09, 'triangle', 0.035);
  navigator.vibrate?.([12, 50, 12]);
}
export function celebrateBig(title, sub = '', icon = '🎉') {
  const W = window.innerWidth, H = window.innerHeight;
  burst({ x: W * 0.2, y: H * 0.85, count: 70, power: 1.5, spread: 40 });
  burst({ x: W * 0.8, y: H * 0.85, count: 70, power: 1.5, spread: 40 });
  tone([523, 659, 784, 1047, 1319], 0.1);
  const el = document.createElement('div');
  el.className = 'joy-toast'; el.setAttribute('role', 'status');
  el.innerHTML = '<span class="jt-icon"></span><span class="jt-text"><b></b><small></small></span>';
  el.querySelector('.jt-icon').textContent = icon;
  el.querySelector('b').textContent = title;
  el.querySelector('small').textContent = sub;
  document.body.appendChild(el);
  setTimeout(() => el.classList.add('out'), 2800);
  setTimeout(() => el.remove(), 3300);
}
