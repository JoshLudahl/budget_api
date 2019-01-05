const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const morgan = require('morgan');

app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useCreateIndex: true});
mongoose.Promise = global.Promise;

//  CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

//  Paths and views
app.set('views', path.join(__dirname, '/public/views/'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', require('./api/routes/routes'));

//  Handle errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err
  });
});

module.exports = app;