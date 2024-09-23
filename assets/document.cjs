module.exports = {
	"icon": "icon",
	"isActive": "is-active",
	"sCondensed": "s-condensed",
	"sIcon": "s-icon",
	"uTextLg": "u-text-lg",
	"uTextSm": "u-text-sm",
	"uTextXs": "u-text-xs"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'document.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;