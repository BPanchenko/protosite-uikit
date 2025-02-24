/**
 * @typedef {Object} PostcssConfig
 * @property {import('postcss-safe-parser').PostCssSafeParser} parser
 * @property {import('postcss').AcceptedPlugin[]} plugins
 */

const parser = require('postcss-safe-parser');

const pluginsByDefault = [
  require('postcss-import'),
  require('postcss-extend-rule'),
  require('postcss-custom-selectors'),
  require('postcss-custom-media'),
  require('@csstools/custom-units'),
  require('postcss-preset-env')({
    features: {
      'color-function': false,
      'color-functional-notation': false,
      'color-mix': false,
      'custom-properties': false,
      'hwb-function': false,
      'is-pseudo-class': false,
      'cascade-layers': false,
      'lab-function': false,
      'logical-properties-and-values': false,
      'nesting-rules': false,
      'not-pseudo-class': false,
      'oklab-function': false
    }
  }),
  require('cssnano')(require('./cssnano.config.cjs'))
];

/**
 * @param {Object} [options]
 * @param {boolean} [options.adaptToShadowDOM]
 * @param {boolean} [options.removeUnusedVariables]
 * @returns {PostcssConfig}
 */
const initConfig = (options = {}) => {
  const { adaptToShadowDOM = false, removeUnusedVariables = false } = options;
  const plugins = Array.from(pluginsByDefault);

  if (adaptToShadowDOM) plugins.push(require('./postcss-shadow-dom.plugin.cjs'));

  if (removeUnusedVariables) plugins.push(require('postcss-prune-var'));

  return {
    parser,
    plugins
  };
};

module.exports = {
  initConfig,
  parser,
  plugins: pluginsByDefault
};
