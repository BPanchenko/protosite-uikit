/// <reference path="shadows.css.d.ts" />
const classNames = new Map([
  ['sShadow', 's-shadow'],
  ['sShadow16Dp', 's-shadow-16dp'],
  ['sShadow24Dp', 's-shadow-24dp'],
  ['sShadow2Dp', 's-shadow-2dp'],
  ['sShadow3Dp', 's-shadow-3dp'],
  ['sShadow4Dp', 's-shadow-4dp'],
  ['sShadow6Dp', 's-shadow-6dp'],
  ['sShadow8Dp', 's-shadow-8dp'],
  ['sShadowDiffuse', 's-shadow-diffuse'],
  ['sShadowDreamy', 's-shadow-dreamy'],
  ['sShadowLonger', 's-shadow-longer'],
  ['sShadowSharp', 's-shadow-sharp'],
  ['sShadowShorter', 's-shadow-shorter']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(shadows.css);
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
