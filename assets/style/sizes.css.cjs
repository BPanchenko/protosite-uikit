/// <reference path="sizes.css.d.ts" />
const classNames = new Map([["cAvatar","c-avatar"],["cButton","c-button"],["icon","icon"],["sDefaultSize","s-default-size"],["sIcon","s-icon"],["sLg","s-lg"],["sMd","s-md"],["sSm","s-sm"],["sXl","s-xl"],["sXs","s-xs"],["sXxl","s-xxl"],["sXxs","s-xxs"],["sXxxl","s-xxxl"]]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(sizes.css);
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