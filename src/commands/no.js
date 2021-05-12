const { EmbedReply } = require("../messages.js");

module.exports = {
	name: 'no',
	description: '',
	execute(message, args, constants) {
		message.channel.send({ files: ["https://cdn.discordapp.com/attachments/731837751481204760/799345380193206292/NO-Sign-11-13.jpg"] });
	},
};