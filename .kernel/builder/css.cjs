const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');
const { isEmpty } = require('lodash');
const { logger } = require('../logger.cjs');

const glob = require('glob');
const path = require('path');
const pluralize = require('pluralize');
const postcss = require('postcss');

const packageJson = require('../../package.json');
const { parser, initConfig } = require('#config/postcss.config.cjs');

const ROOT = process.cwd();
const ADVANCED_FOLDERS = ['component', 'element', 'shadow-dom', 'style'];
const DIST = path.resolve(ROOT, 'assets');

// Input

const patterns = (() => {
  const packageJson = JSON.parse(readFileSync(path.resolve(ROOT, 'package.json'), { flag: 'r' }));

  const regex1 = /^([-\w]+)\/\*$/i;
  const regex2 = /[^-\w]+/i;

  return packageJson.files
    .filter((row) => regex1.test(row))
    .map((row) => {
      let pattern = row.replace(regex2, '');
      if (ADVANCED_FOLDERS.includes(pattern)) {
        pattern += '/*.css';
      } else {
        pattern += '/main.css';
      }
      return pattern;
    });
})();

const files = glob
  .sync(`{${patterns.join(',')},main.css}`, {
    dot: false,
    ignore: ['assets/**', 'settings/**']
  })
  .map((file) => path.resolve(ROOT, file));

// Processing

const promises = files.map((file) => {
  const { absTargetPath, folder } = getTargetFile(file);

  const relTargetPath = path.relative(ROOT, absTargetPath);

  const module = path.join(packageJson.name, relTargetPath).split(path.sep).join(path.posix.sep);
  const rawCss = readFileSync(file, { flag: 'r' });
  const isShadyCSS = folder === 'shadow-dom';
  const isScopedModule = false === isEmpty(folder);

  const { plugins } = initConfig({
    adaptToShadowDOM: isShadyCSS,
    removeUnusedVariables: isScopedModule
  });

  checkFileDir(absTargetPath);
  return postcss(plugins)
    .process(rawCss, { from: file, to: absTargetPath, parser })
    .then((result) => {
      writeFileSync(absTargetPath, result.css, { flag: 'w' });
      logger.logSuccess(module);
    })
    .catch((error) => {
      logger.error(error);
    });
});

Promise.allSettled(promises).then((results) => {
  logger.logSummaryFiles(results);
});

// Helpers

function checkFileDir(file) {
  const fileProps = path.parse(file);
  if (!existsSync(fileProps.dir)) {
    mkdirSync(fileProps.dir, { recursive: true });
  }
}

function getTargetFile(file) {
  const fileProps = path.parse(file);
  let folder = fileProps.dir.replace(ROOT, '').replace('\\', '');
  let fileName = fileProps.name;

  if (fileProps.name === 'main' && false === isEmpty(folder)) {
    fileName = pluralize.plural(folder);
    folder = '';
  }

  const absTargetPath = path.join(DIST, folder, fileName + fileProps.ext);

  return {
    absTargetPath,
    fileName,
    folder
  };
}
