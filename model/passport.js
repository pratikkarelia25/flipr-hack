const passport = require('passport');
const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth2').Strategy;



// Load User model
const User = require('../model/users');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );



//Google authentication

passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:"http://localhost:3000/google/callback",
  passReqToCallback:true
  
},
function(request, accessToken, refreshToken, profile, done) {
    console.log(profile.id);
    return done(null, profile);
  
}
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(null, user);
  });
});
};
passport.serializeUser(function(profile, done) {
  done(null, profile.id);
});


passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, profile) {
    done(err, profile);
  });
});