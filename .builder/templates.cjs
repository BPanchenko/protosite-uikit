const { camelCase, trim } = require('lodash');

function getEntries(array, serialized = false) {
  const entries = array.map((item) => {
    return [camelCase(item), item.replace('.', '')];
  });
  return serialized ? JSON.stringify(entries) : entries;
}

const cjsTemplate = (classNames, ref = '') =>
  trim(`
/// <reference path="${ref}.d.ts" />
const classNames = new Map(${getEntries(classNames, true)});

module.exports = new Proxy(classNames, {
  get(target, attr) {
    switch (attr) {
      case '__esModule':
        return true;
      case 'default':
        const css = require('fs').readFileSync(${ref});
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
`);

const dtsTemplate = (classNames) => {
  const exportedClassNames = getEntries(classNames)
    .map(([name, _value]) => `export const ${name}: string;`)
    .join('\n');

  return trim(`
${exportedClassNames}

declare const stylesheet: CSSStyleSheet;
export default stylesheet;
  `);
};

const mjsTemplate = (classNames, ref = '') => {
  const exportedClassNames = getEntries(classNames)
    .map(([name, value]) => `export const ${name} = '${value}';`)
    .join('\n');

  return trim(`
/// <reference path="${ref}.d.ts" />
${exportedClassNames}

const stylesheet = new CSSStyleSheet();
export default stylesheet;
  `);
};

module.exports = {
  cjsTemplate,
  dtsTemplate,
  mjsTemplate
};
