const classNames = {
	"cButton": "c-button",
	"cButtonIcon": "c-button__icon",
	"cButtonText": "c-button__text",
	"sClean": "s-clean"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'clean.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}