const { round } = require('lodash');
const logger = require('node-color-log');

const start = process.hrtime();

function logError(error) {
  logger.error(error);
}

function logSuccess(savedFile, hrstart = start) {
  const hrend = process.hrtime(hrstart);
  logger
    .bgColor('green')
    .color('white')
    .log('SAVED:')
    .joint()
    .log(` ${savedFile} `)
    .joint()
    .bold()
    .log(`in ${roundNanoseconds(hrend[1])} s`);
}

function logSummary(array, hrstart = start) {
  const hrend = process.hrtime(hrstart);
  logger.log('');
  logger
    .bgColor('white')
    .color('black')
    .log(`Total: processed ${array.length} files in ${roundNanoseconds(hrend[1])} seconds`);
}

function roundNanoseconds(value) {
  return round(value / 1000000000, 3);
}

module.exports = {
  logError,
  logSuccess,
  logSummary
};
