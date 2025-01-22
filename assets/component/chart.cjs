const classNames = {
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

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, 'chart.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}