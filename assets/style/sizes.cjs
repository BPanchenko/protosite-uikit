const classNames = new Map([
  ['cButton', 'c-button'],
  ['icon', 'icon'],
  ['sDefaultSize', 's-default-size'],
  ['sIcon', 's-icon'],
  ['sLg', 's-lg'],
  ['sMd', 's-md'],
  ['sSm', 's-sm'],
  ['sXl', 's-xl'],
  ['sXs', 's-xs'],
  ['sXxl', 's-xxl'],
  ['sXxxl', 's-xxxl']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'sizes.css');
        const cssText = readFileSync(cssFilePath, 'utf-8');
        const stylesheet = new CSSStyleDeclaration();
        stylesheet.cssText = cssText;
        return stylesheet;

      default:
        return target.get(attr.toString());
    }
  },
  getPrototypeOf() {
    return Object;
  }
});
