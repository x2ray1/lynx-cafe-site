// docs/assets/js/testimonials.js

// Placeholder testimonials
const testimonialsData = [
  {
    name: "Jane Doe",
    role: "Product Manager, Acme Inc.",
    text: "Working with Your Name was a delight. They deliver beautiful, accessible, and fast interfaces every time.",
    img: "assets/img/testimonials/jane.jpg"
  },
  {
    name: "Mohamed Ali",
    role: "CTO, StartupX",
    text: "Highly recommended for any frontend project. Their attention to detail and UX is top-notch.",
    img: "assets/img/testimonials/mohamed.jpg"
  },
  {
    name: "Sarah Lee",
    role: "Lead Designer",
    text: "A true team player, always with creative solutions and solid code quality.",
    img: "assets/img/testimonials/sarah.jpg"
  }
];
// Render
function renderTestimonials() {
  const el = document.getElementById('testimonials-carousel');
  if (!el) return;
  el.innerHTML = testimonialsData.map(t => `
    <div class="testimonial-slide p-6 bg-card rounded-2xl shadow-lg flex flex-col items-center text-center">
      <img src="${t.img}" alt="Photo of ${t.name}" class="w-16 h-16 rounded-full border-2 border-primary mb-4 object-cover"/>
      <blockquote class="text-lg font-medium mb-3">"${t.text}"</blockquote>
      <div class="text-primary font-bold">${t.name}</div>
      <div class="text-gray-400 text-sm">${t.role}</div>
    </div>
  `).join('');
  // Init Glider.js
  new Glider(el, {
    slidesToShow: 1,
    dots: '#testimonials-dots',
    draggable: true,
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    },
    scrollLock: true,
    duration: 0.8
  });
  // Autoplay
  let glideIdx = 0;
  setInterval(() => {
    if (!document.body.contains(el)) return;
    glideIdx = (glideIdx + 1) % testimonialsData.length;
    el.parentElement.Glider.scrollItem(glideIdx);
  }, 5000);
}
renderTestimonials();