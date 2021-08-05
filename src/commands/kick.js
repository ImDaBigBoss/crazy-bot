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
	name: 'kick',
	description: 'Kick a user',
	execute(message, args, constants) {
		if (constants.nconf.get("roles:" + message.member.user.id) == "owner" || constants.nconf.get("roles:" + message.member.user.id) == "mod") {
			if (args.length == 1) {
				const uid = idFromArg(message, args[0]);

				if (!isUser(message, uid)) {
					EmbedReply(message.channel, "CrazyBot kick", null, "That is not an existing user!");
					return;
				}

				try {
					message.guild.members.cache.get(uid).kick();
					EmbedReply(message.channel, "CrazyBot kick", null, "The user has been kicked.");
				} catch {
					EmbedReply(message.channel, "CrazyBot kick", null, "I don't have permissions to kick!");
				}
			} else {
				message.channel.send("The correct usgae is: ?kick {user}");
			}
		} else {
			message.channel.send("You don't have the right permissions!");
		}
	},
};
