const Discord = require("discord.js");
const client = new Discord.Client();

const { exec } = require("child_process");

const nconf = require('nconf');
const fs = require('fs');

if(!fs.existsSync(__dirname + "/../config.json") ) {
	fs.writeFileSync(__dirname + "/../config.json", JSON.stringify(require(__dirname + "/../config-defaults.json"), null, 2));
}

nconf.argv().env();
nconf.file({ file: 'config.json' });

const bot_token = nconf.get("bot:token");
const bot_id = nconf.get("bot:id");
const bot_prefix = nconf.get("bot:prefix");
const giphy_token = nconf.get("giphy_token");

const path = require("path");
const giphy = require('giphy-api')(giphy_token);

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

client.on("message", async message => {
	var command = message.content.split(" ")[0];
	if (command == bot_prefix + "help") {
		var help = "Here is the list of bot commands:\n" +
			" - " + bot_prefix + "help\n" + 
			" - " + bot_prefix + "searchgif {keyword}\n" +
			" - " + bot_prefix + "magic8 {qestion}\n" +
			" - " + bot_prefix + "praise\n" +
			" - " + bot_prefix + "wrong\n" +
			" - " + bot_prefix + "no\n" +
			" - " + bot_prefix + "goodjob\n" +
			" - " + bot_prefix + "github\n" +
			" - " + bot_prefix + "invite\n" +
			" - " + bot_prefix + "choose {thing} or {thing}\n" +
			" - " + "hello";

			EmbedReply(message.channel, "CrazyBot help", null, help);
	} else if (message.content.startsWith("Hello") || message.content.startsWith("hello")) {
		var responses = [
			"https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif",
			"https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif",
			"https://media.giphy.com/media/fTI9mBoWLef8k/giphy.gif",
			"https://media.giphy.com/media/3oz8xSjBmD1ZyELqW4/giphy.gif",
			"https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif"
		];
		var response = responses[Math.floor(Math.random() * responses.length)];
		message.channel.send({ files: [response] });
	} else if (command == bot_prefix + "searchgif") {
		var search_stuff = message.content.replace(message.content.split(" ")[0] + " ", "");
		if (search_stuff == "" || search_stuff == null || search_stuff.startsWith(bot_prefix + "searchgif"))
			search_stuff = "gif";

		giphy.random({
			tag: search_stuff,
			rating: 'g',
			fmt: 'json'
		}, function (err, res) {
			message.channel.send({files: [res.data.image_url]});
		});
	} else if (command == bot_prefix + "magic8") {
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
	} else if (command == bot_prefix + "praise") {
		if (message.content == bot_prefix + "praise the sun") {
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
	} else if (command == bot_prefix + "wrong") {
		message.channel.send({ files: ["https://cdn.discordapp.com/attachments/732895652425629756/764680229380685855/video0.mp4"] });
	} else if (command == bot_prefix + "no") {
		message.channel.send({ files: ["https://cdn.discordapp.com/attachments/731837751481204760/799345380193206292/NO-Sign-11-13.jpg"] });
	} else if (command == bot_prefix + "shit") {
		message.channel.send({ files: ["https://cdn.discordapp.com/attachments/731837751481204760/799345896617410570/2cb013b6319538eb225728b54bb0940b.jpg"] });
	} else if (command == bot_prefix + "goodjob") {
		message.channel.send({ files: ["https://media1.giphy.com/media/hvLLg4whmqcA1XpwRj/source.gif"] });
	} else if (command == bot_prefix + "github") {
		EmbedReply(message.channel, "GitHub page", null, "My 1s and 0s are availabe here: https://github.com/ImDaBigBoss/crazy-bot");
	} else if (command == bot_prefix + "invite") {
		EmbedReply(message.channel, "Discord invite", null, `Invite me to your server! https://discord.com/oauth2/authorize?client_id=${bot_id}&scope=bot`);
	} else if (command == bot_prefix + "choose") {
		var choose = message.content.replace(message.content.split(" ")[0] + " ", "");
		var ans = choose.split(" or ");
		EmbedReply(message.channel, "Choice", null, ans[Math.floor(Math.random() * 2)]);
	} else if (command == bot_prefix + "exec") {
		if (nconf.get("roles:owner").includes(message.member.user.tag)) {
			var sys_command = message.content.replace(message.content.split(" ")[0] + " ", "");
			exec(sys_command, (error, stdout, stderr) => {
				if (error) {
					message.channel.send(`${error.message}`);
					return;
				}
				if (stderr) {
					message.channel.send(`${stderr}`);;
					return;
				}
				message.channel.send(`${stdout}`);
			});
		} else {
			message.channel.send("You are not an owner!");
		}
	}
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!\nBot tag is: "${bot_prefix}"`);
	client.user.setActivity(`${bot_prefix}help`, { type: 'LISTENING' });
});

client.login(bot_token);
