'use strict';

const path = require('path');

let jsonPath;

if (process.env.NODE_ENV === 'test') {
  jsonPath = path.join(process.cwd(), 'test/short-urls-test.json');
} else {
  jsonPath = path.join(process.cwd(), 'src/data/short-urls.json');
}

module.exports = (callback) => {
  return callback(jsonPath);
}
