const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    to: {
        type:String
    },
    cc: String,
    subject: String,
    schedule: {
        type:String,
        enum: ['Repeatative','Weekly', 'Monthly']
    },
    body: String
})

module.exports = mongoose.model('Email',EmailSchema);


