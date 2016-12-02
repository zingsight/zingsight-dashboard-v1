/**
 * Configure all Passport login here so we don't have to keep it in app.js
 */

/**
 * Import modules
 */

'use strict';
import User from './models/User';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
let winston = require('winston');

// let LocalStrategy = require('passport-local').Strategy;
// let User = require('./models/user');
// let winston = require('winston');

// Define length boundariess for expected parameters
let bounds = {

  username: {

    minLength: 3,

    maxLength: 50
  },

  password: {

    minLength: 8,

    maxLength: 128
  },

  email: {

    minLength: 5,

    maxLength: 256
  }
};

// ## Serialize User
passport.serializeUser((user, done) => {

  let sessionUser = {

    _id: user._id,

    username: user.username,

    role: user.role
  };

  done(null, sessionUser);
});

// ## Deserialize User
passport.deserializeUser((sessionUser, done) => {

  // The sessionUser object is different from the user mongoose
  // collection

  // It is actually req.session.passport.user and comes from the
  // session collection
  done(null, sessionUser);
});

// Function to check a string against a REGEX for email validity
let validateEmail = (email) => {

  winston.log('info', 'Valdating email: ' + email);

  let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  return re.test(email);
};

// Helper function to validate string length
let checkLength = (string, min, max) => {

  winston.log('info', 'Checking string: ' + string);

  // If the string is outside the passed in bounds...
  if (string.length > max || string.length < min) {
    return false;
  }
    return true;
};


/**
 * PassportJS Local strategy specifics
 * Configuration details are not necessary in the
 * /config/default.json or production file for local strategy.
 */
passport.use('local-login',
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (request, username, password, done) {
      console.log('HELLO OUT THERE!?');
      process.nextTick(function () {
        console.log('HELLO OUT THERE!?');
        /**
         * Find one user with the given username
         * Verify that one exists, that the user has
         * the local provider, and that the password hashs
         * match correctly.
         */
        return User.findOne({ where: { 'local.username': username } }).then(function (user) {
          console.log('HELLO USER: ' + JSON.stringify(user));
          if (!user) { return done(null, false); }
          if (!user.verifyPassword(password)) { return done(null, false); }
          return done(null, user);
        }).catch(function (error) {
          return done(error);
        }); // end User.findOne()

      }); // end process.newTick()

    }) // end function(request...) & new google strategy

); // end passport.use()




// # Local Signup

// We are using named strategies since we have one for login and one
// for signup

// By default, if there is no name, it would just be called 'local'

