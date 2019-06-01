'use strict'

/**
 * Module Dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let socialUserSchema = new Schema({
    userId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    userName: {
        type: String,
        default: ''
        
    },
    email: {
        type: String,
        default: '',
        unique: true
    },
    createdOn: {
        type: Date,
        default: ""
    }
})

module.exports = mongoose.model('SocialUser', socialUserSchema);