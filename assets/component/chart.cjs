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
      case 'stylesheet':
      case 'default':
        const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, 'chart.css');
        const cssText = readFileSync(cssFilePath, 'utf-8');
        const stylesheet = new CSSStyleDeclaration();
        stylesheet.cssText = cssText;
        return stylesheet;

      default:
        return target.get(attr.toString());
    }
  },
  getPrototypeOf() {
    return Object;
  }
});
