const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');
    client.channels.get("361298665689710592").send("I AM ALIVE")
    

});

//set the prefix
 const prefix = "!"
 client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;    //exits and stops if no prefix or if the message is a bot
    if (message.content.startsWith(prefix + "poke")){
         message.reply("pong!")
     } 
     
 })

 

client.on('message', message => {

    if (message.content === 'pong') {

       message.reply('ping');

       }
  if (message.content === 'hello pokemonbot') {

       message.reply('hello');}


});




 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
