const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../model/users');

//LOGIN PAGE
router.get('/login', (req,res) => res.render('login'));

//SIGNUP PAGE
router.get('/signup', (req,res) => res.render('signup'));


//SIGNUP handle

router.post('/signup', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('signup', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('signup', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          //hashing passwords
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/user/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
  
  // Login
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/email',
      failureRedirect: '/user/login',
      failureFlash: true
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
  module.exports = router;