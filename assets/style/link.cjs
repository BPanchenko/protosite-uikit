/// <reference path="link.d.ts" />
const classNames = new Map([
  ['cButton', 'c-button'],
  ['cPanel', 'c-panel'],
  ['sClean', 's-clean'],
  ['sLink', 's-link']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'link.css');
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
