const express = require('express');
const router = express.Router();

//LOGIN PAGE
router.get('/login', (req,res) => res.render('login'));

//SIGNUP PAGE
router.get('/signup', (req,res) => res.render('signup'));
module.exports = router;
