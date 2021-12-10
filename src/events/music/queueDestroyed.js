const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class QueueDestroyedEvent extends BaseEvent {
    constructor () {
        super("queueDestroyed");
    }

    async run (client, queue) {
        if (queue.messageEmbed) queue.messageEmbed.delete();
        queue.stop();
    }
}
      