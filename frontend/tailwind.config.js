/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        '#646A73': '#646A73',
        '#DEE0E3': '#DEE0E3',
        '#3370FF': '#3370FF',
        '#1F2329': '#1F2329',
        '#F5F6F7': '#F5F6F7',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
