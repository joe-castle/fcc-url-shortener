'use strict';

const shortUrls = require('./json-read');

module.exports = (url) => {
  return shortUrls[url] || false;
}
