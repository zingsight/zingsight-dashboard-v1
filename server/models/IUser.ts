import mongoose = require("mongoose");

interface IUser extends mongoose.Document {
    username: string;
    password: string;
    email: string;
    role: string;

    generateHash(password);

    validPassword(password);
};

export = IUser;
