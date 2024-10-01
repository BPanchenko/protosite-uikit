const cssClassNames = {
	"icon": "icon",
	"isActive": "is-active",
	"sCondensed": "s-condensed",
	"sIcon": "s-icon",
	"uTextLg": "u-text-lg",
	"uTextSm": "u-text-sm",
	"uTextXs": "u-text-xs"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'document.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}