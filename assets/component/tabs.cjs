const classNames = {
	"cTab": "c-tab",
	"cTabIcon": "c-tab__icon",
	"cTabLabel": "c-tab__label",
	"cTabsContainer": "c-tabs-container",
	"cTabIndicator": "c-tab-indicator",
	"cPanel": "c-panel"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'tabs.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}