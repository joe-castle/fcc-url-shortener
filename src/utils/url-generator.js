'use strict';

const path = require('path');

const shortUrls = require('./json-read');
const writeFile = require('./json-write');

module.exports = (url, hostname) => {
  let exists = shortUrls.find(x => x.original_url === url);
  if (exists) {
    return exists;
  }

  if (hostname === '127.0.0.1' || hostname === 'localhost') {
    hostname = 'localhost:3000'
  }

  let rootPath = `http://${hostname}/`
    , shortUrl = (shortUrls.length).toString()
    , urlObj = {
      original_url: url,
      short_url: path.join(rootPath, shortUrl)
    };

  shortUrls.push(urlObj);
  writeFile(shortUrls);

  return urlObj;
}
