/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#ff4c30" },
      backgroundColor: { "coustom-color": "#f7faf2" },
    },
  },
  plugins: [],
};
