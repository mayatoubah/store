import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8f8f2',
          500: '#d87a16',
          700: '#9c4f03',
          900: '#371b05'
        }
      },
      boxShadow: {
        premium: '0 20px 40px -20px rgba(0,0,0,0.35)'
      }
    }
  },
  plugins: []
} satisfies Config;
