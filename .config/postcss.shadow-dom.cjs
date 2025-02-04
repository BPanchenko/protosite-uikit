const safe = require('postcss-safe-parser');

module.exports = {
  parser: safe,
  plugins: [
    require('postcss-import'),
    require('postcss-custom-media'),
    require('postcss-extend-rule')({
      onRecursiveExtend: 'warm'
    }),
    require('@csstools/custom-units'),
    require('./plugin.shadow-dom.cjs'),
    require('postcss-prune-var'),
    require('postcss-reporter')({ clearReportedMessages: true }),
    require('cssnano')(require('./cssnano.config.cjs'))
  ]
};
