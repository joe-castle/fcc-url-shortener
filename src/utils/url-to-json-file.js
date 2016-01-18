'use strict';

const fs = require('fs');
const path = require('path');

let jsonPath;

if (process.env.NODE_ENV === 'test') {
  jsonPath = path.join(process.cwd(), 'test/short-urls-test.json');
} else {
  jsonPath = path.join(process.cwd(), 'src/data/short-urls.json');
}

const shortUrls = require(jsonPath);

const writeFile = (shortUrls) => {
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(shortUrls),
    'utf8'
  );
}

module.exports = {
  shortUrls,
  writeFile
}
