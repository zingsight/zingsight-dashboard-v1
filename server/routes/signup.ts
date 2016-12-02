import { Router, Response, Request } from 'express';
import User = require('../models/User');
let winston = require('winston');
var passport = require('passport');

const signupRouter: Router = Router();

signupRouter.post('/', (req: Request, res: Response, next: Function) => {


    winston.level = 'info';
    winston.log('info', 'signupRouter: post/, user: ' + req.body.username + '| ' + req.body.password);

    // Call `authenticate()` from within the route handler, rather than
    // as a route middleware. This gives the callback access to the `req`
    // and `res` object through closure.

    // If authentication fails, `user` will be set to `false`. If an
    // exception occured, `err` will be set. `info` contains a message
    // set within the Local Passport strategy.
    passport.authenticate('local-signup', (err, user, info) => {
    console.log(JSON.stringify(err) + ' > ' + JSON.stringify(user) + ' > ' + JSON.stringify(info) + ' > ');

        if (err) {
            return next(err);
        }

        // If no user is returned...
        if (!user) {

            // Set HTTP status code `401 Unauthorized`
            res.status(401);

            // Return the info message
            return next(info.signupMessage);
        }

        // Set HTTP status code `204 No Content`
        res.sendStatus(204);

    })(req, res, next);

    // let userAttributes = request.body;
    // /**
    //  * Set some defaults
    //  */
    // userAttributes.provider = 'local';
    // userAttributes.profile_picture = 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg';
    // console.log('pre-hash, this is user: ' + User.helloWorld());
    // // userAttributes.password = User.hashPassword(userAttributes.password);
    // console.log('post-hash');

    // User.findOrCreate(userAttributes);

});

export { signupRouter }
