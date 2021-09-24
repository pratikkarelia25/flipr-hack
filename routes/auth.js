const express = require('express');
const User = require('../model/user');
const bodyParser = require('body-parser');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { requireAuth, checkUser } = require('../middleware/authmiddle');

router.get('*', checkUser);
router.get('/signup',(req,res)=> res.render('signup'));
router.get('/login',(req,res)=> res.render('login'));
router.get('/dashboard', requireAuth ,(req,res)=> res.render('dashboard'));

router.use(bodyParser.json())


// **********************  Handle errors *********************
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { name: '', username: '', email: '', password: ''};


    //login errors
    if(err.message === 'Incorrect Username'){
        errors.username = 'Incorrect Username';
    }
    if(err.message === 'Incorrect Password'){
        errors.password = 'Incorrect Password';
    }
    //duplicate errors
    if(err.code === 11000){
        errors.username = 'Username is already registered';
        // console.log(errors);
        return errors;
    }
    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
           errors[properties.path] = properties.message;
        //    console.log(errors);
        })
    }
    return errors;
}

// ***********************************************************
router.post('/api/register', async (req,res) => {
    const {name,username,email,password} = req.body;

    try{
        const user = await User.create({
            name,
            username,
            email,
            password
        });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly:true, maxTime: maxTime*1000});
        res.status(201).json({user:user._id});
        console.log('User '+ user.name + ' created');
    }
    catch(err){
        const error = handleErrors(err);
        res.status(400).json({ error });
    }
    // res.json({status:'ok'})
})

router.post('/api/login', async (req,res) => {
    const {username,password} = req.body;

    try{
        const user = await User.login(username,password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly:true, maxTime: maxTime*1000});
        res.status(201).json({user:user._id});
        console.log('User '+ user.name + ' logged');

    }
    catch(err){
        const error = handleErrors(err);
        res.status(400).json({ error });
    }
})

router.get('/logout', (req,res)=> {
    //removing the token
    res.cookie('jwt', '', {maxTime:1} );
    console.log('logged out');
    res.redirect('/');
})

// ************************ CREATE WEB TOKENS ***********************************
const maxTime = 3 * 24 * 3600; // 3 days in seconds
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, {
        expiresIn: maxTime
    });
}

// *****************************************************************************


module.exports = router;