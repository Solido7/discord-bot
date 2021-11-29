const BaseCommand = require("../../utils/structures/BaseCommand");
const BaseEmbed = require("../../utils/structures/BaseEmbed");

module.exports = class CommandsCommand extends BaseCommand {
    constructor () {
        super("commands", "info");
        this.description = "Shows a list of all available commands."
    }

    async run (client, message, args) {
        let cmds = new Array();
        client.commands.forEach(cmd => cmds.push(cmd));
        cmds.sort(function(a, b) { return a.category.localeCompare(b.category)});

        const embed = new BaseEmbed(client, message.guild.id)
            .setDescription("List of available commands")
            .setFooter(`${client.prefixes.get(message.guild.id)}help {command} for more info.`);

        let finishedCategories = new Array();
        cmds.forEach(cmd => {
            if (!finishedCategories.includes(cmd.category)) embed.addFields(this.makeCategoryField(cmd.category, cmds));
            finishedCategories.push(cmd.category);
        });
        message.channel.send({ embeds: [embed] });
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