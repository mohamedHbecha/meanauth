const express= require('express');
const path= require('path');
const bodyParser= require('body-parser');
const cors= require('cors');
const passport= require('passport');
const mongoose = require('mongoose');
const config= require('./config/database');

// connect to database
mongoose.connect(config.database);
//on connection
mongoose.connection.on('connected', function () {
    console.log('connected to database ' + config.database);
    
});

// on error
mongoose.connection.on('error', function (err) {
    console.log('error to database ' + err);

});


const app= express();

const users= require('./routes/users');
const port=3000;

// cors Middelware
app.use(cors());

//set static models
app.use(express.static(path.join(__dirname, 'public')))

// body parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use('/users',users);

// index route
app.get('/', function (req,res) {
    res.send('invalid endpoint');
});
app.get('*', function (req, res) {
    res.sendfile(path.join(__dirname,'public/index.html')); 

})

//start server
app.listen(port,function () {

    console.log('server started on port '+port);

});