//takes the .env package and calls the function config on it which loads all the environment variables; REMOVE FROM UPLOADED BUILD
require('dotenv').config();  //REMOVEREMOVEREMOVE
const Discord = require('discord.js');
//extracts the required classes from the discord.js module
const { Client, MessageAttachment } = require('discord.js');
//creates an instance of a Discord client
const client = new Discord.Client();
//fs module provides an API for interacting with file system (json)
const fs = require("fs");
//makes availablePokemon.json available
const availablePokemon = require("./availablePokemon.json");
//creates an array containing the pokemon number of ONLY pokemon who can hatch
let availableHatchablePokemon = [];
for (i = 0; i < Object.keys(availablePokemon).length; i++) {
    if (availablePokemon[Object.keys(availablePokemon)[i]].canHatch == true) {
        availableHatchablePokemon.push(Object.keys(availablePokemon)[i]);
    }
}


/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('I am ready!');
    client.channels.fetch("361298665689710592")
        .then((defaultChannel) => { defaultChannel.send("I AM ALIVE") })
        .catch(console.error);
});

//set the prefix
const prefix = "!"
client.on("message", (message) => {

    if (message.content.toLowerCase() === 'hello') {
        message.channel.send(`Hello ${message.author}! Please type <!menu> if you would be interested in caring for Pokemon eggs.`);
    }

    //exits and stops if no prefix or if the message is a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //brings up menu
    if (message.content.startsWith(prefix + "menu")) {
        message.reply("These are my menu commands.\n" +
            "!menu - brings up my menu.\n" +
            "!start - take up responsibility as an egg nurturer.\n" +
            "!incubator - checks on the status of your egg incubator\n" +
            "!other - other command???");
    }
    //!start
    if (message.content.startsWith(prefix + "start")) {
        const shinyFactor = Math.floor(Math.random() * 100);
        console.log(`The shiny factor is ${shinyFactor}.`);

        if (shinyFactor > 70) {
            const shinyEgg = new MessageAttachment('https://i.imgur.com/m5g7pEe.png');
            message.reply("Here is an egg for you. Oooo, it looks special!*", shinyEgg)
                .catch((rejectionReason) => { console.log(rejectionReason) });
            //message.channel.send(shinyEgg).catch((rejectionReason) => {console.log(rejectionReason)});
            setTimeout(function () {
                //message.reply("Congratulations, your egg has hatched!");
                hatch();
            }, 10000);
        }
        else {
            const plainEgg = new MessageAttachment('https://i.imgur.com/WRCr8c3.png');
            message.reply("Here is an egg for you. Please take good care of it.*", plainEgg)
                .catch((rejectionReason) => { console.log(rejectionReason) });
            //message.channel.send(plainEgg).catch((rejectionReason) => {console.log(rejectionReason)});
            setTimeout(function () {
                //message.reply("Congratulations, your egg has hatched!");
                hatch();
            }, 10000);
        }


        function hatch() {
            //returns a random index number for the array of availableHatchablePokemon
            const randomChoice = Math.floor(Math.random() * availableHatchablePokemon.length);
            //retuns the number of the pokemon randomly chosen from availableHatchablePokemon, this will be used as a KEY
            const randomPokemonNumber = availableHatchablePokemon[randomChoice];
            //returns the value (an object) that has the characters linked with the KEY
            const pokemonChar = availablePokemon[randomPokemonNumber];

            console.log(pokemonChar);

            //returns the values linked with each key of the randomly selected pokemon 
            const name = pokemonChar.name;
            const url = pokemonChar.imageUrl;
            const isHatchable = pokemonChar.canHatch;
            const hatchTime = pokemonChar.hatchTime;
            const shinyUrl = pokemonChar.shinyImageUrl;


            console.log("This pokemon can hatch");

            if (shinyFactor > 70) {
                const attachedImage = new MessageAttachment(url);
                message.reply(`Congratulations! A baby ${name} popped out!*`, attachedImage)
                    .catch((rejectionReason) => { console.log(rejectionReason) });
            }
            else {
                const attachedImage = new MessageAttachment(shinyUrl);
                message.reply(`Congratulations! A baby ${name} popped out!*`, attachedImage)
                    .catch((rejectionReason) => { console.log(rejectionReason) });
            }




            //else { console.log("can't hatch"); } //this should not occur since we are pulling from an array with ONLY hatchable pokemon

        };
        hatch();

        /*function hatch() {
            const pokemonType = availablePokemon[Math.floor(Math.random() * availablePokemon.length)];
            if (pokemonType == 10) {
                const plainCaterpie = new MessageAttachment('https://i.imgur.com/wlngI8Z.png');
                message.reply("Congratulations! A baby caterpie popped out!", plainCaterpie)
                    .catch((rejectionReason) => { console.log(rejectionReason) });
            }
            else if (pokemonType == 265) { message.reply("Wurmple!"); }
            else { message.reply("Nothing hatched....") }
        };

        if (eggNum >= 7) {
            const shinyEgg = new MessageAttachment('https://i.imgur.com/m5g7pEe.png');
            message.reply("Here is an egg for you. Oooo, it looks special!", shinyEgg)
                .catch((rejectionReason) => { console.log(rejectionReason) });
            //message.channel.send(shinyEgg).catch((rejectionReason) => {console.log(rejectionReason)});
            setTimeout(function () {
                message.reply("Congratulations, your egg has hatched!");
                hatch();
            }, 10000);

        }
        else {
            const plainEgg = new MessageAttachment('https://i.imgur.com/WRCr8c3.png');
            message.reply("Here is an egg for you. Number is " + eggNum, plainEgg)
                .catch((rejectionReason) => { console.log(rejectionReason) });
            //message.channel.send(plainEgg).catch((rejectionReason) => {console.log(rejectionReason)});
            setTimeout(function () {
                message.reply("Congratulations, your egg has hatched!");
                hatch();
            }, 10000);

        }*/
    }
    //!poke
    if (message.content.startsWith(prefix + "poke")) {
        message.reply("You poked the oddish and he is now sad.");
    }
    //!test
    if (message.content.startsWith(prefix + "test")) {
        message.reply(availablePokemon);
        console.log(availablePokemon);
        //returns # of keys (different Pokemon) available in availablePokemon.json
        console.log(Object.keys(availablePokemon).length);
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
