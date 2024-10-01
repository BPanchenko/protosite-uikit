const cssClassNames = {
	"cPopover": "c-popover",
	"cPopoverBody": "c-popover__body",
	"isHidden": "is-hidden",
	"isVisible": "is-visible",
	"sLinkset": "s-linkset"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'popover.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}