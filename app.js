var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pug = require('pug');
var request = require('request');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var db = require('./db')

db.on('error', console.error.bind(console, 'connection error:'));
console.log('does this work');
db.once('open', function(){
	console.log('DB is connected');

	var imageSchema = mongoose.Schema({
		imageData: String,
		artistEmail: String,
		price: Number,
		startDate: Date,
		oneOfOne: Boolean
	});
});

// requiring modulized routes
var artists = require('./routes/artists');
var users = require('./routes/users');

var app = express();

// set up middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'));

// set up views
app.set('views', './views');
app.set('view engine', 'pug');

app.use(logger('short'));

app.use('/', artists);
app.use('/users', users);

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Server running on port ' + port);

});

app.on('error', function(){
	console.log(error);
});

module.exports = app;
