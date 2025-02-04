const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');
const { isEmpty } = require('lodash');
const { logger } = require('../logger.cjs');

const glob = require('glob');
const path = require('path');
const pluralize = require('pluralize');
const postcss = require('postcss');

const lightDomConfig = require('../../.config/postcss.light-dom.cjs');
const shadowDomConfig = require('../../.config/postcss.shadow-dom.cjs');

const ROOT = process.cwd();
const ADVANCED_FOLDERS = ['component', 'shadow-dom', 'style'];
const OUTPUT = path.resolve(ROOT, 'assets');

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
  const { folder, targetFile } = getTargetFile(file);
  const relTargetFile = targetFile.replace(ROOT, '').replace(/^\\/, '');
  const rawCss = readFileSync(file, { flag: 'r' });
  const isShadyCSS = folder === 'shadow-dom';

  const { parser, plugins } = isShadyCSS ? shadowDomConfig : lightDomConfig;

  checkFileDir(targetFile);
  return postcss(plugins)
    .process(rawCss, { from: file, to: targetFile, parser })
    .then((result) => {
      writeFileSync(targetFile, result.css, { flag: 'w' });
      logger.logSuccess(relTargetFile);
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

  if (fileProps.name === 'main' && !isEmpty(folder)) {
    // main.css in the root does not change
    // other main.css files are renamed and moved to the root

    if (folder === 'document') {
      fileName = folder;
    } else {
      fileName = pluralize.plural(folder);
    }
    folder = '';
  }

  const targetFile = path.join(OUTPUT, folder, fileName + fileProps.ext);

  return {
    folder,
    fileName,
    targetFile
  };
}
