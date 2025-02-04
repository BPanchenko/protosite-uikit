const classNames = {
	"sCondensed": "s-condensed"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'table.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}