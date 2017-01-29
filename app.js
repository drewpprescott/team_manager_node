var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var passport = require('passport');
var expressSession = require('express-session')
var flash = require('connect-flash');
var moment = require('moment');

var index = require('./routes/index');
var event = require('./routes/event');
var login = require('./routes/login');
var home = require('./routes/home');
var createAccount = require('./routes/create-account');
var schedule = require('./routes/schedule');
var logout = require('./routes/logout');
var planning = require('./routes/planning');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({ secret: 'somesecretstring' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.locals.moment = require('moment');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    request('http://localhost:8080/user/' + id, function (err, httpResponse, user) {
        done(err, JSON.parse(user));
    });
});

app.use('/', index);
app.use('/event', event);
app.use('/login', login);
app.use('/home', home);
app.use('/create-account', createAccount);
app.use('/schedule', schedule);
app.use('/logout', logout);
app.use('/planning', planning);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
