const classNames = {
	"sXxs": "s-xxs",
	"sXs": "s-xs",
	"sSm": "s-sm",
	"sMd": "s-md",
	"sLg": "s-lg",
	"sXl": "s-xl",
	"sXxl": "s-xxl",
	"cPanel": "c-panel",
	"sClean": "s-clean"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'component.avatar.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}