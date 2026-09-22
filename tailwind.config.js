/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#2E2E2E',
        cream: '#FAFAFA',
        peach: '#ECECEC',
        rose: {
          DEFAULT: '#AFAFAF',
          deep: '#4A4A4A',
        },
      },
      fontFamily: {
        display: ['"Archivo"', 'sans-serif'],
        sans: ['"Archivo"', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 9vw, 9rem)', { lineHeight: '0.94', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.04', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        wideish: '0.08em',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}