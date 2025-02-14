const safe = require('postcss-safe-parser');

module.exports = {
  parser: safe,
  plugins: [
    require('postcss-import'),
    require('postcss-custom-selectors'),
    require('postcss-custom-media'),
    require('postcss-extend-rule')({
      onRecursiveExtend: 'warm'
    }),
    require('@csstools/custom-units'),
    require('cssnano')(require('./cssnano.config.cjs'))
  ]
};
