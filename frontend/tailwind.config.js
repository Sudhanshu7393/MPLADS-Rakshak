/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
      }
    },
  },
  plugins: [],
}
