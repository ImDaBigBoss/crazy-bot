const { EmbedReply } = require("../messages.js");

function isUser(message, uid) {
	return !(message.guild.members.cache.get(uid) == null);
}

function idFromArg(message, arg) {
	var uid = "";
	if (arg.includes('@')) {
		uid = message.mentions.users.first().id;
	} else {
		uid = arg;
	}
	return uid;
}

module.exports = {
	name: 'ban',
	description: 'Ban a user',
	execute(message, args, constants) {
		if (constants.nconf.get("roles:" + message.member.user.id) == "owner" || constants.nconf.get("roles:" + message.member.user.id) == "mod") {
			if (args.length == 1) {
				const uid = idFromArg(message, args[0]);

				if (!isUser(message, uid)) {
					EmbedReply(message.channel, "CrazyBot ban", null, "That is not an existing user!");
					return;
				}

				try {
					message.guild.members.cache.get(uid).ban();
					EmbedReply(message.channel, "CrazyBot ban", null, "The user has been banned.");
				} catch {
					EmbedReply(message.channel, "CrazyBot ban", null, "I don't have permissions to ban!");
				}
			} else {
				message.channel.send("The correct usgae is: ?ban {user}");
			}
		} else {
			message.channel.send("You don't have the right permissions!");
		}
	},
};
