'use strict';

const validUrl = require('valid-url');
const path = require('path');

const shortUrls = [];

const generateShortUrl = (url) => {
  let urlObj = {
    original_url: url
  }
  let rootPath = 'http://localhost:3000/'
  shortUrls.push(urlObj);
  let shortUrl = (shortUrls.length-1).toString();
  shortUrls[shortUrls.length-1]['short_url'] = path.join(rootPath, shortUrl);

  return shortUrls[shortUrls.length-1];
}

module.exports = (url) => {
  if (!url) {
    return {
      error: 'No URL found'
    }
  }

  if (validUrl.isUri(url)) {
    return generateShortUrl(url);
  } else {
    return {
      error: 'URL invalid'
    }
  }
};
