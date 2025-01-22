const classNames = {
	"sAnimatedGradient": "s-animated-gradient"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'animated-gradient.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}