const { EmbedReply } = require("../messages.js");

module.exports = {
	name: 'praise',
	description: 'Get a praise from the bot.',
	execute(message, args, constants) {
		if (message.content == constants.bot_prefix + "praise the sun") {
			EmbedReply(message.channel, "Praise", null, "praise the sun from Dark souls");
			return;
		}

		let ans = [
			"You are a good person.",
			"You are clever.",
			"You are a nice person.",
			"You're a gift to those around you.",
			"You're a smart cookie.",
			"You are awesome!",
			"I appreciate you.",
			"You have the best laugh.",
			"You are strong.",
			"You have the courage of your convictions.",
			"You bring out the best in other people.",
			"You're like a ray of sunshine on a really dreary day.",
			"You're even more beautiful on the inside than you are on the outside.",
			"You've got an awesome sense of humor!",
			"You light up the room.",
			"You are the most perfect you there is.",
			"You're a great listener.",
			"Being around you makes everything better!",
			"You're wonderful.",
			"You're one of a kind!",
			"You're a candle in the darkness.",
			"You're a great example to others.",
			"Who raised you? They deserve a medal for a job well done.",
			"Your voice is magnificent.",
			"You're so thoughtful.",
			"Your creative potential seems limitless.",
			"There's ordinary, and then there's you.",
			"You're someone's reason to smile.",
			"You're even better than a unicorn, because you're real.",
			"You have a good head on your shoulders.",
			"Thank you for being you.",
			"You're really something special."
		];

		EmbedReply(message.channel, "Praise", null, ans[Math.floor(Math.random() * ans.length)]);
	},
};