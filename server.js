//REQUIRING THE DEPENDENCIES
var express     = require('express');
var logger      = require('morgan');
var mongoose    = require('mongoose');
var axios       = require('axios');
var cheerio     = require('cheerio');

// REQUITING THE MODELS 
var db = require('./models');

//SPECIFYING THE PORT
var PORT = 3000;

//INITIALIZING EXPRESS
var app = express();


//CONFIGURING MIDDLEWARE

//USING MORGAN LOGGER FOR LOGGING REQUESTS
app.use(logger('dev'));
//PARSE REQUEST BODY AS JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//MAKING PUBLIC A STATIC FOLDER
app.use(express.static('public'));

//CONNECT TO THE MONGO DB
mongoose.connect('mongodb://127.0.0.1/scrapedb', { useNewUrlParser: true });


//ROUTES


