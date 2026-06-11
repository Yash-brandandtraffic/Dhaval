/* ── NAV SCROLL ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── MOBILE NAV ── */
const hamburger = document.querySelector('.hamburger');
hamburger?.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
  const open = document.body.classList.contains('nav-open');
  hamburger.setAttribute('aria-expanded', open);
  const [a, b, c] = hamburger.querySelectorAll('span');
  if (open) {
    a.style.transform = 'translateY(7px) rotate(45deg)';
    b.style.opacity = '0';
    c.style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    a.style.transform = '';
    b.style.opacity = '';
    c.style.transform = '';
  }
});

/* Close mobile nav on link click */
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    hamburger?.setAttribute('aria-expanded', 'false');
    if (hamburger) {
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
});

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = document.getElementById(btn.getAttribute('aria-controls'));
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    /* Close all */
    document.querySelectorAll('.faq-btn').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      document.getElementById(b.getAttribute('aria-controls'))?.classList.remove('open');
    });

    /* Open clicked if it was closed */
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer?.classList.add('open');
    }
  });
});
