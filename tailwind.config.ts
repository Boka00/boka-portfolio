import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        obsidian: {
          950: '#0A0A0F',
          900: '#101018',
          850: '#151521',
          800: '#1C1C2B',
        },
        accent: {
          violet: '#8B5CF6',
          cyan: '#06B6D4',
        },
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #06B6D4 100%)',
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'grid-light':
          'linear-gradient(to right, rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.045) 1px, transparent 1px)',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(0%, 0%, 0) scale(1)' },
          '33%': { transform: 'translate3d(3%, -4%, 0) scale(1.06)' },
          '66%': { transform: 'translate3d(-3%, 3%, 0) scale(0.96)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(300%)' },
        },
      },
      animation: {
        aurora: 'aurora 16s ease-in-out infinite',
        'aurora-slow': 'aurora 24s ease-in-out infinite reverse',
        scanline: 'scanline 3.2s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;

