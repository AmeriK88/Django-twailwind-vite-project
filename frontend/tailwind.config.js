/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    "./src/**/*.{js,ts,jsx,tsx,html,css}",
  ],
  theme: {
    extend: {
      colors: {
        'how-bg': '#1a202c',   // ahora puedes usar bg-how-bg
      },
      perspective: {
        '1000': '1000px',     // clase: perspective-1000
      },
    },
  },
  plugins: [
    // si luego quieres, puedes añadir un plugin de perspectiva más avanzado
  ],
}
