const classNames = {
	"cCtrl": "c-ctrl",
	"cCtrlGroup": "c-ctrl-group",
	"cCtrlSort": "c-ctrl-sort",
	"cCtrlPopover": "c-ctrl-popover"
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