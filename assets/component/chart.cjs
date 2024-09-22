/// <reference path="./chart.d.mts" />

module.exports = {
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
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'chart.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;