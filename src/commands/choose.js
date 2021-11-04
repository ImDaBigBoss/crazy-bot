const { EmbedReply } = require("../messages.js");

module.exports = {
	name: 'choose',
	description: 'Let the bot make a choice for you.',
	execute(message, args, constants) {
		if (args.length < 3) {
			EmbedReply(message.channel, "Choice", null, "To let the bot choose something, do " + constants.bot_prefix + "choose {choice} or {choice}");
			return;
		}

		var choose = message.content.replace(message.content.split(" ")[0] + " ", "");
		var ans = choose.split(" or ");

		EmbedReply(message.channel, "Choice", null, ans[Math.floor(Math.random() * 2)]);
	},
};