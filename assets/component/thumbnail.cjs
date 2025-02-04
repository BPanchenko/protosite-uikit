const classNames = {
	"cThumbnail": "c-thumbnail",
	"cPanel": "c-panel",
	"cThumbnailCaption": "c-thumbnail__caption",
	"cThumbnailShutter": "c-thumbnail__shutter",
	"cThumbnailLink": "c-thumbnail__link",
	"cThumbnailXs": "c-thumbnail--xs",
	"cThumbnailSm": "c-thumbnail--sm",
	"cThumbnailMd": "c-thumbnail--md",
	"cThumbnailLg": "c-thumbnail--lg",
	"cThumbnailXl": "c-thumbnail--xl",
	"cThumbnailSquare": "c-thumbnail--square"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'thumbnail.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}