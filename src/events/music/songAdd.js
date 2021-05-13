const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class SongAddEvent extends BaseEvent {
    constructor () {
        super("songAdd");
    }

    async run (client, message, queue, song) {
        message.channel.send(`**${song.name}** has been added to the queue!`);
    }
}


