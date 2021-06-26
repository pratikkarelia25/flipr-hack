// LOGIN
const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    name:{
        type: String,
        required: True
    },
    password:{
        type: String,
        required: True
    },
    //remove this
    date:{
        type: Date,
         default: Date.now
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;