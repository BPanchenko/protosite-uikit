const cssClassNames = {
	"cPanel": "c-panel",
	"cTab": "c-tab",
	"cTabIndicator": "c-tab-indicator",
	"cTabIcon": "c-tab__icon",
	"cTabLabel": "c-tab__label",
	"cTabsContainer": "c-tabs-container"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'tabs.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}