const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class QueueEndEvent extends BaseEvent {
    constructor () {
        super("queueEnd");
    }

    async run (client, queue) {
        if (queue.messageEmbed) queue.messageEmbed.delete();
        queue.stop();
    }
}
      