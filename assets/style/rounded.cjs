const cssClassNames = {
	"cButton": "c-button",
	"cPanel": "c-panel",
	"cToolbar": "c-toolbar",
	"sRounded": "s-rounded"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'rounded.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}