const cssClassNames = {
	"cDialog": "c-dialog",
	"cDialogBody": "c-dialog__body",
	"cDialogBodyViewport": "c-dialog__body-viewport",
	"cDialogBodyWrapper": "c-dialog__body-wrapper",
	"cDialogButtons": "c-dialog__buttons",
	"cDialogHeader": "c-dialog__header",
	"isClosed": "is-closed",
	"isOpened": "is-opened"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'dialog.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}