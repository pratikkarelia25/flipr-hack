const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/signup',(req,res)=> res.render('signup'));
router.get('/login',(req,res)=> res.render('login'));
router.get('/dashboard',(req,res)=> res.render('dashboard'));

router.use(bodyParser.json())


// **********************  Handle errors *********************
const handleErrors = (err) => {
    console.log(err.message,err.code);
    
}

// ***********************************************************
router.post('/api/register', async (req,res) => {
    

    const {name,username,email,password:PlainTextPassword} = req.body;
    const password = await bcrypt.hash(PlainTextPassword,5);

    try{
        await User.create({
            name,
            username,
            email,
            password
        });
        const token = createToken(user.id);
        res.cookie('jwt', token, { httpOnly:true, maxTime: maxTime*1000 /*milliseconds*/ });
        res.status(201).json({user:user.id});
        console.log('User'+ name + 'created');
    }catch(error){
        handleErrors(error)
        return res.json({status: 'error'})
    }
    res.json({status:'ok'})
})

// ************************ CREATE WEB TOKENS ***********************************
const maxTime = 3 * 24 * 3600; // 3 days in seconds
const createToken = (id) => {
    return jwt.sign({id}, 'mailficient big secret', {
        expiresIn: maxTime
    });
}

// *****************************************************************************


module.exports = router;