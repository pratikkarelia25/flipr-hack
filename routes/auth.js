const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const bodyParser = require('body-parser');
const router = express.Router();

router.get('/signup',(req,res)=> res.render('signup'));
router.get('/login',(req,res)=> res.render('login'));
router.get('/dashboard',(req,res)=> res.render('dashboard'));

router.use(bodyParser.json())
router.post('/api/register', async (req,res) => {
    

    const {name,username,email,password:PlainTextPassword} = req.body;
    const password = await bcrypt.hash(PlainTextPassword,2);
    console.log(req.body)

    try{
        await User.create({
            name,
            username,
            email,
            password
        }),
        console.log('User created')
    }catch(error){
        console.log(error);
        return res.json({status: 'error'})
    }
    res.json({status:'ok'})
})
module.exports = router;