const { EmbedReply } = require("../messages.js");

module.exports = {
	name: 'invite',
	description: 'Get the bot\'s infite link.',
	execute(message, args, constants) {
		EmbedReply(message.channel, "Discord invite", null, `Invite me to your server! https://discord.com/oauth2/authorize?client_id=${constants.bot_id}&scope=bot`);
	},
};