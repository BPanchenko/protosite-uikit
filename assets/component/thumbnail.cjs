const cssClassNames = {
	"cPanel": "c-panel",
	"cThumbnail": "c-thumbnail",
	"cThumbnailLg": "c-thumbnail--lg",
	"cThumbnailMd": "c-thumbnail--md",
	"cThumbnailSm": "c-thumbnail--sm",
	"cThumbnailSquare": "c-thumbnail--square",
	"cThumbnailXl": "c-thumbnail--xl",
	"cThumbnailXs": "c-thumbnail--xs",
	"cThumbnailCaption": "c-thumbnail__caption",
	"cThumbnailLink": "c-thumbnail__link",
	"cThumbnailShutter": "c-thumbnail__shutter"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'thumbnail.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}