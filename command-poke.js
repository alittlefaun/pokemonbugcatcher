
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

let commands = {
    "poke": {
        "help": "poke the oddish for a reaction",
        "command": commandPoke
    },/*
    "ignore": {
        "help": "poke the oddish for a reaction",
        "command": commandPoke
    },
    "pet": {
        "help": "poke the oddish for a reaction",
        "command": commandPoke
    },*/
}

module.exports = commands;