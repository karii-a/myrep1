/**
 * main.js — Kareena Acharya Portfolio
 * Shared behaviour across all pages.
 */

'use strict';

/* ── 1. HEADER SCROLL SHADOW ── */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── 2. HAMBURGER / MOBILE DRAWER ── */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const drawer    = document.querySelector('.mobile-drawer');
  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close drawer when a link inside it is clicked
  drawer.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Mark active page link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === 'index.html' && href === '#')) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ── 3. FLOATING FLOWER BACKGROUND ── */
function initFlowers() {
  const canvas = document.querySelector('.flower-canvas');
  if (!canvas) return;

  const COLORS  = ['#FFB7D1', '#FF9EBF', '#FF85AD', '#FFD1DC', '#FFC0CB'];
  const COUNT   = 40;
  const REPEL_R = 170;
  const flowers = [];

  for (let i = 0; i < COUNT; i++) {
    const el    = document.createElement('div');
    el.className = 'flower';
    el.setAttribute('aria-hidden', 'true');

    const x     = Math.random() * window.innerWidth;
    const y     = Math.random() * window.innerHeight;
    const scale = 0.4 + Math.random() * 0.9;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    el.style.setProperty('--flower-color', color);
    canvas.appendChild(el);

    flowers.push({ el, x, y, vx: 0, vy: 0, scale });
  }

  // Mouse repel
  document.addEventListener('mousemove', (e) => {
    flowers.forEach((f) => {
      const dx   = e.clientX - f.x;
      const dy   = e.clientY - f.y;
      const dist = Math.hypot(dx, dy);

      if (dist < REPEL_R) {
        const angle = Math.atan2(dy, dx);
        const force = (REPEL_R - dist) / REPEL_R;
        f.vx -= Math.cos(angle) * force * 2.2;
        f.vy -= Math.sin(angle) * force * 2.2;
      }
    });
  });

  // Animation loop
  const tick = () => {
    flowers.forEach((f) => {
      f.x  += f.vx;
      f.y  += f.vy;
      f.vx *= 0.95;
      f.vy *= 0.95;

      const W = window.innerWidth;
      const H = window.innerHeight;
      if (f.x < -40)  f.x = W + 40;
      if (f.x > W+40) f.x = -40;
      if (f.y < -40)  f.y = H + 40;
      if (f.y > H+40) f.y = -40;

      f.el.style.transform = `translate(${f.x}px, ${f.y}px) scale(${f.scale})`;
    });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ── 4. SCROLL REVEAL ── */
function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ── 5. ACTIVE NAV HIGHLIGHT ── */
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[href]').forEach((link) => {
    if (link.getAttribute('href') === path) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initFlowers();
  initReveal();
  initActiveNav();
});
