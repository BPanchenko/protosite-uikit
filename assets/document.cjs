/// <reference path="document.d.ts" />
const classNames = new Map([
  ['icon', 'icon'],
  ['isActive', 'is-active'],
  ['sCondensed', 's-condensed'],
  ['sIcon', 's-icon'],
  ['uTextLg', 'u-text-lg'],
  ['uTextSm', 'u-text-sm'],
  ['uTextXs', 'u-text-xs']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'document.css');
        const cssText = readFileSync(cssFilePath, 'utf-8');
        const stylesheet = new CSSStyleDeclaration();
        stylesheet.cssText = cssText;
        return stylesheet;

      default:
        return target.get(attr);
    }
  },
  getPrototypeOf() {
    return Object;
  }
});
