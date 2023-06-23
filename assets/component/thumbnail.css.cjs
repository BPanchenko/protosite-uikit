/// <reference path="thumbnail.css.d.ts" />
const classNames = new Map([
  ['cPanel', 'c-panel'],
  ['cThumbnail', 'c-thumbnail'],
  ['cThumbnailLg', 'c-thumbnail--lg'],
  ['cThumbnailMd', 'c-thumbnail--md'],
  ['cThumbnailSm', 'c-thumbnail--sm'],
  ['cThumbnailSquare', 'c-thumbnail--square'],
  ['cThumbnailXl', 'c-thumbnail--xl'],
  ['cThumbnailXs', 'c-thumbnail--xs'],
  ['cThumbnailCaption', 'c-thumbnail__caption'],
  ['cThumbnailLink', 'c-thumbnail__link'],
  ['cThumbnailShutter', 'c-thumbnail__shutter']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(thumbnail.css);
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
