const glob = require('glob');
const path = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { logger } = require('../logger.cjs');
const { minify } = require('csso');

const ROOT = process.cwd();

const files = glob.sync('assets/**/*.css').map((file) => path.resolve(ROOT, file));

// Processing

files.forEach((file) => {
  const relTargetFile = file.replace(ROOT, '').replace(/^\\/, '');
  const rawCss = readFileSync(file, { flag: 'r', encoding: 'utf-8' });
  const minifiedCss = minify(rawCss).css;
  writeFileSync(file, minifiedCss, { flag: 'w' });
  logger.logSuccessOptimized(relTargetFile);
});

logger.logSummaryFiles(files);
