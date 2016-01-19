'use strict';

const dbGet = require('./db-get');

module.exports = (url, callback) => {
  dbGet((data) => {
    callback(data[url] || false);
  })
}
