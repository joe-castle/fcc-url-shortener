'use strict';

const express = require('express');
const path = require('path');

const app = express();

// Calls url-generator after validating the response,
// unless the url is invalid or no string is passed,
// with the exception of passing ?allow=true.
const generate = require('../utils/url-validator');

app.set('trust proxy', true);

app.use('/', express.static(path.join(__dirname, '../public')));

// app.get('/:shortURL', (req, res) => {
//   res.status(302).json({error: 'error'});
//   // res.redirect('http://www.example.com');
// });

app.get('/new/*?', (req, res) => {
  res.json(generate(req.params[0], req.query.allow));
});

module.exports = app;
