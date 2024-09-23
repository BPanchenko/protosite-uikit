module.exports = {
	"cList": "c-list",
	"cListBody": "c-list__body",
	"cListCell": "c-list__cell",
	"cListFoot": "c-list__foot",
	"cListHead": "c-list__head",
	"cListItem": "c-list__item",
	"cListMeta": "c-list__meta"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'list.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;