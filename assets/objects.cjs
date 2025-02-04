const classNames = {
	"oForm": "o-form",
	"oFormHead": "o-form__head",
	"oFormRow": "o-form__row",
	"cFieldBox": "c-field-box",
	"oFormButtons": "o-form__buttons",
	"oFormBody": "o-form__body",
	"sShort": "s-short",
	"oNavcrumbs": "o-navcrumbs",
	"oToolbar": "o-toolbar",
	"cButton": "c-button"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'objects.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}