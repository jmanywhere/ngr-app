/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui:{
    themes: [
      {
        'mytheme': {                          //your theme name
          'primary': '#04BF55',                //primary color
        }
      },
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern-500': "url('/images/Background-p-500.png')",
        'hero-pattern-800': "url('/images/Background-p-800.png')",
        'hero-pattern-1080': "url('/images/Background.png')"
      }
    },
  },
  plugins: [require("daisyui")],
}

