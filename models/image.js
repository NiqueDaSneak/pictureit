var mongoose = require('mongoose');
var db = require('./../db');

var imageSchema = new mongoose.Schema({
		imageData: String,
		artistEmail: String,
		price: Number,
		startDate: Date,
		oneOfOne: Boolean
	});

	var Image = mongoose.model('Image', imageSchema);

	module.exports = Image;