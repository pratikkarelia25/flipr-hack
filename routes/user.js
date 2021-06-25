const express = require('express');
const router = express.Router();

//LOGIN PAGE
router.get('/login', (req,res) => res.render('login'));

//SIGNUP PAGE
router.get('/signup', (req,res) => res.render('signup'));
module.exports = router;

//SIGNUP handle

router.post('/signup', (req,res) => {
    const { name,email,password, password2 } = req.body;
    let errors = [];

    if(!name || !email || !password || !password2){
        errors.push({msg: " Please fill in all the fields"});
    }
    if(password !== password2){
        errors.push({msg: 'Passwords dont match'});
    }
    if(password.length < 6){
        errors.push({msg: 'Your password should be atleast 6 characters'})
    }
    if(errors.length >0){
        res.render('signup',{})
    }
    else{
        res.send(pass);
    }
})