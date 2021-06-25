//Imports
const express = require('express');
const expresslayout = require('express-ejs-layouts');
const mongoose = require('mongoose');


//DB config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db,{useNewUrlParser: true})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));





const app = express();
const port = 3000;

//EJS
app.use(expresslayout);
app.set('view engine','ejs');


app.use('/', require('./routes/initial'));
app.use('/user', require('./routes/user'));

//Listen to port 3000
app.listen(port,() => console.info(`Listening on port ${port}`));