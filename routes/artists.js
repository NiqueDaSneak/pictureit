var express = require('express');
var fs = require('fs');
var router = express.Router();
var Image = require('./../models/image.js');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });


// Homepage for website
router.get('/', function(req, res, next) {
	res.render('index', { title: 'PictureIt' });
});

// for images being submitted
router.post('/submit-image', upload.single('image'), function(req, res, next) {	    

// create a new image based on schema
var newImage = new Image({
	imageData: { data: fs.readFileSync(req.file.path), contentType: 'image/png'} ,
	artistName: req.body.artistName,
	artistEmail: req.body.artistEmail,
	nameOfPiece: req.body.nameOfPiece,
	price: req.body.price,
	startDate: req._startTime,
	sellingPrints: checkIfOneOfOne(req),
	keywords: []
});

// pushes keyword generated from other image data
generateKeywords(newImage);

newImage.keywords.sort();

	// Handles saving a img to DB in cloud
	newImage.save(function(err, newImage){
		if (err) {
			console.log("New Image not saved!")
			console.log(err);
			res.redirect('/');
		} else {
			console.log("New Image saved!")
			fs.unlink(req.file.path, function(){
				console.log('Temp Image File Deleted');
			});
			res.redirect('/submission-success');
		}
	});

});

router.get('/submission-success', function(req, res, next) {
	res.render('successful', { title: 'Successful' });
});

// HELPER METHODS

function generateKeywords(image) {
	image.artistName.split(' ').forEach(function(word){
		image.keywords.push(word.toLowerCase());
	});
	image.nameOfPiece.split(' ').forEach(function(word){
		image.keywords.push(word.toLowerCase());
	});
}

function checkIfOneOfOne(req) {
	if (req.body.oneOfOne === 'on') {
		return true
	} else {
		return false
	}
}

module.exports = router;