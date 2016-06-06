var express = require('express');
var router = express.Router();

// Homepage for website
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PictureIt' });
});

module.exports = router;