const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class ErrorEvent extends BaseEvent {
    constructor () {
        super("error");
    }

    async run (client, error, queue) {
        console.log(`Error: ${error} in ${queue.guild.name}`);
        if (queue.messageEmbed) queue.messageEmbed.delete();
        queue.stop();
    }
}
      