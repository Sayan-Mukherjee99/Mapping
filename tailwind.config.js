/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F5F5F7',
        ink: {
          primary: '#1D1D1F',
          secondary: '#6E6E73',
          tertiary: '#86868B',
        },
        apple: {
          blue: {
            DEFAULT: '#0071E3',
            hover: '#0077ED',
            active: '#0062C4',
            light: 'rgba(0, 113, 227, 0.08)',
          },
          emerald: {
            DEFAULT: '#34C759',
            light: 'rgba(52, 199, 89, 0.12)',
          },
          amber: {
            DEFAULT: '#FF9F0A',
            light: 'rgba(255, 159, 10, 0.12)',
          },
          red: {
            DEFAULT: '#FF3B30',
            light: 'rgba(255, 59, 48, 0.12)',
          },
          gray: {
            50: '#F5F5F7',
            100: '#E8E8ED',
            200: '#D2D2D7',
            300: '#AEAEB2',
            400: '#8E8E93',
            500: '#636366',
          }
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"SF Pro"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      letterSpacing: {
        tighter: '-0.035em',
        tight: '-0.025em',
        normal: '0em',
      },
      boxShadow: {
        'bento': '0 4px 24px rgba(0, 0, 0, 0.04)',
        'bento-hover': '0 8px 30px rgba(0, 0, 0, 0.06)',
        'apple-popover': '0 12px 40px rgba(0, 0, 0, 0.12)',
        'pill': '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'bento': '22px',
        'bento-lg': '26px',
        'bento-sm': '16px',
      },
      transitionTimingFunction: {
        'apple-spring': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
}
