const cssClassNames = {
	"cButton": "c-button",
	"cButtonIcon": "c-button__icon",
	"cButtonText": "c-button__text",
	"sClean": "s-clean"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'clean.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}