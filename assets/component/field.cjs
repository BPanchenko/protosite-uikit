const cssClassNames = {
	"cField": "c-field",
	"cFieldButton": "c-field-button",
	"cFieldContainer": "c-field-container",
	"cFieldDescription": "c-field-description",
	"cFieldError": "c-field-error",
	"cFieldIcon": "c-field-icon",
	"cFieldLabel": "c-field-label",
	"iconic": "iconic",
	"isFilled": "is-filled",
	"isFocused": "is-focused",
	"isInvalid": "is-invalid",
	"sFloating": "s-floating"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'field.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}