const classNames = {
	"cChart": "c-chart",
	"cChartCanvas": "c-chart__canvas",
	"cChartAxis": "c-chart__axis",
	"tick": "tick",
	"cChartGraph": "c-chart__graph",
	"line": "line",
	"point": "point",
	"dot": "dot",
	"handle": "handle",
	"pointHovered": "point--hovered",
	"cChartControls": "c-chart__controls"
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