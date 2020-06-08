const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.NzE3NTY0NzkzODIwODA3MjI5.XtcKkA.PL8ilB5_74p5VOq7dQ1LMZRNhxU);//BOT_TOKEN is the Client Secret
