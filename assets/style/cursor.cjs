const cssClassNames = {
	"sCursorAlias": "s-cursor-alias",
	"sCursorAllScroll": "s-cursor-all-scroll",
	"sCursorAuto": "s-cursor-auto",
	"sCursorCell": "s-cursor-cell",
	"sCursorColResize": "s-cursor-col-resize",
	"sCursorContextMenu": "s-cursor-context-menu",
	"sCursorCopy": "s-cursor-copy",
	"sCursorCrosshair": "s-cursor-crosshair",
	"sCursorDefault": "s-cursor-default",
	"sCursorEResize": "s-cursor-e-resize",
	"sCursorEwResize": "s-cursor-ew-resize",
	"sCursorGrab": "s-cursor-grab",
	"sCursorGrabbing": "s-cursor-grabbing",
	"sCursorHelp": "s-cursor-help",
	"sCursorMove": "s-cursor-move",
	"sCursorNResize": "s-cursor-n-resize",
	"sCursorNeResize": "s-cursor-ne-resize",
	"sCursorNeswResize": "s-cursor-nesw-resize",
	"sCursorNoDrop": "s-cursor-no-drop",
	"sCursorNone": "s-cursor-none",
	"sCursorNotAllowed": "s-cursor-not-allowed",
	"sCursorNsResize": "s-cursor-ns-resize",
	"sCursorNwResize": "s-cursor-nw-resize",
	"sCursorNwseResize": "s-cursor-nwse-resize",
	"sCursorPointer": "s-cursor-pointer",
	"sCursorProgress": "s-cursor-progress",
	"sCursorRowResize": "s-cursor-row-resize",
	"sCursorSResize": "s-cursor-s-resize",
	"sCursorSeResize": "s-cursor-se-resize",
	"sCursorSwResize": "s-cursor-sw-resize",
	"sCursorText": "s-cursor-text",
	"sCursorVerticalText": "s-cursor-vertical-text",
	"sCursorWResize": "s-cursor-w-resize",
	"sCursorWait": "s-cursor-wait",
	"sCursorZoomIn": "s-cursor-zoom-in",
	"sCursorZoomOut": "s-cursor-zoom-out"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'cursor.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}