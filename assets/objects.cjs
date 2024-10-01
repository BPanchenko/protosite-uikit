const cssClassNames = {
	"cFieldBox": "c-field-box",
	"guideHorizontal": "guide--horizontal",
	"guideVertical": "guide--vertical",
	"line": "line",
	"oArticle": "o-article",
	"oArticlePicture": "o-article__picture",
	"oBreadcrumb": "o-breadcrumb",
	"oBreadcrumbItem": "o-breadcrumb__item",
	"oContainer": "o-container",
	"oForm": "o-form",
	"oFormBody": "o-form__body",
	"oFormButtons": "o-form__buttons",
	"oFormHead": "o-form__head",
	"oFormRow": "o-form__row",
	"oGrid": "o-grid",
	"sAxis": "s-axis",
	"sShort": "s-short",
	"sizes": "sizes"
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