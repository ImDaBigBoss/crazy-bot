const Discord = require("discord.js");

function EmbedReply(channel, title, url, text) {
	const embed = new Discord.MessageEmbed()
		.setColor('#ffd700')
		.setTitle(title)
		.setURL(url)
		.setDescription(text)
		.setTimestamp()
		.setFooter('CrazyBot');

	channel.send(embed);
}

exports.EmbedReply = EmbedReply;