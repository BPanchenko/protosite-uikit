const cssClassNames = {
	"cList": "c-list",
	"cListItem": "c-list__item",
	"cPanel": "c-panel",
	"cThumbnail": "c-thumbnail",
	"sHovered": "s-hovered"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'hovered.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}