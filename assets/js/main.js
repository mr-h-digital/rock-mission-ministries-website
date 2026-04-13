  // NAV scroll effect
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
  });

  // Mobile menu
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerBtn = document.querySelector('.hamburger');

  function setMenuOpen(open) {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('open', open);
    if (hamburgerBtn) {
      hamburgerBtn.classList.toggle('is-open', open);
      hamburgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      hamburgerBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    }
    document.body.style.overflow = open ? 'hidden' : '';
  }

  window.openMobileMenu = function openMobileMenu() {
    const isOpen = mobileMenu && mobileMenu.classList.contains('open');
    setMenuOpen(!isOpen);
  };

  window.closeMobileMenu = function closeMobileMenu() { setMenuOpen(false); };

  // Fallback close interactions.
  if (mobileMenu) {
    mobileMenu.addEventListener('click', (event) => {
      if (event.target === mobileMenu) {
        window.closeMobileMenu();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      window.closeMobileMenu();
    }
  });

  // Donate amounts
  document.querySelectorAll('.donate-amt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.donate-amt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Contact forms
  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    const status = form.querySelector('.form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    const successRedirect = form.getAttribute('data-success-redirect');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!(form instanceof HTMLFormElement)) return;

      const formData = new FormData(form);
      if (status) {
        status.textContent = 'Sending your message...';
        status.classList.remove('is-success', 'is-error');
      }

      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = true;
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.success === false) {
          throw new Error(result.message || 'Unable to send your message right now.');
        }

        form.reset();
        if (status) {
          status.textContent = successRedirect
            ? 'Message sent successfully. Redirecting...'
            : 'Message sent successfully. We will get back to you soon.';
          status.classList.remove('is-error');
          status.classList.add('is-success');
        }

        if (successRedirect) {
          window.setTimeout(() => {
            window.location.href = successRedirect;
          }, 900);
        }
      } catch (error) {
        if (status) {
          status.textContent = error instanceof Error
            ? error.message
            : 'Something went wrong while sending your message. Please try again.';
          status.classList.remove('is-success');
          status.classList.add('is-error');
        }
      } finally {
        if (submitButton instanceof HTMLButtonElement) {
          submitButton.disabled = false;
        }
      }
    });
  });

  // Intersection observer for scroll-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .project-card, .team-card, .event-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s';
    observer.observe(el);
  });

  // Section-to-section transitions for smoother scroll handoffs.
  const sectionTargets = document.querySelectorAll('section:not(#home), .stats-bar, .gospel-cta');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });

  sectionTargets.forEach((section, index) => {
    section.classList.add('section-transition-target');
    section.classList.add((index % 2 === 0) ? 'transition-left' : 'transition-right');
    sectionObserver.observe(section);
  });

  let ticking = false;
  const updateCinematicShift = () => {
    sectionTargets.forEach(section => {
      const rect = section.getBoundingClientRect();
      const centerOffset = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const shift = Math.max(-10, Math.min(10, -centerOffset * 16));
      section.style.setProperty('--cinema-shift', shift.toFixed(2) + 'px');
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateCinematicShift);
      ticking = true;
    }
  }, { passive: true });

  updateCinematicShift();

  // ─── HERO VIDEO CAROUSEL ──────────────────────────────
  (function () {
    const bg = document.getElementById('heroVideoBg');
    if (!bg) return;
    const videos = Array.from(bg.querySelectorAll('.hero-video'));
    if (!videos.length) return;

    let current = 0;
    let transitioning = false;
    const FADE = 1.5; // seconds — matches CSS transition

    function activate(index) {
      const v = videos[index];
      v.currentTime = 0;
      v.play().catch(function () {});
      v.classList.add('is-active');
    }

    function crossfade() {
      if (transitioning) return;
      transitioning = true;
      const next = (current + 1) % videos.length;
      // Begin loading the one after next
      const upcoming = (next + 1) % videos.length;
      videos[upcoming].preload = 'auto';
      activate(next);
      videos[current].classList.remove('is-active');
      current = next;
      setTimeout(function () { transitioning = false; }, (FADE + 0.2) * 1000);
    }

    videos.forEach(function (v, i) {
      // Trigger crossfade when within FADE seconds of end
      v.addEventListener('timeupdate', function () {
        if (i !== current || transitioning) return;
        if (v.duration && v.currentTime >= v.duration - FADE) crossfade();
      });
      // Fallback: if ended event fires before timeupdate catches it
      v.addEventListener('ended', function () {
        if (i === current && !transitioning) crossfade();
      });
      // Preload next video once the current one can play
      v.addEventListener('canplay', function () {
        var nextIdx = (i + 1) % videos.length;
        if (videos[nextIdx].preload === 'metadata') {
          videos[nextIdx].preload = 'auto';
        }
      });
    });

    activate(0);
  }());
