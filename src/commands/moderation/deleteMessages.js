const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class DeleteMessagesCommand extends BaseCommand {
    constructor () {
        super("deletemessages", "moderation");
        this.aliases = ["delete"];
        this.description = "Delete the last x messages in the channel. Removes 50 messages by default."
        this.usage = "`_PREFIX_delete` or `_PREFIX_delete {number}`"
    }

    async run (client, message, args) {
        let amount = 50;
        if (!isNaN(Number(args[0]))) amount = Number(args[0]);
        amount = Math.min(50, amount);

        message.channel.messages.fetch({ limit: (amount+1)})
            .then(async messages => {
                await messages.forEach(m => m.delete());
                message.channel.send("Deleted " + amount + " messages.");
            })
            .catch(err => console.log(err));
    }
}