const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const { EmbedReply } = require("./messages.js");
const constants = require("./constants.js");

const nconf = require('nconf');
const fs = require('fs');

if(!fs.existsSync(__dirname + "/../config.json") ) {
	fs.writeFileSync(__dirname + "/../config.json", JSON.stringify(require(__dirname + "/../config-defaults.json"), null, 2));
}

nconf.argv().env();
nconf.file({ file: 'config.json' });

constants.bot_token = nconf.get("bot:token");
constants.bot_id = nconf.get("bot:id");
constants.bot_prefix = nconf.get("bot:prefix");
constants.giphy_token = nconf.get("giphy_token");
constants.nconf = nconf;

const path = require("path");
constants.giphy = require('giphy-api')(constants.giphy_token);

const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	console.log(`Loaded command: ${file}`);

	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

console.log(" ");

client.on("message", async message => {
	if (message.author.bot) return;

	if (message.content.startsWith("Hello") || message.content.startsWith("hello")) {
		var responses = [
			"https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif",
			"https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif",
			"https://media.giphy.com/media/fTI9mBoWLef8k/giphy.gif",
			"https://media.giphy.com/media/3oz8xSjBmD1ZyELqW4/giphy.gif",
			"https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif",
			"https://media.giphy.com/media/yrhhmre5fN2PtRujfo/giphy.gif",
			"https://media.giphy.com/media/3oz8xCg7tmgcAdgOGY/giphy.gif",
			"https://media.giphy.com/media/EVjAANNjkMBKE/giphy.gif"
		];

		var response = responses[Math.floor(Math.random() * responses.length)];
		message.channel.send({ files: [response] });
		return;
	}

	if (!message.content.startsWith(constants.bot_prefix)) return;

	const args = message.content.slice(constants.bot_prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, constants);
	} catch (error) {
		console.log("Command error: " + error);
	}
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!\nBot tag is: "${constants.bot_prefix}"`);
	client.user.setActivity(`${constants.bot_prefix}help`, { type: 'LISTENING' });
});

client.login(constants.bot_token);
