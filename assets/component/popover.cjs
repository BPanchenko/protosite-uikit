module.exports = {
	"cPopover": "c-popover",
	"cPopoverBody": "c-popover__body",
	"isHidden": "is-hidden",
	"isVisible": "is-visible",
	"sLinkset": "s-linkset"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'popover.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;