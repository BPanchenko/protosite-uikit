const classNames = {
	"sThin": "s-thin",
	"sExtraLight": "s-extra-light",
	"sLight": "s-light",
	"sNormal": "s-normal",
	"sMedium": "s-medium",
	"sBold": "s-bold",
	"sSemiBold": "s-semi-bold",
	"sExtraBold": "s-extra-bold",
	"sHeavy": "s-heavy",
	"sText": "s-text",
	"sUppercase": "s-uppercase",
	"sCapitalize": "s-capitalize",
	"sLowercase": "s-lowercase"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'text.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}