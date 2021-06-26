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


// LOGIN

// const userschema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: True
//     },
//     password:{
//         type: String,
//         required: True
//     },
//     //remove this
//     date:{
//         type: Date,
//          default: Date.now
//     }
// });
// const User = mongoose.model('User', userSchema);

// module.exports = User;