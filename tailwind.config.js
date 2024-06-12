/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Tiny5':['ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}