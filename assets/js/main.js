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
