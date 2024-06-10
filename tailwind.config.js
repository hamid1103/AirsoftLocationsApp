/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'gold': '#C59F56',
        'cblack': '#1D1D1D'
      },
      fontFamily: {
        "inter": ['Inter', 'sans-serif'],
        "ubuntu": ['Ubuntu', 'sans-serif'],
        "cinzel": ['Cinzel', 'sans-serif']
      },
    },
  },
  plugins: [],
}

