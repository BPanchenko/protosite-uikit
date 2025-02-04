const classNames = {
	"sDefaultSize": "s-default-size",
	"sXs": "s-xs",
	"sSm": "s-sm",
	"sMd": "s-md",
	"sLg": "s-lg",
	"sXl": "s-xl",
	"sXxl": "s-xxl",
	"sXxxl": "s-xxxl",
	"cButton": "c-button"
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