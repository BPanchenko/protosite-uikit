/// <reference path="button.css.d.ts" />
const classNames = new Map([["cButton","c-button"],["cButtonIcon","c-button__icon"],["cButtonText","c-button__text"],["cPanel","c-panel"],["sClean","s-clean"]]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(button.css);
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