// Multilingual Greeting Animation
const greetings = [
    "नमस्ते", // Nepali
    "Hello", // English
    "你好", // Chinese Mandarin
    "नमस्कार", // Hindi
    "こんにちは", // Japanese
    "안녕하세요", // Korean
    "Hola", // Spanish
    "Bonjour", // French
    "Ciao", // Italian
    "Olá", // Portuguese
    "Hallo", // German
    "Привет", // Russian
    "مرحبا", // Arabic
    "Γεια σας", // Greek
    "Xin chào", // Vietnamese
    "สวัสดี", // Thai
    "Hej", // Swedish
    "Merhaba", // Turkish
    "Салам", // Kazakh
    "שָׁלוֹם", // Hebrew
    "Kamusta", // Filipino
    "Dzień dobry", // Polish
    "Szia", // Hungarian
    "Здравейте", // Bulgarian
    "Tere" // Estonian
];

let currentGreetingIndex = 0;
const greetingElement = document.querySelector('.greeting-text');

function typeGreeting(text, callback) {
    let index = 0;
    let result = '';
    
    function type() {
        if (index < text.length) {
            result += text[index];
            greetingElement.textContent = result;
            index++;
            setTimeout(type, 100);
        } else {
            setTimeout(callback, 1000);
        }
    }
    
    type();
}

function eraseGreeting(callback) {
    let text = greetingElement.textContent;
    
    function erase() {
        if (text.length > 0) {
            text = text.slice(0, -1);
            greetingElement.textContent = text;
            setTimeout(erase, 50);
        } else {
            callback();
        }
    }
    
    setTimeout(erase, 1000);
}

function animateGreetings() {
    if (!greetingElement) return;
    typeGreeting(greetings[currentGreetingIndex], () => {
        eraseGreeting(() => {
            currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
            animateGreetings();
        });
    });
}

// Start the greeting animation immediately when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (greetingElement) {
        greetingElement.style.opacity = "1";
        animateGreetings();
    }
});

// Header scroll interaction
let lastScrollTop = 0;
const header = document.querySelector('header');
const navRight = document.querySelector('.nav-right');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide/show nav-right based on scroll direction
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navRight.style.transform = 'translateX(100%)';
        navRight.style.opacity = '0';
    } else {
        // Scrolling up
        navRight.style.transform = 'translateX(0)';
        navRight.style.opacity = '1';
    }
    
    lastScrollTop = scrollTop;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Toggle Mobile Menu with Animation
const menuButton = document.getElementById('menu-button');
const navLinks = document.getElementById('nav-links');

menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('active');
    navLinks.classList.toggle('show');

    navLinks.style.maxHeight = navLinks.classList.contains('show')
        ? `${navLinks.scrollHeight}px`
        : '0';
});

// Typing Effect with Cursor
const typingText = document.querySelector('.typing-text');
const words = ['Code Artist', 'Design Enthusiast', 'Problem Solver'];
let index = 0, charIndex = 0, isDeleting = false;

function type() {
    const currentWord = words[index];
    typingText.textContent = currentWord.substring(0, charIndex);

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    const typeSpeed = isDeleting ? 50 : 100;
    const delay = !isDeleting && charIndex === currentWord.length ? 1500 : 500;

    if (charIndex === 0 && isDeleting) {
        isDeleting = false;
        index = (index + 1) % words.length;
    } else if (charIndex === currentWord.length && !isDeleting) {
        isDeleting = true;
    }

    setTimeout(type, charIndex === currentWord.length || charIndex === 0 ? delay : typeSpeed);
}
type();

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
const profileImage = document.querySelector('.profile-image');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (profileImage) {
        profileImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    hero.style.backgroundPosition = `${mouseX * 50}% ${mouseY * 50}%`;
});

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .stat').forEach(el => {
    observer.observe(el);
});

// Cursor Trailer Effect
const cursor = document.createElement('div');
cursor.className = 'cursor-trailer';
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    requestAnimationFrame(updateCursor);
}
updateCursor();

// Interactive Flower Background
class FlowerBackground {
    constructor() {
        this.container = document.querySelector('.flower-container');
        this.flowers = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.createFlowers(50); 
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.animate();
    }

    createFlowers(count) {
        const colors = ['#FFB7D1', '#FF9EBF', '#FF85AD', '#FFD1DC'];

        for (let i = 0; i < count; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const scale = 0.5 + Math.random() * 1; 

            flower.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                transform: scale(${scale});
                --flower-color: ${colors[Math.floor(Math.random() * colors.length)]};
                animation: floatFlower ${10 + Math.random() * 10}s ease-in-out infinite;
            `;

            this.container.appendChild(flower);
            this.flowers.push({
                element: flower,
                x,
                y,
                vx: 0,
                vy: 0,
                scale
            });
        }
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        this.flowers.forEach(flower => {
            const dx = this.mouseX - flower.x;
            const dy = this.mouseY - flower.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                const angle = Math.atan2(dy, dx);
                const force = (200 - distance) / 200;
                flower.vx -= Math.cos(angle) * force * 3;
                flower.vy -= Math.sin(angle) * force * 3;
            }
        });
    }

    animate() {
        this.flowers.forEach(flower => {
            flower.x += flower.vx;
            flower.y += flower.vy;

            flower.vx *= 0.95;
            flower.vy *= 0.95;

            if (flower.x < -50) flower.x = window.innerWidth + 50;
            if (flower.x > window.innerWidth + 50) flower.x = -50;
            if (flower.y < -50) flower.y = window.innerHeight + 50;
            if (flower.y > window.innerHeight + 50) flower.y = -50;

            flower.element.style.transform = `translate(${flower.x}px, ${flower.y}px) scale(${flower.scale})`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

new FlowerBackground();
