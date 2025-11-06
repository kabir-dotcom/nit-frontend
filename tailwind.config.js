/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f6e6',
          100: '#c2e6c2',
          200: '#8cd48d',
          300: '#55c158',
          400: '#26a52b',
          500: '#005e05',
          600: '#004f04',
          700: '#003f03',
          800: '#003102',
          900: '#002401',
          DEFAULT: '#005e05',
        },
        accent: '#e6ec3a',
        cta: {
          light: '#2a7a1f',
          dark: '#005e05',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        limelight: ['Limelight', 'cursive'],
        lora: ['Lora', 'serif'],
        song: ['Song Myung', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        mooli: ['Mooli', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
