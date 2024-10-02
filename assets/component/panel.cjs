const cssClassNames = {
	"cButton": "c-button",
	"cPanel": "c-panel",
	"cPanelDivider": "c-panel-divider",
	"cPanelBody": "c-panel__body",
	"cPanelHead": "c-panel__head",
	"cToolbar": "c-toolbar",
	"sClean": "s-clean"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'panel.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}