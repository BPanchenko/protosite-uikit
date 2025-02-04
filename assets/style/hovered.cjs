const classNames = {
	"cList": "c-list",
	"sHovered": "s-hovered",
	"cListItem": "c-list__item",
	"cPanel": "c-panel",
	"cThumbnail": "c-thumbnail"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'hovered.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}