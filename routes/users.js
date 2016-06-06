var express = require('express');
var router = express.Router();

// Facebook Messenger Webhook setup
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;