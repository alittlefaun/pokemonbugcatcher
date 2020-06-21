//takes the .env package and calls the function config on it which loads all the environment variables; REMOVE FROM UPLOADED BUILD
require('dotenv').config();
const Discord = require('discord.js');
//extracts the required classes from the discord.js module
const { Client, MessageAttachment } = require('discord.js');
//creates an instance of a Discord client
const client = new Discord.Client();
//fs module provides an API for interacting with file system (json)
const fs = require("fs");
//makes jokes.json available
const jokes = require("./jokes.json");
//makes availablePokemon.json available
const availablePokemon = require("./availablePokemon.json");
//creates an array containing the pokemon number of ONLY pokemon who can hatch
let availableHatchablePokemon = [];
for (i = 0; i < Object.keys(availablePokemon).length; i++) {
    if (availablePokemon[Object.keys(availablePokemon)[i]].canHatch == true) {
        availableHatchablePokemon.push(Object.keys(availablePokemon)[i]);
    }
}

// TODO: Implement improved randomness
/* Generating non-repeating random jokes
 * - no repetition until all jokes told
 * - once all jokes told, sequence of jokes changes
 * - sequence expires after some timeout (30mins ~ 1hour?)
 */
function commandJoke(message) {
    const arrayOfKeysInJokes = Object.keys(jokes);
    //returns a random key between 1 (inclusive) and the # of keys (inclusive) in jokes.json
    const randomKeyForJokes = Math.floor(Math.random() * arrayOfKeysInJokes.length);
    console.log(randomKeyForJokes);
    //returns the value associated with the randomly generated key for jokes.json
    const jokeMsg = jokes[arrayOfKeysInJokes[randomKeyForJokes]];
    message.channel.send(jokeMsg);
}

/**
 * 'poke' Command function. Stores all poke events, removing them after a minute has
 * passed. Replies to user with caretaker's reaction based on number of stored pokes.
 */
let pokeTimestamps = [];
function commandPoke(message) {
    let timestamp = Date.now();
    const minInMilli = 60000; // minutes in milliseconds
    const madThreshold = 2;
    const rageThreshold = 4;

    pokeTimestamps.filter(ts => ts < timestamp - minInMilli);
    pokeTimestamps.push(timestamp);

    let pokesPerMinute = pokeTimestamps.length;
    let oddishStatus = " is now sad.";
    let attachmentUrl = 'https://vignette.wikia.nocookie.net/legendsofthemultiuniverse/images/9/90/Oddish_sad.jpg';

    if (pokesPerMinute > madThreshold) {
        oddishStatus = "getting angry...";
        attachmentUrl = 'https://vignette.wikia.nocookie.net/legendsofthemultiuniverse/images/6/63/Screenshot_2019-02-26_oddish_-_Google_Search.png';
    }

    if (pokesPerMinute > rageThreshold) {
        oddishStatus = "enraged! Watch out!"
        attachmentUrl = 'https://vignette.wikia.nocookie.net/legendsofthemultiuniverse/images/f/f5/609355abc432f86446a7b615b28e2229cabac0f6_hq.gif';
    }

    const attachment = new Discord.MessageAttachment(attachmentUrl);
    message.reply(`you poked the oddish, and he is ${oddishStatus}`, attachment);
}


function commandStart(message) {
    const shinyFactor = Math.random();
    console.log(`The shiny factor is ${shinyFactor}.`);

    if (shinyFactor > 0.7) {
        const shinyEgg = new MessageAttachment('https://i.imgur.com/m5g7pEe.png');
        message.reply("Here is an egg for you. Oooo, it looks special!*", shinyEgg)
            .catch((rejectionReason) => { console.log(rejectionReason) });
        //message.channel.send(shinyEgg).catch((rejectionReason) => {console.log(rejectionReason)});
        setTimeout(function () {
            //message.reply("Congratulations, your egg has hatched!");
            hatch(message, true);
        }, 10000);
    }
    else {
        const plainEgg = new MessageAttachment('https://i.imgur.com/WRCr8c3.png');
        message.reply("Here is an egg for you. Please take good care of it.*", plainEgg)
            .catch((rejectionReason) => { console.log(rejectionReason) });
        //message.channel.send(plainEgg).catch((rejectionReason) => {console.log(rejectionReason)});
        setTimeout(function () {
            //message.reply("Congratulations, your egg has hatched!");
            hatch(message, false);
        }, 10000);
    }
}

