module.exports = {
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
