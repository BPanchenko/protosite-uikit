const cssClassNames = {
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

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'text.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}