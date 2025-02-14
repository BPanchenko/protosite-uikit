module.exports = {
  parser: require('postcss-safe-parser'),
  plugins: [
    require('postcss-import'),
    require('postcss-extend-rule')({
      onRecursiveExtend: 'warm'
    }),
    require('postcss-custom-media'),
    require('@csstools/custom-units'),
    require('postcss-preset-env')({
      features: {
        'color-function': false,
        'color-functional-notation': false,
        'color-mix': false,
        'custom-properties': false,
        'hwb-function': false,
        'lab-function': false,
        'logical-properties-and-values': false,
        'nesting-rules': false,
        'oklab-function': false
      }
    }),
    require('postcss-prune-var'),
    require('./plugin.shadow-dom.cjs'),
    require('cssnano')(require('./cssnano.config.cjs'))
  ]
};
