const classNames = {
	"sRounded": "s-rounded",
	"cToolbar": "c-toolbar",
	"cButton": "c-button"
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