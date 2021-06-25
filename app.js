//Imports
const express = require('express');
const app = express();
const path = require('path')
const methodOveride = require('method-override')
const port = 3000;
const mongoose = require('mongoose');
const Email = require('./model/mail');
const { urlencoded } = require('express');
mongoose.connect('mongodb://localhost:27017/Email', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database Connected")
})
// Accessing all files
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/js',express.static(__dirname + 'public/js'));
app.use('/img',express.static(__dirname + 'public/img'));
app.use(express.urlencoded({extended:true}))
app.use(methodOveride('_method'))

//Display ejs Files
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.get('/',(req,res) => {
    res.render('login');
})

app.get('/email',async(req,res)=>{
    const emails = await Email.find({})
    res.render('email/index',{emails})
})

app.get('/email/new',(req,res)=>{
    res.render('email/new')
})

app.post('/email',async(req,res)=>{
    const newEmail = await Email(req.body.email)
    newEmail.save()
    res.send(newEmail)
    // res.redirect('/email')
})

app.get('/email/:id', async(req,res)=>{
    const {id} = req.params;
    const email = await Email.findById(id);
    res.render('email/show',{email})
})

app.delete('/email/:id',async(req,res)=>{
    const {id}= req.params;
    const email = await Email.findByIdAndDelete(id)
    res.redirect('/email')
})

//Listen to port 3000
app.listen(port,() => {
    console.log(`Listening on port ${port}`)
});