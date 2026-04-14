/* ═══════════════════════════════════════════
   HOTEL — Global JavaScript
   Shared across all pages
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── CURSOR ──
  const cur = document.getElementById('cur');
  const ring = document.getElementById('cur-r');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  const hoverEls = document.querySelectorAll(
    'button, a, .r-card, .f-card, .g-item, .game-card, .val, .stat, .nav-btn'
  );
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.width  = '20px';
      cur.style.height = '20px';
      ring.style.width  = '60px';
      ring.style.height = '60px';
      ring.style.borderColor = 'rgba(201,169,110,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width  = '10px';
      cur.style.height = '10px';
      ring.style.width  = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(201,169,110,0.5)';
    });
  });

  // ── NAV SCROLL ──
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ── SCROLL REVEAL ──
  const revEls = document.querySelectorAll('.rv');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revEls.forEach(el => observer.observe(el));

  // ── CONFIRM MODAL (used on stay page) ──
  window.openConf  = () => document.getElementById('confOv')?.classList.add('open');
  window.closeConf = () => document.getElementById('confOv')?.classList.remove('open');

  // ── DEFAULT DATES (used on stay page) ──
  const today = new Date();
  const tmr   = new Date(today); tmr.setDate(today.getDate() + 1);
  const d3    = new Date(today); d3.setDate(today.getDate() + 3);
  const fmt   = d => d.toISOString().split('T')[0];
  document.querySelectorAll('#ci').forEach(el => el.value = fmt(tmr));
  document.querySelectorAll('#co').forEach(el => el.value = fmt(d3));

});
