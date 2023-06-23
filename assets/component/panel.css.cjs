/// <reference path="panel.css.d.ts" />
const classNames = new Map([
  ['cAvatar', 'c-avatar'],
  ['cButton', 'c-button'],
  ['cPanel', 'c-panel'],
  ['cPanelDivider', 'c-panel-divider'],
  ['cPanelBody', 'c-panel__body'],
  ['cPanelHead', 'c-panel__head'],
  ['cToolbar', 'c-toolbar'],
  ['sClean', 's-clean']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(panel.css);
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
