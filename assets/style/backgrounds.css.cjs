/// <reference path="backgrounds.css.d.ts" />
const classNames = new Map([["sBgAmber","s-bg-amber"],["sBgBlack","s-bg-black"],["sBgBlue","s-bg-blue"],["sBgBlueGrey","s-bg-blue-grey"],["sBgBrown","s-bg-brown"],["sBgCyan","s-bg-cyan"],["sBgDeepOrange","s-bg-deep-orange"],["sBgGreen","s-bg-green"],["sBgGrey","s-bg-grey"],["sBgIndigo","s-bg-indigo"],["sBgLightBlue","s-bg-light-blue"],["sBgLightGreen","s-bg-light-green"],["sBgLime","s-bg-lime"],["sBgOrange","s-bg-orange"],["sBgPink","s-bg-pink"],["sBgPurple","s-bg-purple"],["sBgRed","s-bg-red"],["sBgTeal","s-bg-teal"],["sBgViolet","s-bg-violet"],["sBgWhite","s-bg-white"],["sBgYellow","s-bg-yellow"]]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(backgrounds.css);
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