/// <reference path="pagination.css.d.ts" />
const classNames = new Map([
  ['cPagination', 'c-pagination'],
  ['cPaginationEllipsis', 'c-pagination__ellipsis'],
  ['cPaginationNext', 'c-pagination__next'],
  ['cPaginationPage', 'c-pagination__page'],
  ['cPaginationPrev', 'c-pagination__prev']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(pagination.css);
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
