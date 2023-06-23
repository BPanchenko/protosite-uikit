/// <reference path="control.css.d.ts" />
const classNames = new Map([
  ['cCtrl', 'c-ctrl'],
  ['cCtrlGroup', 'c-ctrl-group'],
  ['cCtrlPopover', 'c-ctrl-popover'],
  ['cCtrlSort', 'c-ctrl-sort']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(control.css);
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
