var express = require('express');
var router = express.Router();
var Image = require('./../models/image.js')


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
	console.log(newImage + " " + newImage.price)

	newImage.save(function(err, newImage){
		if (err) {
			console.log("New Image not saved!")
			console.log(err);
			res.redirect('/');
		} else {
			console.log("New Image saved!")
			res.redirect('/submission-success');
		}
	});

});

router.get('/submission-success', function(req, res, next) {
	res.render('successful', { title: 'Successful' });
});

function checkIfOneOfOne(req) {
	if (req.body.oneOfOne === 'on') {
		return true
	} else {
		return false
	}
}

module.exports = router;