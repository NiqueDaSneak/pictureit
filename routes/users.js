var express = require('express');
var router = express.Router();
var gcloud = require('gcloud')({
  keyFilename: '/path/to/keyfile.json',
  projectId: 'grape-spaceship-123'
});

var vision = gcloud.vision();

// Facebook Messenger Webhook setup
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;