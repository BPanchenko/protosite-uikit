/// <reference path="chart.css.d.ts" />
const classNames = new Map([
  ['cChart', 'c-chart'],
  ['cChartAxis', 'c-chart__axis'],
  ['cChartCanvas', 'c-chart__canvas'],
  ['cChartControls', 'c-chart__controls'],
  ['cChartGraph', 'c-chart__graph'],
  ['dot', 'dot'],
  ['handle', 'handle'],
  ['line', 'line'],
  ['point', 'point'],
  ['pointHovered', 'point--hovered'],
  ['tick', 'tick']
]);

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(chart.css);
        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(css);
        return stylesheet;
      default:
        return target.get(attr);
    }
  },
  getPrototypeOf() {
    return Object;
  }
});
