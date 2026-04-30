/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          deep: '#0a0a0a',
          primary: '#1a1a1a',
          secondary: '#2a2a2a',
        },
        gray: {
          dark: '#4a4a4a',
          medium: '#666666',
        },
        white: {
          pure: '#ffffff',
          smoke: '#f5f5f5',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Garamond', 'serif'],
        sans: ['Trebuchet MS', 'Helvetica Neue', 'sans-serif'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        film: 'cubic-bezier(0.17, 0.55, 0.55, 1)',
        slow: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
      },
      keyframes: {
        'film-grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2px, -2px)' },
          '20%': { transform: 'translate(1px, -1px)' },
        },
        'scroll-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'light-leak': {
          '0%, 100%': { opacity: '0' },
          '25%': { opacity: '0.03' },
          '50%': { opacity: '0.02' },
          '75%': { opacity: '0.04' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'typewriter': {
          'from': { opacity: '0', transform: 'translateX(-10px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'film-grain': 'film-grain 0.15s steps(1) infinite',
        'scroll-bounce': 'scroll-bounce 2s ease-in-out infinite',
        'light-leak': 'light-leak 8s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'typewriter': 'typewriter 0.08s steps(8)',
      },
    },
  },
  plugins: [],
}
