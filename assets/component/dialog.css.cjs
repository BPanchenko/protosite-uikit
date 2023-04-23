/// <reference path="dialog.css.d.ts" />
const classNames = new Map([["cDialog","c-dialog"],["cDialogBody","c-dialog__body"],["cDialogBodyViewport","c-dialog__body-viewport"],["cDialogBodyWrapper","c-dialog__body-wrapper"],["cDialogButtons","c-dialog__buttons"],["cDialogHeader","c-dialog__header"],["isClosed","is-closed"],["isOpened","is-opened"]]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(dialog.css);
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