//set the prefix
const prefix = "!"
let commands = {
    "joke": {
        "help": "tells a random League of Legends joke",
        "command": commandJoke
    },
    "menu": {
        "help": "brings up my menu",
        "command": commandMenu
    },
    "poke": {
        "help": "poke the oddish for a reaction",
        "command": commandPoke
    },
    "start": {
        "help": "take up responsibility as an egg nurturer",
        "command": commandStart,
    },
    "test": {
        "help": "test command",
        "command": commandMenu
    }
}

/**
 * 'menu' Command function. Prints all commands in `commands` object
 * with their help message.
 */
function commandMenu(message) {
    let msg = "These are my menu commands:\n";
    for (const cmd in commands) { //cmd is short for command
        msg += `${prefix}${cmd} - ${commands[cmd].help}\n`;
    }
    message.channel.send(msg);
}

function hatch(message, isShiny) {
    //returns a random index number for the array of availableHatchablePokemon
    // TODO: @raine410, Make a function for getting a random index in an array.
    const randomIndex = Math.floor(Math.random() * availableHatchablePokemon.length);
    //retuns the number of the pokemon randomly chosen from availableHatchablePokemon, this will be used as a KEY
    const randomPokemonNumber = availableHatchablePokemon[randomIndex];
    //returns the value (an object) that has the characters linked with the KEY
    const pokemonChar = availablePokemon[randomPokemonNumber];

    console.log(pokemonChar);

    //returns the values linked with each key of the randomly selected pokemon 
    const name = pokemonChar.name;
    const url = isShiny ? pokemonChar.shinyImageUrl : pokemonChar.imageUrl;
    const hatchTime = pokemonChar.hatchTime;
    const shinyUrl = pokemonChar.shinyImageUrl;
    const shininess = isShiny ? "shiny" : "";
    const msg = `Congratulations! A ${shininess} baby ${name} popped out!*`

    const attachedImage = new MessageAttachment(url);
    message.reply(msg, attachedImage)
        .catch((rejectionReason) => { console.log(rejectionReason) });
};


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

client.on("message", (message) => {
    if (message.content.toLowerCase() === 'hello') {
        message.channel.send(`Hello ${message.author}! Please type <!menu> if you would be interested in caring for Pokemon eggs.`);
    }

    //exits and stops if no prefix or if the message is a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // assume all commands are just prefix + command
    const cmd = message.content.slice(1); // get rid of the prefix.
    if (cmd in commands) {
        commands[cmd].command(message);
    }
    // TODO: @raine410, please implement these functions in the new command structure... plz?
    /*
    //!start
    if (message.content.startsWith(prefix + "start")) {
        const shinyFactor = Math.random();
        console.log(`The shiny factor is ${shinyFactor}.`);

        if (shinyFactor > 0.7) {
            const shinyEgg = new MessageAttachment('https://i.imgur.com/m5g7pEe.png');
            message.reply("Here is an egg for you. Oooo, it looks special!*", shinyEgg)
                .catch((rejectionReason) => { console.log(rejectionReason) });
            //message.channel.send(shinyEgg).catch((rejectionReason) => {console.log(rejectionReason)});
            setTimeout(function () {
                //message.reply("Congratulations, your egg has hatched!");
                hatch(message, true);
            }, 10000);
        }
        else {
            const plainEgg = new MessageAttachment('https://i.imgur.com/WRCr8c3.png');
            message.reply("Here is an egg for you. Please take good care of it.*", plainEgg)
                .catch((rejectionReason) => { console.log(rejectionReason) });
            //message.channel.send(plainEgg).catch((rejectionReason) => {console.log(rejectionReason)});
            setTimeout(function () {
                //message.reply("Congratulations, your egg has hatched!");
                hatch(message, false);
            }, 10000);
        }
    }
    //!test
    if (message.content.startsWith(prefix + "test")) {
        message.reply(availablePokemon);
        console.log(availablePokemon);
        //returns # of keys (different Pokemon) available in availablePokemon.json
        console.log(Object.keys(availablePokemon).length);
    }
    */
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
