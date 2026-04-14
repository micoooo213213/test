/* ═══════════════════════════════════════════
   HOTEL — Contact Page JavaScript

   Sends form data to michael.gloeb@yahoo.com
   Method: Formspree (works without a server)
   ─────────────────────────────────────────
   HOW IT WORKS:
   1. Tries to POST to Formspree endpoint first
      (free, no server needed, just sign up at
       formspree.io and replace YOUR_FORM_ID below)
   2. Falls back to a mailto: link if Formspree
      hasn't been configured yet
═══════════════════════════════════════════ */

// ─── REPLACE THIS with your Formspree form ID ───
// Sign up free at https://formspree.io
// Create a form → copy the ID from the endpoint URL
// e.g. https://formspree.io/f/abcd1234  →  ID is "abcd1234"
const FORMSPREE_ID = '';   // leave blank to use mailto fallback

const RECIPIENT = 'michael.gloeb@yahoo.com';

document.addEventListener('DOMContentLoaded', () => {

  const form      = document.getElementById('contactForm');
  const fields    = document.getElementById('formFields');
  const success   = document.getElementById('formSuccess');
  const sendBtn   = document.getElementById('sendBtn');
  const sendAgain = document.getElementById('sendAgain');

  if (!form) return;

  // ── Live validation ──
  form.querySelectorAll('.f-inp, .f-ta, .f-sel').forEach(el => {
    el.addEventListener('blur', () => validateField(el));
    el.addEventListener('input', () => {
      const err = el.closest('.field, div')?.querySelector('.f-error');
      if (err) err.classList.remove('show');
    });
  });

  // ── Submit ──
  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validateAll(form)) return;

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending…';

    const data = new FormData(form);

    if (FORMSPREE_ID) {
      // ── Formspree POST ──
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          showSuccess();
        } else {
          const json = await res.json();
          alert('Something went wrong: ' + (json.errors?.[0]?.message || 'Please try again.'));
          resetBtn(sendBtn);
        }
      } catch {
        alert('Network error — please try again or email us directly.');
        resetBtn(sendBtn);
      }

    } else {
      // ── Mailto fallback ──
      const name    = data.get('name')    || '';
      const email   = data.get('email')   || '';
      const subject = data.get('subject') || 'Enquiry from HOTEL website';
      const msg     = data.get('message') || '';
      const phone   = data.get('phone')   || '';

      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : '',
        ``,
        msg
      ].filter(Boolean).join('\n');

      const mailto = `mailto:${RECIPIENT}`
        + `?subject=${encodeURIComponent(subject)}`
        + `&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;

      // Show success after short delay (mailto opens email client)
      setTimeout(showSuccess, 800);
    }
  });

  // ── Send again ──
  sendAgain?.addEventListener('click', () => {
    form.reset();
    document.getElementById('formFields').classList.remove('hide');
    document.getElementById('formSuccess').classList.remove('show');
    resetBtn(sendBtn);
  });

});

// ── Show success state ──
function showSuccess() {
  document.getElementById('formFields').classList.add('hide');
  document.getElementById('formSuccess').classList.add('show');
}

// ── Reset submit button ──
function resetBtn(btn) {
  btn.disabled = false;
  btn.textContent = 'Send Message';
}

// ── Validate a single field ──
function validateField(el) {
  const val = el.value.trim();
  const err = el.parentElement?.querySelector('.f-error');
  if (!err) return true;

  if (el.required && !val) {
    err.textContent = 'This field is required.';
    err.classList.add('show');
    return false;
  }

  if (el.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    err.textContent = 'Please enter a valid email address.';
    err.classList.add('show');
    return false;
  }

  err.classList.remove('show');
  return true;
}

// ── Validate all fields ──
function validateAll(form) {
  let valid = true;
  form.querySelectorAll('.f-inp, .f-ta, .f-sel').forEach(el => {
    if (!validateField(el)) valid = false;
  });
  return valid;
}
