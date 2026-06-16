// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Accordion
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    const body = trigger.nextElementSibling;
    trigger.setAttribute('aria-expanded', !isOpen);
    body.classList.toggle('open', !isOpen);
  });
});

// TK schedule toggle
const tkToggle = document.getElementById('tkToggle');
const tkDetails = document.getElementById('tkDetails');
if (tkToggle && tkDetails) {
  tkToggle.addEventListener('click', () => {
    const isOpen = tkDetails.classList.toggle('open');
    tkToggle.setAttribute('aria-expanded', isOpen);
    tkToggle.querySelector('span').textContent = isOpen ? 'Hide Schedule' : 'View Schedule';
  });
}

// Count-up animation
function animateCounter(counter) {
  const target = parseInt(counter.dataset.target, 10);
  const suffix = counter.querySelector('span');
  const suffixHTML = suffix ? suffix.outerHTML : '';
  let animated = false;
  const runCount = () => {
    if (animated) return;
    animated = true;
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.innerHTML = Math.round(eased * target) + suffixHTML;
      if (progress < 1) { requestAnimationFrame(step); }
      else {
        counter.innerHTML = target + suffixHTML;
        counter.classList.add('pop');
        setTimeout(() => counter.classList.remove('pop'), 500);
      }
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { runCount(); observer.disconnect(); } });
  }, { threshold: 0.5 });
  observer.observe(counter);
}
['ratioCount'].forEach(id => {
  const el = document.getElementById(id);
  if (el) animateCounter(el);
});
