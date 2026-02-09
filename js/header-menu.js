const headerEl = document.getElementById('header');
let topLimit = 80;
let ticking = false;

window.addEventListener('scroll', function () {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      if (window.scrollY > topLimit) {
        headerEl.classList.add('header--show');
        headerEl.removeAttribute('inert');
      } else {
        headerEl.classList.remove('header--show');
        headerEl.setAttribute('inert', '');
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
