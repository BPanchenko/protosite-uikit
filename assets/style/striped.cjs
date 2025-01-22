const classNames = {
	"cList": "c-list",
	"cListItem": "c-list__item",
	"sStriped": "s-striped"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'striped.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}