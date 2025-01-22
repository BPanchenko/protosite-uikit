const classNames = {
	"cButton": "c-button",
	"cListBody": "c-list__body",
	"sLoading": "s-loading"
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