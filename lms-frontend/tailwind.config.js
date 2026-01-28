/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#DC143C', // Crimson Red
          dark: '#A01010', // Dark Red for hover
          light: '#FF6B6B', // Light Red
        },
        neutral: {
          light: '#F5F5F5',
          medium: '#E0E0E0',
          dark: '#333333',
        },
        status: {
          success: '#28A745',
          warning: '#FFA500',
          error: '#DC3545',
          info: '#17A2B8',
        },
        progress: {
          low: '#DC3545',      // Red (0-30%)
          medium: '#FFA500',   // Orange (31-70%)
          high: '#FFC107',     // Yellow (71-99%)
          complete: '#28A745', // Green (100%)
        },
      },
      fontFamily: {
        sans: ['Roboto', 'Open Sans', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
