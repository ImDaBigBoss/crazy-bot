const { EmbedReply } = require("../messages.js");

module.exports = {
	name: 'wrong',
	description: '',
	execute(message, args, constants) {
		message.channel.send({ files: ["https://cdn.discordapp.com/attachments/732895652425629756/764680229380685855/video0.mp4"] });
	},
};