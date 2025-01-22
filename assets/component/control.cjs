const classNames = {
	"cCtrl": "c-ctrl",
	"cCtrlGroup": "c-ctrl-group",
	"cCtrlPopover": "c-ctrl-popover",
	"cCtrlSort": "c-ctrl-sort"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'control.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}