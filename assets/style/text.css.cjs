/// <reference path="text.css.d.ts" />
const classNames = new Map([
  ['sBold', 's-bold'],
  ['sCapitalize', 's-capitalize'],
  ['sCursive', 's-cursive'],
  ['sExtraBold', 's-extra-bold'],
  ['sExtraLight', 's-extra-light'],
  ['sHeavy', 's-heavy'],
  ['sLight', 's-light'],
  ['sLowercase', 's-lowercase'],
  ['sMedium', 's-medium'],
  ['sMonospace', 's-monospace'],
  ['sNormal', 's-normal'],
  ['sSans', 's-sans'],
  ['sSemiBold', 's-semi-bold'],
  ['sSerif', 's-serif'],
  ['sText', 's-text'],
  ['sThin', 's-thin'],
  ['sUppercase', 's-uppercase']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(text.css);
        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(css);
        return stylesheet;
      default:
        return target.get(attr);
    }
  },
  getPrototypeOf() {
    return Object;
  }
});
