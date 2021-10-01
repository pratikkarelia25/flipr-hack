// ******************************   INITIALISATION  *****************************************
const express = require('express');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');

// //Schemas & objects
// const User = require('./model/user');
// const email = require('./model/mail');

const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const port = 4000;

//******************************   DB CONNECT    *****************************************
const connection = async() => {
mongoose.connect('mongodb://localhost:27017/MAILFICIENT', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
});

connection.connection.on('connected',function(){
    console.log("Connection open");
})
};

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

//******************************   LISTEN  *****************************************
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})