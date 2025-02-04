const classNames = {
	"sCursorAuto": "s-cursor-auto",
	"sCursorDefault": "s-cursor-default",
	"sCursorNone": "s-cursor-none",
	"sCursorContextMenu": "s-cursor-context-menu",
	"sCursorHelp": "s-cursor-help",
	"sCursorPointer": "s-cursor-pointer",
	"sCursorProgress": "s-cursor-progress",
	"sCursorWait": "s-cursor-wait",
	"sCursorCell": "s-cursor-cell",
	"sCursorCrosshair": "s-cursor-crosshair",
	"sCursorText": "s-cursor-text",
	"sCursorVerticalText": "s-cursor-vertical-text",
	"sCursorAlias": "s-cursor-alias",
	"sCursorCopy": "s-cursor-copy",
	"sCursorMove": "s-cursor-move",
	"sCursorNoDrop": "s-cursor-no-drop",
	"sCursorNotAllowed": "s-cursor-not-allowed",
	"sCursorAllScroll": "s-cursor-all-scroll",
	"sCursorColResize": "s-cursor-col-resize",
	"sCursorRowResize": "s-cursor-row-resize",
	"sCursorNResize": "s-cursor-n-resize",
	"sCursorEResize": "s-cursor-e-resize",
	"sCursorSResize": "s-cursor-s-resize",
	"sCursorWResize": "s-cursor-w-resize",
	"sCursorNeResize": "s-cursor-ne-resize",
	"sCursorNwResize": "s-cursor-nw-resize",
	"sCursorSeResize": "s-cursor-se-resize",
	"sCursorSwResize": "s-cursor-sw-resize",
	"sCursorEwResize": "s-cursor-ew-resize",
	"sCursorNsResize": "s-cursor-ns-resize",
	"sCursorNeswResize": "s-cursor-nesw-resize",
	"sCursorNwseResize": "s-cursor-nwse-resize",
	"sCursorZoomIn": "s-cursor-zoom-in",
	"sCursorZoomOut": "s-cursor-zoom-out",
	"sCursorGrab": "s-cursor-grab",
	"sCursorGrabbing": "s-cursor-grabbing"
};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'cursor.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}