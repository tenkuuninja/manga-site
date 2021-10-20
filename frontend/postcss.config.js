let plugins = [
  require('tailwindcss'),
  require('autoprefixer'),
]

if (process.env.NODE_ENV === "production") {
  plugins.push(
    require('cssnano')({ preset: 'default' }),
    require('@fullhuman/postcss-purgecss')({
      content: [
        './layouts/**/*.html', 
        './src/**/*.vue', 
        './src/**/*.jsx', 
        './src/**/*.tsx'
      ],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    })
  );
}

module.exports = { plugins }
