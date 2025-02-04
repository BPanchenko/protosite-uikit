const classNames = {
	"sLead": "s-lead"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'paragraph.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}