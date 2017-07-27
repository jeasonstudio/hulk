const express = require('express');
const logger = require('morgan');

const bodyParser = require('body-parser');
const multer = require('multer');

const { HulkMiddleWare } = require('./Hulk');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(HulkMiddleWare);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// catch 404 and forward to error handler
app.use((req, res) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.send('404 Not Found');
});

module.exports = app;
