const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const events = require('events');
const eventEmitter = new events.EventEmitter();

/* Models */
const AuthModel = mongoose.model('Auth');
const UserModel = mongoose.model('User');
const SocialUserModel = mongoose.model('SocialUser');
const IssueModel = mongoose.model('Issue');
const CommentModel = mongoose.model('Comment');
const WatcherModel = mongoose.model('Watcher');
const NotificationModel = mongoose.model('Notification')


//for issue create

let createANewNotificationObj = (issueDetails) => {

    NotificationModel.findOne({ notificationIssueId: issueDetails.issueId, notificationPurpose: "create" }, (err, result) => {

        if (err) {
            console.log(err);
            logger.error(err.message, 'notificationController: createANewnotificationObj', 10)

        } else if (check.isEmpty(result)) {

            let peopleToSendNotification = [issueDetails.issueReporterEmail, issueDetails.issueAssigneeEmail]
            let newnotificationObj = new NotificationModel({
                notificationId: shortid.generate(),
                notificationIssueId: issueDetails.issueId,
                notificationStatus: "un-seen",
                notificationMessage: `hey a new issue is created with Details ${issueDetails}`,
                notificationPurpose: 'create',
                userEmailToSendNotification: peopleToSendNotification

            })

            newnotificationObj.save((err, result) => {
                if (err) {
                    console.log("error while saving notifiction: ", err)
                    logger.error(err.message, 'notificationController: createNewNotification', 10)

                } else {
                    console.log("notificationObj Created & saved successfully", result)
                    logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)
                }
            })
        }
        else {
            console.log("notification obj allready exists for the purpose ", err)
            logger.error('notification obj allready exists for the purpose', 'notificationController: createNewNotification', 10)

        }

    })

}


