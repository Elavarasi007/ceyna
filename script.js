document.addEventListener('DOMContentLoaded', function () {

  /* ============ PRELOADER ============ */
  var preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (preloader) preloader.classList.add('hide');
    }, 350);
  });
  // Fallback in case 'load' already fired / is slow
  setTimeout(function () {
    if (preloader) preloader.classList.add('hide');
  }, 2500);

  /* ============ FOOTER YEAR ============ */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============ HEADER SCROLL STATE ============ */
  var siteHeader = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ============ MOBILE NAV ============ */
  var hamburger = document.getElementById('hamburgerBtn');
  var mobileNav = document.getElementById('mobileNav');
  var mobileNavOverlay = document.getElementById('mobileNavOverlay');
  var mobileNavClose = document.getElementById('mobileNavClose');
  var mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    mobileNav.classList.add('open');
    mobileNavOverlay.classList.add('show');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileNavOverlay.classList.remove('show');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (mobileNav.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  /* ============ DESKTOP NAV ACTIVE STATE ON CLICK ============ */
  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
    });
  });

  /* ============ HERO SLIDER (auto, no controls) ============ */
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    var currentSlide = 0;
    setInterval(function () {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5500);
  }

  /* ============ SCROLL REVEAL (IntersectionObserver) ============ */
  var revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('in-view');
          }, (i % 6) * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ============ VIEW ALL BOUQUETS — smooth scroll to top of bouquet section ============ */
  var viewAllBtn = document.getElementById('viewAllBouquets');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById('bouquets');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ============ ACTIVE NAV LINK ON SCROLL ============ */
  var sections = document.querySelectorAll('main section[id], .hero[id]');
  function updateActiveNav() {
    var scrollPos = window.scrollY + 160;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

});



document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {

    const item = button.closest('.faq-item');

    document.querySelectorAll('.faq-item').forEach(other => {
      if (other !== item) {
        other.classList.remove('active');
      }
    });

    item.classList.toggle('active');
  });
});



document.addEventListener("DOMContentLoaded", function () {

  const grid = document.getElementById("bouquetGrid");
  const viewport = document.querySelector(".bouquet-viewport");
  const prevBtn = document.querySelector(".bouquet-prev");
  const nextBtn = document.querySelector(".bouquet-next");

  if (!grid || !viewport || !prevBtn || !nextBtn) return;

  const cards = Array.from(grid.querySelectorAll(".bouquet-card"));

  let currentIndex = 0;
  let autoSlide;

  function getVisibleCards() {

    if (window.innerWidth <= 700) {
      return 1;
    }

    if (window.innerWidth <= 1100) {
      return 3;
    }

    return 6;
  }

  function getStep() {

    const card = cards[0];

    if (!card) return 0;

    const cardWidth = card.offsetWidth;
    const gap = parseFloat(getComputedStyle(grid).gap) || 0;

    return cardWidth + gap;
  }

  function updateCarousel() {

    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visibleCards);

    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }

    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }

    grid.style.transform =
      `translateX(-${currentIndex * getStep()}px)`;
  }

  function nextSlide() {

    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visibleCards);

    currentIndex++;

    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }

    updateCarousel();
  }

  function previousSlide() {

    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visibleCards);

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }

    updateCarousel();
  }

  function startAutoSlide() {

    clearInterval(autoSlide);

    autoSlide = setInterval(function () {
      nextSlide();
    }, 4000);

  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  nextBtn.addEventListener("click", function () {
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", function () {
    previousSlide();
    startAutoSlide();
  });

  /* Pause automatic movement while user is viewing the products */
  viewport.addEventListener("mouseenter", stopAutoSlide);
  viewport.addEventListener("mouseleave", startAutoSlide);

  /* Mobile touch/swipe support */

  let touchStartX = 0;
  let touchEndX = 0;

  viewport.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  }, { passive: true });

  viewport.addEventListener("touchend", function (e) {

    touchEndX = e.changedTouches[0].screenX;

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > 50) {

      if (difference > 0) {
        nextSlide();
      } else {
        previousSlide();
      }

    }

    startAutoSlide();

  }, { passive: true });

  window.addEventListener("resize", function () {
    updateCarousel();
  });

  updateCarousel();
  startAutoSlide();

});
