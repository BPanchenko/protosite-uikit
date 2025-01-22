const classNames = {
	"sFlipHorizontal": "s-flip-horizontal",
	"sFlipRotate90": "s-flip-rotate-90"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'transform.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}