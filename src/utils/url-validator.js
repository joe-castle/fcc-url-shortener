'use strict';

const isURL = require('validator').isURL;
const generateUrl = require ('./url-generator');

module.exports = (url, hostname, allow, callback) => {
  if (isURL(url, {require_protocol: true}) || allow === 'true') {
    generateUrl(url, hostname, callback);
  } else if (isURL(url)) {
    generateUrl(`http://${url}`, hostname, callback);
  } else {
    callback({ error: 'URL invalid' });
  }
};
