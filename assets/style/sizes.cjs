const cssClassNames = {
	"cButton": "c-button",
	"icon": "icon",
	"sDefaultSize": "s-default-size",
	"sIcon": "s-icon",
	"sLg": "s-lg",
	"sMd": "s-md",
	"sSm": "s-sm",
	"sXl": "s-xl",
	"sXs": "s-xs",
	"sXxl": "s-xxl",
	"sXxxl": "s-xxxl"
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