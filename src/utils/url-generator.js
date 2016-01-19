'use strict';

const path = require('path');

const dbGet = require('../db/get');
const dbSet = require('../db/set');

module.exports = (url, hostname, allow) => (
  dbGet.then((data) => {
    let exists = data.find(x => x.original_url === url);
    if (exists) { return exists; }

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
    dbSet(data);

    return urlObj;
  })
);
