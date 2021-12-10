const path = require("path");
const fs = require("fs").promises;
const BaseCommand = require("./structures/BaseCommand");
const BaseEvent = require("./structures/BaseEvent");
const { exitCode } = require("process");

async function registerCommands(client, dir = "") {
    const filePath = path.join(__dirname, dir);
    //console.log(filePath);
    const files = await fs.readdir(filePath);

    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));

        if (stat.isDirectory()) registerCommands(client, path.join(dir, file));

        if (file.endsWith(".js")) {
            const Command = require(path.join(filePath, file));

            if (Command.prototype instanceof BaseCommand) {
                const cmd = new Command();
                client.commands.set(cmd.name, cmd);
                //if (cmd.aliases) cmd.aliases.forEach(alias => client.commands.set(alias, cmd));
            }
        }
    }
}

async function registerEvents(client, dir = "") {
    const filePath = path.join(__dirname, dir);
    //console.log(filePath);
    const files = await fs.readdir(filePath);

    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));

        if (stat.isDirectory()) registerEvents(client, path.join(dir, file));

        if (file.endsWith(".js")) {
            const Event = require(path.join(filePath, file));

            if (Event.prototype instanceof BaseEvent) {
                const evt = new Event();
                client.on(evt.name, evt.run.bind(evt, client));
            }
        }
    }
}

async function registerMusicEvents(client, dir = "") {
    const filePath = path.join(__dirname, dir);
    //console.log(filePath);
    const files = await fs.readdir(filePath);

    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));

        if (stat.isDirectory()) registerEvents(client, path.join(dir, file));

        if (file.endsWith(".js")) {
            const Event = require(path.join(filePath, file));

            if (Event.prototype instanceof BaseEvent) {
                const evt = new Event();
                client.player.on(evt.name, evt.run.bind(evt, client));
            }
        }
    }
}

async function registerDatabase(client) {
    const snapshot = await client.db.collection("guilds").get();
    snapshot.forEach(async (doc) => {
        await client.prefixes.set(doc.id, doc.data().prefix);
        await client.moderationRoles.set(doc.id, doc.data().moderationRole);
    });
}


module.exports = {
    registerCommands,
    registerEvents,
    registerMusicEvents,
    registerDatabase
};