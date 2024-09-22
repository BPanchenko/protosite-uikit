/// <reference path="./pagination.d.mts" />

module.exports = {
	"cPagination": "c-pagination",
	"cPaginationEllipsis": "c-pagination__ellipsis",
	"cPaginationNext": "c-pagination__next",
	"cPaginationPage": "c-pagination__page",
	"cPaginationPrev": "c-pagination__prev"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'pagination.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;