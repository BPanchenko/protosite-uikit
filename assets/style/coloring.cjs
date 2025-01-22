const classNames = {
	"sDanger": "s-danger",
	"sMuted": "s-muted",
	"sPrimary": "s-primary",
	"sSuccess": "s-success",
	"sWarning": "s-warning"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'coloring.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}