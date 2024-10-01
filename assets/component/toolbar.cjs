const cssClassNames = {
	"cButton": "c-button",
	"cToolbar": "c-toolbar",
	"cToolbarLabel": "c-toolbar__label",
	"icon": "icon",
	"sIcon": "s-icon"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'toolbar.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}