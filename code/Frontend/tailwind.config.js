const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--palette-primary-main)',
        // Polar Expedition Mission Control Colors
        'ice-blue': '#54D5FF',
        'mission-blue': '#4C8DFF',
        'mission-green': '#42D392',
        'mission-amber': '#F5B94C',
        'mission-red': '#F15C5C',
        'mission-purple': '#9A8CFF',
        // Backgrounds
        'bg-base': '#07111F',
        'bg-raised': '#0B1726',
        'bg-panel': '#101F30',
        'bg-elevated': '#14263A',
        // Borders
        'border-default': '#1D3448',
        'border-strong': '#2A465D',
        // Typography
        'text-primary': '#F4F8FB',
        'text-secondary': '#A8B8C7',
        'text-muted': '#718495',
        'text-disabled': '#526473',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', ...fontFamily.sans],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
        georama: ['Georama_SemiExpanded-Regular'],
      },
      fontSize: {
        'page-title': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'section-title': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'card-title': ['0.938rem', { lineHeight: '1.25rem', fontWeight: '600' }],
        'body': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'secondary': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        'micro': ['0.688rem', { lineHeight: '1rem', fontWeight: '600', letterSpacing: '0.05em' }],
        'kpi': ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
      },
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
      },
      animation: {
        'pulse-slow': 'pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
