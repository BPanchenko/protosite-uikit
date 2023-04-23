/// <reference path="field.css.d.ts" />
const classNames = new Map([["cField","c-field"],["cFieldBox","c-field-box"],["cFieldButton","c-field-button"],["cFieldError","c-field-error"],["cFieldIcon","c-field-icon"],["cFieldInfo","c-field-info"],["cFieldLabel","c-field-label"],["iconic","iconic"],["isFilled","is-filled"],["isFocused","is-focused"],["isInvalid","is-invalid"],["sFloating","s-floating"]]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(field.css);
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