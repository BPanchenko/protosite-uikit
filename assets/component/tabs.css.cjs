/// <reference path="tabs.css.d.ts" />
const classNames = new Map([["cPanel","c-panel"],["cTab","c-tab"],["cTabIndicator","c-tab-indicator"],["cTabIcon","c-tab__icon"],["cTabLabel","c-tab__label"],["cTabsContainer","c-tabs-container"]]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(tabs.css);
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