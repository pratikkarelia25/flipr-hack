const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../model/user');

const requireAuth = (req,res,next) =>{

    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET, (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/auth/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/auth/login');
    }
}

//check curr user
const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET, async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.client = null;
                next();
            }
            else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.client = user;
                next();
            }
        })
    }
    else{
        res.locals.client = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };