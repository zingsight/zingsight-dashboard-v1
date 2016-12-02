/// <reference path='../src/typings.d.ts' />

import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import * as compression from 'compression';
import * as passport from 'passport';
import * as session from 'express-session';
import * as mongoose from 'mongoose';
let flash = require('connect-flash');

import {db} from './config';

import { loginRouter } from './routes/login';
import { signupRouter } from './routes/signup';
import { protectedRouter } from './routes/protected';
import { publicRouter } from './routes/public';
import { feedRouter } from './routes/feed';

var passportConfig = require('./passport'); // all passport configuration and provider logic

let app: express.Application = express();

app.disable('x-powered-by');

// allow cors only for local dev
// app.use(cors({
//   origin: 'http://localhost:4200'
// }));

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));
app.use(session({
    secret: 'ilovezingsight',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

// passport strategies setup
app.use(passport.initialize());
app.use(passport.session());

// require('./passport').setupStrategies(passport);

// app.set('dbUrl', db);
// we're going to use mongoose to interact with the mongodb
require('mongoose').Promise = global.Promise;
mongoose.connect(db);

// app.set('env', 'production');

// public directories setup
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// api routes

app.get('/', function(req, res) {
  console.log('<< REQUEST >>');
});

app.use('/api/secure', protectedRouter);
app.use('/api/login', loginRouter);
app.use('/api/signup', signupRouter);
// require('./routes/login')(app, passport);
app.use('/api/public', publicRouter);
app.use('/api/feed', feedRouter);

if (app.get('env') === 'production') {

  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, '/../client')));
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
  let err = new Error('Not Found');
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

export { app }
