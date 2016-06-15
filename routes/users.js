var express = require('express');
var router = express.Router();

// Facebook Messenger Webhook setup

var verify_token = "14fc650c879aa056c98b";
var token = "EAABbvdDRlgIBAFO7ZAl40qkyOhqdcTHZAgmiAfZACxffZAv0Ot7FEBhWAZAFXnQ71ymGuwyu3JosaGYS4L9s70Q586X2f6HoEDUa3uefUB4xhBeJyBYJ0TS52dxKdemNudZBlyzHlZBj2xKSdiJ7bEIJZCJjlWMZCOuRtTzFqTQPxqwZDZD";

router.get('/webhook', function(req, res, next) {

  if (req.query['hub.verify_token'] === verify_token) {
  	res.send(req.query['hub.challenge']);
  }

  res.send('Error, wrong validation token');

});

router.post('/webhook', function (req, res) {

    var messaging_events = req.body.entry[0].messaging;

    for (var i = 0; i < messaging_events.length; i++) {

        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;

        if (event.message && event.message.text) {
            var text = event.message.text;

            sendTextMessage(sender, "Echo: " + text.substring(0, 200));
        }
    }

    res.sendStatus(200);

});

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