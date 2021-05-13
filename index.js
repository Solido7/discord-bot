require("dotenv").config();
const { Client } = require("discord.js");
const client = new Client();
const { Player } = require("discord-music-player");

const { 
    registerCommands, 
    registerEvents,
    registerMusicEvents
} = require("./src/utils/register");

(async () => {
    const player = new Player(client, {
        leaveOnEmpty: false, 
    });
    client.player = player;

    client.moderationRoles = new Map();
    client.prefixes = new Map();
    client.commands = new Map();
    await registerCommands(client, "../commands");
    await registerEvents(client, "../events");
    await registerMusicEvents(client, "../events/music");
    client.prefixes.set("683071046144098385", "?"); client.prefixes.set("502506559591546920", "?"); 

    
    await client.login(process.env.BOT_TOKEN);
})();

