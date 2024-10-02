const { round } = require('lodash');
const logger = require('node-color-log');

const start = process.hrtime();

function logError() {
  logger.error(...arguments);
}

function logSuccess(savedFile, hrstart = start) {
  const hrend = process.hrtime(hrstart);
  logger
    .bgColor('green')
    .color('white')
    .append('SAVED:')
    .reset()
    .append(` ${savedFile} `)
    .bold()
    .log(`in ${roundNanoseconds(hrend[1])} s`);
}

function logSummary(array, hrstart = start) {
  const hrend = process.hrtime(hrstart);
  logger
    .color('green')
    .bold()
    .underscore()
    .log(`TOTAL: Prepared ${array.length} files in ${roundNanoseconds(hrend[1])} seconds`);
}

function roundNanoseconds(value) {
  return round(value / 1000000000, 3);
}

module.exports = {
  logError,
  logSuccess,
  logSummary
};
