const { existsSync, readFileSync, mkdirSync, writeFileSync } = require('fs');
const { isEmpty, round } = require('lodash');

const glob = require('glob');
const logger = require('node-color-log');
const path = require('path');
const pluralize = require('pluralize');
const postcss = require('postcss');
const postcssConfig = require('../.config/postcss.config.cjs');

const ROOT = process.cwd();
const ADVANCED_FOLDERS = ['component', 'style'];
const OUTPUT = path.resolve(ROOT, 'assets');

// Input

const patterns = (() => {
  const packageJson = JSON.parse(
  readFileSync(path.resolve(ROOT, 'package.json'), { flag: 'r' })
  );

  const regex1 = /^([\w]+)\/\*$/i;
  const regex2 = /[^\w]+/i;

  return packageJson.files
    .filter(row => regex1.test(row))
    .map(row => {
    let pattern = row.replace(regex2, '')
    if (ADVANCED_FOLDERS.includes(pattern)) {
      pattern += '/*.css';
    } else {
      pattern += '/main.css';
    }
    return pattern
  })
})();

const files = glob
  .sync(`{${patterns.join(',')},main.css}`, {
    dot: false,
	ignore: ['assets/**', 'settings/**']
  })
  .map(file => path.resolve(ROOT, file));

// Processing
const hrstart = process.hrtime()

const promises = files.map(file => {
  const targetFile = getTargetFile(file);
  const relTargetFile = targetFile.replace(ROOT, '').replace(/^\\/, '');
  const css = readFileSync(file, { flag: 'r' });

  checkFileDir(targetFile);
  
  return postcss(postcssConfig.plugins)
    .process(css, { from: file, to: targetFile })
    .then(result => {
      writeFileSync(targetFile, result.css, { flag: 'w' });
      logSuccess(relTargetFile);
    }).catch(error => {
      logger.error(error);
    });
});

Promise.allSettled(promises).then(results => {
  logSummary(results);
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
  let fileName = fileProps.name

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
  
  return path.join(OUTPUT, folder, fileName + fileProps.ext);
}

function logSuccess(savedFile) {
  const hrend = process.hrtime(hrstart);
  logger.bgColor('green').color('white').log('SAVED:').joint()
    .log(` ${savedFile} `).joint()
    .bold().log(`in ${roundNanoseconds(hrend[1])} s`);
}

function logSummary(array) {
  const hrend = process.hrtime(hrstart);
  logger.log('');
  logger.bgColor('white').color('black')
    .log(`Total: processed ${array.length} files in ${roundNanoseconds(hrend[1])} seconds`);
}

function roundNanoseconds(value) {
  return round(value / 1000000000, 3);
}
