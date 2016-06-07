var mongoose = require('mongoose');

mongoose.connect('mongodb://images:images@ds025603.mlab.com:25603/images'); 

module.exports = mongoose.connection;