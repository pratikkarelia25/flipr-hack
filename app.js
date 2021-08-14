const express = require('express');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');
const email = require('./model/mail');
const mailRouter = require('./routes/mail');
const path = require('path');
const ejsMate = require('ejs-mate');

const port = 4000;
mongoose.connect('mongodb://localhost:27017/mailficient', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
});
//set views
app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,"views"))
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'));

var indexRouter = require('./routes/initial');
var authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/mail', mailRouter)

//Listen
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})