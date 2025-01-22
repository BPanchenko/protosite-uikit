const classNames = {
	"cGrid": "c-grid",
	"cGridGuide": "c-grid__guide-",
	"line": "line",
	"sAxis": "s-axis",
	"sizes": "sizes"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'grid.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}