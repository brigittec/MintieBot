var builder = require('botbuilder');

var connector = new builder.ChatConnector({
	appId: process.env.MICROSOFT_APP_ID,
	appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector, function (session) {
	session.send('You said %s', session.message.text)
});

var connectorListener = connector.listen();
function listen() {
	return function (req, res) {
		var url = req.protocol + '://' + req.get('host');
		connectorListener(req, res);
	};
}


module.exports = {
	listen: listen
};