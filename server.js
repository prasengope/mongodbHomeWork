//REQUIRING THE DEPENDENCIES
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var axios = require('axios');
var cheerio = require('cheerio');

//REQUIRING THE MODELS
var db = require('./models');

//SPECIFYING THE PORT
var PORT = 53105;

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

//index
app.get('/', function(req, res) {
	res.redirect('/articles');
});

//A GET ROUTE FOR SCRAPING THE YAHOO NEWS
app.get('/scrape', function(req, res) {
	//USING AXIOS TO GRAB THE BODY OF YAHOO NEWS
	axios.get('https://news.yahoo.com/us/').then(function(response) {
		var $ = cheerio.load(response.data);

		//GRAB EACH ELEMENT FROM THE WEBSITE
		$('li.js-stream-content').each(function(i, element) {
			//CREATE A EMPTY OBJECT NAMED RESULT
			var result = {};

			//ADD THE TITLES AND LINKS TO THE RESULT OBJECT
			result.title = $(this).find('h3').text();
			result.link = $(this).find('a').attr('href');

			db.Article
				.create(result)
				.then(function(dbArticle) {
					//VIEW THE ADDED ARTICLE
					console.log(dbArticle);
				})
				.catch(function(err) {
					console.log(err);
				});
		});

		//SEND A MESSAGE TO THE CLIENT
		res.send('Scrape Complete!');
	});
});

//ROUTE FOR GRABBING A SPECIFIC ARTICLE BY ID, POPULATE IT WITH ITS NOTE
app.get('./articles', function(req, res) {
	db.Article.find({}, function(error, found) {
		if (error) {
			console.log(error);
		} else {
			res.json(found);
		}
	});
});

app.get('/articles/:id', function(res, req) {
	db.Article
		.findOne({ _id: req.params.id })
		.populate('note')
		.then(function(dbArticle) {
			res.json(dbArticle);
		})
		.catch(function(err) {
			res.json(err);
		});
});

//ROUTE FOR SAVING/UPDATING AN ARTICLE'S NOTE
app.post('/articles/:id', function(req, res) {
	db.Note
		.create(req.body)
		.then(function(dbNote) {
			db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote_id }, { new: true });
		})
		.then(function(dbArticle) {
			res.json(dbArticle);
		})
		.catch(function(err) {
			res.json(err);
		});
});

//START THE SERVER
app.listen(PORT, function() {
	console.log('App running on port ' + PORT + '!');
});
