'use strict';

const client = require('./db-client');

module.exports = (callback) => {
  client.get('shortUrls', (err, data) => {
    if (err) throw err;
    callback(JSON.parse(data) || []);
  });
};
