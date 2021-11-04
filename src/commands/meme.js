
const rp = require('request-promise');

module.exports = {
	name: 'meme',
	description: 'Get a random meme.',
	execute(message, args, constants) {
		rp("https://meme-api.herokuapp.com/gimme")
			.then(function (body){
				var json = JSON.parse(body);
				message.channel.send({files: [json.url]});
			})
			.catch(function (err) {
				message.channel.send("An error occurred: " + err);
			});
	},
};