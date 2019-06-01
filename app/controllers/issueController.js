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

let getAllIssue = (req, res) => {
    IssueModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(err.message, 'issueController: getAllIssue', 10)
                let apiResponse = response.generate(true, 'Failed To Find Issue Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Issue found', 'issueController: getAllIssue')
                let apiResponse = response.generate(true, 'No issue found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Issue found', 'issueController: getAllIssue');
                let apiResponse = response.generate(false, 'All issue details found', 200, result)
                res.send(apiResponse)
            }
        })
}  // end of getAllIssue function.

let getSingleIssue = (req, res) => {
    IssueModel.findOne({ 'issueId': req.params.issueId })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(err.message, 'issueController: getSingleIssue', 10)
                let apiResponse = response.generate(true, 'Failed To Find Issue Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Issue found', 'issueController: getSingleIssue')
                let apiResponse = response.generate(true, 'No issue found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Issue found', 'issueController: getSingleIssue');
                let apiResponse = response.generate(false, 'Issue details found', 200, result)
                res.send(apiResponse)
            }
        })
} //end of getSingleIssue function.

let issueCreator = (req,res) =>{
    let validateIssueInput = () =>{
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not met the requirement', 400, null)
                    reject(apiResponse)
                }
                else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During issue Creation', 'issueController: createIssue()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    } // end of validateIssueInput function.

    let createIssue = () =>{
        return new Promise((resolve,reject)=>{
            let newIssue = new IssueModel({
                issueId: shortid.generate(),
                issueStatus: req.body.issueStatus,
                issueTitle: req.body.issueTitle,
                issueDescription: req.body.issueDescription,
                issueReporter: req.body.issueReporter,
                issueReporterEmail: req.body.email.toLowerCase(),
                issueAssignee: req.body.issueAssignee,
                issueAssigneeEmail: req.body.issueAssigneeEmail.toLowerCase(),
                issueCreatedOn: time.now()
            })
            newIssue.save((err, newIssue) => {
                if (err) {
                    console.log("error while saving issue: ",err)
                    logger.error(err.message, 'issueController: createIssue', 10)
                    let apiResponse = response.generate(true, 'Failed to create new issue', 500, null)
                    reject(apiResponse)
                } else {
                    let newIssueObj = newIssue.toObject();
                    resolve(newIssueObj)
                }
            })
        })
    }

    validateIssueInput(req, res)
        .then(createIssue)
        .then((resolve) => {

            let apiResponse = response.generate(false, 'Issue created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}  // end of issueCreator function.

let editIssue = (req,res) =>{
    let options = req.body;
    IssueModel.updateOne({'issueId': req.params.issueId }, options).exec((err,result) =>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'issueController: editIssue', 10)
            let apiResponse = response.generate(true, 'Failed To edit issue details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Issue Found', 'issueController: editIssue')
            let apiResponse = response.generate(true, 'No Issue Found', 404, null)
            res.send(apiResponse)
        } else {
            console.log("issue details edited");
            let apiResponse = response.generate(false, 'Issue details edited', 200, result)
            res.send(apiResponse)
            console.log(result);
        }
    })
} //end of editIssue function.

