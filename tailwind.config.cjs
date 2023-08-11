/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  corePlugins: {
    preflight: false
  },
  theme: {
    screens: {
      '2xl': { 'max': '1535px' },
      'xl': { 'max': '1279px' },
      'lg': { 'max': '980px' },
      'md': { 'max': '767px' },
      'sm': { 'max': '639px' },
    },

    extend: {
      fontFamily: {
        'title': ['Montserrat', 'sans-serif'],
      },
      width: {
        "1200": "1200px",
        "1100": "1100px",
        "1000": "1000px",
        "900": "900px",
        "800": "800px",
        "600": "600px",
        "300": "300px",
        "280": "280px",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        light: {

          "primary": "#0ef225",

          "secondary": "#636ced",

          "accent": "#d3c82e",

          "neutral": "#1D1E2B",

          "base-100": "#fcfcfc",

          "info": "#5B94F5",

          "success": "#10654C",

          "warning": "#E9962F",

          "error": "#F71862",
        },
      },
      {
        night: {

          "primary": "#ba3dd3",

          "secondary": "#40c486",

          "accent": "#c808cc",

          "neutral": "#192024",

          "base-100": "#4b505c",

          "info": "#3F84F3",

          "success": "#129160",

          "warning": "#BA940D",

          "error": "#EA4D74",
        },
      },
    ],
  },
}
