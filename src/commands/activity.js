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
	name: 'activity',
	description: 'Run an activity',
	execute(message, args, constants) {
		if (args.length == 0) {
			EmbedReply(message.channel, "Activity", null, "To run this command, you need to put in a game name: youtube_together, fishington, chess_in_the_park, chess_in_the_park_dev, betrayal, poker_night, doodle_crew, letter_tile, word_snacks");
			return;
		}

		let vc = message.member.voice;
		if (vc.channel == null) {
			EmbedReply(message.channel, "Activity", null, "You need to be in a voice channel for this to work!");
			return;
		}

		let invite = vc.channel.activityInvite(args[0]);
		invite.then(function (result) {
			if (result.code != null) {
				EmbedReply(message.channel, "Activity", "https://discord.com/invite/" + result.code, "Click the link above to start the activity. This link is valid for the next 1 minute.");
			} else {
				EmbedReply(message.channel, "Activity", null, "Failed to generate the invite.");
			}
		});
	},
};
