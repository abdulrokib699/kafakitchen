/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:   '#E67E22',
        secondary: '#5D3A1A',
        cream:     '#FFF5E6',
        dark:      '#3E2723',
        muted:     '#6D4C41',
      },
      fontFamily: {
        pacifico:   ['Pacifico', 'cursive'],
        poppins:    ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to:   { transform: 'translateX(0)',    opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float:         'float 3s ease-in-out infinite',
        'float-slow':  'float 4s ease-in-out infinite',
        'slide-right': 'slideInRight 0.3s ease',
        'fade-in':     'fadeIn 0.5s ease forwards',
      },
    },
  },
  plugins: [],
}
