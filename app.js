var express    = require('express');

var app = express();

var bot = require('./bot');

app.post('/api/messages/', bot.listen())

var port = process.env.port || process.env.PORT || 3978;
app.listen(port, function() {
	console.log('Brigitte says the Web server is listening on port %s', port)
});