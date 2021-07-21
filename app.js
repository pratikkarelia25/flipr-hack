const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 4000;

//set views
app.set('views','./views')
app.set('view engine','ejs');

app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'));

app.get('',(req,res)=> {
    res.render('home')
})

//Listen
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})