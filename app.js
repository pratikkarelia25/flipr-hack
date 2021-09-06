// ******************************   INITIALISATION  *****************************************
const express = require('express');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


// //Schemas & objects
// const User = require('./model/user');
// const email = require('./model/mail');

const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const port = 4000;
app.use(cookieParser())
//******************************   DB CONNECT    *****************************************
require('dotenv').config();

mongoose.connect('mongodb+srv://shashwatha:mailficient_1234@mailficient.o2cdk.mongodb.net/mailficient?retryWrites=true&w=majority',{
    useNewUrlParser :true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
//listen after database has been connected
.then((result)=>{ console.log("db connect"), app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})})
.catch((err)=> console.log(err));

// ******************************   SET VIEWS  *****************************************
app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,"views"))
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'));
app.use(methodOverride('_method'))

//******************************   ROUTERS  *****************************************
var indexRouter = require('./routes/initial');
var authRouter = require('./routes/auth');
const mailRouter = require('./routes/mail');

//******************************   ROUTES  *****************************************
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/mail', mailRouter)

