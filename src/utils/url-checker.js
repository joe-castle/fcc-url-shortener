'use strict';

const dbGet = require('../db/get');

module.exports = (url) => (
  dbGet.then(data => (data[url] || false))
)
