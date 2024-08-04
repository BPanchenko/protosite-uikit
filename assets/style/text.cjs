const classNames = new Map([
  ['sBold', 's-bold'],
  ['sCapitalize', 's-capitalize'],
  ['sExtraBold', 's-extra-bold'],
  ['sExtraLight', 's-extra-light'],
  ['sHeavy', 's-heavy'],
  ['sLight', 's-light'],
  ['sLowercase', 's-lowercase'],
  ['sMedium', 's-medium'],
  ['sNormal', 's-normal'],
  ['sSemiBold', 's-semi-bold'],
  ['sText', 's-text'],
  ['sThin', 's-thin'],
  ['sUppercase', 's-uppercase']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'text.css');
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
