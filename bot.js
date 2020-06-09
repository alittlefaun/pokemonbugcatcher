const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');
    client.channels.get("361298665689710592").send("I AM ALIVE")
    

});



 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }
  if (message.content === 'hello pokemonbot') {

       message.reply('hello');


});




 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
