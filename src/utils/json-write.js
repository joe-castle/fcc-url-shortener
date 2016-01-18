'use strict';

const fs = require('fs');
const jsonPath = require('./json-path');

const writeFile = (jsonPath) => (
  (shortUrls) => {
    fs.writeFileSync(
      jsonPath,
      JSON.stringify(shortUrls),
      'utf8'
    );
  }
);

module.exports = jsonPath(writeFile);
