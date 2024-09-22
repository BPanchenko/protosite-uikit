/// <reference path="./link.d.mts" />

module.exports = {
	"cButton": "c-button",
	"cPanel": "c-panel",
	"sClean": "s-clean",
	"sLink": "s-link"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'link.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;