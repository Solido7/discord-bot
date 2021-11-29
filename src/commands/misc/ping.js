const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class PingCommand extends BaseCommand {
    constructor () {
        super("ping", "misc");
        this.description = "It really is just a ping command.";
    }

    async run (client, message, args) {
        message.channel.send("Pong!");
    }
}