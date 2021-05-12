const { EmbedReply } = require("../messages.js");

module.exports = {
	name: 'goodjob',
	description: '',
	execute(message, args, constants) {
		message.channel.send({ files: ["https://media1.giphy.com/media/hvLLg4whmqcA1XpwRj/source.gif"] });
	},
};