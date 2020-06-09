const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');
 message.send('I am on');

});

//set the prefix
 const prefix = "!"
 client.on("message", (message) => {
     if (!message.content.startsWith(prefix)) return;
     if (message.content.startsWith(prefix + "poke")){
         message.reply("pong!")
     } 
     else ()
 })

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});

client.on('message', message => {

    if (message.content === 'hello pokemonbot') {

       message.reply('hello');

       }

});


 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
