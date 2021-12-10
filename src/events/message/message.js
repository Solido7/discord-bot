const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class MessageEvent extends BaseEvent {
    constructor () {
        super("messageCreate");
    }

    async run (client, message) {
        if (message.author.bot) return;

        const prefix = client.prefixes.get(message.guild.id);
        const usedPrefix = message.content.slice(0, prefix.length);

        if (usedPrefix === prefix) {
            const [cmdName, ...cmdArgs] = message.content.slice(prefix.length).split(/\s+/);

            let command = client.commands.get(cmdName.toLowerCase());
            if (!command) {
                for (let cmd of client.commands.values()) {
                    if (cmd.aliases && cmd.aliases.includes(cmdName)) command = cmd;
                }
            }
            if (command) command.run(client, message, cmdArgs);   
        }
    }
}


