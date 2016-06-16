var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');

// middleware setup
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Facebook Messenger Webhook setup

var verify_token = "14fc650c879aa056c98b";
var token = "EAABbvdDRlgIBAFO7ZAl40qkyOhqdcTHZAgmiAfZACxffZAv0Ot7FEBhWAZAFXnQ71ymGuwyu3JosaGYS4L9s70Q586X2f6HoEDUa3uefUB4xhBeJyBYJ0TS52dxKdemNudZBlyzHlZBj2xKSdiJ7bEIJZCJjlWMZCOuRtTzFqTQPxqwZDZD";  


// router.get('/webhook', function(req, res, next) {
//   if (req.query['hub.verify_token'] === verify_token) {
//     console.log("Validating webhook");
//     res.status(200).send(req.query['hub.challenge']);
//   } else {
//     console.error("Failed validation. Make sure the validation tokens match.");
//     res.sendStatus(403);          
//   }  
// });    

router.get('/webhook', function(req, res, next) {

	if (req.query['hub.verify_token'] === verify_token) {
		res.send(req.query['hub.challenge']);
	}

	res.send('Error, wrong validation token');

});

// router.post('/webhook', function (req, res, next) {

// 	var messaging_events = req.body.entry[0].messaging;

// 	// console.log("This is the messaging_events: " + messaging_events)

// 	for (var i = 0; i < messaging_events.length; i++) {

// 		var event = req.body.entry[0].messaging[i];
// 		var sender = event.sender.id;

// // console.log('XXXXXXX' + event.message.text + 'XXXXXXX');
// // console.log('!!!!!!!!!!!!!' + event.message.attachments + '!!!!!!!!!!!!!');

// 		// checking for images sent by user
// 		if (event.message && event.message.text) {
// 			sendTextMessage(sender, "Thanks for using PictureIT! If you have some art you want to buy, take a photo of its description card and send it to me!");
// 		} 

// 		// if (event.postback) {
// 		// 	sendTextMessage(sender, 'Image recieved');
// 		// 	console.log("This is the event.postback: "+ event.postback);
// 		// 	continue

// 		// }
// 		if (event.message.attachments[0]) {
// 			if (event.message.attachments[0].type === 'image') {
// 				var imageURL = event.message.attachments[0].payload.url;
// 				console.log(imageURL);
// 				sendTextMessage(sender, 'Image recieved');
// 			}
// 		} 

// 		// else {
// 		// 	sendTextMessage(sender, "Something went wrong");
// 		// }
// }

// 	res.sendStatus(200);

// });

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