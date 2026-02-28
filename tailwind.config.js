/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'macos': {
          'dark': '#1e1e1e',
          'darker': '#121212',
          'light': '#f5f5f7',
          'gray': '#86868b',
          'blue': '#007aff',
          'green': '#34c759',
          'yellow': '#ffcc00',
          'red': '#ff3b30',
          'orange': '#ff9500',
        },
        'dock': {
          'bg': 'rgba(255, 255, 255, 0.2)',
          'bg-dark': 'rgba(0, 0, 0, 0.5)',
        }
      },
      backdropBlur: {
        'xl': '24px',
        '2xl': '40px',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        'dock': '1.25rem',
      },
      boxShadow: {
        'macos': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'macos-light': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'dock': '0 4px 24px rgba(0, 0, 0, 0.25)',
        'window': '0 20px 60px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'bounce-slight': 'bounceSlight 0.3s ease-in-out',
        'magnify': 'magnify 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'boot-fade': 'bootFade 0.5s ease-out',
        'window-open': 'windowOpen 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'window-close': 'windowClose 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        bounceSlight: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        magnify: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.5)' },
        },
        bootFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        windowOpen: {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        windowClose: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.9) translateY(20px)' },
        },
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'macos-dark': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        'macos-light': 'linear-gradient(135deg, #e8ecf1 0%, #c9d6df 50%, #a8b8c7 100%)',
        'macos-sunset': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'macos-ocean': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)',
        'macos-mountain': 'linear-gradient(135deg, #5ee7df 0%, #b490ca 50%, #d299c2 100%)',
        'macos-aurora': 'linear-gradient(135deg, #00c6fb 0%, #005bea 50%, #4facfe 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
