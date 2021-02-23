module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.tsx',
    './src/**/*.ts',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      cursor: ['hover'],
    },
  },
  plugins: [],
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  important: true,
}
