'use strict';

const isURL = require('validator').isURL;
const generateUrl = require ('./url-generator');

module.exports = (url, allow) => {
  if (!url) {
    return { error: 'No URL found' };
  }
  if (isURL(url, {require_protocol: true})) {
    return generateUrl(url);
  } else if (isURL(url)) {
    return generateUrl(`http://${url}`);
  } else if (allow === 'true') {
    return generateUrl(url);
  } else {
    return { error: 'URL invalid' };
  }
};
