/// <reference path="pagination.d.ts" />
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
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'pagination.css');
        const cssText = readFileSync(cssFilePath, 'utf-8');
        const stylesheet = new CSSStyleDeclaration();
        stylesheet.cssText = cssText;
        return stylesheet;

      default:
        return target.get(attr);
    }
  },
  getPrototypeOf() {
    return Object;
  }
});
