const classNames = {
	"cModal": "c-modal",
	"cModalBody": "c-modal__body",
	"cModalFoot": "c-modal__foot",
	"cModalHeader": "c-modal__header",
	"isClosed": "is-closed",
	"isOpened": "is-opened"
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