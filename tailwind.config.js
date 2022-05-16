module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'spotify-green': '#18D860',
        pearl: '#E5E6E8',
        'pearl-dark': '#d4d5d9',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
