const { appendFileSync, existsSync, readFileSync, truncateSync } = require('fs');
const { logSuccess, logSummary } = require('./helpers.cjs');

const glob = require('glob');
const parser = require('css');
const path = require('path');
const logger = require('node-color-log');
const { camelCase, compact, flattenDeep, isEmpty, uniq } = require('lodash');

const ROOT = process.cwd();
const declaration = (...args) => `export const ${args[0]}: string;\n`;
const definition = (...args) => `export const ${args[0]} = '${args[1]}';\n`;

// Input

const files = glob.sync('assets/**/*.css').map((file) => path.resolve(ROOT, file));

// Processing

files.forEach((source) => {
  const { name, dts: dtsFile, mjs: mjsFile } = getTargetOptions(source);
  const relDtsFile = dtsFile.replace(ROOT, '').replace(/^\\/, '');
  const relMjsFile = mjsFile.replace(ROOT, '').replace(/^\\/, '');
  const css = readFileSync(source, { flag: 'r' }).toString();
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
      mjsFile,
      `/// <reference path="${name}.d.ts" />\n`
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
      `\n\n${[
        'declare const stylesheet: CSSStyleSheet;',
        'export default stylesheet;'
      ].join('\n')}\n`
    );
    appendFileSync(
      mjsFile,
      `\n\n${[
        'const stylesheet = new CSSStyleSheet();',
        'export default stylesheet;'
      ].join('\n')}\n`
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

function getTargetOptions(file) {
  const fileProps = path.parse(file);
  const fileName = fileProps.name + fileProps.ext;
  const dts = path.join(fileProps.dir, fileName + '.d.ts')
  const mjs = path.join(fileProps.dir, fileName + '.mjs')
  return {
    name: fileName,
    dts,
    mjs
  };
}
