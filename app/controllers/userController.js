const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const AuthModel = mongoose.model('Auth')
/* Models */
const UserModel = mongoose.model('User')
const SocialUserModel = mongoose.model('SocialUser');


let getLocalUser = (req, res) => {
    UserModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'userController: getLocalUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find Users Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'userController: getLocalUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('result is',result[0].email);
                logger.info('User Found', 'userController: getLocalUser')
                let apiResponse = response.generate(false, 'All Users Details Found', 200, result)
                res.send(apiResponse)
            }
        })
} // end of get local user.

let getSocialUser = (req, res) => {
    SocialUserModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'userController: getSocialUser', 10)
                let apiResponse = response.generate(true, 'Failed to find social user details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No social user found', 'userController: getSocialUser')
                let apiResponse = response.generate(true, 'No Social User Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Social User Found', 'userController: getSocialUser')
                let apiResponse = response.generate(false, 'Social User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}

// let getAllUser = (req,res) =>{
//     var allUserList = [];
//     let getLocalUser = () =>{
//         return new Promise((resolve,reject) =>{
//             UserModel.find()
//                 .exec((err,details) =>{
//                     if(err){
//                         logger.error(err.message, 'userController: getLocalUser', 10)
//                         let apiResponse = response.generate(true, 'Failed To find local User', 500, null)
//                         reject(apiResponse)
//                     } else if(check.isEmpty(details)){
//                         logger.info('no local user found', 'userController: getLocalUser');
//                         let apiResponse = response.generate(false, 'no local user Found', 404, details)
//                         resolve(apiResponse)
//                     } else{
//                         for(let x in details){
                            
//                         }
//                     }
//                 })
//         })
//     }
// }

let getSingleUser = (req, res) => {
    UserModel.findOne({ 'userId': req.params.userId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'userController: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed to find local user details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                // logger.info('No user found', 'userController: getSingleUser')
                // let apiResponse = response.generate(true, 'No user found', 404, null)
                // res.send(apiResponse)
                SocialUserModel.findOne({ 'userId': req.params.userId })
                    .select('-password -__v -_id')
                    .lean()
                    .exec((err, result) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: getSingleUser', 10)
                            let apiResponse = response.generate(true, 'Failed to find social user details', 500, null)
                            res.send(apiResponse)
                        } else if (check.isEmpty(result)) {
                            logger.info('No user found', 'userController: getSingleUser')
                            let apiResponse = response.generate(true, 'No user found', 404, null)
                            res.send(apiResponse)
                        } else {
                            logger.info('Social User Found', 'userController: getSingleUser')
                            let apiResponse = response.generate(false, 'Social User Details Found', 200, result)
                            res.send(apiResponse)
                        }
                    })
            } else {
                logger.info('Local User Found', 'userController: getSingleUser')
                let apiResponse = response.generate(false, 'Local User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
} // end of getSingleUser function.

let deleteUser = (req, res) => {

    UserModel.findOneAndDelete({ 'userId': req.params.userId }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'userController: deleteUser', 10)
            let apiResponse = response.generate(true, 'Failed To delete user', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            // logger.info('No User Found', 'userController: deleteUser')
            // let apiResponse = response.generate(true, 'No User Found', 404, null)
            // res.send(apiResponse)
            SocialUserModel.findOneAndDelete({ 'userId': req.params.userId }).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: deleteUser', 10)
                    let apiResponse = response.generate(true, 'Failed To delete local user', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No User Found', 'userController: deleteUser')
                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Deleted the social user successfully', 200, result)
                    res.send(apiResponse)
                }
            })
        } else {
            let apiResponse = response.generate(false, 'Deleted the local user successfully', 200, result)
            res.send(apiResponse)
        }
    }) // end user model find and remove


} // end of deleteUser function.

let editUser = (req, res) => {

    let options = req.body;
    UserModel.update({ 'userId': req.params.userId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'userController: editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit user details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            // logger.info('No User Found', 'userController: editUser')
            // let apiResponse = response.generate(true, 'No User Found', 404, null)
            // res.send(apiResponse)
            SocialUserModel.update({ 'userId': req.params.userId }, options).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: editUser', 10)
                    let apiResponse = response.generate(true, 'Failed To edit social user details', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No User Found', 'userController: editUser')
                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Social User details edited', 200, result)
                    res.send(apiResponse)
                }
            })
        } else {
            let apiResponse = response.generate(false, 'Local User details edited', 200, result)
            res.send(apiResponse)
        }
    }) // end user model update


} // end editUser function.


