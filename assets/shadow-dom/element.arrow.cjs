const classNames = {
	"icon": "icon",
	"sXxs": "s-xxs",
	"sXs": "s-xs",
	"sSm": "s-sm",
	"sMd": "s-md",
	"sLg": "s-lg",
	"sXl": "s-xl",
	"sXxl": "s-xxl"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'element.arrow.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}