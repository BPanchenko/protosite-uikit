const classNames = {
	"cButton": "c-button",
	"cIcon": "c-icon",
	"sDefaultSize": "s-default-size",
	"sIcon": "s-icon",
	"sLg": "s-lg",
	"sMd": "s-md",
	"sSm": "s-sm",
	"sXl": "s-xl",
	"sXs": "s-xs",
	"sXxl": "s-xxl",
	"sXxxl": "s-xxxl"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'sizes.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}