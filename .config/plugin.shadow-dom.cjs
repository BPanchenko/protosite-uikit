const { debug } = require('../.kernel/logger.cjs');

/**
 * Check if specified selector is a :root
 * @param  {String} selector
 * @return {Boolean}
 */
function isRootSelector(selector) {
  return /^\:root/.test(selector);
}

module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-shadow-dom',
    Rule(rule) {
      if (isRootSelector(rule.selector)) {
        rule.selector = rule.selector.replace(':root', ':host');
      }
    }
  };
};

module.exports.postcss = true;
