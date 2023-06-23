/// <reference path="loading.css.d.ts" />
const classNames = new Map([
  ['cButton', 'c-button'],
  ['cListBody', 'c-list__body'],
  ['sLoading', 's-loading']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(loading.css);
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
