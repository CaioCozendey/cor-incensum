/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        crimson: {
          50: '#fdf2f2',
          100: '#fce4e4',
          200: '#f9bcbc',
          300: '#f58080',
          400: '#ed4c4c',
          500: '#dc2626',
          600: '#b91c1c',
          700: '#7a1c1c',
          800: '#5c1212',
          900: '#3d0b0b',
        },
        gold: {
          50: '#fdf8e7',
          100: '#fcefc4',
          200: '#f8da85',
          300: '#f2c040',
          400: '#e8a817',
          500: '#c9a227',
          600: '#a37d10',
          700: '#7c5c0c',
          800: '#5a4009',
          900: '#3a2906',
        },
        marian: {
          50: '#e8edf5',
          100: '#c5d0e3',
          200: '#8da3c6',
          300: '#5576a9',
          400: '#2d4f8c',
          500: '#1a3370',
          600: '#0f1c2e',
          700: '#0a1520',
          800: '#060e15',
          900: '#03070a',
        },
        parchment: {
          50: '#fdfcfa',
          100: '#f9f6f0',
          200: '#f4efe6',
          300: '#ece3d3',
          400: '#dfd4bc',
          500: '#cfc0a0',
          600: '#b8a07a',
          700: '#957d57',
          800: '#6e5c3e',
          900: '#473b27',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Lora"', 'Georgia', 'serif'],
        sans: ['"Libre Baskerville"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(ellipse at center, rgba(201,162,39,0.15) 0%, transparent 70%)',
        'radial-crimson': 'radial-gradient(ellipse at center, rgba(122,28,28,0.2) 0%, transparent 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'glow': 'glow 3s ease-in-out infinite',
        'flicker': 'flicker 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,162,39,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201,162,39,0.6)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
