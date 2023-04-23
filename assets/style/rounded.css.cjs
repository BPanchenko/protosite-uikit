/// <reference path="rounded.css.d.ts" />
const classNames = new Map([["cButton","c-button"],["cPanel","c-panel"],["cToolbar","c-toolbar"],["sRounded","s-rounded"]]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(rounded.css);
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