'use strict';

const express = require('express');
const path = require('path');

const app = express();

const validate = require('../utils/url-validator');
const generate = require('../utils/url-generator');
const checker = require('../utils/url-checker');

app.set('trust proxy', true);

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/:shortURL', (req, res) => {
  checker(req.params.shortURL)
    .then((exists) => {
      if (exists) {
        res.redirect(exists.original_url);
      } else {
        res.status(404).json({error: 'No short url found for that query.'});
      }
    });
});

app.get('/new/*', (req, res) => {
  let validUrl = validate(req.params[0]);
  if (validUrl || req.query.allow) {
    generate((validUrl || req.params[0]), req.hostname)
      .then((data) => {
        res.json(data);
      });
  } else {
    res.json({error: 'URL invalid'});
  }
});

module.exports = app;
