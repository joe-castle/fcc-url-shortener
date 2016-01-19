'use strict';

const client = require('./client');

module.exports = (
  client.getAsync('shortUrls')
    .then(res => (JSON.parse(res) || []))
);
