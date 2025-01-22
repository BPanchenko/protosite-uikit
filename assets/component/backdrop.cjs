const classNames = {
	"cBackdrop": "c-backdrop"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'backdrop.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}