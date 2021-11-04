const { EmbedReply } = require("../messages.js");

module.exports = {
	name: 'say',
	description: '',
	execute(message, args, constants) {
		message.channel.send(message.content.replace(message.content.split(" ")[0] + " ", ""));
	},
};
