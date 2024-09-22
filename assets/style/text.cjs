/// <reference path="./text.d.mts" />

module.exports = {
	"sBold": "s-bold",
	"sCapitalize": "s-capitalize",
	"sExtraBold": "s-extra-bold",
	"sExtraLight": "s-extra-light",
	"sHeavy": "s-heavy",
	"sLight": "s-light",
	"sLowercase": "s-lowercase",
	"sMedium": "s-medium",
	"sNormal": "s-normal",
	"sSemiBold": "s-semi-bold",
	"sText": "s-text",
	"sThin": "s-thin",
	"sUppercase": "s-uppercase"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'text.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;