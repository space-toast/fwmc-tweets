/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "fwmc-light-blue": "#c8dfff",
        "fwmc-blue": "#a7d3ff",
        "fwmc-dark-blue": "#77abfe",
        "fwmc-light-pink": "#ffd4e8",
        "fwmc-pink": "#fb9ac5",
        "fwmc-dark-pink": "#fb99c4",
      }
    },
  },
  plugins: [],
}