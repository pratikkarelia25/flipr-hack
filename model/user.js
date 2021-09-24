const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
        minlength: [6, 'Must be atleast 6 characters'],
        required: [ true,'Please enter a password'],
    }
    },
    {timestamps :true}
);
// /
// UserSchema.post('save', function(doc,next){
//     console.log('New user was created and saved',doc);

//     next()
// })

// mongoose hooks , fire a function before a user has been entered in the db

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static login
UserSchema.statics.login = async function(username, password){
    const user = await this.findOne({ username });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Username');
}


// user == singular of the collection name == users
const model = mongoose.model('user',UserSchema);

module.exports = model;