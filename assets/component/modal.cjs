const classNames = {
	"cModal": "c-modal",
	"isClosed": "is-closed",
	"isOpened": "is-opened",
	"cModalBody": "c-modal__body",
	"cModalHeader": "c-modal__header",
	"cModalFoot": "c-modal__foot"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'modal.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}