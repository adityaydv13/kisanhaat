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
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        earth: {
          50: '#fefdf8',
          100: '#fdf8e8',
          200: '#f5edd0',
          300: '#e8dbb0',
          400: '#d4c48a',
          500: '#b8a56e',
          600: '#96824d',
          700: '#756440',
          800: '#5a4d35',
          900: '#3d342b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'soft-beige-gradient': 'linear-gradient(135deg, #f5f3e7, #e8e1d2)',
        'warm-gray-gradient': 'linear-gradient(135deg, #d7d2cb, #a2a69c)',
        'hero-gradient': 'linear-gradient(135deg, #14532d 0%, #166534 50%, #15803d 100%)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        kisanhaat: {
          "primary": "#16a34a",
          "secondary": "#b8a56e",
          "accent": "#22c55e",
          "neutral": "#1f2937",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#f3f4f6",
          "info": "#3b82f6",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
  },
}
