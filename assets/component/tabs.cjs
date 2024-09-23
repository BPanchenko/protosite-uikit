module.exports = {
	"cPanel": "c-panel",
	"cTab": "c-tab",
	"cTabIndicator": "c-tab-indicator",
	"cTabIcon": "c-tab__icon",
	"cTabLabel": "c-tab__label",
	"cTabsContainer": "c-tabs-container"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'tabs.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;