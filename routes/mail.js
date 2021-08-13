const express = require('express');
const router = express.Router();

router.get('/all',(req,res)=>{
    res.render('mail/show')
})

module.exports = router;