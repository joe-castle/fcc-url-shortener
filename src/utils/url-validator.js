'use strict';

const isURL = require('validator').isURL;
const generateUrl = require ('./url-generator');

module.exports = (url, hostname, allow) => {
  if (isURL(url, {require_protocol: true})) {
    return generateUrl(url, hostname);
  } else if (isURL(url)) {
    return generateUrl(`http://${url}`, hostname);
  } else if (allow === 'true') {
    return generateUrl(url, hostname);
  } else {
    return { error: 'URL invalid' };
  }
};
