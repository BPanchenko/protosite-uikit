const cssClassNames = {
	"cList": "c-list",
	"cListBody": "c-list__body",
	"cListCell": "c-list__cell",
	"cListFoot": "c-list__foot",
	"cListHead": "c-list__head",
	"cListItem": "c-list__item",
	"cListMeta": "c-list__meta"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'list.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}