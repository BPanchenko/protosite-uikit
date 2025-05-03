const classNames = {
	"cButton": "c-button",
	"cButtonIcon": "c-button__icon",
	"cPanel": "c-panel",
	"sClean": "s-clean",
	"cButtonText": "c-button__text"
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