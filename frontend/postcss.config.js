let plugins = [
  require('tailwindcss'),
  require('autoprefixer'),
  require('cssnano')({ preset: 'default' }),
]

if (process.env.RAILS_ENV === "production") {
  plugins.push(
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
