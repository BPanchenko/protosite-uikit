const classNames = {
	"cBadge": "c-badge",
	"cBadgeDanger": "c-badge--danger",
	"cBadgeInfo": "c-badge--info",
	"cBadgePrimary": "c-badge--primary",
	"cBadgeSuccess": "c-badge--success",
	"cBadgeWarning": "c-badge--warning"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'badge.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}