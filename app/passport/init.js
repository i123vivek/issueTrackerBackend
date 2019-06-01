const facebook = require('./facebook');
const User = require('../models/User');
const SocialUser = require('../models/SocialUser');
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const SocialUserModel = mongoose.model('SocialUser');
module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');
        console.log("user details are:",user);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        SocialUserModel.findById(id, function(err, user) {
            
            console.log('deserializing user:',user);
            
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Facebook 
    facebook(passport);
    

}
