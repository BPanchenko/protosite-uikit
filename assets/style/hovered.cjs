/// <reference path="./hovered.d.mts" />

module.exports = {
	"cList": "c-list",
	"cListItem": "c-list__item",
	"cPanel": "c-panel",
	"cThumbnail": "c-thumbnail",
	"sHovered": "s-hovered"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'hovered.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;