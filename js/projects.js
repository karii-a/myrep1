/**
 * projects.js — Filter bar for the Projects page.
 */

'use strict';

function initProjectFilter() {
  const filterBar = document.querySelector('.filter-bar');
  const cards     = document.querySelectorAll('.project-card[data-category]');

  if (!filterBar || !cards.length) return;

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Update active button state
    filterBar.querySelectorAll('.filter-btn').forEach((b) => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;

    cards.forEach((card) => {
      const categories = card.dataset.category || '';
      const matches    = filter === 'all' || categories.includes(filter);

      if (matches) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initProjectFilter);
