// This loads the environment variables from the .env file
require('dotenv-extended').load();

var express = require('express');
var app = express();
var bot = require('./bot');
var port = process.env.port || process.env.PORT || 3978;

//bot is really just a rest api so create your route:
app.post('/api/messages', bot.listen())

app.get('/', function (req, res) {
	res.render('index.ejs');
});

app.listen(port, function() {
	console.log('Brigitte says the Web server is listening on port %s', port)
});