var builder = require('botbuilder');
module.exports = function (name, bot) {
	bot.dialog(`/${name}`, [
		function (session, args, next) {
			session.dialogData.yesnoanswer = {};
			builder.Prompts.text(session, "Would you like to see the Project On-Boarding Process?")
		},
		function (session, results) {
		if (results.response) {
			session.dialogData.yesnoanswer = results.response;
		}

		if (session.dialogData.yesnoanswer == 'yes') {
			session.endDialog('This is where i should send you a picture');
		}
		else {
			session.endDialog('No problem.  Try something different.');
		}
		}
	]).triggerAction({matches:name});
};
