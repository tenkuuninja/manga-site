module.exports = {
  important: true,
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        skeleton: {
          light: '#9CA3AF',
          DEFAULT: '#6B7280',
          dark: '#4B5563'
        }
      },
      spacing: {
        18: '4.5rem',
        180: '45rem',
        335: '83.75rem'
      },
      keyframes: {
        'pop-in': {
          '0%': {
            opacity: 0,
            transform: 'scale(.9)'
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        'pop-in': 'pop-in 100ms cubic-bezier(.2,0,.38,.9) forwards'
      }
    },
    screens: {},
    container: {
      center: true
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {}
}
