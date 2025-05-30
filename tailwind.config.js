/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textShadow: {
        DEFAULT: '0 0 10px rgba(255, 255, 255, 0.5)',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '100%': { transform: 'rotate(-10deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' }
        }
      },
      animation: {
        'shake': 'shake 1s ease-in-out infinite',
        'shake-slow': 'shake 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-scale': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '0 0 10px rgba(255, 255, 255, 0.5)',
        },
      });
    },
  ],
}; 