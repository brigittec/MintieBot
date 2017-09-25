// This loads the environment variables from the .env file
require('dotenv-extended').load();

// var builder = require('botbuilder');
// var restify = require('restify');

// var server = restify.createServer();
// server.listen(process.env.port || process.env.PORT || 3978, function () {
// 	console.log("%s listening to %s", server.name, server.url);
// });

// var connector = new builder.ChatConnector({
// 	appId: process.env.MICROSOFT_APP_ID,
// 	appPassword: process.env.MICROSOFT_APP_PASSWORD
// });

// server.post('/api/messages', connector.listen());

// server.post('/', function( req, res) {
// 	res.render
// });

// var bot = new builder.UniversalBot(connector, function(session) {
// 	session.send("You said: %s", session.message.text);
// });

var express = require('express');
var app = express();
var bot = require('./bot');

//bot is really just a rest api so create your route:
app.post('/api/messages', bot.listen())

app.get('/', function (req, res) {
	res.render('index.ejs');
});

var port = process.env.port || process.env.PORT || 3978;
app.listen(port, function() {
	console.log('Brigitte says the Web server is listening on port %s', port)
});