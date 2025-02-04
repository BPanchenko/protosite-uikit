const classNames = {
	"cPanel": "c-panel",
	"cPanelDivider": "c-panel-divider",
	"cPanelHead": "c-panel__head",
	"cPanelBody": "c-panel__body"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'panel.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}