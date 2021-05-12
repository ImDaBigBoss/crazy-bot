const { EmbedReply } = require("../messages.js");

module.exports = {
	name: 'github',
	description: 'Get the bot\'s github info.',
	execute(message, args, constants) {
		EmbedReply(message.channel, "GitHub page", null, "My 1s and 0s are availabe here: https://github.com/ImDaBigBoss/crazy-bot");
	},
};