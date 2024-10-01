const cssClassNames = {
	"cCtrl": "c-ctrl",
	"cCtrlGroup": "c-ctrl-group",
	"cCtrlPopover": "c-ctrl-popover",
	"cCtrlSort": "c-ctrl-sort"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'control.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}