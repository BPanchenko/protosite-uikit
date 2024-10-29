const cssClassNames = {
	"cButton": "c-button",
	"cCrumb": "c-crumb",
	"cFieldBox": "c-field-box",
	"cIcon": "c-icon",
	"cLabel": "c-label",
	"cPicture": "c-picture",
	"oForm": "o-form",
	"oFormBody": "o-form__body",
	"oFormButtons": "o-form__buttons",
	"oFormHead": "o-form__head",
	"oFormRow": "o-form__row",
	"oNavcrumbs": "o-navcrumbs",
	"oToolbar": "o-toolbar",
	"sIcon": "s-icon",
	"sShort": "s-short"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'objects.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}