'use strict';

const express = require('express');
const path = require('path');

const app = express();

const sug = require('../utils/shortUrlGenerator');

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/new/?*', (req, res) => {
  res.json(sug(req.params[0]))
});

module.exports = app;
