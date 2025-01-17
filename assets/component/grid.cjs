const cssClassNames = {
	"cGrid": "c-grid",
	"cGridGuide": "c-grid__guide-",
	"line": "line",
	"sAxis": "s-axis",
	"sizes": "sizes"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'grid.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}