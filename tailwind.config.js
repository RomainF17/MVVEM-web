/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f4f1ea', // Crème papier
        primary: '#4ade80',    // Vert vif (feuilles)
        secondary: '#166534',  // Vert forêt (texte/foncé)
        accent: '#86efac',     // Vert clair
        surface: '#ffffff',    // Blanc pour les cartes
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
