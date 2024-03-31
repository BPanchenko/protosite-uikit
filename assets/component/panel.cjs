/// <reference path="panel.d.ts" />
const classNames = new Map([
  ['cAvatar', 'c-avatar'],
  ['cButton', 'c-button'],
  ['cPanel', 'c-panel'],
  ['cPanelDivider', 'c-panel-divider'],
  ['cPanelBody', 'c-panel__body'],
  ['cPanelHead', 'c-panel__head'],
  ['cToolbar', 'c-toolbar'],
  ['sClean', 's-clean']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'panel.css');
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
