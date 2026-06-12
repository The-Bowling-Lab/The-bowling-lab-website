/* ============================================================
   THE BOWLING LAB v2 — main.js
   ============================================================ */

// ---- MOBILE NAV ----
const burger = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}

function closeMobile() {
  if (mobileNav) mobileNav.classList.remove('open');
}

// ---- CONTACT FORM ----
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = {
      name:     form.name.value.trim(),
      club:     form.club.value.trim(),
      email:    form.email.value.trim(),
      phone:    form.phone.value.trim(),
      sessions: form.sessions.value,
      message:  form.message.value.trim(),
    };

    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpqeypbl';

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        success.textContent = "Thanks — I'll be in touch shortly.";
        form.reset();
      } else {
        success.textContent = 'Something went wrong. Try emailing Josh@thebowlinglab.com.au directly.';
      }
    } catch {
      success.textContent = 'Could not send. Try emailing Josh@thebowlinglab.com.au directly.';
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.price-card, .testi-card, .included-item, .proof-item');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  revealObserver.observe(el);
});
