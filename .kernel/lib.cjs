const glob = require('glob');
const path = require('node:path');

const { existsSync, mkdirSync } = require('node:fs');

const inspectOptions = {
  depth: 3,
  compact: false,
  showHidden: true,
  sorted: true,
  showProxy: true,
  colors: true,
  maxArrayLength: 5,
  maxStringLength: 180,
  breakLength: 120
};

const root = process.cwd();

const checkFileDir = (filePath) => {
  const { dir } = path.parse(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return true;
};

const getFilesByPattern = (pattern, ignore) =>
  glob
    .sync(pattern, {
      dot: false,
      ignore
    })
    .map((file) => path.resolve(root, file));

const roundNanoseconds = (value) => Math.round(value / 1000000) / 1000;

module.exports = {
  checkFileDir,
  getFilesByPattern,
  inspectOptions,
  root,
  roundNanoseconds
};
