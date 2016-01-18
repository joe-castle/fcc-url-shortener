'use strict';

const fs = require('fs');
const path = require('path');

let shortUrls, jsonPath;

if (process.env.NODE_ENV === 'test') {
  jsonPath = '../../test/short-urls-test.json';
  shortUrls = require(jsonPath);
} else {
  jsonPath = '../data/short-urls.json';
  shortUrls = require(jsonPath);
}

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
  fs.writeFileSync(
    path.join(__dirname, jsonPath),
    JSON.stringify(shortUrls),
    'utf8'
  );

  return urlObj;
}
