/// <reference path="./backgrounds.d.mts" />

module.exports = {
	"sBgAmber": "s-bg-amber",
	"sBgBlack": "s-bg-black",
	"sBgBlue": "s-bg-blue",
	"sBgBlueGrey": "s-bg-blue-grey",
	"sBgBrown": "s-bg-brown",
	"sBgCyan": "s-bg-cyan",
	"sBgDeepOrange": "s-bg-deep-orange",
	"sBgGreen": "s-bg-green",
	"sBgGrey": "s-bg-grey",
	"sBgIndigo": "s-bg-indigo",
	"sBgLightBlue": "s-bg-light-blue",
	"sBgLightGreen": "s-bg-light-green",
	"sBgLime": "s-bg-lime",
	"sBgOrange": "s-bg-orange",
	"sBgPink": "s-bg-pink",
	"sBgPurple": "s-bg-purple",
	"sBgRed": "s-bg-red",
	"sBgTeal": "s-bg-teal",
	"sBgViolet": "s-bg-violet",
	"sBgWhite": "s-bg-white",
	"sBgYellow": "s-bg-yellow"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'backgrounds.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;