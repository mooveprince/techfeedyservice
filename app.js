var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var phRoute = require('./routes/phroute');
var hackernewsRoute = require('./routes/hackernewsroute');
var techcrunchRoute = require('./routes/techcrunchroute');
var techmemeRoute = require('./routes/techmemeroute');
var tweetRoute = require ('./routes/tweetroute');
<<<<<<< HEAD
var yoRoute = require ('./routes/yoroute');
=======
>>>>>>> a0824e086c2484cfaf54a0919ded2c7a1ae30e8e

var app = express();

//Create WriteStream for logs
var appLogStream = fs.createWriteStream(__dirname + '/applog.log', {flags: 'a'})

app.use(logger('combined', {stream: appLogStream, skip: function (req, res) { return res.statusCode < 400 }}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/producthunt', phRoute);
app.use('/hackernews',hackernewsRoute);
app.use('/techcrunch',techcrunchRoute);
app.use('/techmeme',techmemeRoute);
app.use('/tweet', tweetRoute);
<<<<<<< HEAD
app.use('/yo', yoRoute);
=======
>>>>>>> a0824e086c2484cfaf54a0919ded2c7a1ae30e8e

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
