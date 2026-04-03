/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        navy: {
          50:  '#EEF2F9',
          100: '#D5E0F1',
          200: '#ACC1E4',
          300: '#7A9CD0',
          400: '#4E7BBE',
          500: '#2E5FA8',
          600: '#1A3C6B',
          700: '#122B50',
          800: '#0C1E38',
          900: '#060F1C',
        },
        accent: {
          400: '#3B8BD4',
          500: '#2E75B6',
          600: '#1A5C9A',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        danger:  '#ef4444',
        info:    '#3b82f6',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease both',
        'slide-up': 'slideUp 0.35s ease both',
        'slide-in-left': 'slideInLeft 0.3s ease both',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:      { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp:     { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideInLeft: { from: { opacity: 0, transform: 'translateX(-16px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}
