const classNames = {
	"cPanel": "c-panel",
	"cTab": "c-tab",
	"cTabIndicator": "c-tab-indicator",
	"cTabIcon": "c-tab__icon",
	"cTabLabel": "c-tab__label",
	"cTabsContainer": "c-tabs-container"
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