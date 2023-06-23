/// <reference path="progress.css.d.ts" />
const classNames = new Map([
  ['cProgress', 'c-progress'],
  ['cProgressStriped', 'c-progress--striped'],
  ['cProgressBar', 'c-progress__bar']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(progress.css);
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
