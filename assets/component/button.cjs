const classNames = {
	"cButton": "c-button",
	"cButtonIcon": "c-button__icon",
	"cButtonText": "c-button__text",
	"cPanel": "c-panel",
	"sClean": "s-clean"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'button.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}