// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './about.html',
    './contact.html',
    './assets/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',     // Indigo
        secondary: '#f472b6',   // Pink
        darkbg: '#18181b',
        card: '#232336',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.7s ease-out'
      }
    },
  },
  plugins: [],
};