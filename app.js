// This loads the environment variables from the .env file
require('dotenv-extended').load();

var builder = require('botbuilder');
var express = require('express');
var app = express();
var bot = require('./bot');
var port = process.env.port || process.env.PORT || 3978;

var botfactory = require('./botfactory.js');
botfactory.loadDialogs(bot);

// var _ = require('lodash');
// var fs = require('fs');
// var path = require('path');
// var readdir = require('readdir-enhanced');

// function getFileNames(dir) { 
// 	return readdir.sync(dir, { deep: true }) 
// 	.map(item => `.${path.posix.sep}${path.posix.join(dir, path.posix.format(path.parse(item)))}`) //normalize paths 
// 	.filter(item => !fs.statSync(item).isDirectory() && /.js$/.test(item)) //filter out directories 
// 	.map(file => ({ name: path.basename(file, '.js'), path: file })) 
// } 


// getFileNames('./dialogs')
// 	.map(file => Object.assign(file, { fx: require(file.path) }))
//  	.forEach(dialog => dialog.fx(dialog.name, bot)); 


//bot is really just a rest api so create your route:
app.post('/api/messages', bot.listen())

app.get('/', function (req, res) {
	res.render('index.ejs');
});

app.listen(port, function() {
	console.log('Brigitte says the Web server is listening on port %s', port)
});


