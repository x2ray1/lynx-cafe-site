// docs/assets/js/i18n.js

// Simple i18n for EN/AR, switches page text and direction
const translations = {
  en: {
    about: "About",
    contact: "Contact",
    blog: "Blog",
    hero_sub: "Connect with me on your favorite platforms or learn more about my work below.",
    learn_more: "Learn More",
    download_resume: "Download Résumé",
    skills: "Skills",
    all: "All",
    frontend: "Frontend",
    backend: "Backend",
    other: "Other",
    timeline: "My Journey",
    education: "Education",
    work: "Work",
    testimonials: "Testimonials",
    blog: "Blog",
    view_all_posts: "View All Posts",
    read_more: "Read More →"
  },
  ar: {
    about: "من أنا",
    contact: "اتصل بي",
    blog: "مدونة",
    hero_sub: "تواصل معي عبر منصاتك المفضلة أو تعرف أكثر على أعمالي أدناه.",
    learn_more: "المزيد عني",
    download_resume: "تحميل السيرة الذاتية",
    skills: "المهارات",
    all: "الكل",
    frontend: "الواجهة الأمامية",
    backend: "الخلفية",
    other: "أخرى",
    timeline: "رحلتي",
    education: "تعليم",
    work: "عمل",
    testimonials: "آراء العملاء",
    blog: "مدونة",
    view_all_posts: "عرض جميع المقالات",
    read_more: "اقرأ المزيد ←"
  }
};

function setLang(lang) {
  // Set lang and dir on html
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  // Set nav toggle
  document.getElementById('lang-current').textContent = lang === 'ar' ? 'AR' : 'EN';
  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  // Optionally: swap font for Arabic
  if (lang === 'ar') {
    document.body.classList.add('arabic-font');
  } else {
    document.body.classList.remove('arabic-font');
  }
  // RTL tweaks (for skills/timeline grid, etc.)
  document.body.classList.toggle('rtl', lang === 'ar');
}
const langToggle = document.getElementById('lang-toggle');
let currLang = localStorage.getItem('lang') || 'en';
setLang(currLang);
if (langToggle) {
  langToggle.addEventListener('click', () => {
    currLang = (currLang === 'en') ? 'ar' : 'en';
    localStorage.setItem('lang', currLang);
    setLang(currLang);
  });
}