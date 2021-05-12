const BaseEmbed = require("./structures/BaseEmbed");

module.exports = class WrongUsage extends BaseEmbed {
    constructor (client, guildID, command) {
        super(client, guildID);
        
        let usage = command["usage"];
        usage = usage.split("_PREFIX_").join(client.prefixes.get(guildID));
        console.log(usage);
        
        this.addFields({
            name: "Wrong usage",
            value: usage,
            inline: false
        });
    }
}
