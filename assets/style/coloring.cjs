const cssClassNames = {
	"sDanger": "s-danger",
	"sMuted": "s-muted",
	"sPrimary": "s-primary",
	"sSuccess": "s-success",
	"sWarning": "s-warning"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'coloring.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}