const classNames = {
	"cButton": "c-button",
	"cPanel": "c-panel",
	"cToolbar": "c-toolbar",
	"sRounded": "s-rounded"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'rounded.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}