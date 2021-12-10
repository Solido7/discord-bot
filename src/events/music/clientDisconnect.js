const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class ClientDisconnectEvent extends BaseEvent {
    constructor () {
        super("clientDisconnect");
    }

    async run (client, queue) {
        if (queue.messageEmbed) queue.messageEmbed.delete();
        queue.stop();
    }
}
      