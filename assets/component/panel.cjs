const classNames = {
	"cButton": "c-button",
	"cPanel": "c-panel",
	"cPanelDivider": "c-panel-divider",
	"cPanelBody": "c-panel__body",
	"cPanelHead": "c-panel__head",
	"cToolbar": "c-toolbar",
	"sClean": "s-clean"
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