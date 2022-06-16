var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// this line is required to attach a session to all requests
var session = require('express-session');

// for integerating mysql db to the webapp
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// creating the dbconnectionpool to integerate sql database into the webapp
var dbConnectionPool = mysql.createPool({
  host: 'localhost',
  database: 'task1_3'
});

app.use(function(req, res, next) {
  req.pool = dbConnectionPool;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// this ensures that all user related requests ie requests that begin with /users is handles from user.js
// this is just to split the middlewares from having it all in app.js to having some in app.js and some in users.js
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
