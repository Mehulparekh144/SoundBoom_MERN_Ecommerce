/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      primary : 'DM Sans'
    },
    colors : {
      primary : '#002B5B',
      secondary : '#EA5455',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red : colors.red,
    },
    extend: {
      transitionProperty : {
        'height' : 'height'
      }
    },
  },
  plugins: [],
}