const classNames = {
	"cList": "c-list",
	"cListBody": "c-list__body",
	"cListCell": "c-list__cell",
	"cListFoot": "c-list__foot",
	"cListHead": "c-list__head",
	"cListItem": "c-list__item",
	"cListMeta": "c-list__meta"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'list.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}