let deleteIssue = (req,res) =>{
    IssueModel.findOneAndDelete({'issueId': req.params.issueId }).exec((err,result) =>{
        if(err){
            console.log(err)
            logger.error(err.message, 'issueController: deleteIssue', 10)
            let apiResponse = response.generate(true, 'Failed To delete issue', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Issue Found', 'issueController: deleteIssue')
            let apiResponse = response.generate(true, 'No Issue Found', 404, null)
            res.send(apiResponse)
        } else {
            console.log("issue deleted successfully");
            let apiResponse = response.generate(false, 'Issue is deleted  successfully', 200, result)
            res.send(apiResponse)
        }
    })
} // end of deleteIssue function.




let writeComment = (req, res) => {
        IssueModel.findOne({issueId: req.body.issueId})
            .select('-__v -_id')
            .lean()
            .exec((err,result) =>{
                if(err){
                    console.log(err)
                    logger.error(err.message,'issueController: writeComment',10)
                    let apiResponse = response.generate(true,'issueId not found', 500, null)
                    res.send(apiResponse)
                } else if(check.isEmpty(result)) {
                    logger.info('No issue Found', 'issueController: writeComment')
                    let apiResponse = response.generate(true, 'No issue Found', 404, null)
                    res.send(apiResponse)
                }
                 else{
                    let newComment = new CommentModel({
                        commentId: shortid.generate(),
                        issueId: req.body.issueId,
                        comment: req.body.comment,
                        reporter: req.body.reporter,
                        reporterEmail: req.body.reporterEmail,
                        createdOn: time.now()
                    })
                    newComment.save((err,newComment)=>{
                        if (err) {
                            console.log("error while saving new comment: ",err)
                            logger.error(err.message, 'issueController: writeComment', 10)
                            let apiResponse = response.generate(true, 'Failed to save new comment', 500, null)
                            res.send(apiResponse)
                        } else if(check.isEmpty(newComment)){
                            console.log("no comment found");
                            logger.info('No comment Found', 'issueController: writeComment')
                            let apiResponse = response.generate(true, 'No Comment Found', 404, null)
                            res.send(apiResponse)
                        } else {
                            console.log("comment created");
                            logger.info("comment created", "issueController: writeComment");
                            let apiResponse = response.generate(false, 'Comment Found', 200, newComment);
                            res.send(apiResponse);
                        }
                    })
                }
            })
}


let viewComment =(req,res) =>{
    if (check.isEmpty(req.params.issueId)) {
        let apiResponse = response.generate(true, "issueId missing", 500, null);
        res.send(apiResponse);
    } else{
        CommentModel.find({'issueId': req.params.issueId})
        .select('-__v -_id')
        .lean()
        .exec((err,result) =>{
            if(err){
                console.log(err)
                logger.error(err.message,'issueController: viewComment',10)
                let apiResponse = response.generate(true,'Failed to find comment with this issueId', 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(result)){
                logger.info('No comment found', 'issueController: viewComment')
                let apiResponse = response.generate(true, 'No comment found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Comment Found', 'issueController: viewComment')
                let apiResponse = response.generate(false, 'comment Found', 200, result)
                res.send(apiResponse)
            }
        })

    }
    
}

let addAsWatcher = (req,res) =>{
    WatcherModel.findOne({'issueId': req.body.issueId,'watcherEmail': req.body.watcherEmail })
        .select('-__v -_id')
        .lean()
        .exec((err,retrievedIssueDetails) => {
            if (err){
                console.log(err)
                logger.error(err.message,'issueController: addAsWatcher',10)
                let apiResponse = response.generate(true,'Failed to find issueId', 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(retrievedIssueDetails)){
                let newWatcher = new WatcherModel({
                    watcherId: shortid.generate(),
                    issueId: req.body.issueId,
                    watcherEmail: req.body.watcherEmail.toLowerCase(),
                    createdOn: time.now(),

                })
                newWatcher.save((err,newWatcher) =>{
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'issueController: addAsWatcher', 10)
                        let apiResponse = response.generate(true, 'Failed to add as a watcher', 500, null)
                        res.send(apiResponse)
                    } else {
                        console.log("Added as a watcher");
                        logger.info("watcher Added", "issueController: addAsWatcher");
                        let apiResponse = response.generate(false, 'watcher Added', 200, newWatcher);
                        res.send(apiResponse);
                    }
                })
            } else {
                logger.error('Already added as watcher for this issue ', 'issueController: addAsWatcher', 4)
                let apiResponse = response.generate(true, 'Already added as watcher for this issue ', 403, null)
                res.send(apiResponse)
            }
                
            
        })
} // end of addAsWatcher function.

let getWatcherList = (req,res) =>{
    WatcherModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err,result) =>{
            if (err){
                logger.error(err.message, 'issueController:getWatcherList', 10)
                let apiResponse = response.generate(true, "Failed to find watcher list", 500, null);
                res.send(apiResponse)
            } else if(check.isEmpty(result)){
                logger.info('No Watcher Found', 'issueController:getWatcherList')
                let apiResponse = response.generate(true, 'No Watcher Found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Watcher Found', 'issueController:getWatcherList')
                let apiResponse = response.generate(false, 'All Watcher Details Found', 200, result)
                res.send(apiResponse)
            }
        })
} // end of getWatcherList function.

let deleteWatcher = (req,res) =>{
    WatcherModel.findOneAndDelete({ 'watcherId': req.params.watcherId }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'issueController: deleteWatcher', 10)
            let apiResponse = response.generate(true, 'Failed To delete watcher', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Watcher Found', 'issueController: deleteWatcher')
            let apiResponse = response.generate(true, 'No Watcher Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Watcher deleted successfully', 200, result)
            res.send(apiResponse)
        }
    })
} // end of deleteWatcher function.

let searchIssue = (req,res) =>{
    if (check.isEmpty(req.query.text)){
        logger.error(true, "issueController:searchIssue", 10);
        let apiResponse = response.generate(true, "No text entered for search", 500, null);
        res.send(apiResponse);
    } else {
        //var size = 1;
        //var skipPageNo = req.query.skipPageNo;
        //var skip = size * (skipPageNo-1);
        //var limit = size;
        // if(skipPageNo < 0 || skipPageNo === 0) {
        //     logger.error(true, "issueController:searchIssue", 5);
        //     let apiResponse = response.generate(true, "invalid skip page number, should start with 1", 500, null);
        //     res.send(apiResponse);
        // } else {
            IssueModel.find({ $text: { $search: req.query.text } })
                //.limit(size)
                //.skip(skipPageNo)
                
                // .limit(1)
                // .skip(parseInt(req.query.skip))
                .exec((err, result) =>{
                    if (err){
                        console.log(err)
                        logger.error(err.message, 'issueController: searchIssue', 10)
                        let apiResponse = response.generate(true, 'Failed To find text', 500, null)
                        res.send(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Issue Found', 'issueController: searchIssue')
                        let apiResponse = response.generate(true, 'No issue present with this search text', 404, null)
                        res.send(apiResponse)
                    } else {
                        logger.info('Issues found', "issueController:searchIssue");
                        let apiResponse = response.generate(false, "issues present by this search text", 200, result);
                        res.send(apiResponse);
                    }
                })

        //}
    }
}

module.exports = {
    getAllIssue: getAllIssue,
    getSingleIssue: getSingleIssue,
    issueCreator: issueCreator,
    editIssue: editIssue,
    deleteIssue: deleteIssue,
    writeComment: writeComment,
    viewComment: viewComment,
    addAsWatcher: addAsWatcher,
    getWatcherList: getWatcherList,
    deleteWatcher: deleteWatcher,
    searchIssue: searchIssue

}

