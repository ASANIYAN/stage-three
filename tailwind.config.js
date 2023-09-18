/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {}, 
      screens: {
        'xxxs': '280px',
         // => @media (min-width: 280px) { ... }
        'xxs': '320px',
         // => @media (min-width: 320px) { ... }
        'xs': '480px',
         // => @media (min-width: 480px) { ... }
        's': '576px',
         // => @media (min-width: 576px) { ... }
        '840': '840px',
         // => @media (min-width: 840px) { ... }
        '1100': '1100px',
         // => @media (min-width: 1100px) { ... }
        ...defaultTheme.screens
      }, 
    },
  },
  plugins: [],
}

