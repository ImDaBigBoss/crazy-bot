module.exports = {
	name: 'searchgif',
	description: 'Search giphy for a gif.',
	execute(message, args, constants) {
		var search_stuff = message.content.replace(message.content.split(" ")[0] + " ", "");
		if (search_stuff == "" || search_stuff == null || search_stuff.startsWith(constants.bot_prefix + "searchgif")) {
			search_stuff = "gif";
		}

		constants.giphy.random({
			tag: search_stuff,
			rating: 'g',
			fmt: 'json'
		}, function (err, res) {
			message.channel.send({files: [res.data.image_url]});
		});
	},
};