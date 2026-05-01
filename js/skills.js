/**
 * skills.js — Animate progress bars when they scroll into view.
 */

'use strict';

function initProgressBars() {
  const fills = document.querySelectorAll('.progress-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill      = entry.target;
          const targetPct = fill.dataset.width || '0';
          fill.style.width = `${targetPct}%`;
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 }
  );

  fills.forEach((fill) => observer.observe(fill));
}

document.addEventListener('DOMContentLoaded', initProgressBars);
