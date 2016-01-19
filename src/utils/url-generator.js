'use strict';

const path = require('path');

const dbGet = require('./db-get');
const writeFile = require('./db-set');

module.exports = (url, hostname, callback) => {
  dbGet((data) => {
    let exists = data.find(x => x.original_url === url);
    if (exists) {
      callback(exists);
      return;
    }

    if (hostname === '127.0.0.1' || hostname === 'localhost') {
      hostname = 'localhost:3000'
    }

    let rootPath = `http://${hostname}/`
      , shortUrl = (data.length).toString()
      , urlObj = {
        original_url: url,
        short_url: path.join(rootPath, shortUrl)
      };

    data.push(urlObj);
    writeFile(data);

    callback(urlObj);
  })
}
