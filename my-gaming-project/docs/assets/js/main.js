// docs/assets/js/main.js

// --- IntersectionObserver for reveal/fade/slide ---
function ioReveal() {
  const revealEls = document.querySelectorAll('[data-io]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('io-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => {
      el.classList.add('io-init');
      io.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealEls.forEach(el => el.classList.add('io-visible'));
  }
}
ioReveal();

// --- Animated SVG Blob in Hero ---
function animateBlob() {
  // Morph between a few SVG shapes using anime.js
  const blobEl = document.getElementById('hero-blob');
  if (!blobEl) return;

  // Example blob paths (from blobs.app, can add more for smoother morph)
  const paths = [
    "M462.5,410Q361,520,224,405Q87,290,196.5,173.5Q306,57,488.5,93.5Q671,130,635,265Q599,400,462.5,410Z",
    "M474,390Q379,540,225,400Q71,260,198,157Q325,54,499,80Q673,106,650,263Q627,420,474,390Z",
    "M500,370Q390,530,208,390Q26,250,160,140Q294,30,475,75Q656,120,648,265Q640,410,500,370Z"
  ];
  // Initial SVG setup
  blobEl.innerHTML = `<defs>
    <linearGradient id="blobGradient" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#f472b6"/>
    </linearGradient>
  </defs>
  <path fill="url(#blobGradient)" d="${paths[0]}"/>`;

  let i = 0;
  setInterval(() => {
    anime({
      targets: blobEl.querySelector('path'),
      d: [
        { value: paths[(i + 1) % paths.length] }
      ],
      easing: 'easeInOutQuad',
      duration: 3200,
    });
    i = (i + 1) % paths.length;
  }, 3300);
}
animateBlob();

// --- Particles.js config (subtle background) ---
if (document.getElementById('particles-js')) {
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

// --- Page Transitions (fade out/in between pages) ---
document.querySelectorAll('a[href]:not([target="_blank"])').forEach(link => {
  const href = link.getAttribute('href');
  if (
    href.startsWith('#') || // skip anchor links
    href.endsWith('.svg')   // skip icons/images
  ) return;
  link.addEventListener('click', function (e) {
    if (
      e.ctrlKey || e.metaKey || e.shiftKey || e.altKey ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
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

// --- Skills Section: Dynamic Filtering ---
const skillsData = [
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Vue.js", category: "frontend" },
  { name: "TailwindCSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "REST API", category: "backend" },
  { name: "GraphQL", category: "backend" },
  { name: "Accessibility", category: "other" },
  { name: "UI/UX", category: "other" },
  { name: "Testing", category: "other" },
  { name: "Git", category: "other" }
];
function renderSkills(cat) {
  const list = document.getElementById('skills-list');
  if (!list) return;
  list.innerHTML = '';
  skillsData
    .filter(skill => cat === 'all' || skill.category === cat)
    .forEach(skill => {
      const span = document.createElement('span');
      span.className = 'skill-badge';
      span.tabIndex = 0;
      span.textContent = skill.name;
      list.appendChild(span);
    });
}
document.querySelectorAll('.skill-filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.skill-filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderSkills(this.dataset.filter);
  });
});
renderSkills('all');

// --- Timeline Section: Dynamic Filtering ---
const timelineData = [
  {
    date: "2025",
    title: "Lead Frontend Engineer",
    desc: "Started leading frontend projects at Awesome Corp, building scalable web applications.",
    category: "work",
    color: "primary"
  },
  {
    date: "2023",
    title: "Graduated University",
    desc: "Completed BSc in Computer Science with distinction.",
    category: "education",
    color: "secondary"
  },
  {
    date: "2022",
    title: "Frontend Internship",
    desc: "Interned at StartupX, focusing on React and accessibility.",
    category: "work",
    color: "primary"
  },
  {
    date: "2021",
    title: "Open Source Contributor",
    desc: "Contributed to several open source JS projects.",
    category: "other",
    color: "secondary"
  }
];
function renderTimeline(cat) {
  const list = document.getElementById('timeline-list');
  if (!list) return;
  list.innerHTML = '';
  timelineData
    .filter(ev => cat === 'all' || ev.category === cat)
    .forEach(ev => {
      list.innerHTML += `
        <li data-io="fade-up">
          <div class="timeline-icon bg-${ev.color}"></div>
          <div class="timeline-content">
            <span class="timeline-date">${ev.date}</span>
            <h3 class="timeline-title">${ev.title}</h3>
            <p>${ev.desc}</p>
          </div>
        </li>
      `;
    });
  // Re-run IntersectionObserver on new items
  ioReveal();
}
document.querySelectorAll('.timeline-filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.timeline-filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderTimeline(this.dataset.filter);
  });
});
renderTimeline('all');

// --- Blog Preview Section ---
async function renderBlogPreview() {
  const list = document.getElementById('blog-preview-list');
  if (!list) return;
  // Placeholder posts
  const posts = [
    {
      slug: '2025-hello-world',
      title: 'Hello World! My First Blog Post',
      date: '2025-06-10',
      excerpt: 'Welcome to my new blog. Here I\'ll share thoughts on frontend, design, and more. Stay tuned!',
    },
    {
      slug: '2025-accessibility-matters',
      title: 'Accessibility Matters in Modern Web',
      date: '2025-06-12',
      excerpt: 'Why accessibility is crucial for every developer, and how to get started with practical tips.',
    }
  ];
  list.innerHTML = posts.map(post => `
    <div class="bg-card p-6 rounded-2xl shadow-lg flex flex-col justify-between" data-io="fade-up">
      <div>
        <div class="text-xs text-primary mb-1">${post.date}</div>
        <h3 class="text-lg font-bold mb-2">${post.title}</h3>
        <p class="text-gray-400 text-sm">${post.excerpt}</p>
      </div>
      <a href="blog/${post.slug}.html" class="mt-4 text-secondary font-semibold hover:underline inline-block" data-i18n="read_more">Read More →</a>
    </div>
  `).join('');
  ioReveal();
}
renderBlogPreview();
