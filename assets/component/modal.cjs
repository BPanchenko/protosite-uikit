const cssClassNames = {
	"cModal": "c-modal",
	"cModalBody": "c-modal__body",
	"cModalFoot": "c-modal__foot",
	"cModalHeader": "c-modal__header",
	"isClosed": "is-closed",
	"isOpened": "is-opened"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'modal.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}