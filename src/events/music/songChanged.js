const BaseEvent = require("../../utils/structures/BaseEvent");

module.exports = class SongFirstEvent extends BaseEvent {
    constructor () {
        super("songChanged");
    }

    async run (client, message, newSong, oldSong) {
        message.channel.send(`**${newSong.name}** is now playing!`);
    }
}
      