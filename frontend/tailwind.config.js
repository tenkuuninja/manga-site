module.exports = {
  important: true,
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'sm': '576px', 
        'md': '768px', 
        'lg': '992px', 
        'xl': '1200px', 
      },
      colors: {
        skeleton: {
          light: '#9CA3AF',
          DEFAULT: '#6B7280',
          dark: '#4B5563'
        }
      },
      maxWidth: {
        335: '83.75rem'
      },
      spacing: {
        18: '4.5rem',
        180: '45rem'
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
