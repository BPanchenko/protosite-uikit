const glob = require('glob');
const safe = require('postcss-safe-parser');
const path = require('node:path');
const { isEmpty, isArrayLike, chain } = require('lodash');
const { appendFileSync, existsSync, readFileSync, truncateSync } = require('fs');

const { logger, debug } = require('../logger.cjs');
const { cjsTemplate, mjsTemplate } = require('./templates.cjs');
const packageJson = require('../../package.json');

const ROOT = process.cwd();
const DIST = path.resolve(ROOT, 'assets');

const classNameRegex = /\.[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}/gi;

const takeClassNamesFromNodeList = (nodes) => {
  const result = [];
  for (const node of nodes) {
    if (node.type === 'atrule' && isArrayLike(node.nodes)) {
      result.push(...takeClassNamesFromNodeList(node.nodes));
      continue;
    }
    if (node.type === 'rule' && classNameRegex.test(node.selector)) {
      result.push(node.selector.match(classNameRegex));
      continue;
    }
  }
  return result;
};

// Input Processing

const files = glob.sync('assets/**/*.css', {
  root: DIST,
  absolute: true
});

files.forEach((absFilePath) => {
  const relFilePath = path.relative(DIST, absFilePath);

  // Parsing CSS
  const css = readFileSync(absFilePath, { flag: 'r' }).toString();
  const ast = safe(css);

  const classNames = chain(takeClassNamesFromNodeList(ast.nodes)).flattenDeep().compact().uniq().value();

  if (!isEmpty(classNames)) {
    const { name, dir, cjs: cjsFile, mjs: mjsFile } = getTargetOptions(absFilePath);
    const module = path.join(packageJson.name, path.relative(DIST, dir), name).split(path.sep).join(path.posix.sep);

    // CommonJS
    {
      checkFile(cjsFile);
      appendFileSync(cjsFile, cjsTemplate(classNames, name));
      logger.logSuccess(module + '.cjs');
    }

    // ES Module
    {
      checkFile(mjsFile);
      appendFileSync(mjsFile, mjsTemplate(classNames, name));
      logger.logSuccess(module + '.mjs');
    }
  } else {
    logger.warn(`File ${relFilePath} is empty`);
  }
});

logger.logSummaryFiles(files);

// Helpers

function checkFile(file) {
  if (existsSync(file)) {
    truncateSync(file, 0);
  }
}

function getTargetOptions(file) {
  const { dir, name } = path.parse(file);
  const cjs = path.join(dir, name + '.cjs');
  const mjs = path.join(dir, name + '.mjs');
  return {
    dir,
    name,
    cjs,
    mjs
  };
}
