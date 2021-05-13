const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class TypingStartEvent extends BaseEvent {
    constructor () {
        super("typingStart");
    }

    async run (client, channel, user) {
        if (user.bot) return;

        let odds = Math.floor((Math.random() * 25) + 50);
        if (odds == 69) channel.send(`stfu ${user}`);
    }
}


