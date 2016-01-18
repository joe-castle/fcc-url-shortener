'use strict';

const path = require('path');

const shortUrls = require('./url-to-json-file').shortUrls;
const writeFile = require('./url-to-json-file').writeFile;

module.exports = (url) => {
  let exists = shortUrls.find(x => x.original_url === url);
  if (exists) {
    return exists;
  }

  let rootPath = 'http://localhost:3000/'
    , shortUrl = (shortUrls.length).toString()
    , urlObj = {
      original_url: url,
      short_url: path.join(rootPath, shortUrl)
    };

  shortUrls.push(urlObj);
  writeFile(shortUrls);

  return urlObj;
}
