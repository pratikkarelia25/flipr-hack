//Imports
const express = require('express');
const app = express();
const port = 3000;


// Accessing all files
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/js',express.static(__dirname + 'public/js'));
app.use('/img',express.static(__dirname + 'public/img'));


//Display ejs Files
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/',(req,res) => {
    res.render('login');
})

//Listen to port 3000
app.listen(port,() => console.info(`Listening on port ${port}`));