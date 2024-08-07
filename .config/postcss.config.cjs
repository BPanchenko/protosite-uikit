module.exports = {
  parser: false,
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-custom-selectors'),
    require('postcss-custom-media'),
    require('postcss-extend-rule')({
      onRecursiveExtend: 'warm'
    }),
    require('@csstools/custom-units'),
    require('postcss-prune-var'),
    require('postcss-reporter')({ clearReportedMessages: true }),
    require('cssnano')(require('./cssnano.config.cjs'))
  ]
};
