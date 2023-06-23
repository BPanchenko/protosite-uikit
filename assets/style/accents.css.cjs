/// <reference path="accents.css.d.ts" />
const classNames = new Map([
  ['sDanger', 's-danger'],
  ['sMuted', 's-muted'],
  ['sPrimary', 's-primary'],
  ['sSuccess', 's-success'],
  ['sWarning', 's-warning']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(accents.css);
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
