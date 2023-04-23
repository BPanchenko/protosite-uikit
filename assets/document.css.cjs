/// <reference path="document.css.d.ts" />
const classNames = new Map([["icon","icon"],["isActive","is-active"],["sCondensed","s-condensed"],["sIcon","s-icon"],["uTextLg","u-text-lg"],["uTextSm","u-text-sm"],["uTextXs","u-text-xs"]]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(document.css);
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