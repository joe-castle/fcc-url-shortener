'use strict';

const client = require('./db-client');

const writeFile = (shortUrls) => {
  client.set('shortUrls', JSON.stringify(shortUrls));
};

module.exports = writeFile;
