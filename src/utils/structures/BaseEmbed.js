const { MessageEmbed } = require("discord.js");

module.exports = class BaseEmbed {
    constructor (client, guildID) {
        this.client = client;
        this.guildID = guildID;
        this.embed = new MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setColor(process.env.LIGHT_BLUE)
        .setFooter("Command prefix is `" + client.prefixes.get(guildID) + "`" + " | Kristian#0109");
    }

    getEmbed() {
        return this.embed;
    }

    addField(field) {
        this.embed.addField(field);
    }
    
    addFields(fields) {
        this.embed.addFields(fields);
    }
    
    setAuthor(author) {
        this.embed.setAuthor(author);
    }

    setColor(color) {
        this.embed.setColor(color);
    }

    setDescription(desc) {
        this.embed.setDescription(desc);
    }

    setFooter(footer) {
        this.embed.setFooter(footer);
    }

    setImage(image) {
        this.embed.setImage(image);
    }

    setThumbnail(thumbnail) {
        this.embed.setThumbnail(thumbnail);
    }

    setTimestamp(timestamp) {
        this.embed.setTimestamp(timestamp);
    }

    setTitle(title) {
        this.embed.setTitle(title);
    }

    setURL(url) {
        this.embed.setURL(url);
    }

    spliceFields(footer) {
        this.embed.spliceFields(footer);
    } 
}
