const { camelCase, trim } = require('lodash');

function getEntries(array, serialized = false) {
  const entries = array.map((item) => {
    return [camelCase(item), item.replace('.', '')];
  });
  return serialized ? JSON.stringify(entries) : entries;
}

const cjsTemplate = (classNames, ref = '') =>
  trim(`
const cssClassNames = ${JSON.stringify(Object.fromEntries(getEntries(classNames)), null, '\t')};

/** @type {CSSStyleSheet|null} */
const cssStyleSheet = null;

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, '${ref}.css');

/** @type {string|null} */
const cssText = fs.readFileSync(file, 'utf-8');

module.exports = {
	__esModule: true,
	default: cssText,
	cssStyleSheet,
	cssText,
	...cssClassNames

}
`);

const mjsTemplate = (classNames, ref = '') => {
  const exportedClassNames = getEntries(classNames)
    .map(([name, value]) => `/** @type {string} */\nexport const ${name} = '${value}';`)
    .join('\n');

  return trim(`
import importedCSS from './${ref}.css' with { type: 'css' }

${exportedClassNames}

/** @type {CSSStyleSheet|null} */
export const cssStyleSheet = importedCSS;
/** @type {string|null} */
export const cssText = null;

/** @type {CSSStyleSheet} */
export default cssStyleSheet;
`);
};

module.exports = {
  cjsTemplate,
  mjsTemplate
};
