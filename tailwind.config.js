/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0b1020",
        card: "#121a35",
        accent: "#2dd4bf",
        accent2: "#60a5fa"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.35)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    },
  },
  plugins: []
}
