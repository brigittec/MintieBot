var builder = require('botbuilder');
require('dotenv-extended').load();

var connector = new builder.ChatConnector({
	appId: process.env.MICROSOFT_APP_ID,
	appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector, [
	function (session) {
		// 	session.beginDialog('ensureProfile', session.userData.profile);
		// }, 
		// function (session, results) {
		// 	const profile = session.userData.profile = results.response;
		// 	session.endConversation(`Hello ${profile.name}.  I love ${profile.company}`);
		// }
		session.send('Sorry I did not understand');
	}
]);

const recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
recognizer.onEnabled(function(context, callback) {
	if (context.dialogStack().length > 0) {
		callback(null, false);
	} else {
		callback(null, true);
	}
});
bot.recognizer(recognizer);

bot.dialog('onboarding', [
	function (session) {
		session.send('Welcome to the Project On-Boarding explanation');
		session.endDialog();
	}
]).triggerAction({
	matches: /^On-Boarding?/
});

bot.dialog('ensureProfile', [
		function(session, args, next) {
			session.dialogData.profile = args || {};

			if (!session.dialogData.profile.name) {
				builder.Prompts.text(session, "What's your name?");
			} else {
				next();
			}
		},
		function (session, results, next) {
			//results of prompt will be in results.response
			if (results.response) {
				session.dialogData.profile.name = results.response;
			}

			if (!session.dialogData.profile.company) {
				builder.Prompts.text(session, "What company do you work for?");
			} else {
				next();
			}

		},
		function (session, results) {
			if (results.response) {
				session.dialogData.profile.company = results.response;
			}
			session.endDialogWithResult({response: session.dialogData.profile});
		}
	]);

bot.dialog('help', [
		function (session) {
			session.endDialog("I'm a simply bot!");;
		}
	]).triggerAction({
		matches: /^help$/,
		onSelectAction: function (session, args) {
			//runs just before the dialog launches and allows you to change default behavior
			session.beginDialog(args.action, args);
		}
	});

bot.dialog('search', [
	function (session, args, next) {
		if (session.message.text.toLowerCase() == 'search') {
			builder.Prompts.text(session, "Who did you want to search for?")
		} else {
			var query = session.message.text.substring(7);
			next ({response: query});
		}
	},
	function (session, results, next) {
		var query = results.response;
		if (!query) {
			session.endDialog("Request cancelled");
		} else {
			//session.endDialog("You want to search for " + query);

			//if you did get data here and want user to select one of the options 
			//present results as buttons:
			var arrayOfOptions = ['Brigitte', 'Justin', 'Connor', 'Chris', 'Carli'];
			builder.Prompts.choice(session, "Select one", arrayOfOptions, {listStyle: builder.ListStyle.button});
		}
	},
	function (session, results, next) {
		//when using choice the selected value is inside results.response.entity
		session.endConversation('You chose ' + results.response.entity);
	}
]).triggerAction({
	matches: /^search?/
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