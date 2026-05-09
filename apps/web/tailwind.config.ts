import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './providers/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0D0D0D',
          elevated: '#161616',
          subtle: '#1E1E1E',
        },
        accent: {
          primary: '#C8873A',
          secondary: '#E09B4E',
          muted: '#8A5A25',
          rust: '#A84B2A',
          gold: '#D4A843',
        },
        text: {
          primary: '#F0EDE8',
          secondary: '#9E9790',
          tertiary: '#5E5A55',
          inverse: '#0D0D0D',
          accent: '#C8873A',
          disabled: '#3D3A36',
        },
        border: {
          DEFAULT: '#2A2826',
          subtle: '#1E1C1A',
          strong: '#3D3A36',
          accent: '#C8873A',
        },
        status: {
          success: '#4CAF6E',
          'success-subtle': '#1A3325',
          warning: '#E09B4E',
          'warning-subtle': '#3A2A15',
          error: '#E05555',
          'error-subtle': '#3A1515',
          info: '#5A9FD4',
          'info-subtle': '#152030',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
