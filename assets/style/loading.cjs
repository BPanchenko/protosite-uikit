const classNames = {
	"cButton": "c-button",
	"sLoading": "s-loading",
	"cListBody": "c-list__body"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'loading.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}