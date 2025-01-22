const classNames = {
	"cPopover": "c-popover",
	"cPopoverBody": "c-popover__body",
	"isHidden": "is-hidden",
	"isVisible": "is-visible",
	"sLinkset": "s-linkset"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'popover.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}