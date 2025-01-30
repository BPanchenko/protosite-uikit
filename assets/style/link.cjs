const classNames = {
	"sLink": "s-link"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'link.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}