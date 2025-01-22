const classNames = {
	"cProgress": "c-progress",
	"cProgressStriped": "c-progress--striped",
	"cProgressBar": "c-progress__bar"
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