let createANewNotificationObjOnEdit = (issueDetails) => {

    let peopleToSendNotification = [];

    let findThePeopleToSendfromWatcherList = (issueDetails) => {
        return new Promise((resolve, reject) => {
            // console.log("details inside function notification edit",issueDetails);
            WatcherModel.find({ issueId: issueDetails.issueId }, (err, result) => {

                if (err) {
                    console.log(err);
                    logger.error(err.message, 'notificationController: createANewNotificationObjOnEdit', 10)
                    let apiResponse = response.generate(true, 'error while find the watcher  details', 400, null)
                    reject(apiResponse)
                }
                
                else {
                    console.log('result  to send in edit',result)
                    for (let x in result) {
                         peopleToSendNotification.push(result[x].watcherEmail)

                    }
                    let issueDetailsObj = issueDetails.toObject();

                    issueDetailsObj.peopleToSendList = peopleToSendNotification

                    // console.log("issue Details here in edit objectified 2",issueDetailsObj)
                    issueDetailsObj.peopleToSendList.push(issueDetailsObj.issueAssigneeEmail, issueDetailsObj.issueReporterEmail)
                    // console.log("issue Details here in edit objectified 3-----",issueDetailsObj)
                    resolve(issueDetailsObj)
                }
            })

        })



    }

    // fun to create notification and save notification to be written here
    let createAndSaveNotificationObj = (finalIssueObj) => {

        return new Promise((resolve, reject) => {

            let newnotificationObj = new NotificationModel({
                notificationId: shortid.generate(),
                notificationIssueId: finalIssueObj.issueId,
                notificationStatus: "un-seen",
                notificationMessage: `hey a new issue is something Updated in Issue Details Details ${finalIssueObj}`,
                notificationPurpose: 'edit',
                userEmailToSendNotification: finalIssueObj.peopleToSendList

            })


            newnotificationObj.save((err, result) => {
                if (err) {
                    console.log("error while saving notifiction: ", err)
                    logger.error(err.message, 'notificationController: createNewNotificationObjFor-IssueEdit', 10)

                    let apiResponse = response.generate(true, 'ther is no watcher for the given issue', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(result)
                }
            })
        })




    }

    findThePeopleToSendfromWatcherList(issueDetails)
        .then(createAndSaveNotificationObj)
        .then((resolve) => {

            console.log("notificationObj Created successfully On issue-Edit", resolve)
            logger.info("notificationObj Created successfully", 'notificationController: createANewNotificationObjOnEdit', 1)

        })

        .catch((err) => {
            console.log(err);

            //logger ka dekhna hai
            logger.error(err.message, 'notificationController: createNewNotificationObjFor-IssueEdit', 10)
        })


}

let createNotificationObjOnComment = (commentData) => {

    console.log("commentData in createNotification",commentData)
    let peopleToSendNotification = [];

    let toSetUserEmailTOSendNotification = (commentData) => {

        console.log("commentData in createNotification->78---------------------------------",commentData)

        return new Promise((resolve, reject) => {

            WatcherModel.find({ issueId:commentData.issueId }, (err, result) => {


                if (err) {
                    console.log(err);
                    logger.error(err.message, 'notificationController: createANewNotificationObjOnCommentCreate', 10)
                    let apiResponse = response.generate(true, 'error while find the watcher  details', 400, null)
                    reject(apiResponse)
                }
                else {
                     console.log("notificationObj Created successfully On comment", result)
                    // logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)
                    for (let x in result) {
                         peopleToSendNotification.push(result[x].watcherEmail)

                    }

                    // peopleToSendNotification.push(comment)



                    let commentDataObj = commentData.toObject()
                    commentDataObj.peopleToSendList = peopleToSendNotification
                    console.log("commentData in createNotification-resolve",commentDataObj)
                    resolve(commentDataObj)
                }

            })


        })

    }

    let addAssigneeAndReporter = (commentData) => {

        console.log("commentData in createNotification -> add AssigneeAndReporter",commentData)
        return new Promise((resolve, reject) => {

            IssueModel.findOne({ issueId:commentData.issueId }, (err, result) => {
                if (err) {
                    console.log(err);
                    logger.error(err.message, 'notificationController: createANewNotificationObjOnCommentCreate', 10)
                    let apiResponse = response.generate(true, 'error while find the assignee reporter  details', 400, null)
                    reject(apiResponse)
                }
                else {
                    commentData.peopleToSendList.push(result.issueReporterEmail, result.issueAssigneeEmail)
                    resolve(commentData)
                }

            })
        })
    }
    let createAndSaveNotificationObj = (commentData) => {

        console.log("commentData in createNotification -> createAndsave",commentData)
        console.log("commentData type",typeof commentData)
        let newNotificationObj = new NotificationModel({

            notificationId: shortid.generate(),
            notificationIssueId: commentData.issueId,
            notificationStatus: "un-seen",
            notificationMessage:commentData,
            notificationPurpose: 'comment-create',
            userEmailToSendNotification: commentData.peopleToSendList

        })

        newNotificationObj.save((err, result) => {

            if (err) {
                console.log("error while saving notifiction:obj -comment-create ", err)
                logger.error(err.message, 'notificationController: createNewNotificationObjFor-IssueEdit', 10)

                
            } else {
                console.log("notificationObj Created successfully On comment-create", result)
                logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)
                // resolve (result)
            }

        })

    }
    toSetUserEmailTOSendNotification(commentData)
    .then(addAssigneeAndReporter)
        .then(createAndSaveNotificationObj)
        
        .then((resolve) => {
            console.log("notificationObj Created successfully On issue-Edit", resolve)
            logger.info("notificationObj Created successfully", 'notificationController: createANewNotificationObjOnEdit', 1)

        })

        .catch((err) => {
            console.log(err);

            
            logger.error(err.message, 'notificationController: createNewNotificationObjFor-IssueEdit', 10)
        })


}

let markNotificationAsSeen = (req, res) => {
    console.log("notification id is:",req.query.notificationId)



    let options = {
        notificationStatus :"seen"

    }


    NotificationModel.findOneAndUpdate({'notificationId': req.query.notificationId }, options).exec((err,result) =>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'notificationController: markAsSeen', 10)
            let apiResponse = response.generate(true, 'Failed To edit notification details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Issue Found', 'notificationController: markAsSeen')
            let apiResponse = response.generate(true, 'No notification Found', 404, null)
            res.send(apiResponse)
        } else {
            console.log("Marked As Seen");
            let apiResponse = response.generate(false,"Marked As Seen", 200, result)
          // eventEmitter.emit("issue-edited", req.params.issueId);

            res.send(apiResponse)
            console.log(result);
        }
    })

}

module.exports = {
    createANewNotificationObj: createANewNotificationObj,
    createANewNotificationObjOnEdit: createANewNotificationObjOnEdit,
    createNotificationObjOnComment: createNotificationObjOnComment,
    markNotificationAsSeen:markNotificationAsSeen
}