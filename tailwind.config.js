/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        primary: '#f97316',   // orange-500
        accent: '#3b82f6',    // blue-500
        dark: '#0f172a',      // slate-900
        card: '#1e293b',      // slate-800
        surface: '#334155',   // slate-700
        light: '#f8fafc',     // slate-100
      },
      boxShadow: {
        glow: '0 0 8px 2px rgba(249, 115, 22, 0.6)',
      },
    },
  },
  plugins: [],
}
