const _ = require('lodash');
const dateFormat = require('date-format');
const logger = require('node-color-log');
const path = require('node:path');
const process = require('node:process');
const util = require('node:util');

const { inspectOptions, root, roundNanoseconds } = require('./lib.cjs');

const start = process.hrtime();

logger.setDate(() => dateFormat('hh:mm:ss.SSS', new Date()));

const debug = (...args) => {
  let curriedLogger = _.curry(logger.debug.bind(logger), args.length);
  args.forEach((arg) => {
    let parsed = arg;
    if (_.isArrayLikeObject(arg)) {
      parsed = util.inspect(Array.from(arg), inspectOptions);
    } else if (_.isElement(arg)) {
      parsed = util.inspect(arg, inspectOptions);
    } else if (_.isObjectLike(arg)) {
      parsed = util.inspect(arg, inspectOptions);
    }
    curriedLogger = curriedLogger(parsed);
  });
};

logger.event = (name, ...args) => {
  logger.bold().color('black').append(`${name}: `).reset();

  switch (name) {
    case 'rename':
      args.splice(0, 0, 'from');
      args.splice(2, 0, 'to');
    default:
      debug(...args);
  }
};

logger.info = (...args) =>
  logger
    .color('white')
    .bgColor('blue')
    .append('[INFO]')
    .reset()
    .color('blue')
    .log(' ' + args.map((a) => a.toString()).join(' '));

logger.logSavedFile = (file, hrstart = start) => {
  const hrend = process.hrtime(hrstart);
  const relative = path.relative(root, file);
  logger
    .bgColor('green')
    .color('white')
    .append('SAVED:')
    .reset()
    .append(` ${relative} `)
    .bold()
    .log(`in ${roundNanoseconds(hrend[1])} s`);
};

logger.logSummaryFiles = (array, hrstart = start) => {
  const hrend = process.hrtime(hrstart);
  logger
    .color('green')
    .bold()
    .underscore()
    .log(`TOTAL: Prepared ${array.length} files in ${roundNanoseconds(hrend[1])} seconds`);
};

logger.logSuccess = (savedFile, hrstart = start) => {
  const hrend = process.hrtime(hrstart);
  logger
    .bgColor('green')
    .color('white')
    .append('SAVED:')
    .reset()
    .append(` ${savedFile} `)
    .bold()
    .log(`in ${roundNanoseconds(hrend[1])} s`);
};

logger.logSuccessOptimized = (savedFile, hrstart = start) => {
  const hrend = process.hrtime(hrstart);
  logger
    .bgColor('cyan')
    .append('OPTIMIZED:')
    .reset()
    .append(` ${savedFile} `)
    .bold()
    .log(`in ${roundNanoseconds(hrend[1])} s`);
};

module.exports = {
  default: logger,
  logger,
  debug
};
