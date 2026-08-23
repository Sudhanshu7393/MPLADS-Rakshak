/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#06090f',
          900: '#090d16',
          850: '#0e1320',
          800: '#131a2b',
          700: '#1e293b',
        },
        gov: {
          navy: '#0B192C',
          dark: '#1E3E62',
          blue: '#005691',
          light: '#E8F1F5',
          slate: '#334155',
          border: '#CBD5E1',
          bg: '#F8FAFC'
        },
        risk: {
          high: '#DC2626',
          highBg: '#FEF2F2',
          highBorder: '#FECACA',
          med: '#D97706',
          medBg: '#FFFBEB',
          medBorder: '#FDE68A',
          low: '#16A34A',
          lowBg: '#F0FDF4',
          lowBorder: '#BBF7D0'
        }
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
