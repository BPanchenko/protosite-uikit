const cssClassNames = {
	"cPagination": "c-pagination",
	"cPaginationEllipsis": "c-pagination__ellipsis",
	"cPaginationNext": "c-pagination__next",
	"cPaginationPage": "c-pagination__page",
	"cPaginationPrev": "c-pagination__prev"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'pagination.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}