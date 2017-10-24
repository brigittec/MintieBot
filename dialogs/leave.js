
var builder = require('botbuilder');
module.exports = function (name, bot) {
	bot.dialog(`/${name}`, [
		function (session, args, next) {
			session.dialogData.yesnoanswer = {};
			builder.Prompts.text(session, "Do you want to apply for leave?")
		},
		function (session, results) {
			if (results.response) {
				session.dialogData.yesnoanswer = results.response;

				if (session.dialogData.yesnoanswer == 'yes') {
					builder.Prompts.text(session, "How many days?")
				} else {
					session.endDialog('Good to hear hard working Mintie!');
				}
			}
		},
		function (session, results) {
			if (results.response) {
				var leaveDays = results.response;

			    if (isNaN(leaveDays)) {
			    	session.endDialog('Please enter a valid number of days.');
			    } else {
			    	session.endDialog('Your leave application will be forwarded to your manager for approval.')	
			    }
			}
		}
	]).triggerAction({matches:name});
};
