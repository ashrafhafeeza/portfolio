// Fade-in animasi untuk hero section (lebih smooth & pakai class)
document.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 350 + i * 250);
  });

  // Reveal on scroll dengan Intersection Observer + staggered
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.target.offsetTop - b.target.offsetTop)
        .forEach((entry, idx) => {
          setTimeout(() => {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }, idx * 180);
        });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback untuk browser lama
    function revealOnScroll() {
      let delay = 0;
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60 && !el.classList.contains('active')) {
          setTimeout(() => el.classList.add('active'), delay);
          delay += 180;
        }
      });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
  }

  // Smooth scroll saat klik "Explore Projects"
  const btn = document.querySelector('.btn[href="#projects"]');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector('#projects');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});