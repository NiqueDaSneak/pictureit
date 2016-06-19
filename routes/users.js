var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var gcloud = require('gcloud');
var mongoose = require('mongoose');
var Image = require('./../models/image.js');
var db = require('./../db');

var vision = gcloud.vision({
	projectId: 'pictureit-1',
	keyFilename: 'keyfile.json'
});

// middleware setup
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Facebook Messenger Webhook setup

var verify_token = "14fc650c879aa056c98b";
var token = "EAABbvdDRlgIBAFO7ZAl40qkyOhqdcTHZAgmiAfZACxffZAv0Ot7FEBhWAZAFXnQ71ymGuwyu3JosaGYS4L9s70Q586X2f6HoEDUa3uefUB4xhBeJyBYJ0TS52dxKdemNudZBlyzHlZBj2xKSdiJ7bEIJZCJjlWMZCOuRtTzFqTQPxqwZDZD";  


router.get('/webhook', function(req, res, next) {
	if (req.query['hub.verify_token'] === verify_token) {
		console.log("Validating webhook");
		res.status(200).send(req.query['hub.challenge']);
	} else {
		console.error("Failed validation. Make sure the validation tokens match.");
		res.sendStatus(403);          
	}  
});    

// Route that handles messages from user

router.post('/webhook', function (req, res, next) {

	var messaging_events = req.body.entry[0].messaging;

	for (var i = 0; i < messaging_events.length; i++) {

		var event = req.body.entry[0].messaging[i];
		var sender = event.sender.id;

		// when a user sends a text message
		if (event.message && event.message.text) {
			sendTextMessage(sender, "Thanks for using PictureIT! If you have some art you want to buy, take a photo of its description card and send it to me!");
		} 

		// when a user sends an image
		if (event.message && event.message.attachments) {
			var match = '';
			if (event.message.attachments[0].type === 'image') {
				sendTextMessage(sender, 'Image recieved');
				console.log('This is the attachment for just a test message: ' + event.message.attachments[0].payload.url);
				vision.detectText(event.message.attachments[0].payload.url, function(err, text){
					if (err) {
						console.log(err);
					} else {``
						var googleArray = [];
						text.forEach(function(t){
							googleArray.push(t.toLowerCase());
						});
						googleArray.shift().toLowerCase();
						Image.findOne({ keywords: googleArray.sort() }, function(err, doc){
							if (err) {
								console.log(err);
							sendTextMessage(sender, "Sorry, no match");
							} else {
								match = doc.toObject();
								// console.log(doc);
							// sendTextMessage(sender, `The price of this item is ${match.price}`);
							sendReceiptMessage(sender, match);
							}
						});
					}
				});
			}
		}

	}

	res.sendStatus(200);

});

function sendReceiptMessage(sender, objectForSale) {
	messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "receipt",
				"recipient_name": sender.first_name,
				"order_number": "J3J4H5J43",
				"currency": "USD",
				"payment_method": "Visa 4537",
				// "timestamp": "current time"
				// "order_url": "link to webpage",
				"elements":[{
					"title": objectForSale.nameOfPiece,
					"subtitle": objectForSale.artistName,
					"quantity": "1",
					"price": objectForSale.price,
					"currency": "USD",
					"image_url": "https://placehold.it/350x150"
				}],
				// "address": [{
				// 	"street_1": "1234 Street Drive",
				// 	"city": "Cincinnati",
				// 	"postal_code": "45209",
				// 	"state": "OH",
				// 	"country": "US"
				// }],
				"summary": [{
					"total_cost": objectForSale.price
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function parseGoogleText(text){
}

function sendTextMessage(sender, text) {
	var messageData = {
		text: text
	};
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token},
		method: 'POST',
		json: {
			recipient: {id: sender},
			message: messageData
		}
	}, function (error, response) {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});

}

module.exports = router;