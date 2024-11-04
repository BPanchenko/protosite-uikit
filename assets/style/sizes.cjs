const cssClassNames = {
	"cButton": "c-button",
	"cIcon": "c-icon",
	"sIcon": "s-icon",
	"sLg": "s-lg",
	"sMd": "s-md",
	"sSm": "s-sm",
	"sXs": "s-xs"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'sizes.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}