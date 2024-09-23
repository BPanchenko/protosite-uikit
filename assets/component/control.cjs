module.exports = {
	"cCtrl": "c-ctrl",
	"cCtrlGroup": "c-ctrl-group",
	"cCtrlPopover": "c-ctrl-popover",
	"cCtrlSort": "c-ctrl-sort"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'control.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;