/// <reference path="./button.d.mts" />

module.exports = {
	"cButton": "c-button",
	"cButtonIcon": "c-button__icon",
	"cButtonText": "c-button__text",
	"cPanel": "c-panel",
	"sClean": "s-clean"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'button.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;