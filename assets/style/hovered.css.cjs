/// <reference path="hovered.css.d.ts" />
const classNames = new Map([
  ['cList', 'c-list'],
  ['cListItem', 'c-list__item'],
  ['cPanel', 'c-panel'],
  ['cThumbnail', 'c-thumbnail'],
  ['sHovered', 's-hovered']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(hovered.css);
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
