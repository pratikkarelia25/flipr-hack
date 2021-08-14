const express = require('express');
const router = express.Router();
const Email = require('../model/mail');

router.get('/',async(req,res)=>{
    const emails = await Email.find({});
    res.render('mail/show',{emails});
})
router.get('/new',(req,res)=>{
    res.render('mail/new');
})

router.post('/',async (req,res)=>{
    const mail = await Email(req.body.emails);
    await mail.save()
    res.redirect('/mail')
})

module.exports = router;