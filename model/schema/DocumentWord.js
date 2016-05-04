var mongoose = require('mongoose');

var DocumentWord = mongoose.Schema({
	name:String,
	document:String,
	type:String
});

module.exports = mongoose.model('DocumentWord',DocumentWord);