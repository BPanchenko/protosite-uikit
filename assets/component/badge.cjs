const cssClassNames = {
	"cBadge": "c-badge",
	"cBadgeDanger": "c-badge--danger",
	"cBadgeInfo": "c-badge--info",
	"cBadgePrimary": "c-badge--primary",
	"cBadgeSuccess": "c-badge--success",
	"cBadgeWarning": "c-badge--warning"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'badge.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}