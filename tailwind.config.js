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
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.1)' },
        },
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.5s ease-out forwards',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: '#1a1a1a',
              color: '#e5e5e5',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginTop: '1rem',
              marginBottom: '1rem',
              overflow: 'auto',
            },
            code: {
              backgroundColor: '#1a1a1a',
              color: '#e5e5e5',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              borderLeftColor: '#3b82f6',
              backgroundColor: '#1a1a1a',
              padding: '1rem',
              borderRadius: '0.5rem',
            },
          },
        },
      },
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
    require('@tailwindcss/typography'),
  ],
}; 