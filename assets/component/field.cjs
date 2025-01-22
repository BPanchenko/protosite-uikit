const classNames = {
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