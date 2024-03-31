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
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'thumbnail.css');
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
