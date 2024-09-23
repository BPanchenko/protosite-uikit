const { appendFileSync, existsSync, readFileSync, truncateSync } = require('fs');
const { logSuccess, logSummary } = require('./helpers.cjs');
const { cjsTemplate, dmtsTemplate, mjsTemplate } = require('./templates.cjs');
const packageJson = require('../package.json');

const glob = require('glob');
const parser = require('css');
const path = require('path');
const logger = require('node-color-log');
const { compact, flattenDeep, isEmpty, uniq } = require('lodash');

const ROOT = process.cwd();

// Input

const files = glob.sync('assets/**/*.css').map((file) => path.resolve(ROOT, file));

// Processing

files.forEach((source) => {
  // Parsing CSS

  const css = readFileSync(source, { flag: 'r' }).toString();
  const ast = parser.parse(css);
  const regex = /\.[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}/gi;

  let clss = ast.stylesheet.rules.map(({ selectors = [] }) => selectors.map((sel) => sel.match(regex)));

  clss = flattenDeep(clss);
  clss = compact(clss);
  clss = uniq(clss);
  clss.sort();

  if (!isEmpty(clss)) {
    const { dir, name, cjs: cjsFile, dmts: dmtsFile, mjs: mjsFile } = getTargetOptions(source);
    const module = path.join(path.relative(process.cwd(), dir), name).replaceAll('\\', '/').replace('assets', packageJson.name);

    // CommonJS
    {
      checkFile(cjsFile);
      appendFileSync(cjsFile, cjsTemplate(clss, name));
      logSuccess(module + '.cjs');
    }

    // ESM TS Declaration
    {
      checkFile(dmtsFile);
      appendFileSync(dmtsFile, dmtsTemplate(clss, module));
      logSuccess(module + '.d.mjs');
    }

    // ES Module
    {
      checkFile(mjsFile);
      appendFileSync(mjsFile, mjsTemplate(clss, name));
      logSuccess(module + '.mjs');
    }
  } else {
    const relSource = source.replace(ROOT, '').replace(/^\\/, '');
    logger.warn(`File ${relSource} is empty`);
  }
});

logSummary(files);

// Helpers

function checkFile(file) {
  if (existsSync(file)) {
    truncateSync(file, 0);
  }
}

function getTargetOptions(file) {
  const { dir, name } = path.parse(file);
  const dcts = path.join(dir, name + '.d.cts');
  const dmts = path.join(dir, name + '.d.mts');
  const cjs = path.join(dir, name + '.cjs');
  const mjs = path.join(dir, name + '.mjs');
  return {
    dir,
    name,
    dcts,
    dmts,
    cjs,
    mjs
  };
}
