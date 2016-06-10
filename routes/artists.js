var express = require('express');
var request = require('request');
var fs = require ('fs');
var router = express.Router();
var Image = require('./../models/image.js');

endpoint = 'https://api.pastec.io/indexes/kvnfyalfogudlauncbff';
authkey = '63130011107e1ccf4ade';

var pastec = require('pastecapi') ( [endpoint], [authkey] );




// Homepage for website
router.get('/', function(req, res, next) {
	res.render('index', { title: 'PictureIt' });
});

// for images being submitted
router.post('/submit-image', function(req, res, next) {
	var newImage = new Image({
		imageData: "test for now",
		artistEmail: req.body.artistEmail,
		price: req.body.price,
		startDate: req._startTime,
		oneOfOne: checkIfOneOfOne(req)
	});

	newImage.save(function(err, newImage){
		if (err) {
			console.log("New Image not saved!")
			console.log(err);
			res.redirect('/');
		} else {
			console.log("New Image saved!" + " Its id is " + newImage._id)
			// request(options, function(){

				//});
				pastec.ping(function(err, data){
					if (err) {
						return console.log(err);
					}

					if (data.type === 'PONG') {
						console.log('It works!');
					} else {
						console.log('Not working...');
						console.log(data);
					}
				});
				res.redirect('/submission-success');
			}
		});

});

router.get('/submission-success', function(req, res, next) {
	res.render('successful', { title: 'Successful' });
});

function checkIfOneOfOne(req) {
	if (req.body.oneOfOne === 'on') {
		return false
	} else {
		return true
	}
}

module.exports = router;