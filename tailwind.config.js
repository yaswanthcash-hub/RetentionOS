/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F9FEE6',
          100: '#F3FCCC',
          200: '#EDFAB3',
          300: '#E7F899',
          400: '#E1F680',
          500: '#D1F26E',
          600: '#C4E855',
          700: '#A8D13B',
          800: '#7FA02D',
          900: '#566F1F',
        },
        accent: {
          green: '#D1F26E',
          black: '#0A0A0A',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Archivo', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        secondary: ['Quicksand', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};
