import { Router, Response, Request } from 'express';
import * as uuid from 'node-uuid';
var express = require('express');
var router = express.Router();
var passport = require('passport');
var winston = require('winston');

const loginRouter: Router = Router();

loginRouter.post('/', (request: Request, response: Response, next: Function) => {
    winston.level = 'info';
    winston.log('info', 'loginRouter: post/local, user: ' + request.body.username + '| ' + request.body.password);

    passport.authenticate('local-login', function (error, user, info) {
        winston.log('info', 'loginRouter: passport/callback');
        winston.log('info', 'Passport response: ' + JSON.stringify(error) + '| ' + JSON.stringify(user) + '| ' + JSON.stringify(info));
        if (!user) {
            response.status(401);
            response.json({ 'reason': 'Invalid credentials' });
        } else {
            /**
             * "Login" user officially, and return proper response
             * if there is an error logging the user in (500)
             */
            request.logIn(user, function (error) {
                if (error) {
                    response.status(500);
                    response.json({ 'error': 'Server error' });
                }
            });

            return response.json(user);
            /**
             * Here, request.user is our full user object, production
             * information/details and all. What we want to do is 'truncate'
             * the user object into a public user object as per the standards
             * that make a user object public worthy. This is defined in our
             * getUserPublic controller
             */
            // return getUserPublicController(user.id).then(function(user) {
            //   return response.json(user);
            // }).catch(function(error) {
            //   return response.json(error);
            // });
        }
    })(request, response, next);

});

export { loginRouter }







// // import * as console from 'console';
// module.exports = function (app, passport) {

//     var winston = require('winston');

//     app.post('/api/hello', (request, response) => {
//         response.send('Hello!');
//     });

//     app.post('/api/signup', passport.authenticate('local-signup', {
//         successRedirect: 'http://localhost:4200/#/dashboard',
//         failureRedirect: 'http://localhost:4200/#/fail',
//         failureFlash: true
//     }));

//     app.post('/api/login', passport.authenticate('local-login', {
//         successRedirect: '/api/localcallback',
//         failureRedirect: '/api/fail',
//         failureFlash: true
//     }));

//     app.get('/api/fail', (request, response) => {
//         winston.level = 'info';
//         winston.log('info', 'user ' + request.user);
//         response.send('Nope!');
//     });

//     app.get('/api/localcallback', (request, response) => {
//         winston.level = 'info';
//         winston.log('info', 'user ' + request.user);
//         response.send('Hey!');
//     });

//     // app.post('/api/login', passport.authenticate('local-login'), function (req, res) {
//     //     winston.level = 'info';
//     //     winston.log('info', 'user ' + req.user);
//     // });

//     // app.post('/api/login', function (request, response) {
//     //     passport.authenticate('local-login', function (error, user, info) {
//     //     winston.level = 'info';
//     //     winston.log('info', 'Passport response: ' + JSON.stringify(error) + '| ' + JSON.stringify(user) + '| ' + JSON.stringify(info));
//     //         if (!user) {
//     //             response.status(401);
//     //             response.json({ 'reason': 'Invalid credentials' });
//     //         } else {
//     //             response.status(200);
//     //         }
//     //     })(request, response);
//     // });

//     // app.post('/api/login', function (req, res, next) {
//     //     passport.authenticate('local-login', function (err, user, info) {
//     //         console.log('API: err, user, info: ' + JSON.stringify(err) + ' | user: '
//     //         + JSON.stringify(user) + ' | info' + JSON.stringify(info) + ' |');
//     //         res.stats(200).body('We did it!');
//     //     })(req, res, next);
//     // });

//     // app.post('/api/login', passport.authenticate('local-login', {
//     //     successRedirect: 'http://localhost:4200/#/dashboard',
//     //     failureRedirect: 'http://localhost:4200/#/fail',
//     //     failureFlash: true
//     // }));

//     //  app.post('/api/login',
//     //  passport.authenticate('local-login',
//     //  function(err, user) {
//     //      console.log('Passport Login Response: ' + user);
//     //     }));

// };











// // import { Router, Request, Response, NextFunction } from 'express';
// // import { randomBytes, pbkdf2 } from 'crypto';
// // import { sign } from 'jsonwebtoken';
// // import { secret, length, digest } from '../config';

// // import express = require('express');
// // // const passport = require('passport');

// // const loginRouter: Router = Router();

// // // const user = {
// // //     hashedPassword: '6fb3a68cb5fe34d0c2c9fc3807c8fa9bc0e7dd10023065ea4233d40a2d6bb4a' +
// // //     '7e336a82f48bcb5a7cc95b8a590cf03a4a07615a226d09a89420a342584a' +
// // //     'a28748336aa0feb7ac3a12200d13641c8f8e26398cfdaf268dd68746982bcf' +
// // //     '59415670655edf4e9ac30f6310bd2248cb9bc185db8059fe979294dd3611fdf28c2b731',
// // //     salt: 'OxDZYpi9BBJUZTTaC/yuuF3Y634YZ90KjpNa+Km4qGgZXGI6vhSWW0T91' +
// // //     'rharcQWIjG2uPZEPXiKGnSAQ73s352aom56AIYpYCfk7uNsd+7AzaQ6dxTnd9AzCCdIc/J' +
// // //     '62JohpHPJ5eGHUJJy3PAgHYcfVzvBHnIQlTJCQdQAonQ=',
// // //     username: 'john'
// // // };

// // loginRouter.post('/signup', passport.authenticate('local-signup', {
// //         successRedirect: 'profile',
// //         failureRedirect: 'login',
// //         failureFlash: true
// //     }));

// // // loginRouter.post('/signup', function (request: Request, response: Response, next: NextFunction) {
// // //         console.log('In Router: signup!');

// // //     // if (!request.body.hasOwnProperty('password')) {
// // //     //     let err = new Error('No password');
// // //     //     return next(err);
// // //     // }

// // //     // const salt = randomBytes(128).toString('base64');

// // //     // pbkdf2(request.body.password, salt, 10000, length, digest, (err: Error, hash: Buffer) => {
// // //     //     response.json({
// // //     //         hashed: hash.toString('hex'),
// // //     //         salt: salt
// // //     //     });
// // //     // });
// // // });

// // // // login method
// // // loginRouter.post('/', function (request: Request, response: Response, next: NextFunction) {

// // //     pbkdf2(request.body.password, user.salt, 10000, length, digest, (err: Error, hash: Buffer) => {
// // //         if (err) {
// // //             console.log(err);
// // //         }

// // //         // check if password is active
// // //         if (hash.toString('hex') === user.hashedPassword) {

// // //             const token = sign({'user': user.username, permissions: []}, secret, { expiresIn: '7d' });
// // //             response.json({'jwt': token});

// // //         } else {
// // //             response.json({message: 'Wrong password'});
// // //         }

// // //     });
// // // });

// // loginRouter.post('/', passport.authenticate('local-login', {
// //         successRedirect: 'profile',
// //         failureRedirect: 'login',
// //         failureFlash: true
// //     }));

// //     loginRouter.get('/profile', isLoggedIn, function (req, res, next) {
// //     res.render('users/profile', {
// //         user: req.user // get the user from session and pass to template
// //     });
// // });

// // // route middleware to make sure a user is logged in
// // function isLoggedIn(req, res, next) {
// //     // if user is authenticate in the session, carry on
// //     if (req.isAuthenticated()){
// //         return next();
// //     }
// //     // in any other case, redirect to the home
// //     res.redirect('/');
// // }

// // export { loginRouter }
