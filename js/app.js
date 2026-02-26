/* =============================================
   DCS Lab — app.js
   Vanilla JS · No dependencies
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Sticky Header Shadow ---- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ---- Scroll To Top Button ---- */
  const scrollBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Mobile Navigation ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobile-nav');
  const closeNav   = document.getElementById('close-nav');

  hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  closeNav.addEventListener('click',  () => mobileNav.classList.remove('open'));

  // Close mobile nav when any link is clicked
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileNav.classList.remove('open'));
  });

  // Close mobile nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') mobileNav.classList.remove('open');
  });

  /* ---- People Tabs ---- */
  const peopleTabs = document.getElementById('people-tabs');
  if (peopleTabs) {
    peopleTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;

      // Update active tab button
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show the matching panel
      document.querySelectorAll('.people-panel').forEach(p => p.classList.remove('active'));
      const targetPanel = document.getElementById('panel-' + btn.dataset.panel);
      if (targetPanel) targetPanel.classList.add('active');
    });
  }

  /* ---- Fade-Up Scroll Animations (Intersection Observer) ---- */
  const fadeItems = document.querySelectorAll('.fade-up');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for sibling elements
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeItems.forEach(el => fadeObserver.observe(el));

  /* ---- Active Nav Highlight on Scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 90) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }, { passive: true });

  /* ---- Publication Buttons (placeholder handlers) ---- */
  document.querySelectorAll('.pub-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Replace with actual PDF URL or BibTeX logic
      alert(`${btn.textContent} – link coming soon!`);
    });
  });

});
