
// ---- HERO BALL ANIMATION ----
(function() {
  const stumps = document.getElementById('heroStumps');
  if (!stumps) return;

  const ball   = document.getElementById('heroBall');
  const s1     = document.getElementById('hs1');
  const s2     = document.getElementById('hs2');
  const s3     = document.getElementById('hs3');
  const bail1  = document.getElementById('hb1');
  const bail2  = document.getElementById('hb2');

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let loopTimer = null;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function resetStumps() {
    s1.style.transform = '';
    s2.style.transform = '';
    s3.style.transform = '';
    bail1.style.transform = '';
    bail1.style.opacity = '0.9';
    bail1.style.transition = 'none';
    bail2.style.transform = '';
    bail2.style.opacity = '0.9';
    bail2.style.transition = 'none';
    ball.style.opacity = '0';
    ball.style.transform = 'rotate(0deg)';
  }

  function runSequence() {
    resetStumps();

    const sw = stumps.offsetWidth;
    const sh = stumps.offsetHeight;

    // Ball starts far left outside the stumps container, at mid height
    const startX = -sw * 1.8;
    const startY = sh * 0.28;
    // Impact point: roughly centre stump base of bail
    const impactX = sw * 0.46;
    const impactY = sh * 0.12;

    ball.style.left = startX + 'px';
    ball.style.top  = startY + 'px';
    ball.style.opacity = '0';

    const travelDuration = 1100;
    const tStart = performance.now();

    function animBall(now) {
      const elapsed = now - tStart;
      const t = Math.min(elapsed / travelDuration, 1);
      const ease = easeOut(t);

      const x = startX + (impactX - startX) * ease;
      // Arc: rises slightly then drops into stumps
      const arc = Math.sin(t * Math.PI) * sh * 0.1;
      const y = startY + (impactY - startY) * ease - arc;
      const rot = t * 480;
      // Fade in quickly then stay visible
      const opacity = Math.min(t * 6, 1);

      ball.style.left      = x + 'px';
      ball.style.top       = y + 'px';
      ball.style.transform = `rotate(${rot}deg)`;
      ball.style.opacity   = opacity;

      if (t < 1) {
        requestAnimationFrame(animBall);
      } else {
        onImpact(sw, sh);
      }
    }

    requestAnimationFrame(animBall);
  }

  function onImpact(sw, sh) {
    // Stumps shake and lean
    const impactStart = performance.now();
    function stumpShake(now) {
      const t = Math.min((now - impactStart) / 600, 1);
      const shake = Math.sin(t * Math.PI * 7) * (1 - t) * 6;
      const lean  = easeOut(t) * 14;
      s1.style.transform = `rotate(${shake - lean * 0.4}deg)`;
      s2.style.transform = `rotate(${shake + lean * 1.3}deg)`;
      s3.style.transform = `rotate(${shake + lean * 0.5}deg)`;
      if (t < 1) requestAnimationFrame(stumpShake);
    }
    requestAnimationFrame(stumpShake);

    // Ball continues through and fades
    const ballX  = sw * 0.46;
    const ballY  = sh * 0.12;
    const bStart = performance.now();
    function ballThrough(now) {
      const t = Math.min((now - bStart) / 400, 1);
      ball.style.left    = (ballX + t * sw * 0.35) + 'px';
      ball.style.top     = (ballY + t * sh * 0.08) + 'px';
      ball.style.opacity = (1 - t * 1.5).toString();
      if (t < 1) requestAnimationFrame(ballThrough);
    }
    requestAnimationFrame(ballThrough);

    // Bails fly off
    const bStart2 = performance.now();
    const bail1X0 = parseFloat(bail1.style.left || '0');
    const bail1Y0 = parseFloat(bail1.style.top  || '0');
    const bail2X0 = parseFloat(bail2.style.left || '0');
    const bail2Y0 = parseFloat(bail2.style.top  || '0');

    function bailFly(now) {
      const dt = Math.min((now - bStart2) / 1000, 1.2);
      const g  = 20;

      // bail 1 flies left and up
      const b1x = bail1X0 + (-2.8 * dt * 60);
      const b1y = bail1Y0 + (-7   * dt * 60) + 0.5 * g * dt * dt * 60;
      const b1r = -240 * dt;

      // bail 2 flies right and up
      const b2x = bail2X0 + (3.2  * dt * 60);
      const b2y = bail2Y0 + (-8.5 * dt * 60) + 0.5 * g * dt * dt * 60;
      const b2r = 260 * dt;

      bail1.style.left      = b1x + 'px';
      bail1.style.top       = b1y + 'px';
      bail1.style.transform = `rotate(${b1r}deg)`;
      bail1.style.opacity   = Math.max(0, 1 - dt * 1.1).toString();

      bail2.style.left      = b2x + 'px';
      bail2.style.top       = b2y + 'px';
      bail2.style.transform = `rotate(${b2r}deg)`;
      bail2.style.opacity   = Math.max(0, 1 - dt * 1.1).toString();

      if (dt < 1.2) requestAnimationFrame(bailFly);
    }
    requestAnimationFrame(bailFly);

    // Hold on broken stumps, then reset and loop
    loopTimer = setTimeout(() => {
      // Fade stumps back in clean
      s1.style.transition = 'transform 0.5s ease';
      s2.style.transition = 'transform 0.5s ease';
      s3.style.transition = 'transform 0.5s ease';
      s1.style.transform  = '';
      s2.style.transform  = '';
      s3.style.transform  = '';

      setTimeout(() => {
        s1.style.transition = '';
        s2.style.transition = '';
        s3.style.transition = '';
        loopTimer = setTimeout(runSequence, 800);
      }, 500);
    }, 2200);
  }

  // Start after a short delay so page loads first
  setTimeout(runSequence, 1200);
})();

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
