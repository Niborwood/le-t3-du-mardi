/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
        clash: ["Clash Display", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        }
      },
      animation: {
        ['fade-in']: "fadeIn 0.5s ease-in-out",
      }
    },
  },
  plugins: [],
};
