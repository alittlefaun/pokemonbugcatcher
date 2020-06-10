const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
    client.channels.get("361298665689710592").send("I AM ALIVE");
});

//set the prefix
const prefix = "!"
client.on("message", (message) => {
    if (message.content.toLowerCase() === 'hello') {
        message.channel.send(`Hello bug catcher ${message.author}!`);
    }

    //exits and stops if no prefix or if the message is a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content.startsWith(prefix + "menu")) {
        message.reply("These are my menu commands. \n !menu - brings up my menu. \n !start - brings your bug catching adventure. \n !incubator - checks on the status of your egg incubator \n !team - lists out your six active pokemon" );
    }

    if (message.content.startsWith(prefix + "poke")) {
        message.reply("You poked the oddish and he is now sad.");
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
