/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#12251d",
        cream: "#f7f3e9",
        honey: "#e5b46b",
        mint: "#b9d1a7",
        ink: "#1d2b23",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
