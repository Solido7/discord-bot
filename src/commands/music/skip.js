const BaseCommand = require("../../utils/structures/BaseCommand");
const BaseEmbed = require("../../utils/structures/BaseEmbed");

module.exports = class SkipCommand extends BaseCommand {
    constructor () {
        super("skip", "music");
        this.aliases = ["s"];
    }

    async run (client, message, args) {
        client.player.getQueue(message.guild.id).skip();
    }
}