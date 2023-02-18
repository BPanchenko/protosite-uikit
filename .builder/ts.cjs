const { appendFileSync, existsSync, readFileSync, truncateSync } = require('fs');
const { logSuccess, logSummary } = require('./helpers.cjs');

const glob = require('glob');
const parser = require('css');
const path = require('path');
const logger = require('node-color-log');
const { camelCase, compact, flattenDeep, isEmpty, uniq } = require('lodash');

const ROOT = process.cwd();
const declareClassname = (...args) => `export const ${args[0]}: string = '${args[1]}';\n`;

// Input

const files = glob.sync('assets/**/*.css').map((file) => path.resolve(ROOT, file));

// Processing

files.forEach((file) => {
  const targetFile = getTargetFile(file);
  const relTargetFile = targetFile.replace(ROOT, '').replace(/^\\/, '');
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

  checkFile(targetFile);

  if (!isEmpty(clss)) {
    clss.forEach((cls) => appendFileSync(
      targetFile,
      declareClassname(camelCase(cls), cls.slice(1))
    ));
  } else {
    logger.warn(`File ${relTargetFile} is empty`);
  }

  logSuccess(relTargetFile);
});

logSummary(files);

// Helpers

function checkFile(file) {
  if (existsSync(file)) {
    truncateSync(file, 0);
  }
}

function getTargetFile(file) {
  const fileProps = path.parse(file);
  return path.join(fileProps.dir, fileProps.name + '.ts');
}