passport.use('local-signup', new LocalStrategy({

  // By default, the local strategy uses username and password
  usernameField: 'username',
  passwordField: 'password',

  // Allow the entire request to be passed back to the callback
  passReqToCallback: true
},
  (req, username, password, done) => {

   winston.log('info', 'And then one day, I got in ;)');

    // ## Data Checks

    // If the length of the username string is too long/short,
    // invoke verify callback
    if (!checkLength(username, bounds.username.minLength, bounds.username.maxLength)) {

      winston.log('info', ':)');

      // ### Verify Callback

      // Invoke `done` with `false` to indicate authentication
      // failure
      return done(null,

        false,

        // Return info message object
        { signupMessage: 'Invalid username length.' }
      );
    }

    // If the length of the password string is too long/short,
    // invoke verify callback
    if (!checkLength(password, bounds.password.minLength, bounds.password.maxLength)) {
      winston.log('info', ':)');

      // ### Verify Callback

      // Invoke `done` with `false` to indicate authentication
      // failure
      return done(null,

        false,

        // Return info message object
        { signupMessage: 'Invalid password length.' }
      );
    }

    // If the length of the email string is too long/short,
    // invoke verify callback
    // if (!checkLength(req.body.email, bounds.email.minLength, bounds.email.maxLength)) {
    //   winston.log('info', ':)');

    //   // ### Verify Callback

    //   // Invoke `done` with `false` to indicate authentication
    //   // failure
    //   return done(null,

    //     false,

    //     // Return info message object
    //     { signupMessage: 'Invalid email length.' }
    //   );
    // }

    // If the string is not a valid email...
    // if (!validateEmail(req.body.email)) {

    //   winston.log('info', '1');

    //   // ### Verify Callback

    //   // Invoke `done` with `false` to indicate authentication
    //   // failure
    //   return done(null,

    //     false,

    //     // Return info message object
    //     { signupMessage: 'Invalid email address.' }
    //   );
    // }

    // Asynchronous
    // User.findOne will not fire unless data is sent back
    process.nextTick(() => {

      winston.log('info', '2');

      // Find a user whose email or username is the same as the passed
      // in data

      // We are checking to see if the user trying to login already
      // exists
      User.findOne({where: { 'username': username }
      }, (err, user) => {

      winston.log('info', '3');

        // If there are any errors, return the error
        if (err) {
          return done(err);
        }

        // If a user exists with either of those ...
        if (user) {

      winston.log('info', '4');

          // ### Verify Callback

          // Invoke `done` with `false` to indicate authentication
          // failure
          return done(null,

            false,

            // Return info message object
            {
              signupMessage: 'That username/email is already ' +
              'taken.'
            }
          );

        } else {
          winston.log('info', '5');

          // If there is no user with that email or username...

          // Create the user
          let newUser = new User();

          winston.log('info', 'newuser: ' + JSON.stringify(newUser));

          // Set the user's local credentials

          // Combat case sensitivity by converting username and
          // email to lowercase characters
          newUser.username = username.toLowerCase();

          // newUser.email = req.body.email.toLowerCase();

          // Hash password with model method
          newUser.password = newUser.generateHash(password);
          winston.log('info', 'newuser created?: ' + JSON.stringify(newUser));

          // Save the new user
          newUser.save((err) => {
            winston.log('info', '6');

            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }));

  // # Local Login

  // We are using named strategies since we have one for login and one
  // for signup

  // By default, if there is no name, it would just be called 'local'











































// /// <reference path='../src/typings.d.ts' />

// import { Passport } from 'passport';

// let LocalStrategy = require('passport-local').Strategy;
// let User = require('./models/user');
// let winston = require('winston');

// export function setupStrategies(passport: Passport): void {

//     console.log(' << Setting upp Passport strategies >> ');

//     // ====================== //
//     // passport session setup //
//     // ====================== //
//     // required for persistent login sessions
//     // passport needs ability to serialize and unserialize users out of session

//     // used to serialize the user for the session
//     passport.serializeUser(function (user, done) {
//         done(null, user.id);
//     });

//     // used to deserialize the user
//     passport.deserializeUser(function (id, done) {
//         User.findById(id, function (err, user) {
//             done(err, user);
//         });
//     });

//     // ============ //
//     // LOCAL SIGNUP //
//     // ============ //

//     passport.use('local-signup', new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//         function (req, email, password, done) {
//             console.log('In Passport: signup!');
//             // async
//             process.nextTick(function () {

//                 if (!req.user) {
//                     // first we try to find the user to see if already exists
//                     User.findOne({ 'local.email': email }, function (err, user) {
//                         // if error, return error
//                         if (err) {
//                             return done(err);
//                         }

//                         // check if the email already exists
//                         if (user) {
//                             return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//                         } else {
//                             // if there si no user, create a new one
//                             var newUser = new User();
//                             // set the credentials
//                             newUser.local.email = email;
//                             newUser.local.password = newUser.generateHash(password);
//                             // saving the user
//                             newUser.save(function (err) {
//                                 if (err) {
//                                     throw err;
//                                 }
//                                 return done(null, newUser);
//                             });
//                         }
//                     });
//                 } else {
//                     // If the user is already logged in, we add the credential into profile
//                     var user = req.user;

//                     // set the credentials
//                     user.local.email = email;
//                     user.local.password = user.generateHash(password);
//                     // saving the user
//                     user.save(function (err) {
//                         if (err) {
//                             throw err;
//                         }
//                         return done(null, user);
//                     });

//                 }
//             });
//         })
//     );

//     // =========== //
//     // LOCAL LOGIN //
//     // =========== //
//     // We create another strategy for the login process

//     passport.use('local',
//         new LocalStrategy({
//             usernameField: 'username',
//             passwordField: 'password',
//             passReqToCallback: true
//         },
//             function (request, username, password, done) {
//                 console.log('HELLO OUT THERE!?');
//                 process.nextTick(function () {
//                     /**
//                      * Find one user with the given username
//                      * Verify that one exists, that the user has
//                      * the local provider, and that the password hashs
//                      * match correctly.
//                      */
//                     return User.findOne({ where: { 'local.username': username }}).then(function (user) { //, provider: 'local' 
//                         if (!user) { return done(null, false); }
//                         if (!user.validPassword(password)) { return done(null, false); }
//                         return done(null, user);
//                     }).catch(function (error) {
//                         return done(error);
//                     }); // end User.findOne()

//                 }); // end process.newTick()

//             }) // end function(request...) & new google strategy

//     ); // end passport.use()

//     // passport.use('local-login', new LocalStrategy({
//     //         // change default username for email
//     //         usernameField: 'email',
//     //         passwordField: 'password',
//     //         passReqToCallback: true // allows us to pass back the entire request to the callback
//     //     },
//     //     function (req, email, password, done) {
//     //         console.log('In Passport: Login! --> ' + email);
//     //         // first check if the user already exists
//     //         User.findOne({'local.email': email}, function (err, user) {
//     //             // If there are any error, return the error
//     //             if (err) {
//     //                 return done(err, null, null);
//     //             }

//     //             // if no user is found, return message
//     //             if (!user) {
//     //                 return done(null, false, req.flash('loginMessage', 'No user found.'));
//     //             }

//     //             // if the user exists, we check the password
//     //             if (!user.validPassword(password)) {
//     //                 return done(null, false, req.flash('loginMessage', 'Opps! Wrong password.'));
//     //             }

//     //             // if everything is ok, return the user
//     //             return done(null, user, null);
//     //         });
//     //     })
//     // );

// };
