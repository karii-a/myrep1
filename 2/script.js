/* ═══════════════════════════════════════
   KAREENA ACHARYA — PORTFOLIO JS 🌸
═══════════════════════════════════════ */

/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor grow on hover
document.querySelectorAll('a, button, .info-card, .project-card, .tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    cursor.style.background = '#f48fb1';
    follower.style.transform = 'translate(-50%,-50%) scale(1.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = '';
    follower.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

/* ── Floating Petals ── */
const petalsContainer = document.getElementById('petals-container');
const PETAL_COLORS = ['#f8bbd0', '#f48fb1', '#e91e63', '#f9a8d4', '#fce4ec', '#fbcfe8'];

function createPetal() {
  const petal = document.createElement('div');
  petal.classList.add('petal');
  const size = Math.random() * 10 + 6;
  petal.style.cssText = `
    left: ${Math.random() * 100}vw;
    width: ${size}px;
    height: ${size}px;
    background: ${PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]};
    animation-duration: ${Math.random() * 8 + 6}s;
    animation-delay: ${Math.random() * 5}s;
    opacity: 0;
    border-radius: ${Math.random() > 0.5 ? '0 70% 70% 0' : '50% 0 50% 50%'};
  `;
  petalsContainer.appendChild(petal);
  setTimeout(() => petal.remove(), 16000);
}

setInterval(createPetal, 600);

/* ── Sparkles on click ── */
const sparklesContainer = document.getElementById('sparkles-container');
const SPARKLE_EMOJIS = ['✦', '✸', '❋', '✿', '❀', '🌸', '💕', '✨'];

document.addEventListener('click', (e) => {
  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.textContent = SPARKLE_EMOJIS[Math.floor(Math.random() * SPARKLE_EMOJIS.length)];
    sparkle.style.cssText = `
      left: ${e.clientX + (Math.random() - 0.5) * 40}px;
      top:  ${e.clientY + (Math.random() - 0.5) * 40}px;
      font-size: ${Math.random() * 12 + 10}px;
      animation-delay: ${Math.random() * 0.2}s;
    `;
    sparklesContainer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
});

/* ── Navbar ── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on nav link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (!link) return;
    const top = sec.offsetTop;
    const bot = top + sec.offsetHeight;
    link.classList.toggle('active', scrollPos >= top && scrollPos < bot);
  });
}

/* ── Typewriter Tagline ── */
const taglines = [
  'Creative Developer ✦',
  'UI/UX Enthusiast 🌸',
  'Visual Storyteller ✨',
  'Problem Solver 💡',
  'Cat Person 🐱',
];
let taglineIdx = 0, charIdx = 0, deleting = false;
const taglineEl = document.getElementById('tagline-text');

function typeTagline() {
  if (!taglineEl) return;
  const current = taglines[taglineIdx];

  if (deleting) {
    charIdx--;
    taglineEl.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      taglineIdx = (taglineIdx + 1) % taglines.length;
      setTimeout(typeTagline, 500);
      return;
    }
    setTimeout(typeTagline, 50);
  } else {
    charIdx++;
    taglineEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeTagline, 2200);
      return;
    }
    setTimeout(typeTagline, 85);
  }
}
setTimeout(typeTagline, 1000);

/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || (i * 60);
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.04}s`;
  revealObserver.observe(el);
});

/* ── Skill Bar Animation ── */
const skillBars = document.querySelectorAll('.pill-bar span');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));

/* ── Counter Animation ── */
const counters = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 16);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* ── Project Card Tilt ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const tiltX = dy * -6;
    const tiltY = dx * 6;
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Contact Form ── */
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending… 🌸';
  btn.disabled = true;

  // Simulate send (replace with real endpoint)
  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message 🌸';
    btn.disabled = false;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1800);
});

/* ── Smooth Parallax on blobs ── */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const blob1 = document.querySelector('.blob1');
  const blob2 = document.querySelector('.blob2');
  if (blob1) blob1.style.transform = `translateY(${scrollY * 0.15}px)`;
  if (blob2) blob2.style.transform = `translateY(${-scrollY * 0.1}px)`;
});

/* ── Tag hover ripple ── */
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', () => {
    tag.style.transform = 'scale(0.9)';
    setTimeout(() => { tag.style.transform = ''; }, 200);
  });
});

/* ── Info card stagger ── */
document.querySelectorAll('.info-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

/* ── Footer heart pulse on hover ── */
const heart = document.querySelector('.heart');
if (heart) {
  heart.addEventListener('mouseenter', () => {
    heart.style.animationDuration = '.4s';
  });
  heart.addEventListener('mouseleave', () => {
    heart.style.animationDuration = '1.5s';
  });
}

/* ── Page Load Entrance ── */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});