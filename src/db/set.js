'use strict';

const client = require('./client');

module.exports = (shortUrls) => {
  client.set('shortUrls', JSON.stringify(shortUrls));
};
