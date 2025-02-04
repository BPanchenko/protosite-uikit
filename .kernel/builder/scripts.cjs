const glob = require('glob');
const safe = require('postcss-safe-parser');
const path = require('path');
const { compact, flattenDeep, isEmpty, uniq } = require('lodash');
const { appendFileSync, existsSync, readFileSync, truncateSync } = require('fs');

const { logger } = require('../logger.cjs');
const { cjsTemplate, mjsTemplate } = require('./templates.cjs');
const packageJson = require('../../package.json');

const ROOT = process.cwd();

// Input

const files = glob.sync('assets/**/*.css').map((file) => path.resolve(ROOT, file));

// Processing

files.forEach((source) => {
  // Parsing CSS

  const css = readFileSync(source, { flag: 'r' }).toString();
  const ast = safe(css);
  const regex = /\.[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}/gi;

  let clss = ast.nodes.map((node) => node.selector && node.selector.match(regex));

  clss = flattenDeep(clss);
  clss = compact(clss);
  clss = uniq(clss);
  clss.sort();

  if (!isEmpty(clss)) {
    const { dir, name, cjs: cjsFile, mjs: mjsFile } = getTargetOptions(source);
    const module = path.join(path.relative(process.cwd(), dir), name).replaceAll('\\', '/').replace('assets', packageJson.name);

    // CommonJS
    {
      checkFile(cjsFile);
      appendFileSync(cjsFile, cjsTemplate(clss, name));
      logger.logSuccess(module + '.cjs');
    }

    // ES Module
    {
      checkFile(mjsFile);
      appendFileSync(mjsFile, mjsTemplate(clss, name));
      logger.logSuccess(module + '.mjs');
    }
  } else {
    const relSource = source.replace(ROOT, '').replace(/^\\/, '');
    logger.warn(`File ${relSource} is empty`);
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
