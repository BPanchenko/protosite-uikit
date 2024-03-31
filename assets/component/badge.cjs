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
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'badge.css');
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
