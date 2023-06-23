/// <reference path="list.css.d.ts" />
const classNames = new Map([
  ['cList', 'c-list'],
  ['cListBody', 'c-list__body'],
  ['cListCell', 'c-list__cell'],
  ['cListFoot', 'c-list__foot'],
  ['cListHead', 'c-list__head'],
  ['cListItem', 'c-list__item'],
  ['cListMeta', 'c-list__meta']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(list.css);
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
