const { camelCase, trim } = require('lodash');

function getEntries(array, serialized = false) {
  const entries = array.map((item) => {
    return [camelCase(item), item.replace('.', '')];
  });
  return serialized ? JSON.stringify(entries) : entries;
}

const cjsTemplate = (classNames, ref = '') =>
  trim(`
const classNames = ${JSON.stringify(Object.fromEntries(getEntries(classNames)), null, '\t')};

const path = require('node:path');
const fs = require('node:fs');
const file = path.join(__dirname, '${ref}.css');

/** @type {string} */
const content = fs.readFileSync(file, 'utf-8');

module.exports = {
	default: content,
	content,
	...classNames
}
`);

const mjsTemplate = (classNames, ref = '') => {
  const exportedClassNames = getEntries(classNames)
    .map(([name, value]) => `/** @type {string} */\nexport const ${name} = '${value}';`)
    .join('\n');

  return trim(`
import importedCSS from './${ref}.css' with { type: 'css' }

${exportedClassNames}

/** @type {CSSStyleSheet} */
export const styleSheet = importedCSS;

/** @type {CSSStyleSheet} */
export default styleSheet;
`);
};

module.exports = {
  cjsTemplate,
  mjsTemplate
};
