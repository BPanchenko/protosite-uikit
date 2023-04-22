const { appendFileSync, existsSync, readFileSync, truncateSync } = require('fs');
const { logSuccess, logSummary } = require('./helpers.cjs');

const glob = require('glob');
const parser = require('css');
const path = require('path');
const logger = require('node-color-log');
const { camelCase, compact, flattenDeep, isEmpty, uniq } = require('lodash');

const ROOT = process.cwd();
const declaration = (...args) => `\treadonly ${args[0]}: string;\n`;
const definition = (...args) => `export const ${args[0]} = '${args[1]}';\n`;

// Input

const files = glob.sync('assets/**/*.css').map((file) => path.resolve(ROOT, file));

// Processing

files.forEach((file) => {
  const { dts: dtsFile, mjs: mjsFile } = getTargetFiles(file);
  const relDtsFile = dtsFile.replace(ROOT, '').replace(/^\\/, '');
  const relMjsFile = mjsFile.replace(ROOT, '').replace(/^\\/, '');
  const css = readFileSync(file, { flag: 'r' }).toString();
  const ast = parser.parse(css);
  const regex = /\.[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}/gi;

  let clss = ast.stylesheet.rules.map(({ selectors = [] }) =>
    selectors.map((sel) => sel.match(regex))
  );

  clss = flattenDeep(clss);
  clss = compact(clss);
  clss = uniq(clss);
  clss.sort();

  checkFile(dtsFile);
  checkFile(mjsFile);

  if (!isEmpty(clss)) {

    // 1. Prepend Static Code Row

    appendFileSync(
      dtsFile,
      'declare const ClassNames: {\n'
    );

    // 2. Append Generated Rows

    clss.forEach((cls) => {
      const className = cls.slice(1);
      const formatted = camelCase(cls);
      appendFileSync(
        dtsFile,
        declaration(formatted)
      );
      appendFileSync(
        mjsFile,
        definition(formatted, className)
      );
    });

    // 3. Append Static Code Block

    appendFileSync(
      dtsFile,
      [
        '};',
        'declare const stylesheet: CSSStyleSheet;',
        'export as namespace ClassNames;',
        'export default stylesheet;'
      ].join('\n')
    );
    appendFileSync(
      mjsFile,
      'export default (new CSSStyleSheet());'
    );

  } else {
    logger.warn(`File ${relMjsFile} is empty`);
  }

  logSuccess(relDtsFile);
  logSuccess(relMjsFile);
});

logSummary(files);

// Helpers

function checkFile(file) {
  if (existsSync(file)) {
    truncateSync(file, 0);
  }
}

function getTargetFiles(file) {
  const fileProps = path.parse(file);
  const pathWithoutExt = path.join(fileProps.dir, fileProps.name + fileProps.ext)
  return {
    dts: pathWithoutExt + '.d.ts',
    mjs: pathWithoutExt + '.mjs'
  };
}
