var async = require('async');
var fs = require('fs');
var mongoose = require('mongoose');
var DocumentWord = require('./model/schema/DocumentWord');
var _ = require('lodash');
var stopwords = require('vietnamese-stopwords');


mongoose.connect('mongodb://localhost/bayes');
var db = mongoose.connection;
db.on('error', function() {
	console.log('Connect database error');
});

db.once('open', function() {
	fs.readdir('dulieu_test', function(err, files) {
		if (err) {
			return err;
		}
		_.forEach(files, function(file, key) {
			var data = fs.readFileSync('dulieu_test/' + file);
			if (err) return callback(err);
			words = data.toString().split(" ");

			var indexOfFileType = file.indexOf('(');
			var documenType = file.substring(0, indexOfFileType);
			// save fille
			var listdDocumentWord = [];
			_.forEach(words, function(word, key) {
				DocumentWord.create({
					name: word,
					document: file,
					type: documenType
				}, function(err, model) {
					console.log('finish save word'+word);
				});
			});
			words = null;
			data = null;
			console.log('Finish processing file ' + file);
		});
	});
}); // end open connect db


// var files = ['data/1.txt','data/2.txt','data/3.txt'];
// async.every(files, fs.exists, function(result){
//     // if result is true then every file exists
//     console.log(result);
// });