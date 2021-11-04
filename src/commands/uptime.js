const { EmbedReply } = require("../messages.js");

module.exports = {
	name: 'uptime',
	description: 'Get the bot\'s uptime.',
	execute(message, args, constants) {
		let seconds = Math.floor(message.client.uptime / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);
	
		seconds %= 60;
		minutes %= 60;
		hours %= 24;

		var out = "";
		if (days > 0) {
			out += days + " days "
		}
		if (hours > 0) {
			out += hours + " hours "
		}
		if (minutes > 0) {
			out += minutes + " minutes "
		}
		if (seconds > 0) {
			out += seconds + " seconds"
		}

		EmbedReply(message.channel, "CrazyBot uptime", null, out);
	},
};