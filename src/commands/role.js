const { EmbedReply } = require("../messages.js");

function isUser(client, uid) {
	return !(client.users.cache.find(user => user.id === uid) == null);
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
	name: 'role',
	description: 'Set users\' roles.',
	execute(message, args, constants) {
		if (constants.nconf.get("roles:" + message.member.user.id) == "owner") {
			if (args.length == 1) {
				const uid = idFromArg(message, args[0]);

				if (!isUser(message.client, uid)) {
					EmbedReply(message.channel, "CrazyBot roles", null, "That is not an existing user!");
					return;
				}

				var role = constants.nconf.get("roles:" + uid);
				if (role == null) {
					role = "none";
				}

				EmbedReply(message.channel, "CrazyBot roles", null, "Their role is: " + role);
			} else if (args.length == 3) {
				if (args[0] == "set") {
					const uid = idFromArg(message, args[1], constants);

					if (!isUser(message.client, uid)) {
						EmbedReply(message.channel, "CrazyBot roles", null, "That is not an existing user!");
						return;
					}

					const role = args[2].toLowerCase();
					if (role == "none" || role == "owner") {
						constants.nconf.set("roles:" + uid, role);
						constants.nconf.save(function (err) {
							require('fs').readFile(__dirname + '/../../config.json', function (err, data) {
								console.log(uid + " is now: " + role);
							});
						});

						EmbedReply(message.channel, "CrazyBot roles", null, "Role set to " + role + "!");
					} else {
						EmbedReply(message.channel, "CrazyBot roles", null, "The existing roles are: none, owner");
					}
				} else {
					EmbedReply(message.channel, "CrazyBot roles", null, "The correct usage is set {user} owner/none");
				}
			} else {
				EmbedReply(message.channel, "CrazyBot roles", null, "This command requires arguments... (set {user} owner/none, {user})");
			}
		} else {
			EmbedReply(message.channel, "CrazyBot roles", null, "You are not an owner.");
		}
	},
};