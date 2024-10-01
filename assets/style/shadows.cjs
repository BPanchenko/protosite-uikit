const cssClassNames = {
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

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'shadows.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}