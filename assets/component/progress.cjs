const classNames = {
	"cProgress": "c-progress",
	"cProgressBar": "c-progress__bar",
	"cProgressStriped": "c-progress--striped"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'progress.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}