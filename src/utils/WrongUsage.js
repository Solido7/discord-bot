const BaseEmbed = require("./structures/BaseEmbed");

module.exports = class WrongUsage extends BaseEmbed {
    constructor (client, guildID, command, wrongUsage) {
        super(client, guildID);

        let fields = [];
        fields.push({
            name: "Wrong usage",
            value: (wrongUsage.length > 1) ? wrongUsage : "-",
            inline: false
        });

        let usage = command["usage"];
        usage = usage.split("_PREFIX_").join(client.prefixes.get(guildID));
        
        fields.push({
            name: "Correct usage",
            value: usage,
            inline: false
        });

        this.addFields(fields);
    }
}
