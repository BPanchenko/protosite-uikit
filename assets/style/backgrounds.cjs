const classNames = new Map([
  ['sBgAmber', 's-bg-amber'],
  ['sBgBlack', 's-bg-black'],
  ['sBgBlue', 's-bg-blue'],
  ['sBgBlueGrey', 's-bg-blue-grey'],
  ['sBgBrown', 's-bg-brown'],
  ['sBgCyan', 's-bg-cyan'],
  ['sBgDeepOrange', 's-bg-deep-orange'],
  ['sBgGreen', 's-bg-green'],
  ['sBgGrey', 's-bg-grey'],
  ['sBgIndigo', 's-bg-indigo'],
  ['sBgLightBlue', 's-bg-light-blue'],
  ['sBgLightGreen', 's-bg-light-green'],
  ['sBgLime', 's-bg-lime'],
  ['sBgOrange', 's-bg-orange'],
  ['sBgPink', 's-bg-pink'],
  ['sBgPurple', 's-bg-purple'],
  ['sBgRed', 's-bg-red'],
  ['sBgTeal', 's-bg-teal'],
  ['sBgViolet', 's-bg-violet'],
  ['sBgWhite', 's-bg-white'],
  ['sBgYellow', 's-bg-yellow']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'backgrounds.css');
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
