const classNames = {
	"sBgRed": "s-bg-red",
	"sBgPink": "s-bg-pink",
	"sBgPurple": "s-bg-purple",
	"sBgViolet": "s-bg-violet",
	"sBgIndigo": "s-bg-indigo",
	"sBgBlue": "s-bg-blue",
	"sBgLightBlue": "s-bg-light-blue",
	"sBgCyan": "s-bg-cyan",
	"sBgTeal": "s-bg-teal",
	"sBgGreen": "s-bg-green",
	"sBgLightGreen": "s-bg-light-green",
	"sBgLime": "s-bg-lime",
	"sBgYellow": "s-bg-yellow",
	"sBgAmber": "s-bg-amber",
	"sBgOrange": "s-bg-orange",
	"sBgDeepOrange": "s-bg-deep-orange",
	"sBgBrown": "s-bg-brown",
	"sBgGrey": "s-bg-grey",
	"sBgBlueGrey": "s-bg-blue-grey",
	"sBgBlack": "s-bg-black",
	"sBgWhite": "s-bg-white"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'backgrounds.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}