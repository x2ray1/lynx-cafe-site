// assets/js/main.js

// --- AOS (Animate On Scroll) ---
AOS.init({
  duration: 700,
  once: true,
  easing: 'ease-out-cubic'
});

// --- Page Transitions (fade out/in between pages) ---
document.querySelectorAll('a[href]:not([target="_blank"])').forEach(link => {
  if (
    link.getAttribute('href').startsWith('#') || // skip anchor links
    link.getAttribute('href').endsWith('.svg')   // skip icons/images
  ) return;
  link.addEventListener('click', function (e) {
    if (
      e.ctrlKey || e.metaKey || e.shiftKey || e.altKey ||
      link.getAttribute('href').startsWith('mailto:') ||
      link.getAttribute('href').startsWith('tel:')
    ) return; // skip new tab or special links

    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = link.href;
    }, 200);
  });
});

// --- Theme toggle logic ---
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let darkMode = localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark);

function setThemeIcon() {
  themeIcon.innerHTML = darkMode
    // Moon (for dark mode)
    ? '<path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />'
    // Sun (for light mode)
    : '<circle cx="12" cy="12" r="5" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.05l-1.41-1.41M6.46 6.46l-1.41-1.41m12.02 12.02l-1.41-1.41M6.46 17.54l-1.41 1.41"/>';
}
function applyTheme() {
  document.documentElement.classList.toggle('dark', darkMode);
  setThemeIcon();
}
if (themeBtn && themeIcon) {
  applyTheme();
  themeBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    applyTheme();
  });
}

// --- Typing effect for hero (index only) ---
if (document.getElementById('typed-hero')) {
  const el = document.getElementById('typed-hero');
  const phrases = [
    "Hi, I'm Your Name.",
    "Frontend Developer.",
    "UI/UX Enthusiast.",
    "I build accessible, beautiful web apps."
  ];
  let phraseIndex = 0, charIndex = 0, typing = true, delay = 70;

  function type() {
    if (typing) {
      if (charIndex < phrases[phraseIndex].length) {
        el.textContent += phrases[phraseIndex][charIndex++];
        setTimeout(type, delay);
      } else {
        typing = false;
        setTimeout(erase, 1200);
      }
    }
  }
  function erase() {
    if (!typing) {
      if (charIndex > 0) {
        el.textContent = phrases[phraseIndex].substring(0, --charIndex);
        setTimeout(erase, 30);
      } else {
        typing = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
      }
    }
  }
  setTimeout(type, 700);
}

// --- Card toggle switch redirection (keyboard accessible) ---
document.querySelectorAll('.toggle-switch').forEach((toggle) => {
  // Keyboard accessibility: Enter/Space toggles switch
  toggle.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.checked = !this.checked;
      this.dispatchEvent(new Event('change'));
    }
  });
  toggle.addEventListener('change', function () {
    if (this.checked) {
      const url = this.dataset.link || '#';
      window.open(url, '_blank');
      // Reset for UX
      setTimeout(() => { this.checked = false; }, 400);
    }
  });
});

// --- Focus outline for keyboard navigation ---
document.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
  }
});
document.addEventListener('mousedown', function() {
  document.body.classList.remove('user-is-tabbing');
});

// --- Particles.js config (subtle) ---
if (document.getElementById('particles-js')) {
  /* global particlesJS */
  particlesJS('particles-js', {
    particles: {
      number: { value: 35, density: { enable: true, value_area: 800 } },
      color: { value: "#6366f1" },
      shape: { type: "circle" },
      opacity: { value: 0.2, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 120, color: "#6366f1", opacity: 0.12, width: 1 },
      move: { enable: true, speed: 1.2, direction: "none", out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
    },
    retina_detect: true
  });
}