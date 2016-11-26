module.exports = function (app, passport) {

    app.post('/api/hello', (request, response) => {
        response.send('Hello!');
    });

    app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect: 'http://localhost:4200/#/success',
        failureRedirect: 'http://localhost:4200/#/fail',
        failureFlash: true
    }));

    app.post('/api/login', passport.authenticate('local-login', {
        successRedirect: 'http://localhost:4200/#/success',
        failureRedirect: 'http://localhost:4200/#/fail',
        failureFlash: true
    }));

};











// import { Router, Request, Response, NextFunction } from 'express';
// import { randomBytes, pbkdf2 } from 'crypto';
// import { sign } from 'jsonwebtoken';
// import { secret, length, digest } from '../config';

// import express = require('express');
// // const passport = require('passport');

// const loginRouter: Router = Router();

// // const user = {
// //     hashedPassword: '6fb3a68cb5fe34d0c2c9fc3807c8fa9bc0e7dd10023065ea4233d40a2d6bb4a' +
// //     '7e336a82f48bcb5a7cc95b8a590cf03a4a07615a226d09a89420a342584a' +
// //     'a28748336aa0feb7ac3a12200d13641c8f8e26398cfdaf268dd68746982bcf' +
// //     '59415670655edf4e9ac30f6310bd2248cb9bc185db8059fe979294dd3611fdf28c2b731',
// //     salt: 'OxDZYpi9BBJUZTTaC/yuuF3Y634YZ90KjpNa+Km4qGgZXGI6vhSWW0T91' +
// //     'rharcQWIjG2uPZEPXiKGnSAQ73s352aom56AIYpYCfk7uNsd+7AzaQ6dxTnd9AzCCdIc/J' +
// //     '62JohpHPJ5eGHUJJy3PAgHYcfVzvBHnIQlTJCQdQAonQ=',
// //     username: 'john'
// // };

// loginRouter.post('/signup', passport.authenticate('local-signup', {
//         successRedirect: 'profile',
//         failureRedirect: 'login',
//         failureFlash: true
//     }));

// // loginRouter.post('/signup', function (request: Request, response: Response, next: NextFunction) {
// //         console.log('In Router: signup!');

// //     // if (!request.body.hasOwnProperty('password')) {
// //     //     let err = new Error('No password');
// //     //     return next(err);
// //     // }

// //     // const salt = randomBytes(128).toString('base64');

// //     // pbkdf2(request.body.password, salt, 10000, length, digest, (err: Error, hash: Buffer) => {
// //     //     response.json({
// //     //         hashed: hash.toString('hex'),
// //     //         salt: salt
// //     //     });
// //     // });
// // });

// // // login method
// // loginRouter.post('/', function (request: Request, response: Response, next: NextFunction) {

// //     pbkdf2(request.body.password, user.salt, 10000, length, digest, (err: Error, hash: Buffer) => {
// //         if (err) {
// //             console.log(err);
// //         }

// //         // check if password is active
// //         if (hash.toString('hex') === user.hashedPassword) {

// //             const token = sign({'user': user.username, permissions: []}, secret, { expiresIn: '7d' });
// //             response.json({'jwt': token});

// //         } else {
// //             response.json({message: 'Wrong password'});
// //         }

// //     });
// // });

// loginRouter.post('/', passport.authenticate('local-login', {
//         successRedirect: 'profile',
//         failureRedirect: 'login',
//         failureFlash: true
//     }));

//     loginRouter.get('/profile', isLoggedIn, function (req, res, next) {
//     res.render('users/profile', {
//         user: req.user // get the user from session and pass to template
//     });
// });

// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {
//     // if user is authenticate in the session, carry on
//     if (req.isAuthenticated()){
//         return next();
//     }
//     // in any other case, redirect to the home
//     res.redirect('/');
// }

// export { loginRouter }
