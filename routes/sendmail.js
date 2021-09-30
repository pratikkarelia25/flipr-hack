const express = require('express');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const email = express();

email.use(express.urlencoded({
    extended: false
}));

email.use(express.json());

email.get('/email',(req,res) => res.render('new'));

email.post('/email', (req,res)=>{
    console.log('Data:', req.body);
    // ****************************   EMAIL CONFIG **************************
    const {to,from, subject,text} = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: '',
            pass: ''
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log('Error');
        }
        else{
            console.log('message sent');
        }
    })
        res.json({ message: 'Message rec '});
});


module.exports = email;
