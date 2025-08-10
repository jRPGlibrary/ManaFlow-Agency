// Menu hamburger mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Animation du hamburger
hamburger.addEventListener('click', () => {
  const bars = document.querySelectorAll('.hamburger .bar');
  bars.forEach((bar, index) => {
    if (hamburger.classList.contains('active')) {
      if (index === 0) {
        bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
      } else if (index === 1) {
        bar.style.opacity = '0';
      } else if (index === 2) {
        bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
      }
    } else {
      bar.style.transform = 'none';
      bar.style.opacity = '1';
    }
  });
});

// Scroll fluide pour les ancres (fallback pour les navigateurs plus anciens)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});


// Animation d'apparition au scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Appliquer l'animation aux cartes de service
document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});

// Slider Recrutement
(function() {
  const slider = document.querySelector('.recruitment-slider');
  if (!slider) return;
  
  const wrapper = slider.querySelector('.slider-wrapper');
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const navButtons = Array.from(slider.querySelectorAll('.nav-btn'));
  const indicators = Array.from(slider.querySelectorAll('.indicator'));
  
  let current = 0;
  let isAnimating = false;

  function update(position, animate = true) {
    if (isAnimating && animate) return;
    
    current = Math.max(0, Math.min(position, slides.length - 1));
    
    if (animate) {
      isAnimating = true;
      setTimeout(() => { isAnimating = false; }, 600);
    }
    
    const offset = -current * 100;
    wrapper.style.transform = `translateX(${offset}%)`;
    
    // Mise à jour des classes avec délai pour les animations
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === current);
    });
    
    navButtons.forEach((b, i) => {
      b.classList.toggle('active', i === current);
    });
    
    indicators.forEach((d, i) => {
       d.classList.toggle('active', i === current);
     });
  }

  // Navigation par boutons
  navButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => update(i));
  });

  // Navigation par indicateurs
   indicators.forEach((dot, i) => {
     dot.addEventListener('click', () => update(i));
   });

  // Navigation clavier
  document.addEventListener('keydown', (e) => {
    if (!slider.matches(':hover')) return;
    
    if (e.key === 'ArrowLeft' && current > 0) {
      e.preventDefault();
      update(current - 1);
    } else if (e.key === 'ArrowRight' && current < slides.length - 1) {
      e.preventDefault();
      update(current + 1);
    }
  });

  // Swipe support (mobile) - amélioré
  let startX = 0;
  let startY = 0;
  let isDown = false;
  let hasMoved = false;

  wrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDown = true;
    hasMoved = false;
  }, { passive: true });

  wrapper.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    
    const diffX = e.touches[0].clientX - startX;
    const diffY = e.touches[0].clientY - startY;
    
    // Vérifier si c'est un swipe horizontal
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      hasMoved = true;
      if (diffX < -50 && current < slides.length - 1) {
        update(current + 1);
        isDown = false;
      } else if (diffX > 50 && current > 0) {
        update(current - 1);
        isDown = false;
      }
    }
  }, { passive: true });

  wrapper.addEventListener('touchend', () => {
    isDown = false;
    hasMoved = false;
  });

  // Initialisation
  update(0, false);
})();