// start user signup function 

let signUpFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not meets the requirement', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, 'password parameter is missing', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input
    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {

                        let newUser = new UserModel({
                            userName: req.body.email.toLowerCase(),
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            email: req.body.email.toLowerCase(),
                            mobileNumber: req.body.mobileNumber,
                            password: passwordLib.hashpasswordUsingMd5(req.body.password),
                            createdOn: time.now(),

                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Already Present With this Email ', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this Email ', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create user function


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {

    let findUser = () => {

        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log("req body email is there");
                UserModel.findOne({ email: req.body.email }, (err, userDetails) => {
                    /* handle the error here if the User is not found */
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        /* generate the error message and the api response message here */
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                        /* if Company Details is not found */
                    } else if (check.isEmpty(userDetails)) {
                        /* generate the response and the console error message here */
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    }
                    else {
                        /* prepare the message and the api response here */
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });

            } else {
                let apiResponse = response.generate(true, 'email parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    // end of find user function

    let validatePassword = (retrievedUserDetails) => {
        console.log(retrievedUserDetails);

        return new Promise((resolve, reject) => {



            let checkToken = passwordLib.comparePasswordGenerated(req.body.password, retrievedUserDetails.password);
            if (checkToken === true) {
                let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                delete retrievedUserDetailsObj.password
                delete retrievedUserDetailsObj._id
                delete retrievedUserDetailsObj.__v

                console.log(retrievedUserDetailsObj);
                resolve(retrievedUserDetailsObj)
            } else {

                logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                let apiResponse = response.generate(true, 'Wrong Password, Login Failed', 400, null)
                reject(apiResponse)

            }
        })
    }
    // end of validatePassword() function.

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                    console.log("token is generated");
                }
            })
        })
    }
    // end of generateToken() function.

    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }
    // end of saveToken() function.

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })

}


// end of the login function 


let socialSignin =(req,res) =>{

    let filterUserDetails =()=>{
        return new Promise ((resolve,reject)=>{


            if(check.isEmpty(req.user)) {

                logger.error('User Details  Passed is empty', 'userController: socilaSignin()', 7)
                let apiResponse = response.generate(true, 'No User Details Found orUser Details  Passed is empty', 404, null)
                reject(apiResponse)

            }
            else{

                let userObj = req.user.toObject()

                delete userObj.password
                delete userObj._id
                delete userObj.__v
    
    
                resolve(userObj);
    

            }
           

        })
    } //end of filterUserDeatails



    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                    console.log("token is generated");
                }
            })
        })
    }
    // end of generateToken() function.


    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }
    // end of saveToken() function.


    filterUserDetails(req,res)
    .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, ' Social Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
            // console.log("response send on successful social login",res)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })






}


let logout = (req, res) => {

    AuthModel.findOneAndDelete({ userId: req.user.userId }, (err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'user Controller: logout', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
        }
    })



} // end of the logout funct

let getAllUser =(req,res)=>
{

    let getAllLocalUser = () =>
    {
        return new Promise ((resolve, reject) => {

            UserModel.find()
            .select('-__v -_id')
            .lean()
            .exec((err, result) => {

            if (err) {
                console.log(err)
                logger.error(err.message, 'userController: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed to find local user for all user details', 500, null)
                reject(apiResponse)
            }

            else{
                resolve(result)
            }

        })
            
        })

    }


    let getAllSocialUserAndFilter = (localUserResult) => {
        return new Promise((resolve,reject) =>{
            SocialUserModel.find()
            .select('-__v -_id')
            .lean()
            .exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: getAllUser', 10)
                    let apiResponse = response.generate(true, 'Failed to find social user for all user details', 500, null)
                    reject(apiResponse)
                }

                else {
                    let filterUserObj = check.compareAndFilter(localUserResult,result)

                    resolve(filterUserObj)
                }
            })
        })
    }

    getAllLocalUser(req,res)
    .then(getAllSocialUserAndFilter)
    .then((resolve)=>{
        let apiResponse = response.generate(false, 'get All User', 200, resolve)
            res.status(200)
            res.send(apiResponse)

    })

    .catch((err) => {
        console.log("errorhandler");
        console.log(err);
        res.status(err.status)
        res.send(err)
    })

}




module.exports = {

    getLocalUser: getLocalUser,
    getSocialUser: getSocialUser,
    getAllUser:getAllUser,
    getSingleUser: getSingleUser,
    deleteUser: deleteUser,
    editUser: editUser,
    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    socialSignin:socialSignin,
    logout: logout

}// end exports