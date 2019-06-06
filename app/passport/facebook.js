const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const SocialUser = require('../models/SocialUser');
const fbConfig = require('../fb.js');
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const SocialUserModel = mongoose.model('SocialUser')
const time = require('./../libs/timeLib');
module.exports = function(passport) {

    passport.use('facebook', new FacebookStrategy({
        clientID        : fbConfig.appID,
        clientSecret    : fbConfig.appSecret,
		callbackURL     : fbConfig.callbackUrl,
		//passReqToCallback : true,
		profileFields: ['id', 'emails', 'name']
    },

    // facebook will send back the tokens and profile
    function(access_token, refresh_token, profile, done) {

    	console.log('profile', profile);

		// asynchronous
		process.nextTick(function() {

			// find the user in the database based on their facebook id
	        SocialUserModel.findOne({ 'userId' : profile.id }, function(err, user) {

	        	// if there is an error, stop everything and return that
	        	// ie an error connecting to the database
	            if (err)
	                return done(err);

				// if the user is found, then log them in
	            if (user) {
					// if(user.socialToken === false){
					// 	user.socialToken = true;
					// }
					// if (user.sociallyCreatedOn === null || user.sociallyCreatedOn === '' || user.sociallyCreatedOn === undefined){
					// 	user.sociallyCreatedOn = time.now();
					// }

					user.save(function(err,user) {
	                    if (err){
							throw err;
						}
						else{
							let newUserObj = user.toObject();
                        	return(newUserObj);
						}
	                });
	                return done(null, user); // user found, return that user
	            } else {
	                // if there is no user found with that facebook id, create them
	                var newUser = new SocialUserModel({
						userId: profile.id,
						userName: profile.emails[0].value,
						email: profile.emails[0].value,
						firstName: profile.name.givenName,
						lastName: profile.name.familyName,
						//socialToken: true,
						createdOn: time.now(),

					});

					
	                newUser.save(function(err,newUser) {
	                    if (err){
							throw err;

						}
						else{
							console.log("new social user:",newUser)
	                    	return done(null, newUser);

						}
						
	                });
	            }

	        });
        });

    }));

};