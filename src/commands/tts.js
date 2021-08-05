const { EmbedReply } = require("../messages.js");

module.exports = {
	name: 'tts',
	description: 'Send a text to speech message',
	execute(message, args, constants) {
		if (constants.nconf.get("roles:" + message.member.user.id) == "owner" || constants.nconf.get("roles:" + message.member.user.id) == "mod" || constants.nconf.get("roles:" + message.member.user.id) == "tts") {
			message.channel.send(message.content.replace(message.content.split(" ")[0] + " ", ""), {
				tts: true
			})
		} else {
			message.channel.send("You don't have the right permissions!");
		}
	},
};
