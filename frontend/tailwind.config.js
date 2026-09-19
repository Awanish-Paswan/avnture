/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b1220',
        brand: { DEFAULT: '#1157ff', dark: '#0b3ec8', soft: '#e8efff' },
        accent: '#72f0c5',
        surface: '#f5f7fb'
      },
      boxShadow: { soft: '0 18px 60px rgba(11,18,32,.08)' }
    }
  },
  plugins: []
};
