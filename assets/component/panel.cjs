module.exports = {
	"cAvatar": "c-avatar",
	"cButton": "c-button",
	"cPanel": "c-panel",
	"cPanelDivider": "c-panel-divider",
	"cPanelBody": "c-panel__body",
	"cPanelHead": "c-panel__head",
	"cToolbar": "c-toolbar",
	"sClean": "s-clean"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'panel.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;