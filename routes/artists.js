var express = require('express');
var router = express.Router();

// Homepage for website
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PictureIt' });
});

// for images being submitted
router.post('/submit-image', function(req, res, next) {
  console.log('The price of this piece is $' + req.body.price)
});

module.exports = router;