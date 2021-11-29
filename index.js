require("dotenv").config();
const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const { 
    registerCommands, 
    registerEvents
} = require("./src/utils/register");

(async () => {
    client.moderationRoles = new Map();
    client.prefixes = new Map();
    client.commands = new Map();
    await registerCommands(client, "../commands");
    await registerEvents(client, "../events");
    client.prefixes.set("683071046144098385", "?"); client.prefixes.set("502506559591546920", "?");


    await client.login(process.env.BOT_TOKEN);
})();

