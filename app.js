const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 4000;

//set views
app.set('views','./views')
app.set('view engine','ejs');

app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'));

var indexRouter = require('./routes/initial');
var authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/auth', authRouter);

//Listen
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})