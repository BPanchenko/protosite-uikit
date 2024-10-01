const cssClassNames = {
	"cChart": "c-chart",
	"cChartAxis": "c-chart__axis",
	"cChartCanvas": "c-chart__canvas",
	"cChartControls": "c-chart__controls",
	"cChartGraph": "c-chart__graph",
	"dot": "dot",
	"handle": "handle",
	"line": "line",
	"point": "point",
	"pointHovered": "point--hovered",
	"tick": "tick"
};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'chart.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}