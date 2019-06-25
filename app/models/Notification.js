const mongoose = require('mongoose')
const Schema = mongoose.Schema

let notificationSchema = new Schema ({
    notificationId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },

    notificationIssueId:
    {
        type: String,
        required:true

    },
    notificationStatus: {
        type: String,
        default: 'un-seen'
    },
    notificationMessage:Object,
    userEmailToSendNotification:{
        type: [String],
        default: ''
    },
    notificationPurpose:{

        type: String,
        //default: ''
        
    }
})

module.exports = mongoose.model('Notification', notificationSchema)
