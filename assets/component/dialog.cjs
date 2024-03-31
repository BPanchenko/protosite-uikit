const classNames = new Map([
  ['cDialog', 'c-dialog'],
  ['cDialogBody', 'c-dialog__body'],
  ['cDialogBodyViewport', 'c-dialog__body-viewport'],
  ['cDialogBodyWrapper', 'c-dialog__body-wrapper'],
  ['cDialogButtons', 'c-dialog__buttons'],
  ['cDialogHeader', 'c-dialog__header'],
  ['isClosed', 'is-closed'],
  ['isOpened', 'is-opened']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'dialog.css');
        const cssText = readFileSync(cssFilePath, 'utf-8');
        const stylesheet = new CSSStyleDeclaration();
        stylesheet.cssText = cssText;
        return stylesheet;

      default:
        return target.get(attr.toString());
    }
  },
  getPrototypeOf() {
    return Object;
  }
});
