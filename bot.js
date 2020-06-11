const Discord = require('discord.js');
//extracts the required classes from the discord.js module
const { Client, MessageAttachment } = require('discord.js');
//creates an instance of a Discord client
const client = new Discord.Client();
//fs module provides an API for interacting with file system (json)
const fs = require("fs");
client.bugcatchers = require("./bugcatchers.json")


/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('I am ready!');
    client.channels.fetch("361298665689710592")
        .then((defaultChannel)=>{defaultChannel.send("I AM ALIVE")})
        .catch(console.error);
});

//set the prefix
const prefix = "!"
client.on("message", (message) => {
    if (message.content.toLowerCase() === 'hello') {
        message.channel.send(`Hello bug catcher ${message.author}!`);
    }

    //exits and stops if no prefix or if the message is a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //brings up menu
    if (message.content.startsWith(prefix + "menu")) {
        message.reply("These are my menu commands. \n !menu - brings up my menu. \n !start - starts your bug catching adventure. \n !incubator - checks on the status of your egg incubator \n !team - lists out your six active pokemon" );
    }
    //!start
    if (message.content.startsWith(prefix + "start")) {
        message.reply("Here is an egg for you.");
        const attachment = new MessageAttachment('https://i.imgur.com/WRCr8c3.png');
        message.channel.send(attachment);
        client.bugcatchers [message.author.username] = {
            message: message.content
        }
        fs.writeFile("./bugcatchers.json", JSON.stringify (client.bugcatchers, null, 4), err => {
            .catch(err => console.log(err));
            message.channel.send ("We are now documenting your adventure.");
        });
    }
    //!poke
    if (message.content.startsWith(prefix + "poke")) {
        message.reply("You poked the oddish and he is now sad.");
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
