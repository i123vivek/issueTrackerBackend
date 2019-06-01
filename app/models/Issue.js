const mongoose = require('mongoose')
const Schema = mongoose.Schema

let issueSchema = new Schema({
    issueId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    issueStatus: {
        type: String,
        default: 'in-backlog'
    },
    issueTitle: {
        type: String,
        default: ''
    },
    issueDescription: {
        type: String,
        default:''
    },
    issueReporter: {
        type: String,
        default: ''
    },
    issueReporterEmail: {
        type: String,
        default: ''
    },
    issueAssignee: {
        type: String,
        default: ''
    },
    issueAssigneeEmail: {
        type: String,
        default: ''
    },
    issueCreatedOn: {
        type: Date,
        default: ""
    }
})

// creating a text index.
// setting up text indexes on all string fields in our model.
issueSchema.index({ '$**' : 'text' })

module.exports = mongoose.model('Issue', issueSchema)
