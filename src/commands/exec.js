const { exec } = require("child_process");

function sendMessage(message, text) {
	if (text == null && text == "") {
		return;
	}

	if (text.length > 2000) {
		const numChunks = Math.ceil(text.length / 2000)

		for (let i = 0, o = 0; i < numChunks; ++i, o += 2000) {
			message.channel.send(text.substr(o, 2000))
		}
		return;
	}

	message.channel.send(text);
}

module.exports = {
	name: 'exec',
	description: 'ADMIN: Execute a command.',
	execute(message, args, constants) {
		if (constants.nconf.get("roles:" + message.member.user.id) == "owner") {
			if (args.length == 0) {
				return;
			}

			var sys_command = message.content.replace(message.content.split(" ")[0] + " ", "");
			exec(sys_command, (error, stdout, stderr) => {
				if (error) {
					sendMessage(message, `${error.message}`);
					return;
				}
				sendMessage(message, `${stderr}\n${stdout}`);
			});
		} else {
			message.channel.send("You are not an owner!");
		}
	},
};
