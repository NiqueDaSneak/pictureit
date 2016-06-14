var mongoose = require('mongoose');
var db = require('./../db');

var imageSchema = new mongoose.Schema({
		imageData: { data: Buffer, contentType: String },
		artistName: String,
		artistEmail: String,
		nameOfPiece: String,
		price: Number,
		startDate: Date,
		oneOfOne: Boolean
	});

	var Image = mongoose.model('Image', imageSchema);

	module.exports = Image;