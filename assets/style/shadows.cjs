module.exports = {
	"sShadow": "s-shadow",
	"sShadow16Dp": "s-shadow-16dp",
	"sShadow24Dp": "s-shadow-24dp",
	"sShadow2Dp": "s-shadow-2dp",
	"sShadow3Dp": "s-shadow-3dp",
	"sShadow4Dp": "s-shadow-4dp",
	"sShadow6Dp": "s-shadow-6dp",
	"sShadow8Dp": "s-shadow-8dp",
	"sShadowDiffuse": "s-shadow-diffuse",
	"sShadowDreamy": "s-shadow-dreamy",
	"sShadowLonger": "s-shadow-longer",
	"sShadowSharp": "s-shadow-sharp",
	"sShadowShorter": "s-shadow-shorter"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'shadows.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;