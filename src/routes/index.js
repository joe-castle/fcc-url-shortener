'use strict';

const express = require('express');
const path = require('path');

const app = express();

// Calls url-generator after validating the response,
// unless the url is invalid or no string is passed,
// with the exception of passing ?allow=true.
const generate = require('../utils/url-validator');
const checker = require('../utils/url-checker');

app.set('trust proxy', true);

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/:shortURL', (req, res) => {
  let exists = checker(req.params.shortURL);
  if (exists) {
    res.redirect(exists.original_url);
  } else {
    res.status(404).json({error: 'No short url found for that query.'});
  }
});

app.get('/new/*', (req, res) => {
  res.json(generate(req.params[0], req.hostname, req.query.allow));
});

module.exports = app;
