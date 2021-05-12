const { EmbedReply } = require("../messages.js");

module.exports = {
	name: 'shit',
	description: '',
	execute(message, args, constants) {
		message.channel.send({ files: ["https://cdn.discordapp.com/attachments/731837751481204760/799345896617410570/2cb013b6319538eb225728b54bb0940b.jpg"] });
	},
};