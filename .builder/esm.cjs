const { appendFileSync, existsSync, readFileSync, truncateSync } = require('fs');
const { logSuccess, logSummary } = require('./helpers.cjs');
const { cjsTemplate, dtsTemplate, mjsTemplate } = require('./templates.cjs');

const glob = require('glob');
const parser = require('css');
const path = require('path');
const logger = require('node-color-log');
const { camelCase, compact, flattenDeep, isEmpty, uniq } = require('lodash');

const ROOT = process.cwd();
const declaration = (...args) => `\n`;
const definition = (...args) => `export const ${args[0]} = '${args[1]}';\n`;

// Input

const files = glob.sync('assets/**/*.css').map((file) => path.resolve(ROOT, file));

// Processing

files.forEach((source) => {

  // Parsing CSS

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

  if (!isEmpty(clss)) {
    const { name, cjs: cjsFile, dts: dtsFile, mjs: mjsFile } = getTargetOptions(source);

    checkFile(cjsFile);
    checkFile(dtsFile);
    checkFile(mjsFile);

    appendFileSync(
      cjsFile,
      cjsTemplate(clss, name)
    );
    appendFileSync(
      dtsFile,
      cjsTemplate(clss)
    );
    appendFileSync(
      mjsFile,
      cjsTemplate(clss, name)
    );

  } else {
    const relSource = dtsFile.replace(ROOT, '').replace(/^\\/, '');
    logger.warn(`File ${relSource} is empty`);
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
  const cjs = path.join(fileProps.dir, fileName + '.cjs')
  const mjs = path.join(fileProps.dir, fileName + '.mjs')
  return {
    name: fileName,
    dts,
    cjs,
    mjs
  };
}
