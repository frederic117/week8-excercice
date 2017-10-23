const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    // the username and password are added by passportLocalMongoose
    // we can add any extra information like facebooktokens (or
    // others) as well as a picture, etc
    username: String
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);