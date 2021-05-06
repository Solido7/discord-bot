const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class HelpCommand extends BaseCommand {
    constructor () {
        super("help", "info");
        this.aliases = ["info"];
        this.description = "Gives more info about given command."
        this.usage = "`help {command}`";
    }

    async run (client, message, args) {
        if (args.length < 1) return client.commands.get("commands").run(client, message, args);

        let cmds = new Array();
        client.commands.forEach(cmd => cmds.push(cmd));

        let command = client.commands.get(args[0]);
        if (!command) {
            for (let cmd of client.commands.values()) {
                if (cmd.aliases && cmd.aliases.includes(cmd.name)) command = cmd;
            }
        }

        if (command) {
            const fields = this.makeCommandFields(command);
            if (fields.length > 0) {
                const embed = new MessageEmbed()
                    .setAuthor(client.user.tag, client.user.displayAvatarURL())
                    .setColor(process.env.LIGHT_BLUE)
                    .setTitle(command.name)
                    .addFields(fields);
                await message.channel.send(embed);
            } else {
                message.channel.send("This command has no info, sorry.");
            }
        } else {
            message.channel.send("There is no such command.");
        }
    }
    makeCommandFields(command) {
        let fields = new Array();
        const allFields = ["aliases", "description", "usage", "filters", "categories"]
        allFields.forEach(field => {
            let val = command[field];
            if (typeof command[field] == "object") val = command[field].join(", ");
            if (command[field]) {
                fields.push({
                    name: `${field.charAt(0).toUpperCase() + field.slice(1)}:`,
                    value: val,
                    inline: false
                });
            }
        });
        return fields;
    }
}