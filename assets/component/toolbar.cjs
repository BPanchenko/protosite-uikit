module.exports = {
	"cButton": "c-button",
	"cToolbar": "c-toolbar",
	"cToolbarLabel": "c-toolbar__label",
	"icon": "icon",
	"sIcon": "s-icon"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'toolbar.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;