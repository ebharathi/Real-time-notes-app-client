/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary": {
          100: "#5b8ad4",
          300: "#4779c9",
          500: "#4287f5",
          700: "#0c55c9"
        },
        "neutral": {
          100: "#bbbdbf",
          300: "#949494",
          500: "#696868"
        }
      }
    },
  },
  plugins: [],
}

