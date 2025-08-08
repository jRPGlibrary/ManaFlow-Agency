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