/**
 * contact.js — Client-side form validation and submission.
 *
 * The form uses Formspree (action attribute) for actual email delivery.
 * Replace 'YOUR_FORM_ID' in contact.html with your real Formspree ID.
 * Sign up free at https://formspree.io
 */

'use strict';

function validateField(input) {
  const error = input.closest('.form-field')?.querySelector('.form-error');
  let   message = '';

  if (input.required && !input.value.trim()) {
    message = 'This field is required.';
  } else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    message = 'Please enter a valid email address.';
  }

  input.classList.toggle('is-invalid', Boolean(message));
  if (error) error.textContent = message;

  return !message;
}

function initContactForm() {
  const form       = document.getElementById('js-contact-form');
  const successMsg = document.getElementById('js-form-success');
  const errorMsg   = document.getElementById('js-form-error');
  const submitBtn  = form?.querySelector('.submit-btn');

  if (!form) return;

  // Inline validation on blur
  form.querySelectorAll('.form-input').forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) validateField(input);
    });
  });

  // Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all required fields
    const inputs  = [...form.querySelectorAll('.form-input')];
    const allValid = inputs.every((input) => validateField(input));
    if (!allValid) return;

    // Loading state
    submitBtn.dataset.loading = 'true';
    submitBtn.querySelector('.btn-text').textContent = 'Sending…';

    try {
      const response = await fetch(form.action, {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    new FormData(form),
      });

      if (response.ok) {
        form.reset();
        successMsg.hidden = false;
        errorMsg.hidden   = true;
        // Hide success after 6 seconds
        setTimeout(() => { successMsg.hidden = true; }, 6000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      errorMsg.hidden   = false;
      successMsg.hidden = true;
    } finally {
      submitBtn.dataset.loading = 'false';
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
    }
  });
}

document.addEventListener('DOMContentLoaded', initContactForm);
