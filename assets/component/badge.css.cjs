/// <reference path="badge.css.d.ts" />
const classNames = new Map([
  ['cBadge', 'c-badge'],
  ['cBadgeDanger', 'c-badge--danger'],
  ['cBadgeInfo', 'c-badge--info'],
  ['cBadgePrimary', 'c-badge--primary'],
  ['cBadgeSuccess', 'c-badge--success'],
  ['cBadgeWarning', 'c-badge--warning']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(badge.css);
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
