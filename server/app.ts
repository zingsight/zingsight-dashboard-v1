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

// import { loginRouter } from './routes/login';
import { protectedRouter } from './routes/protected';
import { publicRouter } from './routes/public';
import { feedRouter } from './routes/feed';

let app: express.Application = express();

// app.set('dbUrl', db);
// we're going to use mongoose to interact with the mongodb
mongoose.connect(db);
// passport strategies setup
require('./passport').setupStrategies(passport);

app.use(session({
    secret: 'ilovezingsight',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.disable('x-powered-by');

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// allow cors only for local dev
app.use(cors({
  origin: 'http://localhost:4200'
}));

// app.set('env', 'production');

// public directories setup
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// api routes

app.use('/api/secure', protectedRouter);
require('./routes/login')(app, passport);
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
