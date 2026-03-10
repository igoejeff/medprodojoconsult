/* ================================================
   MED PRO DOJO 2026 — main.js
   Scroll reveal · Counter · Carousel · Tilt · Nav
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── ANNOUNCEMENT BAR ──────────────────────────
  const announceClose = document.getElementById('announceClose');
  const announceBar   = document.getElementById('announceBar');
  if (announceClose && announceBar) {
    if (sessionStorage.getItem('mpd-bar-closed')) announceBar.style.display = 'none';
    announceClose.addEventListener('click', () => {
      announceBar.style.display = 'none';
      sessionStorage.setItem('mpd-bar-closed', '1');
    });
  }

  // ─── NAVBAR SCROLL ─────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ─── BURGER MENU ───────────────────────────────
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ─── ACTIVE NAV LINK ───────────────────────────
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('active',
      href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html'));
  });

  // ─── HERO IMAGE KEN BURNS ──────────────────────
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => hero.classList.add('loaded'), 100);
  }

  // ─── SCROLL REVEAL ─────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Auto-add reveal to cards
  const autoReveal = [
    '.bento-card', '.imagine-row', '.step-card', '.dojo-feat',
    '.course-slide', '.testi-card', '.res-card', '.event-card',
    '.cdc', '.bp-card', '.prog-stat', '.growth-pill',
    '.ig-tile', '.wn-card'
  ];
  autoReveal.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        el.style.setProperty('--delay', `${(i % 4) * 0.08}s`);
        revealObserver.observe(el);
      }
    });
  });

  // ─── ANIMATED COUNTERS ─────────────────────────
  function animateCount(el) {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start    = performance.now();
    const update   = (now) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased   = 1 - Math.pow(1 - elapsed, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (elapsed < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // ─── CAROUSEL ──────────────────────────────────
  const track      = document.getElementById('carouselTrack');
  const prevBtn    = document.getElementById('carouselPrev');
  const nextBtn    = document.getElementById('carouselNext');
  const dotsWrap   = document.getElementById('carouselDots');

  if (track && prevBtn && nextBtn) {
    const slides     = Array.from(track.children);
    let currentIndex = 0;

    function getVisible() {
      const w = window.innerWidth;
      if (w >= 1024) return 4;
      if (w >= 768)  return 3;
      if (w >= 500)  return 2;
      return 1;
    }

    function maxIndex() {
      return Math.max(0, slides.length - getVisible());
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      const total = maxIndex() + 1;
      for (let i = 0; i <= maxIndex(); i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsWrap) return;
      dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
      });
    }

    function goTo(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex()));
      const slideW  = slides[0].getBoundingClientRect().width;
      const gap     = 20;
      track.style.transform = `translateX(-${currentIndex * (slideW + gap)}px)`;
      updateDots();
    }

    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    // Touch / swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    });

    buildDots();
    window.addEventListener('resize', () => { buildDots(); goTo(currentIndex); });
  }

  // ─── CARD TILT EFFECT ──────────────────────────
  function applyTilt(selector) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect  = card.getBoundingClientRect();
        const x     = (e.clientX - rect.left) / rect.width  - 0.5;
        const y     = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });
    });
  }
  applyTilt('.step-card');
  applyTilt('.cdc');
  applyTilt('.testi-card');

  // ─── SMOOTH HASH SCROLL ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── PARALLAX HERO ─────────────────────────────
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        heroImg.style.transform = `scale(1) translateY(${y * 0.2}px)`;
      }
    }, { passive: true });
  }

  // ─── NOTIFY ME BUTTONS ─────────────────────────
  document.querySelectorAll('[data-notify]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('We\'ll notify you when this course launches! 🎉');
    });
  });

  // ─── WHAT'S NEW FEED FILTER ──────────────────────
  const wnTabs = document.querySelectorAll('.wn-tab');
  const wnCards = document.querySelectorAll('.wn-card');

  if (wnTabs.length && wnCards.length) {
    wnTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab
        wnTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        wnCards.forEach(card => {
          const types = card.dataset.type || '';
          if (filter === 'all' || types.includes(filter)) {
            card.classList.remove('wn-hidden');
            // Re-trigger reveal animation
            card.classList.remove('visible');
            setTimeout(() => card.classList.add('visible'), 50);
          } else {
            card.classList.add('wn-hidden');
          }
        });
      });
    });
  }

  // ─── IG TILE TOOLTIP HINT ─────────────────────────
  document.querySelectorAll('.ig-tile').forEach(tile => {
    tile.setAttribute('title', tile.dataset.caption || 'View on Instagram');
  });

  // ─── SVG WHEEL CARD HOVER ────────────────────────
  document.querySelectorAll('.ws-card').forEach(card => {
    const cardRect = card.querySelector('rect');
    const iconRect = card.querySelectorAll('rect')[1];
    if (!cardRect) return;
    const origFill   = cardRect.getAttribute('fill');
    const origStroke = cardRect.getAttribute('stroke');
    card.style.cursor = 'pointer';
    card.addEventListener('mouseenter', () => {
      cardRect.style.fill   = 'rgba(232,40,28,0.18)';
      cardRect.style.stroke = 'rgba(232,40,28,0.55)';
      card.style.filter = 'drop-shadow(0 8px 24px rgba(232,40,28,0.35))';
    });
    card.addEventListener('mouseleave', () => {
      cardRect.style.fill   = '';
      cardRect.style.stroke = '';
      card.style.filter = '';
    });
  });

  console.log(
    '%c MED PRO DOJO 2026 %c Loaded ✓ ',
    'background:#E8281C;color:white;font-weight:900;padding:6px 12px;border-radius:4px 0 0 4px;font-size:13px;',
    'background:#0F0F0F;color:white;font-weight:600;padding:6px 12px;border-radius:0 4px 4px 0;font-size:13px;'
  );
});

// ─── FORM HANDLER (global) ──────────────────────
function handleForm(e) {
  e.preventDefault();
  const inputs = e.target.querySelectorAll('input');
  const name   = inputs[0]?.value || '';
  showToast(`Thank you${name ? ', ' + name : ''}! We'll be in touch shortly. ✓`);
  e.target.reset();
}

// ─── TOAST ──────────────────────────────────────
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fas fa-check-circle"></i><span>${msg}</span>`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 4000);
}
