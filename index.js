require("dotenv").config();
const { Client } = require("discord.js");
const client = new Client();
const ReadyManualEvent = require("./src/events/ready/readyManual");

const { 
    registerCommands, 
    registerEvents
} = require("./src/utils/register");


client.on("ready", async () => {
    const rdyEvt = new ReadyManualEvent(client);
    await rdyEvt.run();
});


(async () => {
    await client.login(process.env.BOT_TOKEN);

    client.moderationRoles = new Map();
    client.prefixes = new Map();
    client.commands = new Map();
    await registerCommands(client, "../commands");
    await registerEvents(client, "../events");
    client.prefixes.set("683071046144098385", "?"); client.prefixes.set("502506559591546920", "?"); 
})();

