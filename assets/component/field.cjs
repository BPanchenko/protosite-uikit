const classNames = {
	"cField": "c-field",
	"cFieldDescription": "c-field-description",
	"cFieldError": "c-field-error",
	"cFieldLabel": "c-field-label",
	"cFieldContainer": "c-field-container",
	"cFieldIcon": "c-field-icon",
	"cFieldButton": "c-field-button",
	"isInvalid": "is-invalid",
	"isFilled": "is-filled",
	"isFocused": "is-focused",
	"sFloating": "s-floating"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'field.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}