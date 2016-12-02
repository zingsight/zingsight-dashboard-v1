// <reference path='../../src/typings.d.ts' />

// ## User Model

// Note: MongoDB will autogenerate an _id for each User object created

// Grab the Mongoose module
import * as mongoose from 'mongoose';

// Import library to hash passwords
import * as bcrypt from 'bcrypt-nodejs';

import IUser = require('./IUser');

// Define the schema for the showcase item
// ## User Model

// Note: MongoDB will autogenerate an _id for each User object created

// Define the schema for the showcase item
let userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
  role: { type: String }
});

// ## Methods

// ### Generate a hash
userSchema.methods.generateHash = function (password) {

  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// ### Check if password is valid
userSchema.methods.validPassword = function (password) {

  return bcrypt.compareSync(password, this.password);
};

// Create the model for users and expose it to the app
export default mongoose.model<IUser>('User', userSchema);



// import mongoose = require('mongoose');
// import * as winston from 'winston';

// let validator = require('validator');
// let generatePassword = require('generate-password');
// let owasp = require('owasp-password-strength-test');

// import IUser = require('./IUser');

// interface IUserModel extends IUser, mongoose.Document { }

// let userSchema = new mongoose.Schema({
//   provider: String,
//   id: String,
//   email: String,
//   password: String,
//   name: String,
//   username: String,
//   created: Date,
//   updated: Date,
//   profile_picture: String,
//   role: String
// }).pre('save', function (next) {
//   this.updated = new Date();
//   next();
// });

// let _model = mongoose.model('User', userSchema);

// class User {

//   static helloWorld() {
//     console.log('HELLO WORLD!');
//     return 'Hello World!';
//   };

//   /**
//    * static idからUserオブジェクトを取得
//    * @param id
//    * @returns {Promise<User>}
//    */
//   // static findById(id: string): Promise < User > {
//   //   return new Promise < IUser > ((resolve, reject) => {
//   //     _model.findById(id)
//   //       .exec()
//   //       .onResolve((err, user) => {
//   //         err ? reject(err) : resolve(new User(user));
//   //       });
//   //   })
//   // }

//   static findOrCreate(profile: IUser): Promise<User> {
//     winston.log('info', 'User: ' + JSON.stringify(profile));
//     if (_model.findOne({ where: { 'local.username': profile.username } })) {
//       winston.log('error', 'User already exists');
//       throw new Error('User already exists');
//     } else {
//       winston.log('info', 'Creating User');
//       return _model.create(profile).then(function (newUser) {
//     winston.log('info', 'Created user: ' + JSON.stringify(newUser));
//         return {
//           'status': 'OK',
//         };
//       }).catch(function (error) {
//         winston.log('error', 'Error creating user: ' + error);
//         throw error;
//       });
//     }
//   }

//   /**
//    * インスタンス変数
//    */
//   private _document: IUser;

//   /**
//    * コンストラクタ
//    * @param mongoose.Document<IUser>
//    */
//   constructor(document: IUser) {
//     this._document = document;
//   }

//   // get provider(): string {
//   //   return this._document.provider;
//   // }

//   // get image(): string {
//   //   if (Array.isArray(this._document.photos)) {
//   //     return this._document.photos.length > 0 ? this._document.photos[0] : null;
//   //   }
//   //   return this._document.photos;
//   // }

//   // get show(): boolean {
//   //   return this._document.show;
//   // }

//   // get authorId(): string {
//   //   return this._document.authorId;
//   // }
// }

// export = User;

// // let Schema = mongoose.Schema;
// // let crypto = require('crypto');
// // let validator = require('validator');
// // let generatePassword = require('generate-password');
// // let owasp = require('owasp-password-strength-test');

// // /**
// //  * A Validation function for local strategy properties
// //  */
// // let validateLocalStrategyProperty = function (property) {
// //   return ((this.provider !== 'local' && !this.updated) || property.length);
// // };

// // /**
// //  * A Validation function for local strategy email
// //  */
// // let validateLocalStrategyEmail = function (email) {
// //   return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));
// // };

// // let UserSchema = new Schema({
// //   firstName: {
// //     type: String,
// //     trim: true,
// //     default: '',
// //     validate: [validateLocalStrategyProperty, 'Please fill in your first name']
// //   },
// //   lastName: {
// //     type: String,
// //     trim: true,
// //     default: '',
// //     validate: [validateLocalStrategyProperty, 'Please fill in your last name']
// //   },
// //   displayName: {
// //     type: String,
// //     trim: true
// //   },
// //   email: {
// //     type: String,
// //     unique: true,
// //     lowercase: true,
// //     trim: true,
// //     default: '',
// //     validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
// //   },
// //   username: {
// //     type: String,
// //     unique: 'Username already exists',
// //     required: 'Please fill in a username',
// //     lowercase: true,
// //     trim: true
// //   },
// //   password: {
// //     type: String,
// //     default: ''
// //   },
// //   salt: {
// //     type: String
// //   },
// //   profileImageURL: {
// //     type: String,
// //     default: 'modules/users/client/img/profile/default.png'
// //   },
// //   provider: {
// //     type: String,
// //     required: 'Provider is required'
// //   },
// //   providerData: {},
// //   additionalProvidersData: {},
// //   roles: {
// //     type: [{
// //       type: String,
// //       enum: ['user', 'admin']
// //     }],
// //     default: ['user'],
// //     required: 'Please provide at least one role'
// //   },
// //   updated: {
// //     type: Date
// //   },
// //   created: {
// //     type: Date,
// //     default: Date.now
// //   },
// //   /* For reset password */
// //   resetPasswordToken: {
// //     type: String
// //   },
// //   resetPasswordExpires: {
// //     type: Date
// //   }
// // });

// // /**
// //  * Hook a pre save method to hash the password
// //  */
// // UserSchema.pre('save', function (next) {
// //   if (this.password && this.isModified('password')) {
// //     this.salt = crypto.randomBytes(16).toString('base64');
// //     this.password = this.hashPassword(this.password);
// //   }

// //   next();
// // });

// // /**
// //  * Hook a pre validate method to test the local password
// //  */
// // UserSchema.pre('validate', function (next) {
// //   if (this.provider === 'local' && this.password && this.isModified('password')) {
// //     let result = owasp.test(this.password);
// //     if (result.errors.length) {
// //       let error = result.errors.join(' ');
// //       this.invalidate('password', error);
// //     }
// //   }

// //   next();
// // });


// // UserSchema.methods.HelloWorld = function () {
// //   console.log('HELLO WORLD!');
// //   return 'Hello World!';
// // };

// // /**
// //  * Create instance method for hashing a password
// //  */
// // UserSchema.methods.hashPassword = function (password) {
// //   if (this.salt && password) {
// //     return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
// //   } else {
// //     return password;
// //   }
// // };

// // /**
// //  * Create instance method for authenticating user
// //  */
// // UserSchema.methods.authenticate = function (password) {
// //   return this.password === this.hashPassword(password);
// // };

// // /**
// //  * Find possible not used username
// //  */
// // UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
// //   let _this = this;
// //   let possibleUsername = username.toLowerCase() + (suffix || '');

// //   _this.findOne({
// //     username: possibleUsername
// //   }, function (err, user) {
// //     if (!err) {
// //       if (!user) {
// //         callback(possibleUsername);
// //       } else {
// //         return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
// //       }
// //     } else {
// //       callback(null);
// //     }
// //   });
// // };

// // /**
// // * Generates a random passphrase that passes the owasp test.
// // * Returns a promise that resolves with the generated passphrase, or rejects with an error if something goes wrong.
// // * NOTE: Passphrases are only tested against the required owasp strength tests, and not the optional tests.
// // */
// // UserSchema.statics.generateRandomPassphrase = function () {
// //   return new Promise(function (resolve, reject) {
// //     let password = '';
// //     let repeatingCharacters = new RegExp('(.)\\1{2,}', 'g');

// //     // iterate until the we have a valid passphrase. 
// //     // NOTE: Should rarely iterate more than once, but we need this to ensure no repeating characters are present.
// //     while (password.length < 20 || repeatingCharacters.test(password)) {
// //       // build the random password
// //       password = generatePassword.generate({
// //         length: Math.floor(Math.random() * (20)) + 20, // randomize length between 20 and 40 characters
// //         numbers: true,
// //         symbols: false,
// //         uppercase: true,
// //         excludeSimilarCharacters: true,
// //       });

// //       // check if we need to remove any repeating characters.
// //       password = password.replace(repeatingCharacters, '');
// //     }

// //     // Send the rejection back if the passphrase fails to pass the strength test
// //     if (owasp.test(password).errors.length) {
// //       reject(new Error('An unexpected problem occured while generating the random passphrase'));
// //     } else {
// //       // resolve with the validated passphrase
// //       resolve(password);
// //     }
// //   });
// // };

// // mongoose.model('User', UserSchema);
