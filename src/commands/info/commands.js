const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class CommandsCommand extends BaseCommand {
    constructor () {
        super("commands", "info");
    }

    async run (client, message, args) {
        let cmds = new Array();
        client.commands.forEach(cmd => cmds.push(cmd));
        cmds.sort(function(a, b) { return a.category.localeCompare(b.category)});

        const embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(process.env.LIGHT_BLUE)
            .setFooter("Made by Kristian#0109");

        let finishedCategories = new Array();
        cmds.forEach(cmd => {
            if (!finishedCategories.includes(cmd.category)) embed.addFields(this.makeCategoryField(cmd.category, cmds));
            finishedCategories.push(cmd.category);
        });
        message.channel.send(embed);
    }

    makeCategoryField (categoryName, commands) {
        let commandsString = "";
        commands.forEach(cmd => {
            if (cmd.category == categoryName) {
                commandsString += (cmd.name + "\n");
            }
        });

        categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        const category = {
            name: categoryName,
            value: commandsString,
            inline: false
        };
        return category;
    }
}