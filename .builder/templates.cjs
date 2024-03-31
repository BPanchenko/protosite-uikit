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
      case 'stylesheet':
      case 'default':
		const path = require('node:path');
        const { CSSStyleDeclaration } = require('cssstyle');
        const { readFileSync } = require('node:fs');

        const cssFilePath = path.join(__dirname, '${ref}.css');
        const cssText = readFileSync(cssFilePath, 'utf-8');
        const stylesheet = new CSSStyleDeclaration();
        stylesheet.cssText = cssText;
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
export const stylesheet: CSSStyleSheet | CSSStyleDeclaration;

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

const stylesheet = (async () => {
	const cssFileURL = import.meta.resolve("./${ref}.css");

	if (typeof CSSStyleSheet === 'undefined') {
		const { CSSStyleDeclaration } = (await import('cssstyle'));
		const { readFileSync } = (await import('node:fs'));
		const { fileURLToPath } = (await import('node:url'));
		const cssStyleDeclaration = new CSSStyleDeclaration();
		const cssText = readFileSync(fileURLToPath(cssFileURL), 'utf-8');
		cssStyleDeclaration.cssText = cssText;
		return cssStyleDeclaration;
	} else if (typeof CSSStyleSheet === 'function') {
		const cssStyleSheet = new CSSStyleSheet()
		const cssText = await fetch(cssFileURL).then(r => r.text());
		cssStyleSheet.replaceSync(cssText);
		return cssStyleSheet;
	}

	return Object.create(null);
})();

export default stylesheet;
`);
};

module.exports = {
  cjsTemplate,
  dtsTemplate,
  mjsTemplate
};
