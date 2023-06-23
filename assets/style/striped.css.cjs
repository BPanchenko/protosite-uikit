/// <reference path="striped.css.d.ts" />
const classNames = new Map([
  ['cList', 'c-list'],
  ['cListItem', 'c-list__item'],
  ['sStriped', 's-striped']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(striped.css);
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
