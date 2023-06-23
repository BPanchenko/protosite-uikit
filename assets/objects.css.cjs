/// <reference path="objects.css.d.ts" />
const classNames = new Map([
  ['cFieldBox', 'c-field-box'],
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
  ['sShort', 's-short']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(objects.css);
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
