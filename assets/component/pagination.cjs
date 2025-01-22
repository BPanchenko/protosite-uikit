const classNames = {
	"cPagination": "c-pagination",
	"cPaginationEllipsis": "c-pagination__ellipsis",
	"cPaginationNext": "c-pagination__next",
	"cPaginationPage": "c-pagination__page",
	"cPaginationPrev": "c-pagination__prev"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'pagination.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}