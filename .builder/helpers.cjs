const { existsSync, mkdirSync } = require('fs');
const { round } = require('lodash');
const logger = require('node-color-log');
const path = require('path');

const start = process.hrtime();

function checkFileDir(file) {
  const fileProps = path.parse(file);
  if (!existsSync(fileProps.dir)) {
    mkdirSync(fileProps.dir, { recursive: true });
  }
}

function logError(error) {
  logger.error(error);
}

function logSuccess(savedFile, hrstart = start) {
  const hrend = process.hrtime(hrstart);
  logger.bgColor('green').color('white').log('SAVED:').joint()
    .log(` ${savedFile} `).joint()
    .bold().log(`in ${roundNanoseconds(hrend[1])} s`);
}

function logSummary(array, hrstart = start) {
  const hrend = process.hrtime(hrstart);
  logger.log('');
  logger.bgColor('white').color('black')
    .log(`Total: processed ${array.length} files in ${roundNanoseconds(hrend[1])} seconds`);
}

function roundNanoseconds(value) {
  return round(value / 1000000000, 3);
}

module.exports = {
  checkFileDir,
  logError,
  logSuccess,
  logSummary
};
