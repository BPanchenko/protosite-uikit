const classNames = {
	"cIcon": "c-icon",
	"isActive": "is-active",
	"sCondensed": "s-condensed",
	"sIcon": "s-icon",
	"sLead": "s-lead",
	"sLg": "s-lg",
	"sMd": "s-md",
	"sSm": "s-sm",
	"sXl": "s-xl",
	"sXs": "s-xs",
	"sXxl": "s-xxl",
	"sXxs": "s-xxs"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'document.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}