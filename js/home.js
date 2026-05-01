/**
 * home.js — Greeting typewriter animation (Home page only)
 */

'use strict';

const GREETINGS = [
  'नमस्ते',    // Nepali
  'Hello',      // English
  '你好',       // Mandarin
  'नमस्कार',   // Hindi
  'こんにちは', // Japanese
  '안녕하세요', // Korean
  'Hola',       // Spanish
  'Bonjour',    // French
  'Ciao',       // Italian
  'Olá',        // Portuguese
  'Hallo',      // German
  'Привет',     // Russian
  'مرحبا',      // Arabic
  'Γεια σας',   // Greek
  'Xin chào',   // Vietnamese
  'สวัสดี',     // Thai
  'Merhaba',    // Turkish
  'שָׁלוֹם',    // Hebrew
];

function initGreeting() {
  const el = document.getElementById('js-greeting');
  if (!el) return;

  let index     = 0;
  let charIndex = 0;
  let isErasing = false;

  const TYPE_SPEED  = 95;   // ms per character typed
  const ERASE_SPEED = 45;   // ms per character erased
  const PAUSE_AFTER = 1000; // ms to pause when word is complete

  function tick() {
    const word = GREETINGS[index];

    if (!isErasing) {
      // Typing
      el.textContent = word.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === word.length) {
        // Finished typing — pause then erase
        isErasing = true;
        setTimeout(tick, PAUSE_AFTER);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      // Erasing
      el.textContent = word.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        // Finished erasing — move to next word
        isErasing = false;
        index     = (index + 1) % GREETINGS.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, ERASE_SPEED);
    }
  }

  el.style.opacity = '1';
  tick();
}

document.addEventListener('DOMContentLoaded', initGreeting);
