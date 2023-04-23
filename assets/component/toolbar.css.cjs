/// <reference path="toolbar.css.d.ts" />
const classNames = new Map([["cButton","c-button"],["cToolbar","c-toolbar"],["cToolbarLabel","c-toolbar__label"],["icon","icon"],["sIcon","s-icon"]]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(toolbar.css);
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