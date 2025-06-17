// docs/assets/js/blog.js

// Blog post metadata (add new posts here if needed)
const posts = [
  {
    slug: '2025-hello-world',
    title: 'Hello World! My First Blog Post',
    date: '2025-06-10',
    excerpt: 'Welcome to my new blog. Here I\'ll share thoughts on frontend, design, and more. Stay tuned!'
  },
  {
    slug: '2025-accessibility-matters',
    title: 'Accessibility Matters in Modern Web',
    date: '2025-06-12',
    excerpt: 'Why accessibility is crucial for every developer, and how to get started with practical tips.'
  }
];

// Render blog index
function renderBlogList() {
  const list = document.getElementById('blog-list');
  if (!list) return;
  if (posts.length === 0) {
    list.innerHTML = `<p class="text-gray-400">No blog posts yet.</p>`;
    return;
  }
  list.innerHTML = posts.map(post => `
    <div class="bg-card p-6 rounded-2xl shadow-lg flex flex-col justify-between" tabindex="0">
      <div>
        <div class="text-xs text-primary mb-1">${post.date}</div>
        <h2 class="text-xl font-bold mb-2">${post.title}</h2>
        <p class="text-gray-400 text-sm">${post.excerpt}</p>
      </div>
      <a href="blog/${post.slug}.html" class="mt-4 text-secondary font-semibold hover:underline inline-block">Read More →</a>
    </div>
  `).join('');
}
renderBlogList();

// Blog post page (loads markdown content if on a post page)
async function renderBlogPost() {
  // Only run if on a blog post page
  const match = window.location.pathname.match(/\/blog\/([^\/]+)\.html$/);
  if (!match) return;
  const slug = match[1];
  // Find post metadata
  const post = posts.find(p => p.slug === slug);
  if (!post) return;
  // Insert title and date
  const titleEl = document.getElementById('blog-post-title');
  const dateEl = document.getElementById('blog-post-date');
  if (titleEl) titleEl.textContent = post.title;
  if (dateEl) dateEl.textContent = post.date;
  // Fetch markdown
  const mdUrl = `${slug}.md`;
  try {
    const res = await fetch(mdUrl);
    const md = await res.text();
    // Convert markdown to HTML (super simple, just paragraphs and headings)
    let html = md
      .replace(/^# (.*?)$/m, '<h1>$1</h1>')
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
      .replace(/^\-\-\-$/gm, '<hr>')
      .replace(/^\*\s(.*?)$/gm, '<li>$1</li>')
      .replace(/\n{2,}/g, '</p><p>')
      .replace(/^\s*$/, '');
    html = '<p>' + html + '</p>';
    html = html.replace(/<p><\/p>/g, '');
    document.getElementById('blog-post-content').innerHTML = html;
  } catch (e) {
    document.getElementById('blog-post-content').innerHTML = '<p class="text-red-400">Could not load post.</p>';
  }
}
renderBlogPost();