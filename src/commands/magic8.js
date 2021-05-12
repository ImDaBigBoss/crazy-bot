const { EmbedReply } = require("../messages.js");

module.exports = {
	name: 'magic8',
	description: 'Ask the magic 8 ball a question.',
	execute(message, args, constants) {
		let ans = [
			"No",
			"Yes",
			"Maybe",
			"Think about is a bit more then try again...",
			"Absolutely",
			"Not at all",
			"Of couse!",
			"As it seems... Yes",
			"As it seems... No",
			"Could be",
			"Hell NO!"
		];

		EmbedReply(message.channel, "Magic8 ball", null, ans[Math.floor(Math.random() * ans.length)]);
	},
};