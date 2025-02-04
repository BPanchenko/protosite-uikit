const classNames = {
	"cPanel": "c-panel",
	"sClean": "s-clean"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'component.select.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}