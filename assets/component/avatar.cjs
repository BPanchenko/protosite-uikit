const cssClassNames = {
	"cAvatar": "c-avatar",
	"cAvatarLink": "c-avatar__link",
	"cPanel": "c-panel",
	"sClean": "s-clean"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'avatar.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}