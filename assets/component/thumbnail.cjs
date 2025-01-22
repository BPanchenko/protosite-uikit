const classNames = {
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