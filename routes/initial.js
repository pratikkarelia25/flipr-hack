const express = require('express');
const router = express.Router();




const { ensureAuthenticated, forwardAuthenticated } = require('../model/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('index'));

// Dashboard
router.get('/email/index', ensureAuthenticated, (req, res) =>
  res.render('index', {
    user: req.user
  })
);
module.exports = router;