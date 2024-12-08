/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        'hero-image' : "url('https://wallpaperaccess.com/thumb/2004618.jpg')"
      }
    },
  },
  plugins: [],
}

