// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Propert-E Design System
        cream: {
          DEFAULT: '#FAF8F4',
          50: '#FDFCFA',
          100: '#FAF8F4',
          200: '#F5F1E8',
        },
        terracotta: {
          DEFAULT: '#D4755B',
          50: '#FBF0EC',
          100: '#F5D9D0',
          200: '#EBB3A1',
          300: '#E08E72',
          400: '#D4755B',
          500: '#C05E44',
          600: '#A34A33',
          700: '#863A27',
        },
        dark: {
          DEFAULT: '#1C1B1A',
          50: '#F5F5F4',
          100: '#E8E7E5',
          200: '#C5C3BF',
          300: '#9E9B96',
          400: '#5A5856',
          500: '#3D3B39',
          600: '#2A2927',
          700: '#1C1B1A',
          800: '#141312',
          900: '#0C0B0A',
        },
        sand: {
          DEFAULT: '#E6D5C3',
          50: '#FBF8F5',
          100: '#F5EDE3',
          200: '#E6D5C3',
          300: '#D4B99A',
          400: '#C09B72',
        },
        muted: '#5A5856',
      },
      fontFamily: {
        'sans': [
          'Manrope',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        'body': [
          'Manrope',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      backgroundImage: {
        'gradient-terracotta': 'linear-gradient(135deg, #D4755B, #C05E44)',
        'gradient-dark': 'linear-gradient(135deg, #1C1B1A, #2A2927)',
      },
      boxShadow: {
        'terracotta': '0 4px 14px 0 rgba(212, 117, 91, 0.25)',
        'card': '0 1px 3px 0 rgba(28, 27, 26, 0.06), 0 1px 2px -1px rgba(28, 27, 26, 0.06)',
        'card-hover': '0 10px 25px -5px rgba(28, 27, 26, 0.1), 0 8px 10px -6px rgba(28, 27, 26, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}