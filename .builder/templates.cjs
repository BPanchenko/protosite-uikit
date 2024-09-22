const { camelCase, trim } = require('lodash');

function getEntries(array, serialized = false) {
  const entries = array.map((item) => {
    return [camelCase(item), item.replace('.', '')];
  });
  return serialized ? JSON.stringify(entries) : entries;
}

const cjsTemplate = (classNames, ref = '') =>
  trim(`
/// <reference path="./${ref}.d.mts" />

module.exports = ${JSON.stringify(Object.fromEntries(getEntries(classNames)), null, "\t")};
Object.defineProperty(module.exports, '__esModule', { value: true });

require('construct-style-sheets-polyfill');
const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, '${ref}.css');
const cssText = fs.readFileSync(file, 'utf-8');
module.exports.cssText = cssText;

const stylesheet = new CSSStyleSheet;
stylesheet.replaceSync(cssText);
module.exports.default = stylesheet;
`);

const mjsTemplate = (classNames, ref = '') => {
  const exportedClassNames = getEntries(classNames)
    .map(([name, value]) => `export const ${name} = '${value}';`)
    .join('\n');

  return trim(`
${exportedClassNames}

const file = import.meta.resolve("./${ref}.css");
export const cssText = await fetch(file).then((r) => r.text());

if (typeof CSSStyleSheet === undefined) {
	await import('construct-style-sheets-polyfill');
}
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(cssText);
export default stylesheet;
`);
};

const dmtsTemplate = (classNames, ref = '') => {
  const exportedClassNames = getEntries(classNames)
    .map(([name, _value]) => `export const ${name}: string;`)
    .join('\n');

  return trim(`
declare module "${ref}";
declare const stylesheet: CSSStyleSheet;

${exportedClassNames}

export const cssText: string;
export default stylesheet;
`);
};

module.exports = {
  cjsTemplate,
  dmtsTemplate,
  mjsTemplate
};
