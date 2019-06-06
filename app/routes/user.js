const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const issueController = require("./../../app/controllers/issueController")
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const passport = require('passport')
const mongoose = require('mongoose')


module.exports.setRouter = (app,passport) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.

    // _______________route for user. ________________________________.

    //app.get(`${baseUrl}/view/allUsers`,userController.getAllUser);

    app.get(`${baseUrl}/view/localUsers`,userController.getLocalUser);

    app.get(`${baseUrl}/view/allUsers`,userController.getAllUser);



    app.get(`${baseUrl}/view/socialUsers`,  userController.getSocialUser);

    app.get(`${baseUrl}/:userId/details`, auth.isAuthorized, userController.getSingleUser);

    app.put(`${baseUrl}/:userId/edit`, auth.isAuthorized, userController.editUser);

    app.post(`${baseUrl}/:userId/delete`,auth.isAuthorized, userController.deleteUser);

    // _______________ route for issue. _______________________________.

    app.get(`${baseUrl}/view/allIssues`,auth.isAuthorized, issueController.getAllIssue);

    app.get(`${baseUrl}/:email/userIssues`,auth.isAuthorized,issueController.getUserIssues);

    app.get(`${baseUrl}/:issueId/issueDetails`,auth.isAuthorized, issueController.getSingleIssue);

    app.post(`${baseUrl}/issue/create`,auth.isAuthorized, issueController.issueCreator);

    app.put(`${baseUrl}/:issueId/editIssue`,auth.isAuthorized, issueController.editIssue);

    app.post(`${baseUrl}/:issueId/deleteIssue`,auth.isAuthorized, issueController.deleteIssue);

    // _______________________route for comment. ________________________.

    app.post(`${baseUrl}/write/comment`,auth.isAuthorized,issueController.writeComment);

    app.get(`${baseUrl}/:issueId/view/comment`,auth.isAuthorized,issueController.viewComment);

    // _______________________route for watcher. _________________________.

    app.post(`${baseUrl}/add/watcher`,auth.isAuthorized, issueController.addAsWatcher);

    app.get(`${baseUrl}/get/watcherList`,auth.isAuthorized, issueController.getWatcherList);

    app.post(`${baseUrl}/:watcherId/deleteWatcher`,auth.isAuthorized, issueController.deleteWatcher);

    // _______________________ route for search. ___________________________.

    app.get(`${baseUrl}/issue/search`,auth.isAuthorized, issueController.searchIssue);


    // params: firstName, lastName, email, mobileNumber, password
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            }

        }
    */

    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to logout user.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null

        }
    */

    // auth token params: userId.
    app.post(`${baseUrl}/logout`,auth.isAuthorized, userController.logout);

    //routes for passport-->socialLogin------------------------------------------------

    app.get('/login/facebook', 
		passport.authenticate('facebook', { scope : ['email'] }
	));

	// handle the callback after facebook has authenticated the user
	app.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			// successRedirect : '/home',
			failureRedirect : '/'
		}),userController.socialSignin
    );
    app.get('/api/logout', (req, res)=>{
        // req.logout();
        // res.redirect('/');
        res.send(req.logout());
        
    })
    
}
