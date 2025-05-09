const classNames = {
	"uClearfix": "u-clearfix",
	"uAlignCenter": "u-align-center",
	"uAlignLeft": "u-align-left",
	"uAlignRight": "u-align-right",
	"uTextLeft": "u-text-left",
	"uTextRight": "u-text-right",
	"uTextCenter": "u-text-center",
	"uTextJustify": "u-text-justify",
	"uCentering": "u-centering",
	"uContainer": "u-container",
	"uMargin": "u-margin",
	"uMarginLg": "u-margin-lg",
	"uMarginMd": "u-margin-md",
	"uMarginSm": "u-margin-sm",
	"uMarginXl": "u-margin-xl",
	"uMarginXs": "u-margin-xs",
	"uMarginXxl": "u-margin-xxl",
	"uMarginLgTop": "u-margin-lg-top",
	"uMarginMdTop": "u-margin-md-top",
	"uMarginSmTop": "u-margin-sm-top",
	"uMarginTop": "u-margin-top",
	"uMarginXlTop": "u-margin-xl-top",
	"uMarginXsTop": "u-margin-xs-top",
	"uMarginXxlTop": "u-margin-xxl-top",
	"uMarginLgRight": "u-margin-lg-right",
	"uMarginMdRight": "u-margin-md-right",
	"uMarginRight": "u-margin-right",
	"uMarginSmRight": "u-margin-sm-right",
	"uMarginXlRight": "u-margin-xl-right",
	"uMarginXsRight": "u-margin-xs-right",
	"uMarginXxlRight": "u-margin-xxl-right",
	"uMarginBottom": "u-margin-bottom",
	"uMarginLgBottom": "u-margin-lg-bottom",
	"uMarginMdBottom": "u-margin-md-bottom",
	"uMarginSmBottom": "u-margin-sm-bottom",
	"uMarginXlBottom": "u-margin-xl-bottom",
	"uMarginXsBottom": "u-margin-xs-bottom",
	"uMarginXxlBottom": "u-margin-xxl-bottom",
	"uMarginLeft": "u-margin-left",
	"uMarginLgLeft": "u-margin-lg-left",
	"uMarginMdLeft": "u-margin-md-left",
	"uMarginSmLeft": "u-margin-sm-left",
	"uMarginXlLeft": "u-margin-xl-left",
	"uMarginXsLeft": "u-margin-xs-left",
	"uMarginXxlLeft": "u-margin-xxl-left",
	"uMarginRemove": "u-margin-remove",
	"uMarginTopRemove": "u-margin-top-remove",
	"uMarginRightRemove": "u-margin-right-remove",
	"uMarginBottomRemove": "u-margin-bottom-remove",
	"uMarginLeftRemove": "u-margin-left-remove",
	"uFloatLeft": "u-float-left",
	"uFloatRight": "u-float-right",
	"uPositionAbsolute": "u-position-absolute",
	"uPositionBottom": "u-position-bottom",
	"uPositionBottomLeft": "u-position-bottom-left",
	"uPositionBottomRight": "u-position-bottom-right",
	"uPositionCover": "u-position-cover",
	"uPositionTop": "u-position-top",
	"uPositionTopLeft": "u-position-top-left",
	"uPositionTopRight": "u-position-top-right",
	"uPositionRelative": "u-position-relative",
	"uTextBreak": "u-text-break",
	"uTextNowrap": "u-text-nowrap",
	"uTextTruncate": "u-text-truncate",
	"uHidden": "u-hidden",
	"uInvisible": "u-invisible",
	"uVisible": "u-visible",
	"uHiddenNotouch": "u-hidden-notouch",
	"uHiddenTouch": "u-hidden-touch"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'utilities.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}