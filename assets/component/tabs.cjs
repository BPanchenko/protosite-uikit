/// <reference path="tabs.d.ts" />
const classNames = new Map([
  ['cPanel', 'c-panel'],
  ['cTab', 'c-tab'],
  ['cTabIndicator', 'c-tab-indicator'],
  ['cTabIcon', 'c-tab__icon'],
  ['cTabLabel', 'c-tab__label'],
  ['cTabsContainer', 'c-tabs-container']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'tabs.css');
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
