'use strict';

const isURL = require('validator').isURL;
const generateUrl = require ('./url-generator');

module.exports = (url) => {
  if (isURL(url, {require_protocol: true})) {
    return url;
  } else if (isURL(url)) {
    return `http://${url}`;
  } else {
    return;
  }
};
