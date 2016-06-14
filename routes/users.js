var express = require('express');
var router = express.Router();
var gcloud = require('gcloud')({
	keyFilename: '/path/to/keyfile.json',
	projectId: 'grape-spaceship-123'
});

var vision = gcloud.vision();

// Facebook Messenger Webhook setup

var verify_token = "14fc650c879aa056c98b";
var token = ;

router.get('/webhook/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  if (req.query['hub.verify_token'] === verify_token) {
  	res.send(req.query['hub.challenge']);
  }

  res.send('Error, wrong validation token');

});

module.exports = router;