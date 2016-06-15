var express = require('express');
var cookieParser = require('cookie-parser');
var pug = require('pug');
var request = require('request');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var db = require('./db');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log('DB is connected');
});

// requiring modulized routes
var artists = require('./routes/artists');
var users = require('./routes/users');

var app = express();

// set up middlewares
app.use(multer({dest:'./uploads/'}).single('image'));
// app.use(multer());
// app.use(Busboy());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
	// work in progress
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
