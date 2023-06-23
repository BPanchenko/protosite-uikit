/// <reference path="popover.css.d.ts" />
const classNames = new Map([
  ['cPopover', 'c-popover'],
  ['cPopoverBody', 'c-popover__body'],
  ['isHidden', 'is-hidden'],
  ['isVisible', 'is-visible'],
  ['sLinkset', 's-linkset']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(popover.css);
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
