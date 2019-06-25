const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const issueController = require("./../../app/controllers/issueController")
const multerLib = require('./../multer/multer')
const notificationController = require("./../controllers/notificationController")
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const passport = require('passport')
const mongoose = require('mongoose')


module.exports.setRouter = (app, passport) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.

    // _______________route for user. ________________________________.


    // params: firstName, lastName, email, mobileNumber, password
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for user signup.
     *
     * @apiParam {string} firstName firstName of the user. (body params) (required)
     * @apiParam {string} lastName lastName of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {number} mobileNumber mobileNumber of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User created",
            "status": 200,
            "data": {
                "userId": "qyxn6RQKu",
                "firstName": "rakesh",
                "lastName": "kr",
                "userName": "rakesh@gmail.com",
                "email": "rakesh@gmail.com",
                "mobileNumber": 9431582058,
                "createdOn": "2019-06-15T21:34:40.000Z",
                "_id": "5d0564700ad9de204fecd8b0",
                "__v": 0
            }
        }
    */

    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);

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
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkprdkJWVmgyWiIsImlhdCI6MTU2MDYyMTE1NDkyMywiZXhwIjoxNTYwNzA3NTU0OTIzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZC1wMS1Jc3N1ZVRyYWNrZXJUb29sIiwiZGF0YSI6eyJ1c2VySWQiOiJLRDRoaS1QZEMiLCJmaXJzdE5hbWUiOiJ2aXZlayIsImxhc3ROYW1lIjoicmFpIiwidXNlck5hbWUiOiJpMTIzdml2ZWtAZ21haWwuY29tIiwiZW1haWwiOiJpMTIzdml2ZWtAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo5ODk4NzY3NjAwLCJjcmVhdGVkT24iOiIyMDE5LTA2LTA2VDE2OjAwOjQ2LjAwMFoifX0.Pn8aiCgAxGzFR_wcs_ZUg1EK-d1Vw9Z3xuhOCqKYQW4",
                "userDetails": {
                    "userId": "KD4hi-PdC",
                    "firstName": "vivek",
                    "lastName": "rai",
                    "userName": "i123vivek@gmail.com",
                    "email": "i123vivek@gmail.com",
                    "mobileNumber": 9898767600,
                    "createdOn": "2019-06-06T16:00:46.000Z"
                }
            }
        }

    */

    // auth token params: userId.
    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to logout user.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
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

    //params: authToken.
    app.get(`${baseUrl}/view/localUsers`, auth.isAuthorized, userController.getLocalUser);

    /**
     * 
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/view/localUsers to get all local users.
     * @apiParam {string} authToken authToken of the loggedin user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "All Users Details Found",
            "status": 200,
            "data": [
                {
                    "userId": "-bejZiD7a",
                    "firstName": "rahul",
                    "lastName": "rai",
                    "userName": "rahul@gmail.com",
                    "password": "8659c6c0d2d71d1beeaf7d7b398cea98",
                    "email": "rahul@gmail.com",
                    "mobileNumber": 9431562056,
                    "issueWatchList": [],
                    "createdOn": "2019-05-19T16:00:10.000Z"
                },
                {
                    "userId": "iF_JWlbvb",
                    "firstName": "rahul",
                    "lastName": "rai",
                    "userName": "rahul12@gmail.com",
                    "password": "8659c6c0d2d71d1beeaf7d7b398cea98",
                    "email": "rahul12@gmail.com",
                    "mobileNumber": 9431562056,
                    "issueWatchList": [],
                    "createdOn": "2019-05-22T13:09:58.000Z"
                },
                {
                    "userId": "d482ykOcr",
                    "firstName": "satu",
                    "lastName": "rai",
                    "userName": "satu@gmail.com",
                    "password": "8659c6c0d2d71d1beeaf7d7b398cea98",
                    "email": "satu@gmail.com",
                    "mobileNumber": 9898767600,
                    "createdOn": "2019-06-03T10:49:37.000Z"
                },
                {
                    "userId": "KD4hi-PdC",
                    "firstName": "vivek",
                    "lastName": "rai",
                    "userName": "i123vivek@gmail.com",
                    "password": "8659c6c0d2d71d1beeaf7d7b398cea98",
                    "email": "i123vivek@gmail.com",
                    "mobileNumber": 9898767600,
                    "createdOn": "2019-06-06T16:00:46.000Z"
                },
                {
                    "userId": "LgTXJksy6",
                    "firstName": "birendra",
                    "lastName": "rai",
                    "userName": "birendra@gmail.com",
                    "password": "8659c6c0d2d71d1beeaf7d7b398cea98",
                    "email": "birendra@gmail.com",
                    "mobileNumber": 9431582058,
                    "createdOn": "2019-06-15T16:14:37.000Z"
                }
            ]
        }
     * 
     */

     //params: authToken.
    app.get(`${baseUrl}/view/socialUsers`, auth.isAuthorized, userController.getSocialUser);

    /**
     * 
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/view/socialUsers to get all social users.
     * @apiParam {string} authToken authToken of the loggedin user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Social User Details Found",
            "status": 200,
            "data": [
                {
                    "userId": "1426569717486146",
                    "firstName": "Vivek",
                    "lastName": "Rai",
                    "userName": "....vivek@gmail.com",
                    "email": "....vivek@gmail.com",
                    "createdOn": "2019-05-19T15:51:49.000Z"
                },
                {
                    "userId": "2120471434916596",
                    "firstName": "Ashish",
                    "lastName": "Tiwary",
                    "userName": "ashish.....@gmail.com",
                    "email": "ashish.....@gmail.com",
                    "createdOn": "2019-06-04T11:00:23.000Z"
                }
            ]
        }
     * 
     */


    app.get(`${baseUrl}/view/allUsers`, auth.isAuthorized, userController.getAllUser);

    /**
     * 
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/view/allUsers to get all users
     * @apiParam {string} authToken authToken of the loggedin user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "get All User",
            "status": 200,
            "data": [
                {
                    "userId": "-bejZiD7a",
                    "firstName": "rahul",
                    "lastName": "rai",
                    "userName": "rahul@gmail.com",
                    "password": "8659c6c0d2d71d1beeaf7d7b398cea98",
                    "email": "rahul@gmail.com",
                    "mobileNumber": 9431562056,
                    "issueWatchList": [],
                    "createdOn": "2019-05-19T16:00:10.000Z"
                },
                {
                    "userId": "iF_JWlbvb",
                    "firstName": "rahul",
                    "lastName": "rai",
                    "userName": "rahul12@gmail.com",
                    "password": "8659c6c0d2d71d1beeaf7d7b398cea98",
                    "email": "rahul12@gmail.com",
                    "mobileNumber": 9431562056,
                    "issueWatchList": [],
                    "createdOn": "2019-05-22T13:09:58.000Z"
                },
                {
                    "userId": "d482ykOcr",
                    "firstName": "satu",
                    "lastName": "rai",
                    "userName": "satu@gmail.com",
                    "password": "8659c6c0d2d71d1beeaf7d7b398cea98",
                    "email": "satu@gmail.com",
                    "mobileNumber": 9898767600,
                    "createdOn": "2019-06-03T10:49:37.000Z"
                },
                {
                    "userId": "KD4hi-PdC",
                    "firstName": "vivek",
                    "lastName": "rai",
                    "userName": "i123vivek@gmail.com",
                    "password": "8659c6c0d2d71d1beeaf7d7b398cea98",
                    "email": "i123vivek@gmail.com",
                    "mobileNumber": 9898767600,
                    "createdOn": "2019-06-06T16:00:46.000Z"
                },
                {
                    "userId": "LgTXJksy6",
                    "firstName": "birendra",
                    "lastName": "rai",
                    "userName": "birendra@gmail.com",
                    "password": "8659c6c0d2d71d1beeaf7d7b398cea98",
                    "email": "birendra@gmail.com",
                    "mobileNumber": 9431582058,
                    "createdOn": "2019-06-15T16:14:37.000Z"
                },
                {
                    "userId": "2120471434916596",
                    "firstName": "Ashish",
                    "lastName": "Tiwary",
                    "userName": "ashishkiit42@gmail.com",
                    "email": "ashishkiit42@gmail.com",
                    "createdOn": "2019-06-04T11:00:23.000Z"
                }
            ]
        }
    */


    

    //params: userId,authToken.
    app.get(`${baseUrl}/:userId/details`, auth.isAuthorized, userController.getSingleUser);

    /**
     * 
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/:userId/details to get user details.
     * 
     * @apiParam {string} userId userId of the user. (query params) (required).
     * @apiParam {string} authToken authToken of the loggedIn user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * 
     * {
            "error": false,
            "message": "Local User Details Found",
            "status": 200,
            "data": {
                "userId": "-bejZiD7a",
                "firstName": "rahul",
                "lastName": "rai",
                "userName": "rahul@gmail.com",
                "email": "rahul@gmail.com",
                "mobileNumber": 9431562056,
                "issueWatchList": [],
                "createdOn": "2019-05-19T16:00:10.000Z"
            }
        }
     *
     *
     */


    // _______________ route for issue. _______________________________.

    //params: authToken.
    app.get(`${baseUrl}/view/allIssues`, auth.isAuthorized, issueController.getAllIssue);

    /**
     * 
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/view/allIssues to get user details.
     * 
     * @apiParam {string} userId userId of the user. (query params) (required).
     * @apiParam {string} authToken authToken of the loggedIn user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "All issue details found",
            "status": 200,
            "data": [
                {
                    "issueId": "x6j5QrYPo",
                    "issueStatus": "done",
                    "issueTitle": "title of issue1",
                    "issueDescription": "description of issue1",
                    "issueReporter": "vivek",
                    "issueReporterEmail": "i123vivek@gmail.com",
                    "issueAssignee": "rahul",
                    "issueAssigneeEmail": "rahul12@gmail.com",
                    "issueCreatedOn": "2019-06-02T10:02:20.000Z",
                    "screenshotName": "1560424747076_Screenshot from 2019-06-13 16-48-49.png",
                    "screenshotPath": "uploads/1560424747076_Screenshot from 2019-06-13 16-48-49.png"
                },
                {
                    "issueId": "jHK5N9SAM",
                    "issueStatus": "In-BackLog",
                    "issueTitle": "asd",
                    "issueDescription": "sdf",
                    "issueReporter": "satu rai",
                    "issueReporterEmail": "satu@gmail.com",
                    "issueAssignee": "rahul+rai",
                    "issueAssigneeEmail": "rahul@gmail.com",
                    "issueCreatedOn": "2019-06-15T09:42:04.000Z",
                    "screenshotName": "1560598158503_Screenshot from 2019-05-14 16-27-32.png",
                    "screenshotPath": "uploads/1560598158503_Screenshot from 2019-05-14 16-27-32.png"
                },
                {
                    "issueId": "Ms_VDaYOU",
                    "issueStatus": "In-Progress",
                    "issueTitle": "issue 1",
                    "issueDescription": "issue description of issue 1 again once again 2121999",
                    "issueReporter": "birendra rai",
                    "issueReporterEmail": "birendra@gmail.com",
                    "issueAssignee": "satu+rai",
                    "issueAssigneeEmail": "satu@gmail.com",
                    "issueCreatedOn": "2019-06-15T16:31:13.000Z",
                    "screenshotName": "1560620934291_Screenshot from 2019-05-14 16-27-32.png",
                    "screenshotPath": "uploads/1560620934291_Screenshot from 2019-05-14 16-27-32.png"
                }
            ]
        }
     * 
     */

    //params: email,authToken.
    app.get(`${baseUrl}/:email/userIssues`, auth.isAuthorized, issueController.getUserIssues);

    /**
     * 
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/:email/userIssues to get issues assigned to the user.
     * 
     * @apiParam {string} email email of the user. (query params) (required).
     * @apiParam {string} authToken authToken of the loggedIn user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "All issues found of a user",
            "status": 200,
            "data": [
                {
                    "issueId": "69TFYu7GGQ",
                    "issueStatus": "In-Progress",
                    "issueTitle": "ertgvgh",
                    "issueDescription": "vrtb",
                    "issueReporter": "rahul rai",
                    "issueReporterEmail": "rahul12@gmail.com",
                    "issueAssignee": "",
                    "issueAssigneeEmail": "satu@gmail.com",
                    "issueCreatedOn": "2019-06-14T11:20:46.000Z",
                    "screenshotName": "1560511234686_image",
                    "screenshotPath": "uploads/1560511234686_image"
                },
                {
                    "issueId": "5pmL7HgdX",
                    "issueStatus": "In-Progress",
                    "issueTitle": "ertgvgh",
                    "issueDescription": "vrtb",
                    "issueReporter": "rahul rai",
                    "issueReporterEmail": "rahul12@gmail.com",
                    "issueAssignee": "",
                    "issueAssigneeEmail": "satu@gmail.com",
                    "issueCreatedOn": "2019-06-14T11:20:46.000Z",
                    "screenshotName": "1560511234459_image",
                    "screenshotPath": "uploads/1560511234459_image"
                },
                {
                    "issueId": "TkDL9fe7d",
                    "issueStatus": "In-Progress",
                    "issueTitle": "ertgvgh",
                    "issueDescription": "testt---------------------------------------------",
                    "issueReporter": "rahul rai",
                    "issueReporterEmail": "rahul12@gmail.com",
                    "issueAssignee": "",
                    "issueAssigneeEmail": "satu@gmail.com",
                    "issueCreatedOn": "2019-06-14T11:20:57.000Z",
                    "screenshotName": "1560511253326_image",
                    "screenshotPath": "uploads/1560511253326_image"
                }
            ]
        }
     * 
     */

    //params: issueId,authToken.
    app.get(`${baseUrl}/:issueId/issueDetails`, auth.isAuthorized, issueController.getSingleIssue);

    /**
     * 
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/:issueId/issueDetails to get issue details of an issue.
     * 
     * @apiParam {string} issueId issueId of an issue. (query params) (required).
     * @apiParam {string} authToken authToken of the loggedIn user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Issue details found",
            "status": 200,
            "data": {
                "issueId": "5pmL7HgdX",
                "issueStatus": "In-Progress",
                "issueTitle": "ertgvgh",
                "issueDescription": "vrtb",
                "issueReporter": "rahul rai",
                "issueReporterEmail": "rahul12@gmail.com",
                "issueAssignee": "",
                "issueAssigneeEmail": "satu@gmail.com",
                "issueCreatedOn": "2019-06-14T11:20:46.000Z",
                "screenshotName": "1560511234459_image",
                "screenshotPath": "uploads/1560511234459_image"
            }
        }
     * 
     */

    //params: issueStatus,issueTitle,issueDescription,issueReporter,email,issueAssignee,issueAssigneeEmail,image.
    app.post(`${baseUrl}/issue/create`, auth.isAuthorized, multerLib.upload.single('image'), issueController.issueCreator);

    /**
     * 
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/issue/create to create new issue.
     * 
     * @apiParam {string} issueStatus issueStatus of the issue. (body params(form-data)) (required).
     * @apiParam {string} issueTitle issueTitle of the issue. (body params(form-data)) (required).
     * @apiParam {string} issueDescription issueDescription of the issue. (body params(form-data)) (required).
     * @apiParam {string} issueReporter issueReporter of the issue. (body params(form-data)) (required).
     * @apiParam {string} email email of the issue. (body params(form-data)) (required).
     * @apiParam {string} issueAssignee issueAssignee of the issue. (body params(form-data)) (required).
     * @apiParam {string} issueAssigneeEmail issueAssigneeEmail of the issue. (body params(form-data)) (required).
     * @apiParam {file} image image of the issue. (body params(form-data)) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Issue created",
            "status": 200,
            "data": {
                "issueId": "HsH5m_yLP",
                "issueStatus": "done",
                "issueTitle": "issueTitle12",
                "issueDescription": "issue description of issue 12",
                "issueReporter": "rahul",
                "issueReporterEmail": "rahul12@gmail.com",
                "issueAssignee": "vivek",
                "issueAssigneeEmail": "i123vivek@gmail.com",
                "issueCreatedOn": "2019-06-15T18:57:24.000Z",
                "screenshotName": "1560625044472_IMG_0092.JPG",
                "screenshotPath": "uploads/1560625044472_IMG_0092.JPG",
                "_id": "5d053f94e1f981167f9e7876",
                "__v": 0
            }
        }
     * 
     */

    //params: issueId,authToken
    app.put(`${baseUrl}/:issueId/editIssue`, auth.isAuthorized, multerLib.upload.single('image'), issueController.editIssue);

    /**
     * 
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {put} /api/v1/users/:issueId/editIssue to edit an issue .
     * 
     * @apiParam {string} issueId issueId of the issue. (query params) (required).
     * @apiParam {string} authToken authToken of the loggedIn user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Issue details edited",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }
     * 
     */
    
    //params: issueId,authToken
    app.post(`${baseUrl}/:issueId/deleteIssue`, auth.isAuthorized, issueController.deleteIssue);

    /**
     * 
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {put} /api/v1/users/:issueId/deleteIssue to delete an issue .
     * 
     * @apiParam {string} issueId issueId of the issue. (query params) (required).
     * @apiParam {string} authToken authToken of the loggedIn user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Issue is deleted  successfully",
            "status": 200,
            "data": {
                "issueId": "AEPtjYdwI",
                "issueStatus": "done",
                "issueTitle": "issueTitle1",
                "issueDescription": "issue description of issue 2",
                "issueReporter": "rahul",
                "issueReporterEmail": "rahul12@gmail.com",
                "issueAssignee": "vivek",
                "issueAssigneeEmail": "i123vivek@gmail.com",
                "issueCreatedOn": "2019-06-12T08:10:23.000Z",
                "screenshotName": "1560327023794_Screenshot from 2019-05-17 20-49-39.png",
                "screenshotPath": "uploads/1560327023794_Screenshot from 2019-05-17 20-49-39.png",
                "_id": "5d00b36f983a720cdddd16fe",
                "__v": 0
            }
        }
     * 
     */

    // _______________________route for comment. ________________________.

    //params: issueId,comment,commenter,commenterEmail,authToken.
    app.post(`${baseUrl}/write/comment`, auth.isAuthorized, issueController.writeComment);

    /**
     * 
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/write/comment to comment on an issue .
     * 
     * @apiParam {string} issueId issueId of the issue. (body params) (required).
     * @apiParam {string} comment comment on the issue. (body params) (required).
     * @apiParam {string} commenter commenter of the issue. (body params) (required).
     * @apiParam {string} commenterEmail commenterEmail of the issue. (body params) (required).
     * @apiParam {string} authToken authToken of the loggedIn user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Commented successfully",
            "status": 200,
            "data": {
                "commentId": "kKmJyBaV0",
                "issueId": "HsH5m_yLP",
                "comment": "working on  project  895484",
                "commenter": "vivek",
                "commenterEmail": "i123vivek@gmail.com",
                "createdOn": "2019-06-15T20:43:33.000Z",
                "_id": "5d0558750ad9de204fecd8ad",
                "__v": 0
            }
        }
     * 
     */

    //params: issueId,authToken
    app.get(`${baseUrl}/:issueId/view/comment`, auth.isAuthorized, issueController.viewComment);

    /**
     * 
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/:issueId/view/comment to view comments of an issue .
     * 
     * @apiParam {string} issueId issueId of the issue. (query params) (required).
     * @apiParam {string} authToken authToken of the loggedIn user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "comment Found",
            "status": 200,
            "data": [
                {
                    "commentId": "CUDA05SoX",
                    "issueId": "HsH5m_yLP",
                    "comment": "working on the  project ",
                    "commenter": "vivek",
                    "commenterEmail": "i123vivek@gmail.com",
                    "createdOn": "2019-06-15T20:09:30.000Z"
                }
            ]
        }
     * 
     */

    // _______________________route for watcher. _________________________.


    //params: issueId,watcherEmail,authToken
    app.post(`${baseUrl}/add/watcher`, auth.isAuthorized, issueController.addAsWatcher);

    /**
     * 
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/add/watcher to add as a watcher for an issue .
     * 
     * @apiParam {string} issueId issueId of the issue. (body params) (required).
     * @apiParam {string} watcherEmail watcherEmail of the user to add as watcher. (body params) (required).
     * @apiParam {string} authToken authToken of the loggedIn user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "watcher Added",
            "status": 200,
            "data": {
                "watcherId": "k3QQr-c9q",
                "issueId": "HsH5m_yLP",
                "watcherEmail": "rahul12@gmail.com",
                "createdOn": "2019-06-15T20:52:24.000Z",
                "_id": "5d055a880ad9de204fecd8af",
                "__v": 0
            }
        }
     * 
     */

    //params: issueId,authToken
    app.get(`${baseUrl}/:issueId/get/watcherList`, auth.isAuthorized, issueController.getWatcherList);

    /**
     * 
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/:issueId/get/watcherList to get watcherList of an issue .
     * 
     * @apiParam {string} issueId issueId of the issue. (query params) (required).
     * @apiParam {string} authToken authToken of the loggedIn user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "All Watcher Details Found",
            "status": 200,
            "data": [
                {
                    "watcherId": "kMl4MTmxA",
                    "issueId": "HsH5m_yLP",
                    "watcherEmail": "birendra@gmail.com",
                    "createdOn": "2019-06-15T20:24:40.000Z"
                },
                {
                    "watcherId": "k3QQr-c9q",
                    "issueId": "HsH5m_yLP",
                    "watcherEmail": "rahul12@gmail.com",
                    "createdOn": "2019-06-15T20:52:24.000Z"
                }
            ]
        }
     * 
     */

    //app.post(`${baseUrl}/:watcherId/deleteWatcher`,auth.isAuthorized, issueController.deleteWatcher);

    // _______________________ route for search. ___________________________.


    //params: text,authToken
    app.get(`${baseUrl}/issue/:text/search`, auth.isAuthorized, issueController.searchIssue);

    /**
     * 
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/issue/:text/search to search for issues for the give text .
     * 
     * @apiParam {string} text text for search. (query params) (required).
     * @apiParam {string} authToken authToken of the loggedIn user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "issues present by this search text",
            "status": 200,
            "data": [
                {
                    "issueId": "tEPvRajHj",
                    "issueStatus": "done",
                    "issueTitle": "title of issue1",
                    "issueDescription": "description of issue1",
                    "issueReporter": "vivek",
                    "issueReporterEmail": "i123vivek@gmail.com",
                    "issueAssignee": "rahul",
                    "issueAssigneeEmail": "rahul12@gmail.com",
                    "issueCreatedOn": "2019-06-05T19:26:16.000Z",
                    "screenshotName": "",
                    "screenshotPath": "",
                    "_id": "5cf817587ebb8a2c35e0d665",
                    "__v": 0
                },
                {
                    "issueId": "x6j5QrYPo",
                    "issueStatus": "done",
                    "issueTitle": "title of issue1",
                    "issueDescription": "description of issue1",
                    "issueReporter": "vivek",
                    "issueReporterEmail": "i123vivek@gmail.com",
                    "issueAssignee": "rahul",
                    "issueAssigneeEmail": "rahul12@gmail.com",
                    "issueCreatedOn": "2019-06-02T10:02:20.000Z",
                    "screenshotName": "1560424747076_Screenshot from 2019-06-13 16-48-49.png",
                    "screenshotPath": "uploads/1560424747076_Screenshot from 2019-06-13 16-48-49.png",
                    "_id": "5cf39eacadc77329d9f78461",
                    "__v": 0
                },
                {
                    "issueId": "eYNtIFp7y",
                    "issueStatus": "done",
                    "issueTitle": "title of issue1",
                    "issueDescription": "description of issue1",
                    "issueReporter": "vivek",
                    "issueReporterEmail": "i123vivek@gmail.com",
                    "issueAssignee": "satu",
                    "issueAssigneeEmail": "satu@gmail.com",
                    "issueCreatedOn": "2019-06-01T06:04:35.000Z",
                    "screenshotName": "",
                    "screenshotPath": "",
                    "_id": "5cf215738cb8111312d832b0",
                    "__v": 0
                }
            ]
        }
     * 
     */

     //to mark notification aS seen

    //params: notificationId,authToken
    app.get(`${baseUrl}/mark/notification/seen`, auth.isAuthorized, notificationController.markNotificationAsSeen);

    /**
     * 
     * 
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/mark/notification/seen to mark notification as seen.
     *
     * @apiParam {string} notificationId notificationId of the user. (Send notificationId as query parameter) (required)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Marked As Seen",
            "status": 200,
            "data": {
                "notificationId": "Y3GEnkynj",
                "notificationStatus": "seen",
                "userEmailToSendNotification": [
                    "satu@gmail.com",
                    "birendra@gmail.com"
                ],
                "_id": "5d051e8955c1e60d37edeeb1",
                "notificationIssueId": "Ms_VDaYOU",
                "notificationMessage": "hey a new issue is something Updated in Issue Details Details [object Object]",
                "notificationPurpose": "edit",
                "__v": 0
            }
        }
     * 
     */



    

    //routes for passport-->socialLogin------------------------------------------------

    app.get('/login/facebook',
        passport.authenticate('facebook', { scope: ['email'] }
        ));

    // handle the callback after facebook has authenticated the user
    app.get('/login/facebook/callback',
        passport.authenticate('facebook', {
            // successRedirect : '/',
            // failureRedirect: '/home'
        }), userController.socialSignin
    );
    app.get('/api/logout', (req, res) => {
        // req.logout();
        // res.redirect('/');
        res.send(req.logout());

    })


    app.get(`${baseUrl}/get/Details/full`,userController.getInfoForToken)


    

    // app.post('/uploadphoto', upload.single('picture'),multer.uploadImg)

}
