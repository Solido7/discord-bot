const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class SongAddEvent extends BaseEvent {
    constructor () {
        super("songAdd");
    }

    async run (client, queue, song) {
        song.data.requestMessage.react('✅');
    }
}

