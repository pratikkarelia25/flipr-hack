const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    to: String,
    cc: String,
    subject: String,
    schedule: Date,
    body: String
})

module.exports = mongoose.model('Email',EmailSchema);