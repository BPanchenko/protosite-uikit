const classNames = {
	"cButton": "c-button"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'sizes.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}