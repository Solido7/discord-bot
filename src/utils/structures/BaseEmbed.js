const { MessageEmbed } = require("discord.js");

module.exports = class BaseEmbed extends MessageEmbed {
    constructor (client, guildID) {
        super()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(process.env.LIGHT_BLUE)
            .setFooter("Command prefix is `" + client.prefixes.get(guildID) + "`" + " | Kristian#0109");
        
        this.client = client;
        this.guildID = guildID;
    }
}
