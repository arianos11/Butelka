const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const db = require('./config/db');

//Passport config
require('./config/passport')(passport);

const indexRouter = require('./routes/index');
const dupaRouter = require('./routes/dupa');
const authorizationRouter = require('./routes/authorization');

const app = express();

process.env.TZ = 'Europe/Amsterdam' 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.use('/api', indexRouter);
app.use('/api/dupa', dupaRouter);
app.use('/api/authorization', authorizationRouter);
// app.use('/', (req, res) => {res.send("work")})

/*  Poniżej kod usuwający errory chyba że włączysz development w zmiennych */

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;