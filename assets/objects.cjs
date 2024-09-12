const classNames = new Map([
  ['cFieldBox', 'c-field-box'],
  ['guideHorizontal', 'guide--horizontal'],
  ['guideVertical', 'guide--vertical'],
  ['line', 'line'],
  ['oArticle', 'o-article'],
  ['oArticlePicture', 'o-article__picture'],
  ['oBreadcrumb', 'o-breadcrumb'],
  ['oBreadcrumbItem', 'o-breadcrumb__item'],
  ['oContainer', 'o-container'],
  ['oForm', 'o-form'],
  ['oFormBody', 'o-form__body'],
  ['oFormButtons', 'o-form__buttons'],
  ['oFormHead', 'o-form__head'],
  ['oFormRow', 'o-form__row'],
  ['oGrid', 'o-grid'],
  ['sAxis', 's-axis'],
  ['sShort', 's-short'],
  ['sizes', 'sizes']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'objects.css');
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
