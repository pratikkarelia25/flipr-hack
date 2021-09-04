const mongoose = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema(
    {
    name :{
        type : String,
        required:[ true,'Please enter your name']
    },
    username :{
        type : String,
        required:[ true,'Please enter your username'], 
        unique: true
    },
    email :{
        type : String,
        required: [ true,'Please enter your email'],
        validate: [isEmail, 'Please enter a valid e-mail']
    },
    password :{
        type : String,
        required: [ true,'Please enter a password'],
        minlength: [6, 'Minimum length of the password must be 6 characaters']
    }
    },
    {timestamps :true}
)

// user == singular of the collection name == users
const model = mongoose.model('User',UserSchema);

module.exports = model;