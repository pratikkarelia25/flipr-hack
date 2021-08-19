const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    to:{
        type: String,
        required: true,
    },
    subject:{
        type:String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Email',emailSchema)