module.exports = {
	"cDialog": "c-dialog",
	"cDialogBody": "c-dialog__body",
	"cDialogBodyViewport": "c-dialog__body-viewport",
	"cDialogBodyWrapper": "c-dialog__body-wrapper",
	"cDialogButtons": "c-dialog__buttons",
	"cDialogHeader": "c-dialog__header",
	"isClosed": "is-closed",
	"isOpened": "is-opened"
};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'dialog.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;