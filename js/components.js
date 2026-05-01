/**
 * components.js — Injects shared header + footer into every page.
 * Call injectLayout() before DOMContentLoaded fires on the body.
 */

'use strict';

const NAV_LINKS = [
  { href: 'index.html',    label: 'Home',     icon: 'fa-house'              },
  { href: 'about.html',    label: 'About',    icon: 'fa-user-astronaut'     },
  { href: 'skills.html',   label: 'Skills',   icon: 'fa-wand-magic-sparkles'},
  { href: 'projects.html', label: 'Projects', icon: 'fa-rocket'             },
  { href: 'contact.html',  label: 'Contact',  icon: 'fa-paper-plane'        },
];

function buildNavLinks(extraClass = '') {
  return NAV_LINKS.map(({ href, label, icon }) => `
    <a href="${href}" class="nav-link ${extraClass}" aria-label="${label}">
      <i class="fas ${icon}" aria-hidden="true"></i>
      <span class="nav-label">${label}</span>
    </a>
  `).join('');
}

function buildHeader() {
  return `
<header class="site-header" role="banner">
  <div class="header-inner">
    <a href="index.html" class="site-logo" aria-label="Kareena Acharya – Home">Kareena</a>

    <nav class="primary-nav" aria-label="Primary navigation">
      ${buildNavLinks()}
    </nav>

    <button
      class="hamburger"
      aria-controls="mobile-drawer"
      aria-expanded="false"
      aria-label="Toggle navigation menu"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
  </div>
</header>

<nav class="mobile-drawer" id="mobile-drawer" aria-label="Mobile navigation">
  ${buildNavLinks()}
</nav>
  `;
}

function buildFooter() {
  return `
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-inner">
      <a href="index.html" class="footer-logo" aria-label="Kareena Acharya – Home">Kareena</a>

      <nav class="footer-nav" aria-label="Footer navigation">
        ${NAV_LINKS.map(({ href, label }) =>
          `<a href="${href}">${label}</a>`
        ).join('')}
      </nav>

      <ul class="social-list footer-social" aria-label="Social media links">
        <li>
          <a href="https://github.com/karii-a" target="_blank" rel="noopener noreferrer"
             class="social-link" aria-label="GitHub">
            <i class="fab fa-github" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/kareena-acharya-bb0757289/" target="_blank" rel="noopener noreferrer"
             class="social-link" aria-label="LinkedIn">
            <i class="fab fa-linkedin-in" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/not_me_1306/" target="_blank" rel="noopener noreferrer"
             class="social-link" aria-label="Instagram">
            <i class="fab fa-instagram" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </div>

    <p class="footer-copy">
      &copy; <span id="footer-year"></span> Kareena Acharya. All rights reserved.
    </p>
  </div>
</footer>
  `;
}

function injectLayout() {
  // Header goes before <main>
  const main = document.querySelector('main');
  if (main) {
    main.insertAdjacentHTML('beforebegin', buildHeader());
  }

  // Footer goes after <main>
  const body = document.body;
  body.insertAdjacentHTML('beforeend', buildFooter());

  // Dynamic year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// Inject immediately (script is deferred, DOM is ready)
document.addEventListener('DOMContentLoaded', injectLayout);
