const express = require('express');
const router = express.Router();
const Email = require('../model/mail');

router.get('/',async(req,res)=>{
    const emails = await Email.find({});
    res.render('mail/index',{emails});
})
router.get('/new',(req,res)=>{
    res.render('mail/new');
})
router.get('/:id',async(req,res)=>{
    const mail = await Email.findById(req.params.id);
    res.render('mail/show',{mail})
})

router.post('/',async (req,res)=>{
    const mail = await Email(req.body.emails);
    await mail.save()
    res.redirect('/mail')
})

router.delete('/:id',async(req,res)=>{
    await Email.findByIdAndDelete(req.params.id);
    res.redirect('/mail')
})

module.exports = router;