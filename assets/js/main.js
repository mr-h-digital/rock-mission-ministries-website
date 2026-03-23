  // NAV scroll effect
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile menu
  function openMobileMenu() {
    document.getElementById('mobileMenu').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
  }

  // Donate amounts
  document.querySelectorAll('.donate-amt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.donate-amt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
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
